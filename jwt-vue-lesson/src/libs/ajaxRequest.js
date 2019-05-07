//ajaxRequest 获取

//这是一个公共的库，很多接口都可以调用这个库

//引入 axios
import axios from 'axios';

class AjaxRequest {
    //构造函数里面，写一些默认的属性和方法
    //new 一下，立马就能使用
    constructor(){
        //判断是开发还是上线
        //如果是开发环境，则使用http://localhost:3000
        //请求的路径
        this.baseURL = process.env.NODE_ENV == 'production' ? '/' : 'http://localhost:3000';
        this.timeout = 3000; //超时时间。3秒。
    }
    //自定义一个将传进来的参数和默认参数进行融合的方法
    merge(options){
        //使用默认定义的baseURL 和 timeout参数
        return {...options, baseURL: this.baseURL, timeout: this.timeout}
    }
    //自定义一个拦截器
    setInterceptor(instance){

    }
    request(options) {
        //创建实例的方式，来使用axios
        let instance = axios.create(); //通过axios库创建一个axios实例
        //设置拦截器
        this.setInterceptor(instance);
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


//进度： 16:34