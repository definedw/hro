<template>
  <div>
    <el-dialog :title="title"
               :visible="show"
               @close="$emit('close')"
               :close-on-click-modal="false">
      <div class="page-form">
        <el-form :model="ruleForm"
                 ref="ruleForm"
                 :rules="rules"
                 v-if="type === 'audit'">
          <el-form-item prop="isAuth"
                        :rules="{required: true, message: '请先完结此流程', trigger: 'blur'}"
                        label="是否通过审批">
            <el-select v-model="ruleForm.isAuth"
                       placeholder="化解单位"
                       clearable
                       filterable>
              <el-option v-for="item in authDict"
                         :key="item.value"
                         :label="item.name"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="ruleForm.isAuth === 2"
                        prop="rejectReason"
                        label="拒绝理由"
                        :rules="{required: true, message: '请填写拒绝理由', trigger: 'blur'}">
            <el-input v-model="ruleForm.rejectReason"
                      clearable
                      type="textarea"
                      label="请描述拒绝理由"
                      limit="2000"></el-input>
          </el-form-item>

        </el-form>
        <el-form :model="eRuleForm"
                 ref="eRuleForm"
                 :rules="rules"
                 v-else-if="type === 'setDate'">
          <el-form-item prop="dayNumber"
                        label="办理天数"
                        :rules="{required: true, message: '请填写办理天数', trigger: 'blur'}">
            <el-input v-model="eRuleForm.dayNumber"
                      clearable
                      @input.native="eRuleForm.dayNumber=eRuleForm.dayNumber.replace(/^[\D]/g, '')"
                      label="办理天数"
                      limit="2"></el-input>
          </el-form-item>

        </el-form>
        <el-form :model="anRuleForm"
                 ref="anRuleForm"
                 :rules="rules"
                 v-else>
          <el-form-item prop="detailDescribe"
                        label="办结回复"
                        :rules="{required: true, message: '请填写办结理由', trigger: 'blur'}">
            <el-input v-model="anRuleForm.detailDescribe"
                      clearable
                      label="请填写办结回复"
                      type="textarea"
                      limit="2000"></el-input>
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
  name: 'auditDialog',
  props: ['visible', 'id', 'title', 'type'],
  data() {
    const t = new Date()
    const y = t.getFullYear(),
      m = t.getMonth() + 1 < 10 ? '0' + (t.getMonth() + 1) : t.getMonth() + 1,
      d = t.getDate() < 10 ? '0' + t.getDate() : t.getDate()
    const endDate = `${y}-${m}-${d}`
    return {
      show: this.visible,
      etype: this.type,
      ruleForm: {
        detailId: null,
        isAuth: null,
        rejectReason: null,
        endDate: endDate
      },
      eRuleForm: {
        dayNumber: null
      },
      anRuleForm: {
        detailDescribe: null
      },
      rules: {

      },
      authDict: [
        {
          value: 1,
          name: '通过'
        },
        {
          value: 2,
          name: '拒绝'
        }
      ]
    }
  },
  methods: {
    modifySubmit() {
      const url = `/api/question/isAuditAuth`
      const eUrl = `/api/question/afreshAssign`
      const anUrl = `/api/question/done`
      const params = {
        detailId: this.id,
        isAuth: this.ruleForm.isAuth,
        rejectReason: this.ruleForm.rejectReason || null,
        endDate: this.ruleForm.endDate
      },
        eParams = {
          detailId: this.id,
          dayNumber: this.eRuleForm.dayNumber
        },
        anParams = {
          id: this.id,
          detailDescribe: this.anRuleForm.detailDescribe
        }
      const TYPE = this.etype
      switch (TYPE) {
        case 'audit':
          this.$refs['ruleForm'].validate(valid => {
            if (valid) {
              this.$http.post(url, params).then(res => {
                console.log('Audit Submit.', res)
                this.$message.success('提交成功')
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
          break
        case 'setDate':
          this.$refs['eRuleForm'].validate(valid => {
            if (valid) {
              this.$http.post(eUrl, eParams).then(res => {
                console.log('Audit Submit.', res)
                this.$message.success('提交成功')
                this.$emit('close')
                this.$emit('handleUpdate', true)
              }).catch(err => {
                console.log('Check In Faild.', err)
                this.$message.error('提交失败，请稍后重试')
                this.$emit('handleUpdate', false)
              })
            } else {
              console.log('Validate Faild')
            }
          })
          break
        default:
          this.$refs['anRuleForm'].validate(valid => {
            if (valid) {
              this.$http.post(anUrl, anParams).then(res => {
                console.log('Audit Submit.', res)
                this.$message.success('提交成功')
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
      }

    }
  },
  watch: {
    show(val) {
      this.show = val
    },
    etype(val) {
      this.etype = val
    }
  },
  mounted() {
    console.log(this.$refs)
  }
}
</script>

<style lang="scss" scoped>
</style>
