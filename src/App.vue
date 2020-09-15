<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss">
#app {
  overflow: hidden;
}
* {
  word-break: break-word;
}
.el-message {
  z-index: 10000 !important;
}
</style>
