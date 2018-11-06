<template>
  <div id="app">
    <el-container>
      <el-header>
        <NavbarTop/>
      </el-header>

      <el-main>
        <router-view/>
      </el-main>

      <el-footer>
        <NavbarBottom/>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import NavbarTop from '@/components/NavbarTop/NavbarTop'
import NavbarBottom from '@/components/NavbarBottom/NavbarBottom'
export default {
  name: 'App',
  components: {
    'NavbarTop': NavbarTop,
    'NavbarBottom': NavbarBottom
  }

}
</script>

<style>
  h1,h2,h3,h4,h5,h6{
    font-weight: normal;
  }
  html {
    overflow-y: scroll;
  }
  :root {
    overflow-y: scroll;
    overflow-x: hidden;
  }
  :root body {
    position: absolute;
  }
  body {
    width: 100vw;
    overflow: hidden;
  }
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: black;
  line-height: 0;
}
</style>
