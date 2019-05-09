import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import { pathToFileURL } from 'url';

Vue.use(iView);

Vue.config.productionTip = false


//每个页面都要调用
let whiteList = ['/xxx'];
router.beforeEach(async (to, from, next) => {
  //如果在白名单里，就不用管了，不用去校验。
  //除了白名单里的，其他的都需要校验
  if (whiteList.includes(to.path)) {
    return next();
  }
  //调用store.js里面的toValidate方法
  let isLogin = await store.dispatch('toValidate');
  //获取路由中的meta标签里的属性
  let needLogin = to.matched.some(match => match.meta.needLogin);
  //如果需要登录
  if (needLogin) {
    //如果已经登录，就正常往下走。
    if (isLogin) {
      next();
    } else {
      //否则，就去登录
      next('/login');
    }
  } else {
    //如果不需要登录
    if (isLogin && to.name === 'login') {
      next('/');
    } else {
      next();
    }
  }
  next();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
