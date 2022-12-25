const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  name: state => state.user.userInfo.username,
  avatar: state => state.user.userInfo.staffPhoto,
  userInfo: state => state.user.userInfo,
  userId: state => state.user.userInfo.userId

}
export default getters
