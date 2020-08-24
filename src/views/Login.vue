<template>
  <div>
    <div class="login-content">

      <div class="login-box">
        <div class="login-logo">
          <img src="../assets/logo.png"
               alt="Top Education Institute" />
        </div>
        <!-- <div class="login-head border-bottom">
          <h1>登 录</h1>
        </div> -->
        <div class="page-form">
          <el-form ref="ruleForm"
                   :rules="rules"
                   :model="ruleForm">
            <el-form-item prop="userName">
              <el-input v-model.trim="ruleForm.userName"
                        clearable
                        placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="ruleForm.password"
                        show-password
                        clearable
                        placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item class="login-btn">
              <el-button @click="loginIn"
                         type="primary">登 录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    const checkUser = (rule, value, callback) => {
      const reg = /^[0-9A-Za-z_.]/g
      if (!this.ruleForm.userName) {
        return callback(new Error('请输入用户名'))
      }
      // else if (this.ruleForm.userName && !reg.test(this.ruleForm.userName)) {
      //   return callback(new Error('请输入正确的用户名，不包含特殊字符'))
      // } 
      else {
        callback()
      }
    }
    const checkPassword = (rule, value, callback) => {
      if (!this.ruleForm.password) {
        return callback(new Error('请输入密码'))
      } else if (this.ruleForm.password && this.ruleForm.password.toString().length < 6) {
        return callback(new Error('请输入不少于6位字符密码'))
      } else {
        callback()
      }
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
  },
  methods: {
    loginIn() {
      const url = `/api/login/login`
      const params = {
        loginType: '',
        name: this.ruleForm.userName,
        pwd: this.ruleForm.password
      }
      const _ = this
      _.$refs['ruleForm'].validate(valid => {
        if (valid) {
          _.$http.post(url, params).then(res => {
            console.log('Login right.', res)
            sessionStorage.setItem('isLogin', 1)
            _.$router.push({
              path: '/dashboard'
            })
          }).catch(err => {
            console.log('Login Faild.', err)
            // _.$message.error(`${err.msg}`)
          })
        } else {
          console.log('Validate Faild')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-btn {
  text-align: center;
}
</style>
