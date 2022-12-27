<!--
 * @Author: bzirs
 * @Date: 2022-12-27 10:52:52
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-27 16:54:27
 * @FilePath: /hm-vue2-hr/src/views/departments/components/deptsDialog.vue
 * @Description:
 *
 * Copyright (c) 2022 by bzirs, All Rights Reserved.
-->
<template>
  <el-form ref="deptForm" label-width="120px">
    <el-form-item label="部门名称">
      <el-input v-model="form.name" style="width:80%" placeholder="1-50个字符" />
    </el-form-item>
    <el-form-item label="部门编码">
      <el-input v-model="form.code" style="width:80%" placeholder="1-50个字符" />
    </el-form-item>
    <el-form-item label="部门负责人">
      <el-select v-model="form.manager" style="width:80%" placeholder="请选择">
        <el-option v-for="item in options" :key="item.id" :value="item.username" :label="item.username" />
      </el-select>
    </el-form-item>
    <el-form-item label="部门介绍">
      <el-input v-model="form.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="small" @click="hSubmit">确定</el-button>
      <el-button size="small" @click="hCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getEmployeesInfo } from '@/api/employees'
import { addDepartment, getDepartmentInfo, editDepartmentInfo } from '@/api/departments'
export default {
  name: 'DeptsDialog',
  components: {},
  directives: {},
  props: {
    deptsId: {
      type: String,
      required: true
    },
    show: {
      type: Boolean
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      options: []
    }
  },
  computed: {},
  watch: {},
  async created() {
    this.loadEmployees()

    this.isEdit && this.getEditDepts()
  },
  mounted() {},
  activated() {},
  updated() {},
  methods: {
    // 编辑部门数据回显
    async getEditDepts() {
      console.log(this.deptsId)
      const { data } = await getDepartmentInfo(this.deptsId)
      // this.$emit('update:show', true)
      console.log(data)
      this.form = data
    },
    // 获取员工信息
    async loadEmployees() {
      const { data } = await getEmployeesInfo()
      this.options = data
    },
    // 确定事件
    async hSubmit() {
      const res = await (this.isEdit ? editDepartmentInfo(this.form) : addDepartment({ ...this.form, pid: this.deptsId }))
      console.log(res)

      this.$emit('update:depts-id', '')
      this.$emit('update:show', false)
      this.$emit('resetGetInfo')
    },
    // 取消事件
    hCancel() {
      this.$emit('update:depts-id', '')
      this.$emit('update:show', false)
    }
  }
}
</script>

<style scoped lang=''>
</style>
