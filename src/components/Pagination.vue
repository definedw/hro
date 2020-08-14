<template>
  <div>
    <!--上方右侧分页器-->
    <div class="pagination-bar"
         v-if="position==='top'">
      <div class="pagination"
           v-if="total > 0">
        <span class="range">
          {{showPage}} of {{ total }}
        </span>
        <el-pagination layout="prev, next"
                       prev-icon="Previous"
                       next-icon="Next"
                       :current-page="pageNum"
                       :page-size="pageSize"
                       @prev-click="pre"
                       @next-click="next"
                       :total="total">
        </el-pagination>
      </div>
      <div class="pagination"
           v-if="total==0">
        <div class="range">0 - 0 of {{ total }}</div>
        <div class="pager">
          <button disabled
                  class="btn-prev">
            <i class="el-icon el-icon-arrow-left"></i>
          </button>
          <button disabled
                  class="btn-next">
            <i class="el-icon el-icon-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
    <!--下方列表底分页器-->
    <div v-if="position==='bottom'">
      <div class="pag"
           v-if="total > 0">
        <el-pagination background
                       @size-change="handleSizeChange"
                       layout="sizes,jumper,prev, pager, next"
                       :page-size="pageSize"
                       :current-page="pageNum"
                       @prev-click="pre"
                       @next-click="next"
                       :page-sizes="[15, 30, 50, 100]"
                       @current-change="handleCurrentChange"
                       :total="total"
                       class="pagination-mar-top"></el-pagination>
      </div>
      <div class="pag"
           v-if="total === 0">
        <el-pagination disabled
                       background
                       layout="prev, pager, next"
                       :total="total"
                       class="pagination-mar-top">
        </el-pagination>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "pageInation",
  data() {
    return {

    }
  },
  props: {
    position: String,
    pageSize: Number,
    total: Number,
    pageNum: Number,
    endNumber: Number,
  },
  computed: {
    showPage: function () {
      return `${(this.pageNum - 1) * this.pageSize + 1} - ${(this.pageNum - 1) * this.pageSize + this.endNumber}`
    }
  },
  methods: {
    handleCurrentChange(e) {
      this.$emit('pageHandleChange', e)
    },
    pre(e) {
      this.$emit('pagePre', e)
    },
    handleSizeChange(e) {
      this.$emit('pageSizeChange', e)
    },
    next(e) {
      this.$emit('pageNext', e)
    },

  }
}
</script>

<style scoped>
</style>
