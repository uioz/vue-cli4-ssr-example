export const store = {
  state: {
    userInfo:undefined
  },
  mutations: {
    clearUserInfo(state){
      state.userInfo = undefined;
    },
    setUserInfo(state,userInfo){
      state.userInfo = userInfo;
    }
  },
  actions: {
    fetchUserInfo({commit},{id,url}){
      
      return new Promise((resolve) => setTimeout(() => {
        commit('setUserInfo',[1,2,3,id,url])
        resolve();
      }, 1000))
    }
  },
}