<template>
  <div>
      <el-menu
        class="el-menu-demo"
        id="navbar-top"
        router="true"
        mode="horizontal"
        background-color="#2F4F4F"
        text-color="#fff"
        active-text-color="#00CED1">
        <el-menu-item index="home" style="font-size: 25px">毕国康的个人博客Vue版V1.0</el-menu-item>
        <el-menu-item index="home">主页</el-menu-item>
        <el-menu-item index="article">文章</el-menu-item>
        <el-menu-item index="messagebroad">交流区</el-menu-item>
        <el-menu-item index="backstage">后台</el-menu-item>
      </el-menu>
  </div>
</template>

<script>
export default {
  name: 'NavbarTop'
}
</script>

<style scoped>
  #navbar-top{
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    z-index: 10001;
  }
</style>
