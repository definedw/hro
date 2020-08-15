<template>
  <div>
    <div class="top-header">
      <div class="top-background"></div>
      <div class="top-link">
        <ul class="top-link_list">
          <li class="link-item"><a href="">test url</a></li>
          <li class="link-item"><a href="">test url</a></li>
          <li class="link-item"><a href="">test url</a></li>
        </ul>
        <div class="user-info">
          <div class="text-link"
               v-if="!isLogin">
            <span @click="navLogin"
                  class="link-text">登录</span><span>|</span><span @click="navRegister"
                  class="link-text">注册</span>
          </div>
          <div class="user-info_box"
               v-else>
            <span class="link-text">{{ userName }}</span>
            <span>|</span>
            <span @click="loginOut"
                  class="link-text">退出</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'topHeader',
  data() {
    return {
      isLogin: false,
      userName: null
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
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
        }
      }).catch(err => {
        console.log('Get UserInfo Request Faild.', err)
      })
    },
    loginOut() {
      const url = `/api/login/loginOut`
      this.$http.post(url, {}).then(res => {
        console.log('Login Out', res)
        this.isLogin = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
ul {
  margin: 0;
  padding: 0;
  a {
    color: #666;
  }
}
.link-text {
  display: inline-block;
  width: 47%;
  text-align: center;
}
</style>
