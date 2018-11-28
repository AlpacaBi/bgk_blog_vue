import {
  OPEN_MSGINFO_SHOW,
  CLOSE_MSGINFO_SHOW,
  OPEN_MSG_SHOW,
  CLOSE_MSG_SHOW,
  GET_MESSAGE_LIST,
  LOGINFLAG_TRUE,
  LOGINFLAG_FALSE,
  SET_USERDATA
} from './mutation-types'
import Vue from 'vue'
const Http = new Vue()

const message = {
  state: {
    msgShow: false,
    infoShow: false,
    message_data: [],
    loginFlag: false,
    user_data: []
  },
  mutations: {
    [OPEN_MSGINFO_SHOW] (state) {
      state.infoShow = true
    },
    [CLOSE_MSGINFO_SHOW] (state) {
      state.infoShow = false
    },
    [OPEN_MSG_SHOW] (state) {
      state.msgShow = true
    },
    [CLOSE_MSG_SHOW] (state) {
      state.msgShow = false
    },
    [GET_MESSAGE_LIST] (state, data) {
      state.message_data = data
    },
    [LOGINFLAG_TRUE] (state) {
      state.loginFlag = true
    },
    [LOGINFLAG_FALSE] (state) {
      state.loginFlag = false
    },
    [SET_USERDATA] (state, data) {
      state.user_data = data
    }
  },
  actions: {
    async  getMessageList (context) {
      let res = await Http.$http.get('/apis/getMessage')
      await context.commit(GET_MESSAGE_LIST, res.body)
    },
    async  getUserLoginState (context, name, signature) {
      let res = await Http.$http.get('/apis/getUserLogin')
      if (res.body === 'unLogin') {
        await context.commit(LOGINFLAG_FALSE)
      } else {
        await context.commit(SET_USERDATA, res.body)
        await context.commit(LOGINFLAG_TRUE)
        name = await res.body[0].username
        signature = await res.body[0].signature
      }
      let ress = await Http.$http.get('/apis/getMessage')
      await context.commit(GET_MESSAGE_LIST, ress.body)
    },
    async  logout1 (context) {
      await Http.$http.get('/apis/userLogOut')
      await alert('您已注销')
      await context.commit(LOGINFLAG_FALSE)
    },
    async  publishMessage (context, a) {
      let userID = a.id
      let username = a.username
      let avatar = a.avatar
      let message = a.msg
      let url = '/apis/pushMessage'
      let data = 'userID=' + userID + '&username=' + username + '&avatar=' + avatar + '&message=' + message
      await Http.$http.post(url, data)
      await alert('发表成功')
      await context.commit(CLOSE_MSG_SHOW)
      let res = await Http.$http.get('/apis/getMessage')
      await context.commit(GET_MESSAGE_LIST, res.body)
    },
    async  logins (context, a) {
      let username = a.username
      let password = a.password
      console.log(username, password)
      let url = '/apis/userLogin'
      let data = 'username=' + username + '&password=' + password
      await Http.$http.post(url, data)
      let res = await Http.$http.get('/apis/getUserLogin')
      if (res.body === 'unLogin') {
        await context.commit(LOGINFLAG_FALSE)
      } else {
        await context.commit(SET_USERDATA, res.body)
        await context.commit(LOGINFLAG_TRUE)
      }
    },
    async  updateUserInfos (context, a) {
      let id = a.id
      let avatar = a.avatar
      let username = a.username
      let signature = a.signature
      let url = '/apis/updateUserInfo'
      let data = '&id=' + id + '&avatar=' + avatar + '&username=' + username + '&signature=' + signature
      await Http.$http.post(url, data)
      await alert('更改成功！！')
      await await context.commit(CLOSE_MSGINFO_SHOW)
      let res = await Http.$http.get('/apis/getUserLogin')
      if (res.body === 'unLogin') {
        await context.commit(LOGINFLAG_FALSE)
      } else {
        await context.commit(SET_USERDATA, res.body)
      }
    }
  }
}
export default message
