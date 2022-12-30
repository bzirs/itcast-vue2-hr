<!--
 * @Author: bzirs
 * @Date: 2022-12-25 10:45:22
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-30 08:42:59
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
              <el-button icon="el-icon-plus" size="small" type="primary">新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table :data="roles">
              <el-table-column type="index" label="序号" width="120" />
              <el-table-column prop="name" label="角色名称" width="240" />
              <el-table-column prop="description" label="描述" />
              <el-table-column label="操作">
                <template v-slot="{row}">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary">编辑</el-button>
                  <el-button size="small" type="danger" @click="hDel(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <el-pagination
                :page-size="pageParams.pagesize"
                layout="prev,pager,next"
                :total="total"
                @current-change="hCurrentChange"
              />
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getRoles, deleteRole } from '@/api/settings'
export default {
  data() {
    return {
      roles: [],
      pageParams: {
        page: 1, // 查询第一页
        pagesize: 2 // 每页两条  --- 要与pagination中page-size一致
      },
      total: 0 // 总的数据条数
    }
  },
  created() {
    this.loadRoles()
  },
  methods: {
    async loadRoles() {
      try {
        const { data } = await getRoles()
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
