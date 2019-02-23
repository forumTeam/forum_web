<template>
  <el-card style="margin-bottom: 15px;" :class="{ hidden:isHidden }">
    <div slot="header" class="clearfix">
      <!-- 左侧图标 -->
      <i class="iconfont" :class="icon" ></i>

      <!-- 左侧标题 -->
      <span>{{title}}</span>

      <!--  右侧 折叠按钮 -->
      <el-button v-show="isShowDropDownButton" :icon="dropDownClass" style="float: right; padding: 3px 0" type="text" @click="toggleHidden"></el-button>

      <!--  右侧 返回上一步按钮 -->
      <el-button v-show="!isHiddenPre" icon="el-icon-back" style="float: right;padding:3px 0 " type="text" @click="prev">
        {{prePageText || '返回上一页'}}
      </el-button>
    </div>

    <!-- 主要内容区域 -->
    <slot></slot>
  </el-card>
</template>

<script>
  import BaseVue from '../../BaseComponents/BaseVue'
  export default {
    name:'BContainer',
    extends:BaseVue,
    created() {
      this.endLoading()
    },
    props:{
      title:{
        type:String,
        default:''
      },

      isHiddenPre: {                /* 是否隐藏上一页按钮 */
        type: Boolean,
        default: false
      },
      isHidden: {                   /* 是否可以隐藏 */
        type: Boolean,
        default: false
      },
      icon: {                       /* 图标 */
        type: String,
        default: ''
      },

      isShowDropDownButton:{
        type: Boolean,
        default: false
      },
      prePageText: {                /* 返回上一页文字 */
        type: String,
        default: null
      },
    },
    methods:{
      toggleHidden(){
        this.isHidden=!this.isHidden
      }
    },
    computed:{
      //切换表单隐藏按钮
      dropDownClass: function() {
        if (this.isHidden) return 'el-icon-arrow-up'
        return 'el-icon-arrow-down'
      }
    }
  }
</script>



<style scoped></style>
