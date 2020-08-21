<template>
  <div>
    <div class="page-tab">
      <div class="page-inner">
        <div class="page-header">
          <div class="page-header">导出报表
          </div>
        </div>
        <div class="table-border">
          <el-table :data="tableData"
                    border>
            <el-table-column prop="name"
                             label="类别"></el-table-column>
            <el-table-column prop="address">
              <template slot-scope="scope">
                <a class="cur"
                   @click="exportCsv(scope.row.cId)">
                  导出
                </a>

              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'overAgenda',
  data() {
    return {
      tableData: [
        {
          name: '导出登记表',
          cId: 1,
        },
        {
          name: '导出在办和办结数',
          cId: 2,
        },
        {
          name: '导出月份统计',
          cId: 3,
        },
        {
          name: '导出登记模板',
          cId: 4
        },
      ]
    }
  },
  methods: {
    exportCsv(id) {
      const url = ['/api/question/export', '/api/question/exportHomeCount', '/api/question/exportMonthCount', '/api/question/exportTemplate']
      switch (id) {
        case 1:
          this.$http.download(url[0]).then(res => {
            console.log('Export 1', res)
          }).catch(err => {
            console.log('Export Faild.', err)
          })
          break
        case 2:
          this.$http.download(url[1], { responseType: 'blob' }).then(res => {
            console.log('Export 2', res)
          }).catch(err => {
            console.log('Export Faild.', err)
          })
          break
        case 3:
          this.$http.download(url[2], { responseType: 'blob' }).then(res => {
            console.log('Export 3', res)
          }).catch(err => {
            console.log('Export Faild.', err)
          })
          break
        default:
          this.$http.download(url[3], { responseType: 'blob' }).then(res => {
            console.log('Export 4', res)
          }).catch(err => {
            console.log('Export Faild.', err)
          })
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
