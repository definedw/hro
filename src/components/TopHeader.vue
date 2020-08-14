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
          <div class="text-link">
            <span @click="navLogin"
                  class="link-text">登录</span><span>|</span><span @click="navRegister"
                  class="link-text">注册</span>
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

    }
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
