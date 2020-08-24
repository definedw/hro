<template>
  <div>
    <div class="page-content">
      <div class="page-filter">
        <el-row :gutter="20">
          <!-- <el-col :lg="4"
                  :md="4"
                  :sm="6">
            <el-select v-model="searchForm.status"
                       placeholder="办理状态"
                       clearable
                       filterable>
              <el-option v-for="item in statusDict"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-col> -->
          <el-col :lg="8"
                  :md="8">
            <el-date-picker class="date-picker-newClass"
                            type="daterange"
                            v-model="rangeDate"
                            range-separator="/"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd"
                            @change="timeChange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"></el-date-picker>
          </el-col>
          <el-col :span="3"
                  :lg="2"
                  :md="2"
                  :sm="4">
            <el-button type="primary"
                       @click="getList">查询</el-button>
          </el-col>
          <el-col :span="3"
                  :lg="4"
                  :md="4"
                  :sm="6">
            <el-button @click="exportAllCsv">导出</el-button>
          </el-col>
        </el-row>
      </div>
      <el-table :data="tableData"
                border>
        <el-table-column label="单位"
                         prop="deptName"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="noneCount"
                         label="办结件"
                         show-overflow-tooltip></el-table-column>
        <el-table-column label="在办件"
                         prop="isCount"
                         show-overflow-tooltip></el-table-column>
      </el-table>
      <PageInation :pageSize="pageSize"
                   :total="total"
                   :pageNum="pageNum"
                   position="bottom"
                   :endNumber="endNumber"
                   @pagePre="pre"
                   @pageNext="next"
                   @pageSizeChange="handleSizeChange"
                   @pageHandleChange="handleCurrentChange"></PageInation>

    </div>

  </div>
</template>

<script>
const statusDict = [
  {
    name: '在办',
    id: 1
  },
  {
    name: '办结',
    id: 2
  }
]
const typeDict = [
  {
    name: '本单位',
    cid: 1
  },
  {
    name: '全部',
    cid: 2
  },
]
import PageInation from '@/components/Pagination'
export default {
  name: 'countList',
  components: {
    PageInation
  },
  data() {
    return {
      searchForm: {
        createDate: null,
        endDate: null
        , status: null
      },
      pageNum: 1,
      pageSize: 15,
      endNumber: 0,
      total: 0,
      sorter: 'name',
      rangeDate: [],
      tableData: [],
      statusDict: statusDict,
      typeDict: typeDict
    }
  },
  computed: {
    computeDept() {
      return (sessionStorage.getItem('deptType') - 0)
    }
  },
  methods: {
    pre(v) {
      this.pageNum = v
      this.getList()
    },
    next(v) {
      this.pageNum = v
      this.getList()
    },
    handleCurrentChange(v) {
      this.pageNum = v
      this.getList()
    },
    handleSizeChange(v) {
      this.pageSize = v
      this.getList()
    },
    handleUpdate(val) {
      console.log('Handle update')
      this.getList()
    },
    timeChange() {
      this.searchForm.startDate = this.rangeDate ? this.rangeDate[0] + '' : ''
      this.searchForm.endDate = this.rangeDate ? this.rangeDate[1] + '' : ''
    },
    getList() {
      const url = `/api/question/deptNameCountList`,
        params = {
          createDate: this.searchForm.startDate || '',
          endDate: this.searchForm.endDate || '',
          current: this.pageNum,
          pageSize: this.pageSize,
          sorter: this.sorter,
          status: this.searchForm.status || ''
        }
      this.$http.get(url, params).then(res => {
        console.log('Query Count List data.', res)
        this.pageNum = res.pagination.current || 1
        this.pageSize = res.pagination.pageSize || 15
        this.total = res.pagination.total || 0
        this.endNumber = res.list ? res.list.length : 0

        this.tableData = res.list ? res.list : []
      })
    },
    exportAllCsv() {
      const url = `/api/question/exportHomeCount`,
        params = {
          startDate: this.searchForm.startDate,
          endDate: this.searchForm.endDate
        }
      this.$http.download(url, params).then(res => {
        console.log('Export All Csv', res)
      }).catch(err => {
        console.log('Export Faild.')
      })
    },
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
  },
  mounted() {
    this.getList()
  },
  activated() {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
.sub-header {
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  background: #ece7e7;
}
</style>
