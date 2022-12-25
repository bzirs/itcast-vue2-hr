/**
 * @Author: bzirs
 * @Date: 2021-05-10 09:38:15
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-25 09:46:57
 * @FilePath: /hm-vue2-hr/src/permission.js
 * @Description:
 * @
 * @Copyright (c) 2022 by bzirs, All Rights Reserved.
 */
import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/404'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  NProgress.start()

  const token = store.getters.token
  console.log(token)
  if (token) {
    // 请求用户信息 判断vuex是否存在用户信息
    console.log(store.getters.userInfo.userId)
    store.getters.userId || store.dispatch('user/toGetUserInfo')

    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }

  NProgress.done()
})

router.beforeEach((to, from, next) => {
  // 动态设置标题
  document.title = getPageTitle(to.meta.title)

  next()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

