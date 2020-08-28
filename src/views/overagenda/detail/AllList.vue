<template>
  <div>
    <div class="page-content">
      <div class="page-filter">
        <el-row :gutter="20">
          <el-col :lg="4"
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
          </el-col>
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
                       @click="getList('isSearch')">查询</el-button>
          </el-col>
          <el-col :span="3"
                  :lg="4"
                  :md="4"
                  :sm="6">
            <el-button @click="exportAllCsv">导出全部</el-button>
          </el-col>
        </el-row>
      </div>
      <el-table :data="tableData"
                border>
        <el-table-column label="登记人"
                         prop="name"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="address"
                         label="住址"
                         show-overflow-tooltip></el-table-column>

        <el-table-column label="联系方式"
                         prop="phone"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="createTime"
                         label="申请时间"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.createTime | UTCTime }}
          </template>
        </el-table-column>
        <el-table-column label="诉求类型"
                         prop="questionType"
                         show-overflow-tooltip></el-table-column>
        <el-table-column label="诉求描述"
                         prop="questionDescribe"
                         show-overflow-tooltip></el-table-column>
        <el-table-column label="所属社区"
                         prop="deptName"
                         show-overflow-tooltip></el-table-column>
        <el-table-column label="化解类型"
                         prop="detailType"
                         show-overflow-tooltip></el-table-column>

        <el-table-column label="状态"
                         prop="statusName"
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
  // ,
  // {
  //   name: '退回',
  //   id: 3
  // },
  // {
  //   name: '审核',
  //   id: 4
  // },
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
  name: 'overAgenda',
  components: {
    PageInation
  },
  data() {
    return {
      searchForm: {
        createDate: null,
        endDate: null,
        status: null
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
    getList(str) {
      const url = `/api/question/getAll`,
        params = {
          createDate: this.searchForm.startDate || null,
          endDate: this.searchForm.endDate || null,
          current: str === 'isSearch' ? 1 : this.pageNum,
          pageSize: this.pageSize,
          sorter: this.sorter,
          type: 2,
          status: this.searchForm.status || ''
        }
      this.$http.get(url, params).then(res => {
        console.log('Query All List data.', res)
        this.pageNum = res.pagination.current || 1
        this.pageSize = res.pagination.pageSize || 15
        this.total = res.pagination.total || 0
        this.endNumber = res.list ? res.list.length : 0

        this.tableData = res.list ? res.list : []
      })
    },
    exportAllCsv() {
      const url = `/api/question/export`,
        params = {
          startDate: this.searchForm.startDate || '',
          endDate: this.searchForm.endDate,
          status: this.searchForm.status,
          type: 2
        }
      // const { startDate = '', endDate = '', status = '' } = this.searchForm
      // const baseUrl = this.$http.baseURL()
      // const eurl = `${baseUrl}api/question/export?startDate=${startDate}&endDate=${endDate}&status=${startDate}&type=2`
      // console.log(eurl)
      // // window.location.href = eurl
      // const el = document.createElement('a')
      // el.href = eurl
      // const ela = document.body.appendChild(el)
      // ela.click()
      // document.removeChild(el)
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
