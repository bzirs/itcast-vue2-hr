import axios from 'axios'

const upyun = axios.create({
  baseURL: 'http://v0.api.upyun.com/blogservicecdnimg',
  timeout: 5000
})

// const crypto = require('crypto')
import crypto from 'crypto'
const date = new Date().toUTCString()
console.log(date)

const key = 'bzirs'
const secret = 'W0xo0wbMuBSi91gLfPM2tH6b9Q0xQMq1'
const method = 'GET'
const uri = '/blogservicecdnimg/avatar'
function sign(key, secret, method, uri, date, policy = null, md5 = null) {
  const elems = [];
  [method, uri, date, policy, md5].forEach(item => {
    if (item != null) {
      elems.push(item)
    }
  })
  const value = elems.join('&')
  const auth = hmacsha1(secret, value)
  return `UPYUN ${key}:${auth}`
}
function MD5(value) {
  return crypto.createHash('md5').update(value).digest('hex')
}
function hmacsha1(secret, value) {
  return crypto.createHmac('sha1', secret).update(value, 'utf8').digest().toString('base64')
}
// console.log(MD5('secret'))
// 上传，处理，内容识别有存储
// console.log(sign(key, MD5(secret), method, uri, date))
// 内容识别无存储，容器云
// console.log(sign(key, secret, method, uri, date))

// 添加请求拦截器
upyun.interceptors.request.use(function(config) {
// 在发送请求之前做些什么
  // config.headers['Access-Control-Expose-Headers'] = 'Date'
  // config.headers.Authorization = sign(key, MD5(secret), method, uri, date)
  // config.headers['Date'] = date
  // config.data = {
  // authorization: sign(key, MD5(secret), method, uri, date),
  // file: '123'
  // policy: {
  // bucket:''
  // }
  // }
  return config
}, function(error) {
// 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
upyun.interceptors.response.use(function(response) {
// 2xx 范围内的状态码都会触发该函数。
// 对响应数据做点什么
  response.headers['Access-Control-Expose-Headers'] = 'Date'
  return response.data
}, function(error) {
// 超出 2xx 范围的状态码都会触发该函数。
// 对响应错误做点什么
  return Promise.reject(error)
})

export default upyun
