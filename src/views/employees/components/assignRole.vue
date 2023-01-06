<template>
  <!--  分配角色 -->
  <div>
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="t in roleList" :key="t.id" :label="t.id">{{ t.name }}</el-checkbox>
    </el-checkbox-group>

    <div style="margin-top: 20px; text-align: right">
      <el-button type="primary" @click="hSave">确定</el-button>
      <el-button @click="closeDialog">取消</el-button>
    </div>
  </div>
</template>
<script>
import { assignRoles } from '@/api/employees'
import { getRoles } from '@/api/settings'
import { getUserDetailById } from '@/api/user'

export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      roleIds: [],
      roleList: [],
      checkList: []
    }
  },
  created() {
    this.getRoleList()
    this.loadUserDetailById()
    // this.$emit('update:show', true)
  },
  methods: {
    async getRoleList() {
      const { data: { rows }} = await getRoles(1, 10)
      // console.log(rows)
      this.roleList = rows
    },
    closeDialog() {

    },
    async loadUserDetailById() {
      const { data: { roleIds }} = await getUserDetailById(this.id)
      this.roleIds = roleIds
    },
    // 保存当前角色信息
    async hSave() {
      const res = await assignRoles({ id: this.id, roleIds: this.roleIds })
      console.log('保存角色', res)
      this.$emit('update:show', false)
    }
  }
}
</script>
