import Vue from 'vue'
import Vuex from 'vuex'
import {login, validate} from './api/user/user.js';
import {setLocal} from './libs/local';

Vue.use(Vuex)

export default new Vuex.Store({
  //公共状态
  state: {
    //是否显示loading
    isShowLoading: false,
    //用户登录后的用户名
    username: '123'
  },
  //修改状态
  //可以在其他文件，使用 store.commit 去调用 showLoading方法
  mutations: {
    //显示loading
    showLoading(state){
      state.isShowLoading = true
    },
    //隐藏loading
    hideLoading(state){
      state.isShowLoading = false
    },
    setUser(state, username){
      state.username = username;
    }
  },
  //动作，这里面存放着接口调用
  actions: {
    async toLogin({commit}, username) {  //怎么调用， store.dispatch('toLogin');
      let res = await login(username);
      if (res.code === 0) { //成功登录
        //提交到vuex
        commit('setUser', res.username);
        //登录成功后，将token保存到客户端(浏览器)上,每次请求时带上token,服务端校验token,
        //如果token不正确或者过期，相当于没登录
        setLocal('token', res.token);
      } else {
        //返回的失败的promise
        return Promise.reject(res.data);
      }
    },
    async toValidate({commit}) {
      let res = await validate();
      if (res.code === 0) {
        //提交到vuex
        commit('setUser', res.username);
        setLocal('token', res.token);
      } 
      return res.code === 0; //返回用户是否失效
    }
  }
})

// store.dispatch('toLogin').then(data, err => {
//   console.log('xxxx')
// })

//页面里去调用dispatch方法，派发到actions里面，然后在actions里面，再commit()提交到
//mutations，然后在mutations里面去修改状态