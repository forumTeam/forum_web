<template>
  <b-form :form="form"></b-form>
</template>

<script>
  import BaseVue from '../../components/BaseComponents/BaseVue'
  import BForm from '../../components/BaseComponents/element/BForm'
  import {getUserDetail} from '../../api/personalCenter/index'

  export default {
    name: 'personaLinformation',
    extends: BaseVue,
    components: {BForm},

    created() {
      this.getUserDetail()
    },

    data() {
      return {
        pkCustomerId: null,
        form: {
          api: null,
          title: '个人信息',
          labelWidth: '140px',
          model: {},
          formItems: [
            {name: 'name', label: '姓名', required: true, type:'normal'},
            {name: 'nickName', label: '昵称', required: true,type:'normal'},
            {name: 'account', label: '账号', required: true,type:'normal'},
            {name: 'password', label: '密码', required: true,type:'normal'},
            {name: 'sex', label: '性别', required: true,type:'normal'},
            {name: 'birthday', label: '出生日期', formatter: 'date',type:'normal'},
            {name: 'telephone', label: '手机号码', required: true, validator: 'phone',type:'normal'},
            {name: 'qq', label: 'QQ号',type:'normal'},
            {name: 'totalTotal', label: '帖子数',type:'normal'},
            {name: 'dynamicTotal', label: '动态数',type:'normal'},
            {name: 'createTime', label: '创建时间', formatter: 'date',type:'normal'},
            {name: 'headerImage', label: '头像', type: 'image'},

          ],

        },
      }
    },
    methods: {
      getUserDetail() {
        this.invokeApi(getUserDetail).then(response => {
          this.form.model = response.data
        })
      }

    }
  }
</script>

<style scoped>

</style>
