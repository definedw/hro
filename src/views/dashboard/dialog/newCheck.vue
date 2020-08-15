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
          <el-form-item prop="address"
                        label="详细地址（街道、门牌）">
            <el-input v-model="ruleForm.address"
                      clearable></el-input>
          </el-form-item>
          <el-form-item prop="deptId"
                        label="指定单位">
            <el-select v-model="ruleForm.deptId"
                       placeholder="指定单位"
                       clearable
                       @change="getDepDict"
                       filterable>
              <el-option v-for="item in deptDict"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
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
          <el-form-item prop="questionDescribe"
                        label="事项描述">
            <el-input v-model="ruleForm.questionDescribe"
                      maxlength="1000"
                      type="textarea"></el-input>
          </el-form-item>
          <el-form-item prop="questionType"
                        label="事项类型">
            <el-input v-model="ruleForm.questionType"
                      placeholder="请描述事项类型"></el-input>
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
    return {
      show: this.visible,
      ruleForm: {},
      rules: {},
      deptDict: []
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
