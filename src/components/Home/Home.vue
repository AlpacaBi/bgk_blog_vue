<template>
  <div>
    <el-row>
        <el-carousel :interval="4000" type="card" :height="bannerH +'px'">
          <el-carousel-item>
            <img src="../../images/carousel/react.png" width="100%" height="100%"/>
          </el-carousel-item>
          <el-carousel-item>
            <img src="../../images/carousel/react-redux.png" width="100%" height="100%"/>
          </el-carousel-item>
          <el-carousel-item>
            <img src="../../images/carousel/react-bootstrap.png" width="100%" height="100%"/>
          </el-carousel-item>
          <el-carousel-item>
            <img src="../../images/carousel/react-router.png" width="100%" height="100%"/>
          </el-carousel-item>
          <el-carousel-item>
            <img src="../../images/carousel/express.png" width="100%" height="100%"/>
          </el-carousel-item>
          <el-carousel-item>
            <img src="../../images/carousel/brafteditor.png" width="100%" height="100%"/>
          </el-carousel-item>
        </el-carousel>
      <h4 style="text-align: center">↑本博客系统开发用到的框架和组件↑</h4>
    </el-row>
    <el-row :gutter="30">
      <el-col :sm="4" :offset="2">
        <img src="../../images/touxiang.png" width="100%" height="100%"/>
        <h3 style="font-size: 30px">Alpaca Bi</h3>
        <h5 style="color:grey; line-height: 1;">talk and code is cheap，show me the money</h5>
        <el-button type="primary" @click="open_info_show">联系本人</el-button>
        <el-button type="success" @click="open_money_show">给我打钱</el-button>
      </el-col>
      <el-col :sm="12">
        <h1 style="font-size: 36px">最新文章：</h1>
        <el-collapse  accordion>
          <div v-for="item in newslist" :key="item.ID">
          <el-collapse-item :title="item.article_title">
            <div>{{item.article_summary}}</div><br/>
            <div>发表于：{{item.article_push_time}}</div>
          </el-collapse-item>
          </div>
        </el-collapse>
      </el-col>
    </el-row>
    <el-dialog
      title="联系方式"
      :visible.sync="infoShow"
      width="40%">
      <span style="font-size: 20px">
        <h3>联系微信：</h3>
        <p><b>workbiguokang</b></p>
        <br/>
        <h3>联系邮箱：</h3>
        <p><b>biguokang@outlook.com</b></p>
        <br/>
        <h3>github地址</h3>
        <p><a href="https://github.com/biguokang" target="_blank"><b>https://github.com/biguokang</b></a></p>
      </span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="close_info_show">取 消</el-button>
    <el-button type="primary" @click="close_info_show">确 定</el-button>
  </span>
    </el-dialog>

    <el-dialog
      title="Would you like to give 0.01 dollar to help put a hamster through college?"
      :visible.sync="moneyShow"
      width="40%">
      <span>
        <img src="../../images/pay.png" width="100%" height="100%">
      </span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="close_money_show">取 消</el-button>
    <el-button type="primary" @click="close_money_show">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>

import {mapState, mapActions, mapMutations} from 'vuex'
import {OPEN_INFO_SHOW, CLOSE_INFO_SHOW, OPEN_MONEY_SHOW, CLOSE_MONEY_SHOW} from '../../store/mutation-types'

export default {
  name: 'Home',
  data () {
    return {
      bannerH: 500
    }
  },
  methods: {
    ...mapMutations([OPEN_INFO_SHOW], [CLOSE_INFO_SHOW], [OPEN_MONEY_SHOW], [CLOSE_MONEY_SHOW]),
    ...mapActions(['getNewsList']),
    setBannerH () {
      this.bannerH = document.body.clientWidth / 6
    },
    open_info_show () {
      this.$store.commit(OPEN_INFO_SHOW)
    },
    close_info_show () {
      this.$store.commit(CLOSE_INFO_SHOW)
    },
    open_money_show () {
      this.$store.commit(OPEN_MONEY_SHOW)
    },
    close_money_show () {
      this.$store.commit(CLOSE_MONEY_SHOW)
    }
  },
  computed: {
    ...mapState({
      newslist: state => state.home.newslist,
      infoShow: state => state.home.infoShow,
      moneyShow: state => state.home.moneyShow
    })
  },
  mounted () {
    this.setBannerH()
    window.addEventListener('resize', () => {
      this.setBannerH()
    }, false)
  },
  created () {
    this.getNewsList()
  }
}
</script>

<style scoped>
</style>
