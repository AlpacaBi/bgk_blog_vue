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
import {mapState, mapActions, mapMutations} from 'vuex'
import {CHANGE_TAB, CHANGE_TABNAME} from '../../store/mutation-types'
export default {
  name: 'Article',
  data () {
    return {
      tab: 'all'
    }
  },
  methods: {
    ...mapMutations([CHANGE_TAB], [CHANGE_TABNAME]),
    ...mapActions(['getArticleListData', 'getArticles']),
    handleClick () {
      switch (this.tab) {
        case 'all':
          this.$store.commit(CHANGE_TABNAME, '所有文章：')
          break
        case 'javascript':
          this.$store.commit(CHANGE_TABNAME, 'javascript和es6：')
          break
        case 'java':
          this.$store.commit(CHANGE_TABNAME, 'java和java框架：')
          break
        case 'htmlcss':
          this.$store.commit(CHANGE_TABNAME, 'html&css：')
          break
        case 'react':
          this.$store.commit(CHANGE_TABNAME, 'react：')
          break
        case 'vue':
          this.$store.commit(CHANGE_TABNAME, 'vue：')
          break
        case 'angular':
          this.$store.commit(CHANGE_TABNAME, 'angular：')
          break
        case 'cpp':
          this.$store.commit(CHANGE_TABNAME, 'C和C++：')
          break
        case 'hardware':
          this.$store.commit(CHANGE_TABNAME, '硬件：')
          break
        case 'other':
          this.$store.commit(CHANGE_TABNAME, '其他杂碎：')
          break
      }
      this.getArticleListData(this.tab)
    }
  },
  computed: {
    ...mapState({
      articleList: state => state.article.articleList,
      articleData: state => state.article.articleData,
      tabName: state => state.article.tabName
    })
  },
  created () {
    this.getArticleListData('all')
  }
}
</script>

<style scoped>
</style>
