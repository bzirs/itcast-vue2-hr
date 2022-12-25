<!--
 * @Author: bzirs
 * @Date: 2022-12-25 10:24:15
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-25 17:55:34
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
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <!-- 架构 -->
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick">
          <template v-slot="{ data }">
            <el-row type="flex" justify="space-between" align="middle" style="height: 40px; width: 100%;">
              <el-col :span="20">
                <svg-icon icon-class="home" />
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
                        <el-dropdown-item>添加子部门</el-dropdown-item>
                        <el-dropdown-item>编辑部门</el-dropdown-item>
                        <el-dropdown-item>删除部门</el-dropdown-item>
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
  </div>
</template>

<script>
import { getDepartmentList } from '@/api/departments'
export default {
  name: 'DepartmentsPage',
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  async created() {
    await this.toGetDepartmentList()
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
    // 获取部门列表
    async toGetDepartmentList() {
      const { data: { depts }} = await getDepartmentList()
      console.log(depts)
      this.data = depts
    }

  }
}
</script>
