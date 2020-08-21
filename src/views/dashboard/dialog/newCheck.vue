<template>
  <div>
    <el-dialog :title="title"
               :visible="show"
               @close="$emit('close')"
               :close-on-click-modal="false">
      <div class="page-form">
        <el-form :model="ruleForm"
                 ref="ruleForm"
                 :rules="rules">
          <el-form-item prop="name"
                        label="姓名"
                        :rules="{required: true, message: '请正确输入您的姓名', trigger: 'blur'}">
            <el-input v-model="ruleForm.name"
                      clearable
                      placeholder="请输入您的姓名"></el-input>
          </el-form-item>
          <el-form-item prop="idCard"
                        label="身份证号码">
            <el-input v-model.trim="ruleForm.idCard"
                      @input.native="ruleForm.idCard=ruleForm.idCard.replace(/^[\D]/g, '')"
                      placeholder="请输入身份证号码"
                      maxlength="15"
                      clearable></el-input>
          </el-form-item>
          <el-form-item prop="phone"
                        label="联系方式">
            <el-input v-model="ruleForm.phone"
                      @input="ruleForm.phone = ruleForm.phone.replace(/^[\D]/g, '')"
                      placeholder="请输入手机号码"
                      maxlength="11"></el-input>
          </el-form-item>
          <el-form-item prop="address"
                        :rules="{required: true, message: '请填写您的联系住址，包含街道和门牌', trigger: 'blur'}"
                        label="详细地址（街道、门牌）">
            <el-input v-model="ruleForm.address"
                      placeholder="请输入您的住址"
                      clearable></el-input>
          </el-form-item>
          <el-form-item prop="questionType"
                        :rules="{required: true, message: '请选择诉求类型', trigger: 'blur'}"
                        label="诉求类型">
            <el-select v-model="ruleForm.questionType"
                       placeholder="选择诉求类型"
                       clearable
                       filterable>
              <el-option v-for="item in questionDict"
                         :key="item.id"
                         :label="item.name"
                         :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="questionDescribe"
                        label="诉求描述">
            <el-input v-model="ruleForm.questionDescribe"
                      maxlength="1000"
                      type="textarea"></el-input>
          </el-form-item>

          <el-form-item prop="detailType"
                        :rules="{required: true, message: '化解单位为必选项目', trigger: 'blur'}"
                        label="化解单位">
            <!-- @change="getDetailType" -->
            <el-select v-model="ruleForm.detailType"
                       placeholder="化解单位"
                       clearable
                       filterable>
              <el-option v-for="item in detailDict"
                         :key="item.id"
                         :label="item.name"
                         :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="ruleForm.detailType === '8965DCCFAA'"
                        prop="dayNumber"
                        label="办理天数"
                        :rules="{required: ruleForm.detailType === '8965DCCFAA ' ? true : false, message: '办理天数为必填项', trigger: 'blur'}">
            <el-input v-model="ruleForm.dayNumber"
                      @input.native="ruleForm.dayNumber=ruleForm.dayNumber.replace(/^[\D]/g, '')"
                      clearable
                      maxlength="2"
                      placeholder="办理天数"></el-input>
          </el-form-item>

        </el-form>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="$emit('close')">取消</el-button>
        <el-button type="primary"
                   @click="modifySubmit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'newCheck',
  props: ['visible', 'title'],
  data() {
    const checkPhone = (value, rule, callback) => {
      const reg = /^1[0-9]{10}$/
      if (!this.ruleForm.phone) {
        return callback(new Error('请输入您的手机号码'))
      } else if (this.ruleForm.phone && this.ruleForm.phone.toString().length < 11) {
        return callback(new Error('您输入的手机号码有误'))
      } else if (this.ruleForm.phone && !reg.test(this.ruleForm.phone)) {
        return callback(new Error('您输入的手机号码有误'))
      } else {
        callback()
      }
    }
    const checkId = (value, rule, callback) => {
      if (!this.ruleForm.idCard) {
        return callback(new Error('请输入您的身份证'))
      } else if (this.ruleForm.idCard && this.ruleForm.idCard.toString().length < 15) {
        return callback(new Error('您输入的身份证信息有误，请核对再输入'))
      } else {
        callback()
      }
    }
    return {
      show: this.visible,
      ruleForm: {
        name: null,
        address: null,
        detailType: null,
        idCard: null,
        phone: null,
        questionDescribe: null,
        questionType: null,
        dayNumber: null
      },
      rules: {
        phone: [
          { required: true, validator: checkPhone, trigger: ['blur'] }
        ],
        idCard: [
          { required: true, validator: checkId, trigger: ['blur'] }
        ],
      },
      deptDict: [],
      questionDict: [],
      detailDict: []
    }
  },
  methods: {
    getDepDict() {
      const url = `/api/sysDept/treeList`
      this.$http.post(url, params).then(res => {
        console.log('Query Dict', res)
      })
    },
    modifySubmit() {
      const url = `/api/question/saveQuestion`
      const params = {
        name: this.ruleForm.name || null,
        address: this.ruleForm.address || null,
        idCard: this.ruleForm.idCard || null,
        phone: this.ruleForm.phone || null,
        detailType: this.ruleForm.detailType || null,
        questionDescribe: this.ruleForm.questionDescribe || null,
        questionType: this.ruleForm.questionType || null,
        dayNumber: this.ruleForm.dayNumber || null
      }
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          this.$http.post(url, params).then(res => {
            console.log('Check In Success', res)
            this.$message.success('登记成功')
            this.$emit('close')
            this.$emit('handleUpdate', true)
          }).catch(err => {
            console.log('Check In Faild.', err)
            this.$message.error('登记失败')
            this.$emit('handleUpdate', false)
          })
        } else {
          console.log('Validate Faild')
        }
      })
    },
    getDetailType() {
      const url = `/api/question/getQuestionDetailType`
      this.$http.get(url).then(res => {
        console.log('Get Detail Type List', res)
        this.detailDict = res.list.map(v => {
          v['name'] = v.value
          return v
        }) || []
      })
    },
    getQuestionDict() {
      const url = `/api/question/getQuestionType`
      this.$http.get(url).then(res => {
        console.log('Get Question Dict.', res)
        this.questionDict = res.list.map(v => {
          v['name'] = v.value
          return v
        }) || []
      })
    }
  },
  mounted() {
    this.getDetailType()
    this.getQuestionDict()
  },
  watch: {
    show(val) {
      this.show = val
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
