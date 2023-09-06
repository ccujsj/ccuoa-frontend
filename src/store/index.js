/*
filename: store/index.js
desc: vuex存储组件
@author: Dongxu Fei
@contact: phil616@163.com
@copyright: CCUJSJ - 长春大学计算机科学技术学院学生会
@licence: Apache 2.0
@date: 2023-9-6
*/
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const actions = {
  updateNavBarState(context,value){
    context.commit('navBarState',value)
  },
  updatePublicKVD(context,value){
    context.commit('publicKVD',value)
  }
}
const mutations = {
  navBarState(state,value){
    state.navBarState = value
  },
  publicKVD(state,value){
    state.publicKVD = value
  }
}
const state = {
  navBarState:'public',
  publicKVD:[]
}

const getters = {
  getNavBar(state){
    return state.navBarState
  },
  getPublicKVD(state){
    return state.publicKVD
  }

}
export default new Vuex.Store({
  actions,
  mutations,
  state,
  getters
})