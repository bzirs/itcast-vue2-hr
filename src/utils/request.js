/**
 * @Author: bzirs
 * @Date: 2021-05-10 09:38:15
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-24 18:00:59
 * @FilePath: /hm-vue2-hr/src/utils/request.js
 * @Description:
 * @
 * @Copyright (c) 2022 by bzirs, All Rights Reserved.
 */
import axios from 'axios'
import { Message } from 'element-ui'
// import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import router from '@/router'

// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
}) // 创建一个axios的实例

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    // let each request carry token
    // ['Authorization'] is a custom headers key
    // please modify it according to the actual situation
    const token = store.getters.token
    token && (config.headers['Authorization'] = `Bearer ${token}`)

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  function(response) {
    // 2xx 范围内的状态码都会触发该函数。
    const { data: { success, message }} = response

    // 对响应数据做点什么
    // Message({
    //   showClose: true,
    //   message: success ? '欢迎回家捏~master!' : message,
    //   type: success ? 'success' : 'error'
    // })
    if (!success) return Promise.reject(new Error(message || 'Error!!'))

    return response.data
  },
  function(error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    const { response: { status, data: { message }}} = error

    Message({
      showClose: true,
      message,
      type: 'error'
    })

    console.log(router.currentRoute.fullPath)
    if (status === 401) {
      store.dispatch('user/logout')
      router.push(`/login?redirect=${router.currentRoute.fullPath}`)
    }
    //  && router.push(`/login`)
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default service // 导出axios实例
