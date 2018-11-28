import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import article from './article'
import message from './message'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    home,
    article,
    message
  }
})

export default store
