<template>
  <el-dropdown class="lang-position" trigger="click" @command="changeLanguage">
    <div>
      <svg-icon style="color:#fff;font-size:20px" icon-class="language" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh" :disabled="isDisabled('zh')">中文</el-dropdown-item>
      <el-dropdown-item command="en" :disabled="isDisabled('en')">en</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  methods: {
    changeLanguage(lang) {
      this.$i18n.locale = lang // 设置给本地的i18n插件
      this.$message.success('切换多语言成功')
    },
    isDisabled(lang) {
      return this.$i18n.locale === lang
    }
  }
}
</script>

<style lang="scss" scoped>
.lang-position{
  padding-right: 20px;
}
</style>
