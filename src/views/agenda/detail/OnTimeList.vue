<template>
  <div>
    <div class="page-filter">
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
              :lg="2"
              :md="2"
              :sm="4">
        <el-button type="primary"
                   @click="clearList">清除</el-button>
      </el-col>
    </div>
    <div class="page-content">
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
        <el-table-column prop="oper"
                         label="操作">
          <template slot-scope="scope">
            <a class="cur"
               @click="showDetail(scope.row)">
              详情
            </a>
            <a class="cur"
               v-if="deptType === 2"
               @click="showAudit(scope.row)">
              审核
            </a>
            <a class="cur"
               @click="doneAudit(scope.row)">
              办结
            </a>

            <a class="cur"
               v-if="scope.row.status === 4"
               @click="setDate(scope.row)">
              设置日期
            </a>
          </template>
        </el-table-column>
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
      <audit-dialog v-if="visible"
                    :title="title"
                    :id="id"
                    :type="transfer"
                    :visible="visible"
                    @close="visible = false"
                    @handleUpdate="handleUpdate"></audit-dialog>
    </div>
  </div>
</template>

<script>
import AuditDialog from '../dialog/audit'
import PageInation from '@/components/Pagination'
export default {
  name: 'auditList',
  components: {
    PageInation,
    AuditDialog
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 15,
      total: 0,
      endNumber: 0,
      totolPages: null,
      sorter: 'name',
      // 在办2 办结 3
      status: 2,
      tableData: [],
      deptType: parseInt(sessionStorage.getItem('deptType')),
      visible: false,
      rangeDate: [],
      searchForm: {
        startDate: null,
        endDate: null
      }
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
    showDetail(row) {
      this.$emit('menuTab', row)
      this.$router.push(
        '/agenda/ontime/' + row.detailId
      )
    },
    handleUpdate(val) {
      console.log('Handle update')
      this.getList()
    },
    doneAudit(row) {
      this.visible = true
      this.title = '办结回复'
      this.id = row.detailId
    },
    timeChange() {
      this.searchForm.startDate = this.rangeDate ? this.rangeDate[0] + '' : ''
      this.searchForm.endDate = this.rangeDate ? this.rangeDate[1] + '' : ''
    },
    getList() {
      const url = `/api/question/getAllQuestion`
      const params = {
        current: this.pageNum || 1,
        pageSize: this.pageSize || 15,
        status: this.status || null,
        sorter: this.sorter || 'name',
        total: this.total || null,
        startDate: this.searchForm.startDate || '',
        endDate: this.searchForm.endDate || ''
      }
      this.$http.get(url, params).then(res => {
        console.log('List onTime data.', res)
        this.pageNum = res.pagination.current || 1
        this.pageSize = res.pagination.pageSize || 15
        this.total = res.pagination.total || 0
        this.totolPages = res.pagination.totolPages
        this.sorter = res.pagination.sorter
        this.endNumber = res.list ? res.list.length : 0


        this.tableData = res.list || []
      })
    },
    clearList() {
      this.rangeDate = []
      this.searchForm = Object.assign({}, this.$options.data().searchForm)
      this.getList()

    },
  },
  mounted() {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
</style>
