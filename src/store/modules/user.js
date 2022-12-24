/**
 * @Author: bzirs
 * @Date: 2021-05-10 09:38:15
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-24 17:36:35
 * @FilePath: /hm-vue2-hr/src/store/modules/user.js
 * @Description:
 * @
 * @Copyright (c) 2022 by bzirs, All Rights Reserved.
//  */
// import { login, logout, getInfo } from '@/api/user'
// import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'

import { getUserInfo, getUserOtherInfo, login as userLogin } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/auth'

// const mutations = {
//   RESET_STATE: (state) => {
//     Object.assign(state, getDefaultState())
//   },
//   SET_TOKEN: (state, token) => {
//     state.token = token
//   },
//   SET_NAME: (state, name) => {
//     state.name = name
//   },
//   SET_AVATAR: (state, avatar) => {
//     state.avatar = avatar
//   }
// }

// const actions = {
//   // user login
//   login ({ commit }, userInfo) {
//     const { username, password } = userInfo
//     return new Promise((resolve, reject) => {
//       login({ username: username.trim(), password: password }).then(response => {
//         const { data } = response
//         commit('SET_TOKEN', data.token)
//         setToken(data.token)
//         resolve()
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // get user info
//   getInfo ({ commit, state }) {
//     return new Promise((resolve, reject) => {
//       getInfo(state.token).then(response => {
//         const { data } = response

//         if (!data) {
//           return reject('Verification failed, please Login again.')
//         }

//         const { name, avatar } = data

//         commit('SET_NAME', name)
//         commit('SET_AVATAR', avatar)
//         resolve(data)
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // user logout
//   logout ({ commit, state }) {
//     return new Promise((resolve, reject) => {
//       logout(state.token).then(() => {
//         removeToken() // must remove  token  first
//         resetRouter()
//         commit('RESET_STATE')
//         resolve()
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // remove token
//   resetToken ({ commit }) {
//     return new Promise(resolve => {
//       removeToken() // must remove  token  first
//       commit('RESET_STATE')
//       resolve()
//     })
//   }
// }

// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions
// }

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
    state.userInfo = null
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
  },
  // 用户退出
  async logout({ commit }) {
    // removeToken()
    commit('updateLogout')
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
