import {GET_ARTICLE_LIST_DATA, GET_ARTICLES, CHANGE_TAB, CHANGE_TABNAME} from './mutation-types'
import Vue from 'vue'
const Http = new Vue()
const article = {
  state: {
    articleList: [],
    articleData: [],
    tabName: '所有文章：'
  },
  mutations: {
    [GET_ARTICLE_LIST_DATA] (state, data) {
      state.articleList = data
    },
    [GET_ARTICLES] (state, data) {
      state.articleData = data
    },
    [CHANGE_TAB] (state, payload) {
      state.tab = payload
    },
    [CHANGE_TABNAME] (state, payload) {
      state.tabName = payload
    }
  },
  actions: {
    async getArticleListData (context, tabid) {
      let res = await Http.$http.get('/apis/getArticleList?tabid=' + tabid)
      await context.commit(GET_ARTICLE_LIST_DATA, res.body)
      if (res.body.length > 0) {
        let ress = await Http.$http.get('/apis/getArticles?id=' + res.body[0].ID)
        await context.commit(GET_ARTICLES, ress.body)
      }
    },
    async getArticles (context, id) {
      let res = await Http.$http.get('/apis/getArticles?id=' + id)
      await context.commit(GET_ARTICLES, res.body)
    }
  }
}
export default article
