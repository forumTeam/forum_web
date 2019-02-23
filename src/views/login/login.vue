<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm"  class="login-form" auto-complete="on" label-position="left" >
      <h3 class="title">靳旺论坛</h3>
      <el-form-item prop="username" :rules="[ { required:true,message:'账户不能为空' } ]" >
        <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="请输入手机号码或账户"  />
      </el-form-item>
      <el-form-item prop="password"  :rules="[
           { required: true, message: '密码不能为空'},
          ]">
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="请输入密码"

          @keyup.enter.native="handleLogin" />

      </el-form-item>
      <el-form-item>
        <el-button :loading="loading"  type="primary" style="width:100%;" @click= 'handleLogin'>
          登 陆
        </el-button>
      </el-form-item>
      <el-button style="float: right;" type="text">忘记密码</el-button>
      <el-button style="float: left;" type="text" @click="goRegister">注册</el-button>
    </el-form>
  </div>
</template>

<script>
import BaseVue from '../../components/BaseComponents/BaseVue'
  export default {
    extend:BaseVue,
    name: 'Login',
    data() {
      return {
        loginForm: {
          username: 'A10000',
          password: '123456'
        },
        loading: false,
        pwdType: 'password',
        redirect: undefined
      }
    },
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      forgetPassword() {
        this.$router.push({
          path: '/ForgetPassword'
        })
      },

      goRegister(){
        this.$router.push({
          path: '/register'
        })
      },
      handleLogin(){
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('Login', this.loginForm).then(() => {
              this.loading = false
              this.$router.push({ path: this.redirect || '/personalCenter/personaLinformation' })
            }).catch(() => {
              this.loading = false
            })
          } else {
            return false
          }
        })
      }



      }


  }
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg:#2d3a4b;
  $light_gray:#eee;

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;
  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 520px;
      max-width: 100%;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
