import { constantRoutes } from '@/router'

const getUserState = _ => ({
  menuList: []
})

const mutations = {
  updateMenuList(state, payload) {
    state.menuList = [...constantRoutes, ...payload]
  }
}

const actions = {

}

const state = getUserState()

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
