<template>
  <div>
    <div class="without-data"
         v-if="tableData.length === 0">
      <div class="page-tab">
        <el-button @click="addCheckIn"
                   type="primary">事项登记</el-button>
      </div>
    </div>
    <div class="content"
         v-else></div>
    <check-in v-if="visible"
              :title="title"
              :visible="visible"
              @close="visible = false"
              @handleUpdate="handleUpdate"></check-in>
  </div>
</template>

<script>
import CheckIn from './dialog/newCheck'
export default {
  name: 'dashBoard',
  components: { CheckIn },
  data() {
    return {
      /* pageniation */
      pageNum: 1,
      pageSize: 15,
      total: 0,
      endNumber: 0,

      tableData: [],

      visible: false,
      title: null
    }
  },
  created() {
    this.getList()

  },
  methods: {
    addCheckIn() {
      this.visible = true
      this.title = '新建'
    },
    handleUpdate(val) {
      console.log('Handle Update')
    },
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
