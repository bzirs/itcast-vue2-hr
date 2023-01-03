<template>
  <div class="user-info">
    <!-- 个人信息 -->
    <el-form ref="userForm" :model="userInfo" label-width="220px">
      <!--手机 -->
      <el-row class="inline-info">
        <el-col :span="12">
          <el-form-item label="手机">
            <el-input v-model="userInfo.mobile" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 工号 入职时间 -->
      <el-row class="inline-info">
        <el-col :span="12">
          <el-form-item label="入职时间">
            <el-date-picker v-model="userInfo.timeOfEntry" type="date" class="inputW" value-format="yyyy-MM-dd" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 员工照片 -->
      <el-row class="inline-info">
        <el-col :span="12">
          <el-form-item label="员工头像">
            <!-- <img :src="userInfo.staffPhoto"> -->
            <!-- 放置上传图片 -->
            <upload-img ref="staffPhoto" v-model="userInfo.staffPhoto" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 保存个人信息 -->
      <el-row class="inline-info" type="flex" justify="center">
        <el-col :span="12">
          <el-button type="primary" @click="hSave">保存更新</el-button>
          <el-button @click="$router.back()">返回</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { getUserDetailById } from '@/api/user.js'
import { saveUserDetailById } from '@/api/employees.js'
export default {
  data() {
    return {
      userInfo: {
        id: this.$route.params.id,
        mobile: '',
        timeOfEntry: ''
      }
    }
  },
  created() {
    this.loadUserDatailById()
  },
  methods: {
    async loadUserDatailById() {
      const res = await getUserDetailById(this.userInfo.id)
      console.log('获取个人信息', res)
      this.userInfo = res.data
    },
    async doSave() {
      try {
        const res = await saveUserDetailById(this.userInfo)
        console.log('保存个人信息之后的结果是', res)
        // 1. 提示
        this.$message.success('保存成功')
        // 2. 回到列表页
        this.$router.back()
      } catch (err) {
        this.$message.error(err.message)
      }
    },
    hSave() {
      this.$refs.userForm.validate(valid => {
        // valid && this.doSave()
        console.log(this.$route.params.id === this.$store.getters.userId)
        // valid && this.$store.dispatch('user/toGetUserInfo')
        if (valid) {
          this.doSave()

          ; (this.$route.params.id === this.$store.getters.userId) && this.$store.dispatch('user/toGetUserInfo')
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.user-info {
  padding-top: 20px;
}
</style>
