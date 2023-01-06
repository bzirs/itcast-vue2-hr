<template>
  <div class="employees-container">
    <div class="app-container">
      <page-tools>
        <template #left>
          <span>总记录数: {{ total }} 条</span>
        </template>
        <template #right>
          <el-button type="warning" size="small" @click="$router.push('/import')">excel导入</el-button>
          <el-button v-allow="'export-excel'" type="danger" size="small" @click="handleDownload">excel导出</el-button>
          <el-button type="primary" size="small" @click.native="addClick">新增员工</el-button>
        </template>
      </page-tools>

      <el-card style="margin-top: 10px;">
        <el-table border :data="list">
          <el-table-column label="序号" type="index" :index="sortIndex" />
          <el-table-column label="姓名" prop="username" />
          <el-table-column label="头像" prop="staffPhoto">
            <template v-slot="{ row }">
              <img v-if="row.staffPhoto" :src="row.staffPhoto" style="width: 60px;" alt="">
              <img v-else :src="avatarImg" style="width: 60px;" alt="">
            </template>
          </el-table-column>
          <el-table-column label="工号" prop="workNumber" />
          <el-table-column label="聘用形式" prop="formOfEmployment">
            <template v-slot="{ row }">
              {{ getWorkStatus(row.formOfEmployment) }}
            </template>
          </el-table-column>

          <el-table-column label="部门" prop="departmentName" />
          <el-table-column label="入职时间" sortable prop="timeOfEntry" />
          <!-- <el-table-column label="账户状态" /> -->
          <el-table-column label="操作" width="280">
            <template v-slot="{row}">
              <el-button type="text" size="small" @click="$router.push('/detail/' + row.id)">查看</el-button>
              <el-button type="text" size="small" @click="distributionRole(row.id)">分配角色</el-button>
              <el-button type="text" size="small" @click="hDel(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination
            :current-page="obj.page"
            :page-sizes="[2, 5, 10]"
            :page-size="obj.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-row>
      </el-card>
    </div>

    <!-- 弹框 -->
    <el-dialog :visible.sync="show" title="1123">
      <empDialog v-if="show" :show.sync="show" @addSuccess="addUser" />
    </el-dialog>

    <!-- 分配角色弹框 -->
    <el-dialog :visible.sync="showDialogRole" title="角色分配">
      <assign-role v-if="showDialogRole" :id="roleId" ref="assign" :show.sync="showDialogRole" />
    </el-dialog>
  </div>
</template>

<script>
import { deleteUser, getEmployeeList } from '@/api/employees'
import employees from '@/constant/employees'
import empDialog from '@/views/employees/components/empDialog.vue'
import AssignRole from './components/assignRole.vue'
import avatarImg from '@/assets/common/bigUserHeader.png'

export default {

  components: {
    empDialog, AssignRole
  },

  data() {
    return {
      avatarImg,
      list: [],
      total: 0,

      // 弹窗显示隐藏
      show: false,

      obj: {
        // 当前页
        page: 1,
        // 每页条数
        size: 5

      },
      showDialogRole: false,
      roleId: ''
    }
  },
  watch: {
    show(newV, oldV) {
      console.log(newV)
      if (!newV) {
        // this.loadEmployeeList()
      }
    }
  },
  created() {
    this.loadEmployeeList()
  },
  methods: {
    async distributionRole(id) {
      this.showDialogRole = true
      // await this.$refs.assign.getRoleList()
      // await this.$refs.assign.loadUserDetailById()
      this.roleId = id
    },
    // 导出
    handleDownload() {
      const map = {
        'id': '编号',
        'password': '密码',
        'mobile': '手机号',
        'username': '姓名',
        'timeOfEntry': '入职日期',
        'formOfEmployment': '聘用形式',
        'correctionTime': '转正日期',
        'workNumber': '工号',
        'departmentName': '部门',
        'staffPhoto': '头像地址'
      }

      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = Object.values(map)
        // const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
        const list = this.list
        const data = this.formatJson(list, map)
        console.log(data)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson(jsonData, map) {
      return jsonData.map(t => Object.keys(map).map(k => t[k]))
    },
    // 添加员工
    addClick() {
      this.show = true
    },
    sortIndex(index) {
      return (this.obj.page - 1) * this.obj.size + (index + 1)
    },
    handleCurrentChange(val) {
      this.obj.page = val
      this.loadEmployeeList()
    },
    // 每页条数改变触发事件
    handleSizeChange(val) {
      this.obj.page = 1
      this.obj.size = val
      this.loadEmployeeList()
    },
    getWorkStatus(id) {
      const map = employees.hireType.reduce((a, b) => {
        a[b.id] = b.value
        return a
      }, {})
      // const item = employees.hireType.find(item => item.id === id)
      return map[id] || '未知'
    },
    async loadEmployeeList() {
      try {
        console.log(this.obj)
        const { data: { rows, total }} = await getEmployeeList(this.obj)

        this.list = rows
        this.total = total
      } catch (err) {
        console.log(err)
        this.$message.error('加载员工数据失败')
      }
    },
    addUser() {
      this.loadEmployeeList()

      this.total++
      this.obj.page = Math.ceil(this.total / this.obj.size)
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
    },
    async doDel(id) {
      try {
        const res = await deleteUser(id)
        console.log(res)
        // 1. 提示
        this.$message.success('删除成功')

        if (this.list.length === 1) {
          this.obj.page--
          if (this.obj.page <= 0) {
            this.obj.page = 1
          }
        }
        // 2. 重新请求
        this.loadEmployeeList()
      } catch (err) {
        console.log(err)
        this.$message.error('删除失败')
      }
    }
  }
}
</script>
