<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="10">
        <div class="header">
          <div class="header-background"></div>
          <div class="header-title">{{ Detail.name }} 的诉求</div>
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
            <el-form-item prop="createTime"
                          label="登记时间">
              <el-input suffix-icon=""
                        v-model="Detail.createTime"
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
            <el-form-item v-if="Detail.rejectReason"
                          prop="rejectReason"
                          label="拒绝理由">
              <el-input v-model="Detail.rejectReason"
                        readonly></el-input>
            </el-form-item>
            <el-form-item v-if="Detail.detailDescribe"
                          prop="detailDescribe"
                          label="办结回复">
              <el-input v-model="Detail.detailDescribe"
                        readonly></el-input>
            </el-form-item>

          </el-form>
        </div>
      </el-col>
      <el-col :span="10"
              v-if="Detail.list && Detail.list.length > 0">
        <div class="header">
          <div class="header-background"></div>
          <div class="header-title">{{ Detail.name }} 办理详情</div>
          <div class="page-form">
            <div v-for="item in Detail.list"
                 :key="item.id">
              <el-form :model="item">
                <el-form-item label="描述文件"
                              v-if="item.images !== null">
                  <div class="img-list">
                    <div class="item"
                         v-for="child in item.images"
                         :key="child"><img @click="showDetail(child)"
                           :src="child"
                           alt=""></div>
                  </div>
                </el-form-item>
                <el-form-item label="办理描述"
                              v-if="item.content"
                              prop="content">
                  <el-input v-model="item.content"
                            readonly></el-input>
                </el-form-item>
                <el-row :gutter="24">
                  <el-col :span="12">
                    <el-form-item label="办理人"
                                  prop="addDate">
                      <el-input :value="`${item.staffName}`"
                                readonly></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="办理时间"
                                  prop="addDate">
                      <el-input :value="`${item.addDate.toString().substring(0,19).replace('T', ' ')}`"
                                readonly></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

              </el-form>
            </div>

          </div>
        </div>
      </el-col>
    </el-row>
    <img-dialog v-if="visible"
                :imgUrl="imgUrl"
                :visible="visible"
                @close="visible = false"></img-dialog>
  </div>
</template>

<script>
import PageInation from '@/components/Pagination'
import ImgDialog from '../dialog/img'
export default {
  name: 'agendaDetail',
  components: {
    PageInation,
    ImgDialog
  },
  data() {
    return {
      Detail: {},
      visible: false,
      imgUrl: ''
    }
  },
  methods: {
    showDetail(val) {
      this.visible = true
      this.imgUrl = val
      console.log(1111111111)
    },
    getList() {
      const id = this.$route.params.id
      const url = `/api/question/getOne/${id}`
      this.$http.get(url).then(res => {
        console.log('Agenda Detail data.', res)
        this.Detail = res.list
        this.Detail.createTime = this.Detail.createTime.toString().substring(0, 10)
        this.SubDetail = res.list.list ? res.list.list.map(v => {
          v.addDate.toString().substring(0, 10)
          return v
        }) : {}
      })
    }
  },
  mounted() {
    this.getList()
  },
  activated() {
    this.getList()
  },
  watch: {
    '$route': {
      handler(to, from) {
        const _ = this
        if (to.params.id && from.params.id) {
          if (to.params.id !== from.params.id) {
            _.getList()
          } else {
            return
          }
        }
      },
      immediate: true
    }
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
    background: #f8f8f8;
    z-index: -1;
  }
}
.header-title {
  height: 100%;
  font-size: 16px;
  z-index: 1;
  line-height: 2;
  color: #333;
}
.img-list {
  &::after {
    content: '';
    clear: both;
  }
  .item {
    float: left;
    width: 25%;
    box-sizing: border-box;
    padding: 0 5px;
    margin-bottom: 5px;
  }
  img {
    height: 100px;
    width: 100%;
    background: #ccc;
    margin: 0 auto;
    display: block;
  }
}
</style>
