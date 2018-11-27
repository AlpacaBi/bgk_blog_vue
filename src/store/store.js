import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import article from './article'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    home,
    article
  }
})

export default store
