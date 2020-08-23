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
            <!-- <div class="collapse"
                 @click="isCollapse = !isCollapse">
              <span v-if="isCollapse"><i class="icon el-icon-arrow-right"></i></span>
              <span v-else><i class="icon el-icon-arrow-left"></i></span>
            </div> -->
            <div v-for="item in menuList"
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
    url: '/agenda/auditList',
    icon: 'el-icon-s-check',
    index: '0',
    name: '审核件'
  },
  {
    url: '/agenda/ontimeList',
    icon: 'el-icon-timer',
    index: '1',
    name: '在办件'
  },
  {
    url: '/agenda/completeList',
    icon: 'el-icon-receiving',
    index: '2',
    name: '办结件'
  },
  // {
  //   url: '/agendaDetail/inaudit',
  //   icon: 'el-icon-my-inaudit',
  //   index: '3',
  //   name: '审核件'
  // },
]
export default {
  name: 'agenda',
  data() {
    return {
      menuList: menuList,
      isCollapse: false,
      tabs: [],
      activeNames: '0'
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
        if (to.path.includes('audit')) {
          _.activeNames = '0'
        } else if (to.path.includes('ontime')) {
          _.activeNames = '1'
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
