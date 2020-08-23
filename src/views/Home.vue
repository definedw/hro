<template>
  <div>
    <top-header :userName="userName"
                :position="position"></top-header>
    <div class="main">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import TopHeader from '@/components/TopHeader'
export default {
  name: 'home',
  components: { TopHeader },
  data() {
    return {
      userName: null,
      position: null
    }
  },
  methods: {
    getUserInfo() {
      const url = `/api/login/getAuthor`
      this.$http.post(url, {}).then(res => {
        console.log('User Info.', res)
        if (res.flag) {
          this.deptType = res.list.sysDept.deptType - 0
          this.userName = res.list.sysStaff.staffName
          this.position = res.list.sysDept.name
          sessionStorage.setItem('deptType', this.deptType)
          sessionStorage.setItem('isLogin', true)
        }
      }).catch(err => {
        console.log('Get UserInfo Request Faild.', err)
      })
    },
  },
  mounted() {
    this.getUserInfo()
  }
}
</script>

<style lang="scss" scoped>
</style>
