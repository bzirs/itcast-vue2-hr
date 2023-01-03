<template>
  <div class="permission-container">
    <div class="app-container">
      <!-- 表格 -->
      <el-card>
        <div style="text-align: right; margin-bottom: 20px">
          <el-button type="primary" size="small" @click="handleAdd(1,'0')">添加权限</el-button>
        </div>
        <el-table border :data="list" row-key="id">
          <el-table-column label="名称" prop="name" />
          <el-table-column label="标识" prop="code" />
          <el-table-column label="描述" prop="description" />
          <el-table-column label="操作">
            <template #default="{ row }">
              <!-- type为1时为页面级访问权限，它可以继续做添加： 设置页面下边某个功能是否可以操作 -->
              <!-- type为2时为按钮级别的访问权限，它就不能再继续细分了，它就没有添加了 -->
              <el-button v-if="row.type === 1" type="text" @click="handleAdd(2,row.id)">添加</el-button>
              <el-button type="text" @click="handleEdit(row.id)">编辑</el-button>
              <el-button type="text" @click="handleRemove(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <!-- 弹框 -->
      <el-dialog v-if="showDialog" :visible.sync="showDialog" title="弹层标题" @close="close">
        <!-- 表单内容 -->
        <el-form label-width="100px">
          <el-form-item label="权限名称">
            <el-input v-model="formData.name" />
          </el-form-item>
          <el-form-item label="权限标识">
            <el-input v-model="formData.code" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="formData.description" />
          </el-form-item>
          <el-form-item label="权限启用">
            <el-switch
              v-model="formData.enVisible"
              active-text="启用"
              active-value="1"
              inactive-text="不启用"
              inactive-value="0"
            />
          </el-form-item>
        </el-form>

        <template #footer>
          <div style="text-align: right;">
            <el-button @click="showDialog = false">取消</el-button>
            <el-button type="primary" @click="handleSubmit">确定</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getPermissionDetail, updatePermission, getPermissionList, addPermission, delPermission } from '@/api/permission'
import { listTreeArray } from '@/utils'

export default {
  name: 'Permission',
  data() {
    return {
      list: [],
      showDialog: false, // 是否显示弹层
      formData: {
        name: '', // 名称
        code: '', // 权限标识
        description: '', // 描述
        enVisible: '0', // 开启
        pid: '', // 添加到哪个节点下
        type: '' // 类型
      },
      isEdit: false
    }
  },
  created() {
    this.loadPermissionList()
  },
  methods: {

    close() {
      this.formData = {}
    },
    async loadPermissionList() {
      const { data } = await getPermissionList()
      // console.log('从后端获取的数据的是', res)

      this.list = listTreeArray(data)
    },
    // 添加
    handleAdd(type, id) {
      this.showDialog = true
      this.formData.type = type
      this.formData.pid = id
      this.isEdit = false
    },
    // 编辑
    async handleEdit(id) {
      this.showDialog = true
      const { data } = await getPermissionDetail(id)
      console.log(data)
      this.formData = data
      this.isEdit = true
    },
    async handleSubmit() {
      try {
        const { data } = await (this.isEdit ? updatePermission(this.formData) : addPermission(this.formData))
        console.log(data)
        this.loadPermissionList()
        this.$message.success(this.isEdit ? '编辑成功' : '添加成功')

        this.showDialog = false
        this.formData = {}
      } catch (error) {
        console.log(error)
      }
    },
    // 删除
    async handleRemove(id) {
      try {
        await this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await delPermission(id)

        this.$message.success('删除权限成功')
        this.showDialog = false
        this.loadPermissionList()
      } catch (error) {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    }
  }
}
</script>
