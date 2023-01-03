<template>
  <el-form
    ref="userForm"
    :rules="rules"
    :model="userInfo"
    label-width="120px"
    style="margin-left: 120px; margin-top: 30px"
  >
    <el-form-item label="姓名:" prop="username">
      <el-input v-model="userInfo.username" style="width: 300px" />
    </el-form-item>
    <el-form-item label="密码:" prop="password">
      <el-input v-model="userInfo.password" style="width: 300px" type="password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="hSave">更新</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { getUserDetailById } from '@/api/user'
export default {
  data() {
    return {
      userInfo: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '用户名不能为空', triggler: 'blur' }],
        password: [{ required: true, message: '密码不能为空', triggler: 'blur' }]
      }
    }
  },
  created() {
    this.loadUserDetailById()
  },
  methods: {
    async loadUserDetailById() {
      const res = await getUserDetailById(this.$route.params.id)
      console.log('loadUserDetailById......', res)
      const { username, password } = res.data
      this.userInfo = { username, password }
    },
    hSave() {
      this.$refs.userForm.validate(valid => {
        // valid && this.doEdit()
      })
    }
  }
}
</script>
