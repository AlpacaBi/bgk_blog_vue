<template>
  <div>
    <el-row>
      <el-col :span="8" :offset="8">
        <img width="100%" height="100%" src="../../images/admin.jpg"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6" :offset="9">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="账号">
            <el-input v-model="form.admin"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.pass"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'BackStage',
  data () {
    return {
      form: {
        name: '',
        pass: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
