<template>
  <div>
    <div class="page-content">
      <PageInation :pageSize="pageSize"
                   :total="total"
                   :pageNum="pageNum"
                   position="top"
                   :endNumber="endNumber"
                   @pagePre="pre"
                   @pageNext="next"
                   @pageSizeChange="handleSizeChange"
                   @pageHandleChange="handleCurrentChange"></PageInation>
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
    </div>
  </div>
</template>

<script>

import PageInation from '@/components/Pagination'
export default {
  name: 'auditList',
  components: {
    PageInation
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
        '/agenda/ontime/' + row.id
      )
    },
    getList() {
      const url = `/api/question/getAllQuestion`
      const params = {
        current: this.pageNum || 1,
        pageSize: this.pageSize || 15,
        status: this.status || null,
        sorter: this.sorter || 'name',
        total: this.total || null
      }
      this.$http.get(url, params).then(res => {
        console.log('List onTime data.', res)
        this.pageNum = res.pagination.current
        this.pageSize = res.pagination.pageSize
        this.total = res.pagination.total
        this.totolPages = res.pagination.totolPages
        this.sorter = res.pagination.sorter

        this.tableData = res.list || []
      })
    },
  },
  mounted() {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
</style>
