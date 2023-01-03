<template>
  <!--  分配角色 -->
  <div>
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="t in roleList" :key="t.id" :label="t.id">{{ t.name }}</el-checkbox>
    </el-checkbox-group>

    <div style="margin-top: 20px; text-align: right">
      <el-button type="primary">确定</el-button>
      <el-button @click="closeDialog">取消</el-button>
    </div>
  </div>
</template>
<script>
import { getRoles } from '@/api/settings'
export default {
  data() {
    return {
      roleIds: [],
      roleList: [],
      checkList: []
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { data: { rows }} = await getRoles(1, 10)
      console.log(rows)
      this.roleList = rows
    },
    closeDialog() {

    }
  }
}
</script>
