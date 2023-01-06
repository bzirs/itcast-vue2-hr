<template>
  <!-- 放置一个图标 -->
  <div style="display:inline-block">
    <svg-icon :icon-class="isFullscreen ?'exit-fullscreen':'fullscreen'" class="fullscreen" @click="toggleScreen" />
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'ScreenFull',
  data() {
    return {
      isFullscreen: false
    }
  },
  methods: {
    toggleScreen() {
      screenfull.toggle()
      this.isFullscreen = !this.isFullscreen
    }
  }
}
</script>

<style lang="scss" scoped>
.fullscreen {
  width: 20px;
  height: 20px;
  color: #fff;
  cursor: pointer;
}
</style>
