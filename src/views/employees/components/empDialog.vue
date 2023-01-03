<template>
  <!-- 表单 -->
  <el-form ref="formDataRules" label-width="120px" :model="obj" :rules="rules">
    <el-form-item label="姓名" prop="username">
      <el-input v-model="obj.username" style="width:50%" placeholder="请输入姓名" />
    </el-form-item>
    <el-form-item label="手机" prop="mobile">
      <el-input v-model="obj.mobile" style="width:50%" placeholder="请输入手机号" />
    </el-form-item>
    <el-form-item label="入职时间" prop="timeOfEntry">
      <el-date-picker v-model="obj.timeOfEntry" style="width:50%" placeholder="请选择入职时间" />
    </el-form-item>
    <el-form-item label="聘用形式" prop="formOfEmployment">
      <el-select v-model="obj.formOfEmployment" style="width:50%" placeholder="请选择">
        <el-option v-for="item in hireType" :key="item.id" :value="item.id" :label="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="工号" prop="workNumber">
      <el-input v-model="obj.workNumber" style="width:50%" placeholder="请输入工号" />
    </el-form-item>
    <el-form-item label="部门" prop="departmentName">
      <el-input v-model="obj.departmentName" style="width:50%" placeholder="请选择部门" @blur="handleCloseTree" @focus="handleOpenTree" />

      <el-tree v-if="showTree" style="width:50%" :data="selectDepartment" :props="{ label: 'name' }" @node-click="handleNodeClick" />
    </el-form-item>
    <el-form-item label="转正时间" prop="correctionTime">
      <el-date-picker v-model="obj.correctionTime" style="width:50%" placeholder="请选择转正时间" />
    </el-form-item>
    <el-form-item>
      <el-button @click="hCancel">取消</el-button>
      <el-button type="primary" @click="hSubmit">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { listTreeArray } from '@/utils'
import { getDepartmentList } from '@/api/departments'

import employees from '@/constant/employees'
import { addEmployee } from '@/api/employees'
export default {
  name: 'EmployAdd',

  props: {
    show: {
      type: Boolean
    }
  },

  data() {
    return {
      selectDepartment: [],
      obj: {
        username: 'aaa', // 用户名
        mobile: '17611111111', // 手机号
        formOfEmployment: '', // 聘用形式
        workNumber: '111', // 工号
        departmentName: '', // 部门
        timeOfEntry: '', // 入职时间
        correctionTime: '' // 转正时间
      },
      // 树状显示隐藏
      showTree: false,
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          { min: 1, max: 4, message: '用户姓名为1-4位', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [
          { required: true, message: '请选择入职时间', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    hireType() {
      return employees.hireType
    }
  },
  created() {
  },
  methods: {
    // async getSelectDepartment() {
    //   const temp = this.toGetDepartmentList()
    //   console.log(temp)
    //   return temp
    // },
    handleNodeClick(node) {
      console.log(node)
      if (!node.children.length) {
        console.log(111)
        this.obj.departmentName = node.name
        this.showTree = false
      }
    },
    async handleOpenTree() {
      await this.toGetDepartmentList()
      this.showTree = true
    },
    handleCloseTree() {
      // this.showTree = false
    },
    // 获取部门列表
    async toGetDepartmentList() {
      const {
        data: { depts }
      } = await getDepartmentList()

      this.selectDepartment = listTreeArray(depts)
      // return listTreeArray(depts)
    },
    hCancel() {
      this.$emit('update:show', false)
    },
    hSubmit() {
      this.$refs.formDataRules.validate(async valid => {
        if (valid) {
          const { message } = await addEmployee(this.obj)
          this.$message.success(message)
          this.showTree = false

          this.$emit('addSuccess')
          this.$emit('update:show', false)
        }
      })
    }
  }
}
</script>
