<template>
  <div>
    <div class="page-tab">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-menu :default-active="this.$route.path"
                   class="el-menu-vertical-demo"
                   :collapse="isCollapse"
                   @select="handleSelect"
                   background-color="#67B0DA"
                   text-color="#fff"
                   router
                   active-text-color="#ffd04b">
            <div class="collapse"
                 @click="isCollapse = !isCollapse">
              <span v-if="isCollapse"><i class="icon el-icon-arrow-right"></i></span>
              <span v-else><i class="icon el-icon-arrow-left"></i></span>
            </div>
            <div v-for="item in menuList"
                 :key="item.index">
              <el-menu-item :route="{path: `${item.url}`}"
                            :index="`${item.url}`">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.name }}</span>
              </el-menu-item>
            </div>

          </el-menu>
        </el-col>
        <el-col :span="18">
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
    icon: 'el-icon-my-audit',
    index: '0',
    name: '审核件'
  },
  {
    url: '/agenda/ontime',
    icon: 'el-icon-my-ontime',
    index: '1',
    name: '在办件'
  },
  {
    url: '/agenda/complete',
    icon: 'el-icon-my-complete',
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
      tabs: []
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log('Handle Select', key, keyPath)
      switch (key) {
        case '0':
          this.mainName = '审核件'
          break
        case '1':
          this.mainName = '在办件'
          break
        default:
          this.mainName = '办结件'
      }
    }
  },
  activated() {
    console.log('activated')
    console.log(this.$route.path)
    // if (this.$route.path === '/agenda') {
    //   this.$router.push('/agenda/auditList')
    // }
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
