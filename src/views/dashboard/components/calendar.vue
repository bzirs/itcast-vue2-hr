<template>
  <el-calendar :key="$i18n.locale">
    <template #dateCell="{ data, date }">
      <div class="date-content">
        <!-- {{ data.isSelected ? '✔️' : '' }} -->
        <span class="text">{{ getDay(data.day) }}</span>
        <span v-if="getWeek(date)" class="rest">休</span>
      </div>
    </template>
  </el-calendar>
</template>

<script>
export default {
  name: 'HomeCalendar',
  components: {},
  directives: {},
  props: {},
  data() {
    return {

    }
  },
  computed: {},
  watch: {},
  async created() {},
  mounted() {},
  activated() {},
  updated() {},
  methods: {
    getDay(day) {
      const newDay = day.split('-')[2]
      return newDay.startsWith('0') ? newDay.slice('1') : newDay
    },
    getWeek(date) {
      // const nowDate = new Date()
      const arr = [0, 6]
      console.log(date.getDay())
      return arr.includes(date.getDay())
    }
  }
}
</script>

<style lang="scss" scoped>
.select-box {
  display: flex;
  justify-content: flex-end;
}

::v-deep .el-calendar-day {
  height: auto;
}

::v-deep .el-calendar-table__row td::v-deep .el-calendar-table tr td:first-child,
::v-deep .el-calendar-table__row td.prev {
  border: none;
}

.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}

.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}

.date-content .text {
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;

}

::v-deep .el-calendar-table td.is-selected .text {
  background: #409eff;
  color: #fff;
  border-radius: 50%;
}

::v-deep .el-calendar__header {
  display: none
}
</style>
