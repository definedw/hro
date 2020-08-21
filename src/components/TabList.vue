<template>
  <div class="page-tab">
    <div class="page-header">
      <h3 class="page-title">
        <router-link :to="mainUrl">{{ mainName }}</router-link>
      </h3>
      <div class="tab-wrap">
        <div class="page-nav-bar">
          <button class="page-nav-item"
                  v-for="(item, index) in tabs"
                  :key="item.id"
                  :class="{ active: item.detailId == $route.params.id || item.detailId == $route.query.id}"
                  @click="goToTag(item)">
            {{item.showName}}
            <span @click.stop="closeTab(index, item)"
                  class="close"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tabs: Array,
    mainUrl: String,
    mainName: String,
  },
  methods: {
    goToTag(tag) {
      this.$router.push(tag.path)
    },
    closeTab(index) {
      this.tabs.splice(index, 1)
      if (!this.tabs.length) {
        this.$router.replace(this.mainUrl)
        return
      }
      if (index === 0) {
        this.$router.replace(this.tabs[0].path)
      } else {
        this.$router.replace(this.tabs[index - 1].path)
      }
    }
  }
}
</script>
<style lang="scss"></style>
