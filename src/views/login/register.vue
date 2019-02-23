<template>
  <div class="register-container">
    <el-form :model="registerForm" class="login-form" auto-complete="on" label-position="left" ref="registerForm" >
      <h3 class="title">靳旺论坛</h3>
      <el-form-item prop="name" :rules="[ { required:true,message:'账户不能为空',trigger:'blur' }  ]">
        <el-input v-model="registerForm.account" name="name" type="text" auto-complete="on" placeholder="请输入账户" />
      </el-form-item>
      <el-form-item prop="name" :rules="[ { required:true,message:'姓名不能为空',trigger:'blur' } ]">
        <el-input v-model="registerForm.name" name="name" type="text" auto-complete="on" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item prop="password" :rules="[ { required:true,message:'密码不能为空',trigger:'blur' } ]">
        <el-input
          v-model="registerForm.password"
          name="password"
          auto-complete="on"
          placeholder="请输入密码"
         />
        />
      </el-form-item>
      <el-form-item prop="nickName" :rules="[ { required:true,message:'昵称不能为空' ,trigger:'blur'} ]">
        <el-input v-model="registerForm.nickName" placeholder="请输入昵称" auto-complete="on" ></el-input>
      </el-form-item>
      <el-form-item prop="sex" :rules="[ { required:true,message:'性别不能为空' ,trigger:'blur'} ]">
        <el-select v-model="registerForm.sex" placeholder="请选择性别" size="medium" style="width: 100%">
          <el-option  label="男" value='男'>男</el-option>
          <el-option  label="女" value='女'>女</el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="qq" :rules="[ { required:true,message:'QQ账户不能为空',trigger:'blur' } ]">
        <el-input v-model="registerForm.qq" placeholder="请输入QQ号" auto-complete="on" ></el-input>
      </el-form-item>
      <el-form-item  prop="phone"  :rules="[ { required:true,message:'手机号不能为空',trigger:'blur' } ]">
        <el-input v-model="registerForm.phone" placeholder="请输入手机号" auto-complete="on" ></el-input>
      </el-form-item>
      <el-button  type="primary" style="width:100%;" @click= 'OnRegister'>
        注册
      </el-button>
    </el-form>
  </div>
</template>


<script>
  import BaseVue from '../../components/BaseComponents/BaseVue'
  import {register} from '../../api/user/login'
  import {md5} from '../../utils/common'
  export default {
    name: 'register',
    extends: BaseVue,
    data(){
      const validatePass = (rule, value, callback) => {
        if (value.length < 5) {
          callback(new Error('密码不能小于5位'))
        } else {
          callback()
        }
      }
      return{
        registerForm: {
          account:'',
          name: '',
          password: '',
          sex: '',
          nickName: '',
          qq: '',
          phone: '',

        },
        registerRules: {
          name: [{  trigger: 'blur', validator: '' }],
          password: [{ required: true, trigger: 'blur', validator: '' }],
          sex: [{ required: true, trigger: 'blur', validator: '' }],
          nickName: [{ required: true, trigger: 'blur', validator: '' }],
          qq: [{ required: true, trigger: 'blur', validator: '' }],
          phone: [{ required: true, trigger: 'blur', validator: '' }],
        },
      }
      },
    methods:{
      OnRegister(){
        this.$refs.registerForm.validate(valid =>{
          if (valid){
            this.loading = true
            const pass=md5(this.registerForm.password)
            this.registerForm.password=pass
            this.invokeApi(register,this.registerForm).then((resolve,reject) =>{
              this.messageBox({
                title: '成功',
                type: 'success',
                content: '是否返回上一级页面？'
              }).then(() => {
                this.prev()
              })
            }).catch(error=>{
              alert(error)
            })
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
  .register-container {
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
  .register-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;
    .login-form {
      position: relative;
      left: 0;
      right: 0;
      width: 520px;
      max-width: 100%;
      padding: 35px 10px 15px 35px;
      margin: 10px auto;
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
