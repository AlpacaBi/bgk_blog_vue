<template>
  <div>
    <el-row>
    <el-tabs v-model="tab" type="card" @tab-click="handleClick" stretch="true">
      <el-tab-pane label="所有文章" name="all"><b>所有文章</b></el-tab-pane>
      <el-tab-pane label="javascript和es6" name="javascript">javascript和es6</el-tab-pane>
      <el-tab-pane label="java和java框架" name="java">java和java框架</el-tab-pane>
      <el-tab-pane label="html&css" name="htmlcss">html&css</el-tab-pane>
      <el-tab-pane label="react" name="react">react</el-tab-pane>
      <el-tab-pane label="vue" name="vue">vue</el-tab-pane>
      <el-tab-pane label="angular" name="angular">angular</el-tab-pane>
      <el-tab-pane label="C和C++" name="cpp">C和C++</el-tab-pane>
      <el-tab-pane label="硬件" name="hardware">硬件</el-tab-pane>
      <el-tab-pane label="其它杂碎" name="other">其它杂碎</el-tab-pane>
    </el-tabs>
    </el-row>
    <el-row :gutter="20" v-if="articleList.length>0">
      <el-col :sm="6">
        <div>
          <h1 style="font-size: 20px">{{tabName}}</h1><hr/>
        </div>
        <div v-for="item in articleList" :key="item.ID"  @click="getArticles(item.ID)">
          <el-card class="box-card" shadow="hover" height="40px">
            <div >
              <div>{{item.article_title}}</div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :sm="16">
        <h1 style="font-size: 40px">博客正文：</h1><hr/>
        <h1>{{articleData[0].article_title}}</h1><br/>
        <h5>发表于：{{articleData[0].article_push_time}}</h5><br/>
        <h4 style="line-height:1;">{{articleData[0].article_summary}}</h4><br/><br>
        <h3 v-html="articleData[0].article_context" style="line-height:1;"></h3>
      </el-col>
    </el-row>
    <el-row :gutter="20" v-else>
      nothing
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Article',
  data () {
    return {
      tab: 'all',
      tabName: '所有文章：',
      articleList: [],
      articleData: []
    }
  },

  methods: {
    handleClick () {
      switch (this.tab) {
        case 'all':
          this.tabName = '所有文章：'
          break
        case 'javascript':
          this.tabName = 'javascript和es6：'
          break
        case 'java':
          this.tabName = 'java和java框架：'
          break
        case 'htmlcss':
          this.tabName = 'html&css：'
          break
        case 'react':
          this.tabName = 'react：'
          break
        case 'vue':
          this.tabName = 'vue：'
          break
        case 'angular':
          this.tabName = 'angular：'
          break
        case 'cpp':
          this.tabName = 'C和C++：'
          break
        case 'hardware':
          this.tabName = '硬件：'
          break
        case 'other':
          this.tabName = '其他杂碎：'
          break
      }
      this.getArticleListData(this.tab)
    },
    getArticleListData (tabid) {
      this.$http.get('/apis/getArticleList?tabid=' + tabid)
        .then(result => {
          this.articleList = result.body
          console.log(this.articleList.length)
          if (this.articleList.length > 0) {
            this.getArticles(this.articleList[0].ID)
          } else {
            console.log('none')
            this.articleData = []
            this.articleList = []
            console.log(this.articleList)
            console.log(this.articleData)
          }
        })
    },
    getArticles (id) {
      this.$http.get('/apis/getArticles?id=' + id)
        .then(result => {
          this.articleData = result.body
        })
    }
  },
  created () {
    this.getArticleListData('all')
  }
}
</script>

<style scoped>
</style>
