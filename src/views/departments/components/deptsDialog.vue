<!--
 * @Author: bzirs
 * @Date: 2022-12-27 10:52:52
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-28 14:46:58
 * @FilePath: /hm-vue2-hr/src/views/departments/components/deptsDialog.vue
 * @Description:
 *
 * Copyright (c) 2022 by bzirs, All Rights Reserved.
-->
<template>
  <el-form ref="deptForm" label-width="120px" :model="form" :rules="formRules">
    <el-form-item label="部门名称" prop="name">
      <el-input v-model="form.name" style="width:80%" placeholder="1-50个字符" />
    </el-form-item>
    <el-form-item label="部门编码" prop="code">
      <el-input v-model="form.code" style="width:80%" placeholder="1-50个字符" />
    </el-form-item>
    <el-form-item label="部门负责人" prop="manager">
      <el-select v-model="form.manager" style="width:80%" placeholder="请选择">
        <el-option v-for="item in options" :key="item.id" :value="item.username" :label="item.username" />
      </el-select>
    </el-form-item>
    <el-form-item label="部门介绍" prop="introduce">
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
    },
    originList: {
      type: Array,
      default: _ => ([])
    }
  },
  data() {
    const customCheck = (rule, value, callback) => {
      // console.log(rule, value)
      // console.log(this.originList)
      const fullField = rule.fullField

      let arr = []
      // 添加部门的name判断

      // 编辑部门的name判断
      if (this.isEdit) {
        // 找到兄弟部门

        // arr = this.originList.filter(item => item.pid === this.deptsId).map(item => item[fullField])
        if (fullField === 'name') {
          const pid = this.originList.find(item => item.id === this.deptsId).pid
          console.log(pid)
          fullField === 'name' && (arr = this.originList.filter(item => item.id !== this.deptsId && item.pid === pid).map(item => item[fullField]))
        } else {
          arr = this.originList.map(item => item[fullField])
        }
      } else {
        if (fullField === 'name') {
          // 找到子部门
          console.log(1111)
          arr = this.originList.filter(item => item.pid === this.deptsId).map(item => item[fullField])
        } else {
          arr = this.originList.map(item => item[fullField])
        }
      }

      console.log(arr, this.deptsId)

      this.isEdit && arr.splice(arr.indexOf(value), 1)

      arr.includes(value) && callback(new Error(value + '已存在'))

      callback()
    }

    return {
      form: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      formRules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: 'blur' },
          { validator: customCheck, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' },
          { validator: customCheck, trigger: 'blur' }

        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 300, message: '部门介绍要求1-300个字符', trigger: 'blur' }
        ]
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
      this.$refs.deptForm.validate(async valid => {
        if (valid) {
          const res = await (this.isEdit ? editDepartmentInfo(this.form) : addDepartment({ ...this.form, pid: this.deptsId }))
          console.log(res)

          this.$emit('update:depts-id', '')
          this.$emit('update:show', false)
          this.$emit('resetGetInfo')
        }
      })
    },
    // 取消事件
    hCancel() {
      this.$emit('update:depts-id', '')
      this.$emit('update:show', false)
      this.$emit('update:isEdit', false)
    }
  }
}
</script>

<style scoped lang=''>
</style>
