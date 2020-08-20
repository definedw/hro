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
               v-if="deptType === 2 && scope.row.status === 1"
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
    <audit-dialog v-if="visible"
                  :title="title"
                  :id="id"
                  :visible="visible"
                  @close="visible = false"
                  @handleUpdate="handleUpdate"></audit-dialog>
  </div>
</template>

<script>
const deptType = sessionStorage.getItem('deptType')
import PageInation from '@/components/Pagination'
import AuditDialog from '../dialog/audit'
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
      status: '',
      tableData: [],
      deptType: parseInt(sessionStorage.getItem('deptType')),
      id: null,
      visible: false
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
    showDetail(row) {
      this.$emit('menuTab', row)
      this.$router.push(
        '/agenda/audit/' + row.detailId
      )
    },
    getList() {
      const url = `/api/question/auditList`
      const params = {
        current: this.pageNum || 1,
        pageSize: this.pageSize || 15,
        sorter: this.sorter || 'name',
        total: this.total || null
      }
      this.$http.post(url, params).then(res => {
        console.log('List all check in.', res)
        this.pageNum = res.pagination.current
        this.pageSize = res.pagination.pageSize
        this.total = res.pagination.total
        this.totolPages = res.pagination.totolPages
        this.sorter = res.pagination.sorter

        this.tableData = res.list || []
      })
    },
    showAudit(row) {
      this.visible = true
      this.title = '审核'
      this.id = row.detailId
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
</style>
