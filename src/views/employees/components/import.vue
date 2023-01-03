<template>
  <div class="department-container">
    <div class="app-container">
      <el-card>
        <page-tools>
          <template #left>
            <span>导入</span>
          </template>

        </page-tools>
        <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
      </el-card>
    </div>
  </div>
</template>

<script>

import UploadExcelComponent from '@/components/UploadExcel'
import { formatExcelDate } from '@/utils'
import { importEmployee } from '@/api/employees'
export default {
  components: { UploadExcelComponent },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    transformData(results) {
      const mapInfo = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName',
        '聘用形式': 'formOfEmployment'
      }

      return results.reduce((a, b) => {
        // 第二种做法
        a.push(
          Object.keys(b).reduce((c, d) => {
            const enKey = mapInfo[d]
            if (enKey === 'timeOfEntry' || enKey === 'correctionTime') {
              c[enKey] = new Date(formatExcelDate(b[d]))
            } else {
              c[enKey] = b[d]
            }

            return c
          }, {})
        )

        return a
      }, [])
    },
    async handleSuccess({ results, header }) {
      try {
        const data = this.transformData(results)
        const { message } = await importEmployee(data)

        this.$message.success(message)
        this.$router.back()
      } catch (error) {
        this.$message.error(error.message)
      }
    }
  }
}
</script>
