/**
 * @Author: bzirs
 * @Date: 2021-05-10 09:38:15
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-22 16:06:50
 * @FilePath: /hm-vue2-hr/src/api/user.js
 * @Description:
 * @
 * @Copyright (c) 2022 by bzirs, All Rights Reserved.
 */

import request from '@/utils/request'

export const login = obj => request.post('/sys/login', obj)

export function getUserInfo() {
  return request.post('/sys/profile')
}

export function logout() {
  return
}
