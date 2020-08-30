<template>
  <div>
    <el-dialog title="图片详情"
               :visible="show"
               @close="$emit('close')"
               :close-on-click-modal="false">
      <div class="img">
        <img :src="imgUrl"
             alt="">
      </div>

    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'imgDetail',
  props: ['imgUrl', 'visible'],
  data() {
    return {
      show: this.visible
    }
  },
  watch: {
    show(val) {
      this.show = val
    }
  }
}
</script>

<style lang="scss" scoped>
.img {
  width: 100%;
  height: auto;
  img {
    width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
  }
}
</style>
