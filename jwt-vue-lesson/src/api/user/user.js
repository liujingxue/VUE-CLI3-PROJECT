//使用之前定义的 libs/ajaxRequest.js 库
import axios from '../../libs/ajaxRequest';

//放置接口
export const getUser = () => {
    return axios.request({
        url: '/user',
        method: 'get'
    })
};


//登录接口
//传入的参数是username
export const login = (username) => {
    return axios.request({
        url: '/login',
        method: 'post',
        data: {
            username
        }
    })
};


//校验
export const validate = () => {
    return axios.request({
        methods: 'get',
        url: '/validate'
    })
}





//其他地方使用
// import {getUser} from './api/user/user'

// getUser().then(data => {

// })