//ajaxRequest 获取

//引入 axios
import axios from 'axios';

class AjaxRequest {
    //构造函数里面，写一些默认的属性和方法
    //new 一下，立马就能使用
    constructor(){
        //判断是开发还是上线
        //如果是开发环境，则使用http://localhost:3000
        this.baseURL = process.env.NODE_ENV == 'production' ? '/' : 'http://localhost:3000'
    }
    request() {

    }
}

//导出的是类，我们new一下，就可以直接调用类里面的方法
export default new AjaxRequest

//如何使用
//import xxx from ''
//xxx.request({
    // url: '/user',
    // method: 'post'    
// })
