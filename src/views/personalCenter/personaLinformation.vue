<template>
  <div>
    <el-card style="margin-left: 1%">
      <el-steps :space="1000" :active="this.step" finish-status="success" style="margin-left: 15%;margin-top: 1%">
        <el-step title="注册账号"></el-step>
        <el-step title="完善资料"></el-step>
        <el-step title="完成信息修改"></el-step>
      </el-steps>
    </el-card>


    <el-card style="margin:1%">
      <div id="myChart" style="width: 400px;height: 300px;float: left;margin-left: 8%" ></div>
      <div id="Chart" style="width: 400px;height: 300px;float: right;margin-right: 10%"></div>
    </el-card>


    <b-form :form="form"></b-form>
  </div>


</template>

<script>
  import BaseVue from '../../components/BaseComponents/BaseVue'
  import BForm from '../../components/BaseComponents/element/BForm'
  import {getUserDetail,count} from '../../api/personalCenter/index'

  export default {
    name: 'personaLinformation',
    extends: BaseVue,
    components: {BForm},

    created() {
      this.getUserDetail()

      this.count()
    },

    data() {
      return {
        postCount:[],
        postTime:[],
        spaceTime:[],
        spaceCount:[],
        step: 2,
        pkCustomerId: null,
        form: {
          api: null,
          title: '个人信息',
          labelWidth: '140px',
          model: {},
          formItems: [
            {name: 'name', label: '姓名', required: true, type: 'normal'},
            {name: 'nickName', label: '昵称', required: true, type: 'normal'},
            {name: 'account', label: '账号', required: true, type: 'normal'},
            {name: 'password', label: '密码', required: true, type: 'normal'},
            {name: 'sex', label: '性别', required: true, type: 'normal'},
            {name: 'birthday', label: '出生日期', formatter: 'date', type: 'normal'},
            {name: 'telephone', label: '手机号码', required: true, validator: 'phone', type: 'normal'},
            {name: 'qq', label: 'QQ号', type: 'normal'},
            {name: 'totalTotal', label: '帖子数', type: 'normal'},
            {name: 'dynamicTotal', label: '动态数', type: 'normal'},
            {name: 'createTime', label: '创建时间', formatter: 'date', type: 'normal'},
            {name: 'headerImage', label: '头像', type: 'image'},

          ],

        },
      }
    },
    mounted() {

    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: {text: '帖子动态'},
          tooltip : {
            trigger: 'axis'
          },
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              data : this.postTime
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:'帖子数',
              type:'line',
              stack: '总量',
              data:this.postCount
            },
          ]
        });
      },


    space(){
      let myChart = this.$echarts.init(document.getElementById('Chart'))
      // 绘制图表
      myChart.setOption({
        title: {text: '空间动态'},
        tooltip : {
          trigger: 'axis'
        },
        xAxis : [
          {
            type : 'category',
            boundaryGap : false,
            data : this.spaceTime
          }
        ],
        yAxis : [
          {
            type : 'value'
          }
        ],
        series : [
          {
            name:'动态数',
            type:'line',
            stack: '总量',
            data:this.spaceCount
          },
        ]
      });
    },




      timeFormate(timeStamp) {
        let year = new Date(timeStamp).getFullYear();
        let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
        let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
        let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
        let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
        // let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
        // return year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
       // let nowTime = year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
        let nowTime =  month + "月" + date +"日";
        return nowTime
        // console.log(this.nowTime);
      },



      getUserDetail() {
        this.invokeApi(getUserDetail).then(response => {
          this.form.model = response.data
          if (response.data.birthday === null || response.data.telephone === null || response.data.headerImage === null) {
              this.step=1
          }
          if (response.data.birthday != null && response.data.telephone != null && response.data.headerImage != null) {
            this.step=3
          }
        })
      },
      count(){
        this.invokeApi(count).then(response=>{
          for(let i of response.data.post){
            this.postCount.push(i.PostsCount)
            this.postTime.push(this.timeFormate(i.createPostsTime))
          }
          for(let i of response.data.dynamic){
            this.spaceCount.push(i.DynamicCount)
            this.spaceTime.push(this.timeFormate(i.createDynamicTime))
          }
          this.drawLine();
          this.space()
        })
      },

    }
  }
</script>

<style scoped>

</style>
