<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb/>
     <el-dropdown class="avatar-container" trigger="click">
       <div class="" style="margin-right:100px;">
        <slot>与我相关</slot>

       </div>
     </el-dropdown>

    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <!-- <img :src="getImage(avatar)" class="user-avatar">-->
        <div class="avatarUserName">
          <span>{{this.model.nickName}}</span>
          <i class="el-icon-caret-bottom"/>
        </div>
        <div class="clear: both;"></div>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link class="inlineBlock" to="/personalCenter/personaLinformation">
          <el-dropdown-item>
            主页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span style="display: block;" @click="logout">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>


<script>
  import { mapGetters } from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  import BaseVue from '../../../components/BaseComponents/BaseVue'
  import {getUserDetail} from '../../../api/personalCenter/index'
  export default {
    extends: BaseVue,
    components: {
      Hamburger,
      Breadcrumb
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'name',
        'avatar'
      ])
    },
    mounted(){
      this.getUserDetail()

    },

    data(){
      return{
        model:{},
      }
    },
    methods: {
      getUserDetail() {
        this.invokeApi(getUserDetail).then(response => {
          this.model = response.data
        })
      },
      toggleSideBar() {
        this.$store.dispatch('ToggleSideBar')
      },
      logout() {
        this.$store.dispatch('LogOut').then(()=>{
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      }
    }
  }


</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }
    .screenfull {
      position: absolute;
      right: 90px;
      top: 16px;
      color: red;
    }
    .avatar-container {
      height: 50px;
      display: inline-block;
      position: absolute;
      right: 35px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        line-height: initial;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          float: left;
          margin-right: 10px;
        }
        .avatarUserName {
          float: left;
          margin-top: 11px;
        }
        .avatarUserName i {
          margin-top: -12px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
</style>
