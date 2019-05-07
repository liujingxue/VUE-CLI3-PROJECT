//使用之前定义的 libs/ajaxRequest.js 库
import axios from '../../libs/ajaxRequest';

//放置接口
export const getUser = () => {
    return axios.request({
        url: '/user',
        method: 'get'
    })
};


//其他地方使用
// import {getUser} from './api/user/user'

// getUser().then(data => {

// })