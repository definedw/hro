<template>
  <div>
    <div class="page-grid">
      <div class="page-inner">
        <div class="vue-wrapper">
          <tab-list main-name="全部"
                    main-url="/overAgenda/allList"
                    :tabs="tabs"></tab-list>
          <keep-alive>
            <router-view v-on:menuTab="menuTabs" />
          </keep-alive>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TabList from '@/components/TabList'
export default {
  name: 'allCsv',
  components: {
    TabList
  },
  data() {
    return {
      tabs: []
    }
  },
  methods: {
    menuTabs(data) {
      if (!this.tabs.some(item => item.detailId === data.detailId)) {
        data.detailId = data.detailId
        data.showName = data.name
        this.tabs.push(data)
      }
    },
  },
  mounted() {
  },
}
</script>

<style lang="scss" scoped>
</style>
