<template>
  <div>
    <el-row>
    <h1 style="font-size: 40px">个人动态&&交流区：</h1><hr/>
    </el-row>

    <el-row>
      <el-col :span="4" :offset="1" v-if="loginFlag == false">
        <img src="../../images/who.jpg" width="100%" height="100%"/>
        <br/><br/>
        <el-form ref="login" :model="login" label-width="80px" label-position="top">
          <el-form-item label=" ">
            <el-input v-model="login.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="password" v-model="login.pass" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" width="100%" size="medium" @click="login1" round>登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4" :offset="1" v-else>
        <img :src="getAvator(this.user_data[0].avatar)" width="100%" height="100%"/>
        <br/><br/>
        <h3>{{this.user_data[0].username}}</h3>
        <h4>{{this.user_data[0].email}}</h4>
        <h5 style="color: grey; line-height: 1;">{{this.user_data[0].signature}}</h5>
        <el-button type="primary" width="100%" size="medium" @click="msgShow = true" round>写留言</el-button>
        <el-button type="info"
                   width="100%"
                   size="medium"
                   @click="infoShow = true
                           this.info.name = this.user_data[0].username
                           this.info.summary = this.user_data[0].signature"
                   round>更改个人信息</el-button>
        <el-button type="danger" width="100%" size="medium" @click="logout1" round>注销</el-button>
      </el-col>
      <el-col :span="17" :offset="1">
        <div  v-for="item in message_data" :key="item.ID">
        <el-row>
          <el-col :span="2">
            <div style="float:left"><img :src="getAvator(item.user_avatar)" width="100%" height="100%"/></div>
          </el-col>
          <el-col :span="22">
            <div style="float:left; padding-left:15px;word-wrap:break-word; word-break:break-all; overflow: hidden;">
              <h3>{{item.user_name}}：</h3>
              <h4 style="line-height: 1;">{{item.message}}</h4>
              <p style="color:grey;font-size: 10px">发表于：{{item.push_time}}</p>
            </div>
          </el-col>
        </el-row>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="写留言" :visible.sync="msgShow">
      <el-form :model="message">
        <el-form-item label="正文" label-width="120px">
          <el-input type="textarea" v-model="message.text" auto-complete="off" height="150"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="publishMessage">发送</el-button>
      </div>
    </el-dialog>
    <el-dialog title="更改信息" :visible.sync="infoShow" :before-close="handleClose">
      <el-form :model="info">
        <el-form-item label="更改用户名" label-width="120px">
            <el-input v-model="info.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="更改个性签名" label-width="120px">
          <el-input v-model="info.summary" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateUserInfo()">确定更改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import forge from 'node-forge'
export default {
  name: 'MessageBroad',
  data () {
    return {
      message_data: [],
      login: {
        name: '',
        pass: ''
      },
      message: {
        text: ''
      },
      info: {
        name: '',
        summary: ''
      },
      loginFlag: false,
      user_data: [],
      msgShow: false,
      infoShow: false
    }
  },
  methods: {
    getMessageList () {
      this.$http.get('/apis/getMessage')
        .then(result => {
          this.message_data = result.body
        })
    },
    getUserLoginState () {
      this.$http.get('/apis/getUserLogin')
        .then(result => {
          if (result.body === 'unLogin') {
            this.loginFlag = false
          } else {
            this.user_data = result.body
            this.info.name = this.user_data[0].username
            this.info.summary = this.user_data[0].signature
            this.loginFlag = true
          }
        }).then(() => this.getMessageList())
    },
    login1 () {
      let md = forge.md.md5.create()
      md.update('苟利国家生死以' + this.login.pass + '岂因祸福避趋之')
      this.login.pass = md.digest().toHex()
      let url = '/apis/userLogin'
      let data = 'username=' + this.login.name + '&password=' + this.login.pass
      this.$http.post(url, data).then(
        this.getUserLoginState
      )
    },
    logout1 () {
      this.$http.get('/apis/userLogOut')
        .then(
          alert('您已注销')
        ).then(
          this.getUserLoginState
        )
    },
    getAvator (avatorString) {
      let avator
      switch (avatorString) {
        case 'alpaca1':avator = 'static/avatar/alpaca1.png'
          break
        case 'alpaca2':avator = 'static/avatar/alpaca2.png'
          break
        case 'alpaca3':avator = 'static/avatar/alpaca3.png'
          break
        case 'alpaca4':avator = 'static/avatar/alpaca4.png'
          break
        case 'alpaca5':avator = 'static/avatar/alpaca5.png'
          break
        case 'alpaca6':avator = 'static/avatar/alpaca6.png'
          break
        case 'pic_touxiang':avator = 'static/touxiang.png'
          break
      }
      return avator
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.info.name = this.user_data[0].username
          this.info.summary = this.user_data[0].signature
          done()
        })
        .catch(_ => {})
    },
    updateUserInfo () {
      let id = this.user_data[0].ID
      let avatar = this.user_data[0].avatar
      let url = '/apis/updateUserInfo'
      let data = '&id=' + id + '&avatar=' + avatar + '&username=' + this.info.name + '&signature=' + this.info.summary

      this.$http.post(url, data).then(() => {
        alert('更改成功！！')
      }).then(this.infoShow = false).then(this.getUserLoginState)
    },
    publishMessage () {
      let userID = this.user_data[0].ID
      let username = this.user_data[0].username
      let avatar = this.user_data[0].avatar
      let message = this.message.text

      let url = '/apis/pushMessage'
      let data = 'userID=' + userID + '&username=' + username + '&avatar=' + avatar + '&message=' + message
      this.$http.post(url, data).then(() => {
        alert('发表成功！！')
      }).then(this.msgShow = false).then(this.getMessageList)
    }
  },
  created () {
    this.getUserLoginState()
  }
}
</script>

<style scoped>

</style>
