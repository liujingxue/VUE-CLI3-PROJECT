//ajaxRequest 获取

//这是一个公共的库，很多接口都可以调用这个库

//引入 axios
import axios from 'axios';
//引入 store
import store from '../store';
//使用getLocal方法
import {getLocal} from './local';

class AjaxRequest {
    //构造函数里面，写一些默认的属性和方法
    //new 一下，立马就能使用
    constructor(){
        //判断是开发还是上线
        //如果是开发环境，则使用http://localhost:3000
        //请求的路径
        this.baseURL = process.env.NODE_ENV == 'production' ? '/' : 'http://localhost:3000';
        this.timeout = 3000; //超时时间。3秒。
        this.queue = {}; //存放每次的请求
    }
    //自定义一个将传进来的参数和默认参数进行融合的方法
    merge(options){
        //使用默认定义的baseURL 和 timeout参数
        return {...options, baseURL: this.baseURL, timeout: this.timeout}
    }
    //自定义一个拦截器
    setInterceptor(instance, url){

        //每次请求时，都会加一个loading效果

        //对请求进行拦截
        //更改请求头
        instance.interceptors.request.use((config) => {
            console.log(config);
            //可以修改请求头
            //在请求头里面，加token
            // config.headers.Authorization = '123';
            config.headers.Authorization = getLocal('token');
            if (Object.keys(this.queue).length === 0) {
                //使用store.commit() 来加载store.js中的showLoading方法
                store.commit('showLoading');
            }
            //将url存入queue对象
            this.queue[url] = url;
            return config;
        })

        //对响应后的数据，进行拦截
        //如果上一个promise， 返回了一个常量，会作为下一个promise的输入
        instance.interceptors.response.use((res) => {
            //结束后，将queue对象中的url删除掉
            //每次请求成功后，都删除队列里的路径
            delete this.queue[url];
            if (Object.keys(this.queue).length === 0) {
                store.commit('hideLoading');
            }
            return res.data;
        })


    }
    request(options) {
        //创建实例的方式，来使用axios
        let instance = axios.create(); //通过axios库创建一个axios实例
        //设置拦截器
        this.setInterceptor(instance, options.url);
        //设置参数。 将options和默认参数，进行融合。
        let config = this.merge(options);
        //axios执行后返回的是一个promise
        return instance(config);
    }
}

//导出的是类，我们new一下，就可以直接调用类里面的方法
export default new AjaxRequest

//如何使用
//import xxx from ''
//xxx.request({
    // url: '/user',
    // method: 'post'    
// }).then()


