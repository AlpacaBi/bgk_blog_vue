<template>
  <div>
    <el-menu
      class="el-menu-demo"
      id="navbar-bottom"
      mode="horizontal"
      background-color="#2F4F4F"
      text-color="#fff"
      active-text-color="#00CED1">
      <h6 style="textAlign:center">
        <a style="color:white" href="http://www.miitbeian.gov.cn" target="_blank">
          Copyright©1995-2018 biguokang All rights reserved.备案号：粤ICP备17017545号
        </a>
      </h6>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'NavbarBottom'
}
</script>

<style scoped>
#navbar-bottom{
  position: fixed;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 60px;
}
</style>
