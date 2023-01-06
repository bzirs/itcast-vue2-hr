<!--
 * @Author: bzirs
 * @Date: 2022-12-25 10:45:22
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-30 09:23:03
 * @FilePath: /hm-vue2-hr/src/views/settings/index.vue
 * @Description:
 *
 * Copyright (c) 2022 by bzirs, All Rights Reserved.
-->
<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height:60px">
              <el-button icon="el-icon-plus" size="small" type="primary" @click="showDialog = true">新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table :data="roles">
              <el-table-column type="index" label="序号" width="120" />
              <el-table-column prop="name" label="角色名称" width="240" />
              <el-table-column prop="description" label="描述" />
              <el-table-column label="操作">
                <template v-slot="{row}">
                  <el-button size="small" type="success" @click="hAssign(row.id)">分配权限</el-button>
                  <el-button size="small" type="primary" @click="hEdit(row)">编辑</el-button>
                  <el-button size="small" type="danger" @click="hDel(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <el-pagination
                :page-size="pageParams.pagesize"
                :current-page="pageParams.page"
                layout="prev,pager,next"
                :total="total"
                @current-change="hCurrentChange"
              />
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-card>

      <!-- 新增弹框 -->
      <el-dialog :title="cTitle" :close-on-click-modal="false" :close-on-press-escape="false" :visible.sync="showDialog">
        <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="100px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleForm.name" />
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="roleForm.description" />
          </el-form-item>
        </el-form>
        <!-- 底部 -->
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small">取消</el-button>
            <el-button size="small" type="primary" @click="hSubmit">确定</el-button>
          </el-col>
        </el-row>
      </el-dialog>
      <!-- 分配权限的弹层 -->
      <el-dialog title="分配权限(一级为路由页面查看权限-二级为按钮操作权限)" :visible.sync="showDialogAssign">
        <assign-permission :id="id" :show.sync="showDialogAssign" />
      </el-dialog></div>
  </div>
</template>

<script>
import { getRoles, deleteRole, addRole, updateRole } from '@/api/settings'
import assignPermission from './components/assignPermission.vue'

export default {
  components: { assignPermission },
  data() {
    return {
      showDialogAssign: false, // 分配权限对话框
      roles: [],
      pageParams: {
        page: 1, // 查询第一页
        pagesize: 2 // 每页两条  --- 要与pagination中page-size一致
      },
      total: 0, // 总的数据条数
      showDialog: false,
      roleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      },
      isEdit: false, // 是否是编辑
      id: ''
    }
  },
  computed: {
    cTitle() {
      return this.isEdit ? '编辑角色' : '新增角色'
    }
  },
  created() {
    this.loadRoles()
  },
  methods: {
    hAssign(id) {
      this.id = id
      this.showDialogAssign = true
    },
    hEdit({ id, name, description }) {
      // 1. 把当前的数据直接给表单
      // this.roleForm = row
      // this.roleForm = { id: row.id, name: row.name, description: row.description }
      this.roleForm = { id, name, description }
      // 2. 显示弹层
      this.showDialog = true
      // console.log(row)
      // this.roleForm = {...row}

      // 3. 设为编辑状态
      this.isEidt = true
    },
    // 用户点击了编辑
    async doEdit() {
      try {
        const res = await updateRole(this.roleForm)
        console.log(res)

        this.loadRoles()
        this.$message.success('编辑成功')
        this.showDialog = false
      } catch (err) {
        this.$message.error('编辑失败')
        console.log(err)
      }
    },
    async doAdd() {
      try {
        const res = await addRole(this.roleForm)
        console.log(res)

        this.showDialog = false
        this.total++

        this.pageParams.page = Math.ceil(this.total / this.pageParams.pagesize)

        this.loadRoles()
        this.$message.success('添加成功')
        this.showDialog = false
      } catch (err) {
        this.$message.error('添加失败')
        console.log(err)
      }
    },
    // 用户点击了保存
    hSubmit() {
      this.$refs.roleForm.validate(valid => {
        if (valid) {
          // 做具体的添加动作
          this.doAdd()
        }
      })
    },
    async loadRoles() {
      try {
        const { data } = await getRoles(this.pageParams)
        this.roles = data.rows
        this.total = data.total
      } catch (err) {
        console.log(err)
      }
    },
    // 用户点击了页码
    hCurrentChange(curPage) {
      // alert(curPage)
      // 1. 更新页码
      this.pageParams.page = curPage
      // 2. 重发请求
      this.loadRoles()
    },
    async doDel(id) {
      try {
        const res = await deleteRole(id)
        console.log(res)
        // 1. 提示
        this.$message.success('删除成功')

        if (this.roles.length === 1) {
          this.pageParams.page--
          if (this.pageParams.page <= 0) {
            this.pageParams.page = 1
          }
        }
        // 2. 重新请求
        this.loadRoles()
      } catch (err) {
        console.log(err)
        this.$message.error('删除失败')
      }
    },
    // 用户点击了删除
    hDel(id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.doDel(id)
      }).catch((err) => {
        console.log(err)
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
