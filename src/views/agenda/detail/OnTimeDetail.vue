<template>
  <div>
    <el-row :gutter="15">
      <el-col :span="14">
        <div class="header">
          <div class="header-background"></div>
          <div class="header-title">{{ name }}的诉求</div>
        </div>
        <div class="page-form">
          <el-form :model="Detail">
            <el-form-item prop="name"
                          label="姓名">
              <el-input v-model="Detail.name"
                        readonly></el-input>
            </el-form-item>
            <el-form-item prop="idCard"
                          label="身份证">
              <el-input v-model="Detail.idCard"
                        readonly></el-input>
            </el-form-item>

            <el-form-item prop="phone"
                          label="联系方式">
              <el-input v-model="Detail.phone"
                        readonly></el-input>
            </el-form-item>
            <el-form-item prop="address"
                          label="联系地址">
              <el-input v-model="Detail.address"
                        readonly></el-input>
            </el-form-item>
            <el-form-item prop="questionType"
                          label="诉求类型">
              <el-input v-model="Detail.questionType"
                        readonly></el-input>
            </el-form-item>
            <el-form-item prop="questionDescribe"
                          label="诉求描述">
              <el-input type="textarea"
                        v-model="Detail.questionDescribe"
                        readonly></el-input>
            </el-form-item>
            <el-form-item prop="detailType"
                          label="化解类型">
              <el-input v-model="Detail.detailType"
                        readonly></el-input>
            </el-form-item>
            <el-form-item prop="deptName"
                          label="化解单位">
              <el-input v-model="Detail.deptName"
                        readonly></el-input>
            </el-form-item>

          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PageInation from '@/components/Pagination'
export default {
  name: 'agendaDetail',
  components: {
    PageInation
  },
  data() {
    return {
      Detail: null
    }
  },
  methods: {
    getList() {
      const id = this.$route.params.id
      const url = `/api/question/getOne/${id}`
      this.$http.get(url).then(res => {
        console.log('Agenda Detail data.', res)
        this.Detail = res.list
      })
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
.header {
  height: 40px;
  display: block;
  padding: 5px;
  margin-top: 15px;
  line-height: 120%;
  padding-left: 10px;
  position: relative;
  .header-background {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: #ddd;
  }
}
</style>
