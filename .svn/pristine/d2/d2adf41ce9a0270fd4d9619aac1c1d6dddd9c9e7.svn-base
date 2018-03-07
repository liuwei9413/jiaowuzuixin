import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userInfo: {}, //用户登录信息
    userName: {}, //用户名
  },
  mutations: {
    storeUserInfo(state, params){
      state.userInfo = Object.assign(state.userInfo, params);
      state.userName = state.userInfo.name;
    },
    storeSetUserName(state,params){
      state.userInfo.name = params.name;
      state.userName = params.name;
    },
  },
  actions: {

  }
})
