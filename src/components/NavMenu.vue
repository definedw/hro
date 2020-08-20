<template>
  <div>
    <el-menu :default-active="activeIndex"
             class="el-menu-demo"
             mode="horizontal"
             @select="handleSelect"
             background-color="#545c64"
             :router="true"
             :unique-opened="true"
             text-color="#fff"
             active-text-color="#ffd04b">
      <div style="display: inline-block;"
           v-for="(item, index) in menuList"
           :key="item.index">
        <el-menu-item :route="{path: `${item.url}`}"
                      :index="`${item.index}`">{{ item.name }}</el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
const menuList = [
  {
    name: '首页',
    url: '/dashboard',
    index: '0'
  },
  {
    name: '诉求办理',
    url: '/agenda',
    index: '1'
  },
  {
    name: '数据报表',
    url: '/overagenda',
    index: '2'
  },
]
export default {
  data() {
    return {
      menuList: menuList,
      activeIndex: '0'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log('Handle Select', key, keyPath)
      this.activeIndex = key
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
