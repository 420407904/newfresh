import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 保存共享的数据，可以再组件中通过this.$store.state.xxx来读取
  state: {
    uid:sessionStorage.getItem("uid"),
    uname:sessionStorage.getItem("uname"),
    phone:sessionStorage.getItem("phone")
  },
  // 存放一些函数，对state中的值进行处理之后再反馈
  getters:{
  },
  //书写方法，修改state中的值!
  mutations: {
    //
    updateUser(state){
      state.uid=sessionStorage.getItem("uid");
      state.uname=sessionStorage.getItem("uname");
      state.phone=sessionStorage.getItem("phone");
    }
  },
  //异步操作
  actions: {
  },
  // store的子模块，大型项目中需要拆分出多个文件管理不同的状态值
  modules: {
  }
})
