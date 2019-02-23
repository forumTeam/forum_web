<template>
        <b-form :form="form"></b-form>
</template>

<script>
  import BaseVue from '../../../components/BaseComponents/BaseVue'
  import BForm from '../../../components/BaseComponents/element/BForm'
  import {addPosts } from '../../../api/myPosts/index'
  export  default {
    name:'addPosts',
    extends:BaseVue,
    components:{BForm},
    data(){
      return{
        form:{
          api: addPosts,
          title: '添加帖子',
          labelWidth: '140px',
          model: {},
          formItems:[
            {name: 'postsTitle', label: '帖子标题', required: true,},
            {name: 'postsContent', label: '帖子内容', required: true,},
          ],
          operations: [
            { name: '保存', type: 'primary', click: 'OnSubmit' },
          ]
        }
      }
    }

  }

</script>


<style>

</style>
