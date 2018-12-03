import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import {ERR_OK, apiUrl} from '@/axios/common/common.js'
// 配置API接口地址
const root = apiUrl


axios.interceptors.request.use(config => {    // 这里的config包含每次请求的内容
  // 判断sessionStorage中是否存在api_token
  // if (sessionStorage.getItem('api_token')) {
  //   //  存在将api_token写入 request header
  //   config.headers.Token = `${sessionStorage.getItem('api_token')}`;
  // }
  return config;
}, err => {
  return Promise.reject(err);
});

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
});

function checkStatus (response) {
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 ||
      response.status === 400)) {
    return response
  }
// 异常状态下，把错误信息返回去
  return{
    status: 500,
    data: [{MessageCode: 500, Message: response.data.Message},[]],
    msg: response.data.Message
  }
}

function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === 500) {
    Message({
      type: 'error',
      message: res.msg
    })
  }
  // if (res.data && (res.data[0].MessageCode != ERR_OK)) {
  //   Message({
  //     type: 'error',
  //     message: res.data.message || '服务器异常'
  //   })
  // }
  return res
}
// 请求方式的配置
export default {
  post (url, data) {  //  post
    var obj = {};
    if(url.indexOf("login")==-1){ //没有login,传token
      obj = {
        'X-Requested-With': 'XMLHttpRequest'
        //'Token':localStorage.getItem('token')
      }
      // sessionStorage.setItem('token',"");
      // config.headers.Authorization = "";
    }
    else if( url.indexOf("login")>-1){
      localStorage.setItem('token',"");
      obj = {
        'X-Requested-With': 'XMLHttpRequest',
        //'Token': localStorage.getItem('token')
      }
      // config.headers.Authorization =sessionStorage.getItem("token");
    }

    return axios({
      method: 'post',
      baseURL: root,
      url,
      data: data,  //qs.stringify(data)
      timeout: 5000,
      headers: obj
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  get (url, params) {  // get
    var obj = {};
    if(url.indexOf("login")==-1){
      obj = {
        'X-Requested-With': 'XMLHttpRequest',
        //'Token':localStorage.getItem('token')
      }
      // sessionStorage.setItem('token',"");
      // config.headers.Authorization = "";
    }
    else if(url.indexOf("login")>-1){
      obj = {
        'X-Requested-With': 'XMLHttpRequest'
      }
      // config.headers.Authorization =sessionStorage.getItem("token");
    }
    return axios({
      method: 'get',
      baseURL: root,
      url,
      params, // get 请求时带的参数
      timeout: 5000,
      headers: obj
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}
// if(url.indexOf("login")>-1){
//   sessionStorage.setItem('token',"");
//   config.headers.Authorization = "";
// }
// if(url.indexOf("user")>-1 && url.indexOf("login")<0){
//   config.headers.Authorization =sessionStorage.getItem("token");
// }
