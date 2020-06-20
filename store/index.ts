export const state = () => ({
  authUser: null,
  isLogin: false
})

export const mutations = {
  SET_USER(state: any, user: object) {
    state.authUser = user
  },
  SET_LOGIN(state: any, payload: boolean) {
    state.isLogin = payload
  }
}
