<template>
  <div>

  </div>
</template>

<script>
export default {
  name: 'dashBoard',
  data() {
    return {}
  },
  created() {
    this.getList()

  },
  methods: {
    getList() {
      const url = `/api/login/index`,
        _ = this
      _.$http.post(url, {}).then(res => {
        console.log('Dash board List', res)
      }).catch(err => {
        console.log('Loading DashBoard Data Faild.')
      })
    }
  },
  mouted() {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
</style>
