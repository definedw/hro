<template>
  <div>
    <div class="top-header">
      <div class="top-background"></div>
      <!-- <div class="index-logo"></div> -->
      <div class="nav-tab">
        <div class="nav-item"
             v-for="item in menuList"
             :key="item.index">
          <a @click="goTag(item)"
             :class="{active: item.index === activeIndex}"><span class="nav-text">{{ item.name }}</span></a>
        </div>
      </div>
      <div class="user-info">
        <div class="text-link"
             v-if="!isLogin">
          <span @click="navLogin"
                class="link-text">登录</span><span>|</span><span @click="navRegister"
                class="link-text">注册</span>
        </div>
        <div class="user-info_box"
             v-else>
          <div class="detail-info">
            <span class="link-text">{{ userName }}</span>
            <span class="link-text">{{ position }}</span>
          </div>
          <span class="divider">|</span>

          <div @click="loginOut"
               class="detail-info link-text">退出</div>
        </div>
      </div>
      <!-- <div class="top-link">
        <span class="cp-link">友情链接：</span>
        <ul class="top-link_list">
          <li class="link-item"><a href="">湖南政务</a></li>
          <li class="link-item"><a href="">地方税务</a></li>
          <li class="link-item"><a href="">地方检察</a></li>
        </ul>
        
      </div> -->
    </div>
  </div>
</template>

<script>

export default {
  name: 'topHeader',
  data() {
    return {
      activeIndex: '0',
      isLogin: false,
      userName: null,
      position: null,
      menuList: [
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
        }
      ]
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    goTag(item) {
      this.activeIndex = item.index ? item.index : this.$route.query.index
      this.$router.push(`${item.url}`)
      // this.$router.push({
      //   path: `${item.url}`,
      //   query: `${item.index}`
      // })
    },
    navLogin() {
      this.$router.push({
        path: '/login'
      })
    },
    navRegister() {
      this.$router.push({
        path: '/register'
      })
    },
    getUserInfo() {
      const url = `/api/login/getAuthor`
      this.$http.post(url, {}).then(res => {
        console.log('User Info.', res)
        if (res.flag) {
          this.isLogin = true
          this.userName = res.list.sysStaff.staffName
          this.position = res.list.sysDept.name
          sessionStorage.setItem('deptType', res.list.sysDept.deptType)
        }
      }).catch(err => {
        console.log('Get UserInfo Request Faild.', err)
      })
    },
    getMenu() {
      const url = `/api/login/index`
      this.$http.post(url, {}).then(res => {
        console.log('Menu List.', res)
      }).catch(err => {

      })
    },
    loginOut() {
      const url = `/api/login/loginOut`
      this.$http.post(url, {}).then(res => {
        console.log('Login Out', res)
        this.isLogin = false
        this.$router.push('/login')
        sessionStorage.setItem('deptType', null)
      })
    }
  },
  mounted() {
    // this.getMenu()
  },
  watch: {
    '$route': {
      handler(to, from) {
        const _ = this
        _.menuList.map(v => {
          if (to.path.includes(v.url)) {
            this.activeIndex = v.index
          }
        })
      },
      immediate: true
    }
  }
}
</script>
<style lang="scss" scoped>
.nav-tab {
  display: inline-block;
}
.nav-item {
  display: inline-block;
}
a {
  padding: 31px;
  display: inline-block;
  font-size: 14px;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 100%;
  color: #fff;
  text-decoration: none;
  position: relative;
  &.active {
    &:before {
      position: absolute;
      right: 0;
      left: 0;
      bottom: 0;
      content: '';
      height: 3px;
      background: #fbbf42;
    }
  }
  &:hover {
    text-decoration: none;
    background: #5594b1;
    color: #fbbf42;
  }
}
.link-text {
  display: inline-block;
  text-align: center;
  cursor: pointer;
}
.detail-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  .link-text {
    display: block;
    text-align: left;
    padding: 4px 5px;
    cursor: pointer;
  }
}
.user-info_box {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
}
.index-logo {
  position: absolute;
  top: 0;
  left: 0;
  width: 150px;
  height: 76px;
  z-index: 2;
  background: url('~@/assets/index.png') no-repeat;
  background-size: 100% 100%;
}
.divider {
  padding-right: 15px;
}
</style>
