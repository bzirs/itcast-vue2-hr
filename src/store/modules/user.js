/**
 * @Author: bzirs
 * @Date: 2021-05-10 09:38:15
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-25 09:47:53
 * @FilePath: /hm-vue2-hr/src/store/modules/user.js
 * @Description:
 * @
 * @Copyright (c) 2022 by bzirs, All Rights Reserved.
//  */
// import { login, logout, getInfo } from '@/api/user'
// import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'

import { getUserInfo, getUserOtherInfo, login as userLogin } from '@/api/user'
import { resetRouter } from '@/router'
import { getToken, removeToken, setToken } from '@/utils/auth'

const getUserState = _ => ({
  token: getToken(),
  userInfo: {}
})

const mutations = {
  // 更新token
  updateToken(state, payload) {
    state.token = payload
    setToken(payload)
  },
  // 更新用户信息
  updateUserInfo(state, payload) {
    state.userInfo = payload
  },
  updateLogout() {
    removeToken()
    state.token = null
    state.userInfo = {}
  }
}

const actions = {
  // 用户登录
  async login({ commit }, payload) {
    try {
      const { code, data, message } = await userLogin(payload)
      console.log(code, data)

      commit('updateToken', data)

      return Promise.resolve(message)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  // 获取用户信息
  async toGetUserInfo({ commit }, payload) {
    const { data } = await getUserInfo()
    const { data: otherData } = await getUserOtherInfo(data.userId)
    commit('updateUserInfo', { ...data, ...otherData })

    return data.roles
  },
  // 用户退出
  async logout({ commit }) {
    // removeToken()
    commit('updateLogout')

    resetRouter()
    // commit('updateUserInfo', {})
  }

}

const state = getUserState()

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
