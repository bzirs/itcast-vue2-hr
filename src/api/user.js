/**
 * @Author: bzirs
 * @Date: 2021-05-10 09:38:15
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-24 16:09:04
 * @FilePath: /hm-vue2-hr/src/api/user.js
 * @Description:
 * @
 * @Copyright (c) 2022 by bzirs, All Rights Reserved.
 */

import request from '@/utils/request'

// 用户登录
export const login = obj => request.post('/sys/login', obj)

// 获取用户信息
export function getUserInfo() {
  return request.post('/sys/profile')
}

// 获取其他用户信息
export const getUserOtherInfo = id => request.get(`/sys/user/${id}`)

export function logout() {
  return
}
