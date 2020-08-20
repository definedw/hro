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
                        label="拒绝理由">
            <el-input v-model="ruleForm.rejectReason"
                      clearable
                      type="textarea"
                      label="请描述拒绝理由"
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
  props: ['visible', 'id', 'title'],
  data() {
    const t = new Date()
    const y = t.getFullYear(),
      m = t.getMonth() + 1 < 10 ? '0' + (t.getMonth() + 1) : t.getMonth() + 1,
      d = t.getDate() < 10 ? '0' + t.getDate() : t.getDate()
    const endDate = `${y}-${m}-${d}`
    return {
      show: this.visible,
      ruleForm: {
        detailId: null,
        isAuth: null,
        rejectReason: null,
        endDate: endDate
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
      const url = `/api/question/afreshAssign`
      const params = {
        detailId: this.id,
        isAuth: this.ruleForm.isAuth,
        // isAuth: '2',
        rejectReason: this.ruleForm.rejectReason || null,
        endDate: this.ruleForm.endDate
      }

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
    }
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
