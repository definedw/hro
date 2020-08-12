<template>
  <div>
    <div class="login-content">
      <div class="login-logo">
        <!-- <img src="../assets/staff/login-logo.png"
             alt="Top Education Institute" /> -->
      </div>

      <div class="login-head border-bottom">
        <h1>登 录</h1>
      </div>
      <el-form ref="ruleForm"
               :rules="rules"
               model="ruleForm">
        <el-form-item prop="userName">
          <el-input v-model.trim="ruleForm.userName"
                    clearable
                    placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="ruleForm.password"
                    clearable
                    placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    const checkUser = (rule, value, callback) => {

    }
    const checkPassword = (rule, value, callback) => {

    }
    return {
      ruleForm: {},
      rules: {
        userName: [
          {
            required: true,
            validator: checkUser,
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            validator: checkPassword,
            trigger: 'blur'
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
