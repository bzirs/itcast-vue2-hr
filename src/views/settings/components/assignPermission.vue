<template>
  <div>
    <!-- 权限点数据展示 -->
    <el-tree
      ref="tree"
      show-checkbox
      node-key="id"
      :data="permissionData"
      :props="{ label: 'name' }"
      check-strictly
    />

    <div style="margin-top: 20px; text-align: right">
      <el-button type="primary" @click="handleSubmit">确定</el-button>
      <el-button @click="closeDialog">取消</el-button>
    </div>
  </div>
</template>

<script>
import { getPermissionList } from '@/api/permission'
import { listTreeArray } from '@/utils/index'
import { assignPerm, getRoleDetail } from '@/api/settings'
export default {
  name: 'AssignPermission',
  components: {},
  directives: {},
  props: {
    id: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean
    }
  },
  data() {
    return {
      permissionData: [] // 存储权限数据
    }
  },
  computed: {},
  watch: {
    id(newV) {
      console.log(newV)
      this.getRolePermissionList()
    }
  },

  mounted() {},
  activated() {},
  updated() {},
  async created() {
    await this.loadPermissionList()
    await this.getRolePermissionList()
    this.$emit('update:show', true)
  },
  methods: {
    async loadPermissionList() {
      // 发送请求, 获取权限列表
      const { data } = await getPermissionList()
      console.log('权限列表的数据是', data)
      this.permissionData = listTreeArray(data)
    },
    async getRolePermissionList() {
      // 获取已有权限
      const { data: { permIds }} = await getRoleDetail(this.id)
      this.$refs.tree.setCheckedKeys(permIds)
    },
    async handleSubmit() {
      console.log(this.$refs.tree.getCheckedKeys())
      await assignPerm({
        id: this.id,
        permIds: this.$refs.tree.getCheckedKeys()
      })
      this.$emit('update:show', false)
    },
    closeDialog() {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style scoped lang=''>
</style>
