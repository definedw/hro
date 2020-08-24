<template>
  <div>
    <div class="page-tab">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-menu :default-active="activeNames"
                   class="el-menu-vertical-demo"
                   :collapse="isCollapse"
                   @select="handleSelect"
                   background-color="#67B0DA"
                   text-color="#fff"
                   router
                   active-text-color="#ffd04b">
            <div v-for="item in computeMenuList"
                 :key="item.index">
              <el-menu-item :route="{path: `${item.url}`}"
                            :index="`${item.index}`">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.name }}</span>
              </el-menu-item>
            </div>

          </el-menu>
        </el-col>
        <el-col :span="19">
          <div class="main">
            <router-view />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
const menuList = [
  {
    url: '/overAgenda/selfList',
    icon: 'el-icon-s-custom',
    index: '0',
    name: '本单位办理'
  },
  {
    url: '/overAgenda/allList',
    icon: 'el-icon-menu',
    index: '1',
    name: '全部办理'
  },
  {
    url: '/overAgenda/countList',
    icon: 'el-icon-tickets',
    index: '2',
    name: '办理数量'
  }
]
const menuList1 = [
  {
    url: '/overAgenda/selfList',
    icon: 'el-icon-s-custom',
    index: '1',
    name: '本单位办理'
  },
]
export default {
  name: 'overagenda',
  data() {
    return {
      menuList: menuList,
      isCollapse: false,
      tabs: [],
      activeNames: '0'
    }
  },
  computed: {
    computeDept() {
      const dept = sessionStorage.getItem('deptType') ? sessionStorage.getItem('deptType') - 0 : null
      return dept
    },
    computeMenuList() {
      if (this.computeDept === 2) {
        return menuList
      } else {
        return menuList1
      }
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log('Handle Select', key, keyPath)
      this.activeNames = key
    },
  },
  watch: {
    '$route': {
      handler(to, from) {
        const _ = this
        if (to.path.includes('all')) {
          _.activeNames = '1'
        } else if (to.path.includes('self')) {
          _.activeNames = '0'
        } else {
          _.activeNames = '2'
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.collapse {
  display: inline-block;
  position: absolute;
  top: 20px;
  right: 5px;
  z-index: 1;
}
.el-menu-vertical-demo {
  position: relative;
}
.el-menu--collapse {
  .collapse {
    right: 0;
  }
}
</style>
