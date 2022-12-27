<!--
 * @Author: bzirs
 * @Date: 2022-12-25 10:24:15
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-27 19:56:35
 * @FilePath: /hm-vue2-hr/src/views/departments/index.vue
 * @Description:
 *
 * Copyright (c) 2022 by bzirs, All Rights Reserved.
-->
<template>
  <div class="department-container">
    <div class="app-container">
      <el-card>
        <!-- 用一个行列布局 -->
        <el-row type="flex" justify="space-between" align="middle" style="height: 40px">
          <el-col :span="20">
            <svg-icon icon-class="home" />
            <span>江苏传智播客教育科技股份有限公司</span>
          </el-col>
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <!-- 两个内容 -->
              <el-col>负责人</el-col>
              <!-- 下拉菜单 element -->
              <el-col>
                <el-dropdown>
                  <span>
                    操作
                    <i class="el-icon-arrow-down" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="toChangeDialog('')">添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <!-- 架构 -->
        <el-tree :data="data" default-expand-all :props="defaultProps" icon-class=" " @node-click="handleNodeClick" @node-expand="changeIcon">
          <!--  eslint-disable-next-line vue/no-template-shadow -->
          <template v-slot="{ data, node }">
            <el-row type="flex" justify="space-between" align="middle" style="height: 40px; width: 100%;">
              <el-col :span="20">
                <svg-icon v-if="!data.children.length" icon-class="eye-open" />
                <svg-icon v-else :icon-class="node.expanded ? 'eye-open' : 'eye'" />
                <span>{{ data.name }}</span>
              </el-col>
              <el-col :span="4">
                <el-row type="flex" justify="end">
                  <!-- 两个内容 -->
                  <el-col>{{ data.manager }}</el-col>
                  <!-- 下拉菜单 element -->
                  <el-col>
                    <el-dropdown>
                      <span>
                        操作
                        <i class="el-icon-arrow-down" />
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="toChangeDialog(data.id)">添加子部门</el-dropdown-item>
                        <el-dropdown-item @click.native="handleEdit(data.id)">编辑部门</el-dropdown-item>
                        <el-dropdown-item v-if="!data.children.length" @click.native="handleRemove(data.id)">删除部门</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-tree>
      </el-card>
    </div>

    <!-- 弹框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" :close-on-press-escape="false" width="30%" :before-close="handleClose" :close-on-click-modal="false">
      <depts-dialog v-if="dialogVisible" :is-edit.sync="isEdit" :depts-id.sync="deptsId" :show.sync="dialogVisible" @resetGetInfo="toGetDepartmentList" />
    </el-dialog>
  </div>
</template>

<script>
import { getDepartmentList, removeDepartment } from '@/api/departments'
import { listTreeArray } from '@/utils'
import DeptsDialog from '@/views/departments/components/deptsDialog.vue'
export default {
  name: 'DepartmentsPage',
  components: {
    DeptsDialog
  },
  data() {
    return {
      // 弹框flag
      dialogVisible: false,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // 部门id
      deptsId: '',

      // 是否是编辑部门
      isEdit: false
    }
  },
  async created() {
    await this.toGetDepartmentList()
  },
  methods: {
    // 改变tree图标
    changeIcon(obj, node, data) {
      console.log(obj, node, data)
    },
    // 关闭弹框
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 删除部门
    async handleRemove(id) {
      try {
        await this.$confirm('确认要删除部门吗？一经删除不可复原', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

        this.doRemoveDepts(id)
      } catch (error) {
        console.log(error)
      }
    },
    // 编辑部门
    handleEdit(id) {
      console.log(111)
      this.isEdit = true
      this.dialogVisible = true
      this.deptsId = id
    },
    // 删除部门请求
    async doRemoveDepts(id) {
      const res = await removeDepartment(id)
      console.log(res)
      this.toGetDepartmentList()
    },
    handleNodeClick(data) {
      // console.log(data)
    },
    // 获取部门列表
    async toGetDepartmentList() {
      const {
        data: { depts }
      } = await getDepartmentList()
      this.data = listTreeArray(depts)
    },
    // 打开弹出框
    toChangeDialog(id) {
      this.deptsId = id
      this.dialogVisible = true
    }
  }
}
</script>
