<template>
  <div class="employees-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <login-setting />
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <user-info />
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <job-info />
          </el-tab-pane>

        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import LoginSetting from './components/login-setting'
import UserInfo from './components/user-info'
import JobInfo from './components/job-info'
export default {
  name: 'EmployeesDetail',
  components: { JobInfo, LoginSetting, UserInfo },
  directives: {},

  props: {},
  data() {
    return {

    }
  },
  computed: {},
  watch: {},
  async created() {},
  mounted() {},
  activated() {},
  updated() {},
  methods: {}
}
</script>

<style scoped lang=''>
</style>
