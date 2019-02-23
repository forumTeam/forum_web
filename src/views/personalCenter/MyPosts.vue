<template>
  <div>
    <div >

      <el-card shadow="always" style="width: 60%;float: right;margin-right: 10px;">
        最新战况： {{this.marqueeList[0].name}}{{this.marqueeList[0].city}}{{this.marqueeList[0].amount}}
      </el-card>

      <el-card shadow="always" style="width: 60%;float: right;margin-right: 10px;margin-top: 15px">
        <div class="inner-container">
          <p class="text" v-for="(item, index) in arr" :key="index" style="text-align: left;line-height: 50px;border-bottom: #001528 1px dashed ">
            <router-link tag='a' :to="'/'" >{{item.postsTitle}}<span style="float: right;margin-right: 50px">{{item.nickName}}</span></router-link>
          </p>
        </div>
      </el-card>

      <table-view :tabs="tableView.tabs"
                  :table="tableView.table"
                  :resources="tableView.resources"
                  :buttons="tableView.buttons"
                  :searchCondition="tableView.searchCondition"
                  style="width: 36%">
      </table-view>

    </div>
  </div>



</template>


<script>
  import TableView from '../../components/BaseComponents/view/TableView'
  import BaseVue from '../../components/BaseComponents/BaseVue'
  import {selectPosts } from '../../api/myPosts/index'
  import BScroll from 'better-scroll'
  export default {
    name:'myPosts',
    extends:BaseVue,
    components:{TableView},
    data(){
      return {
        arr: [],
        marqueeList: [
          {
            name: '1军',
            city: '北京',
            amount: '10'
          },
          {
            name: '2军',
            city: '上海',
            amount: '20'
          },
          {
            name: '3军',
            city: '广州',
            amount: '30'
          },
          {
            name: '4军',
            city: '重庆',
            amount: '40'
          }
        ],
        animate: false,
        tableView: {
          tabs: [
            /*{name: '所有帖子', prop: 'All', value:"All", isDefault: true},*/
            {name: '我的帖子', prop: 'myPosts', value: "myPosts",isDefault: true},
          ],
          buttons:[
            {type:'primary',name:'我要发帖',click:this.goToAddPosts}
          ],
          searchCondition: {
            labelWidth: '90px',
            content: [
              {prop: 'postsTitle', label: '帖子标题'},
            ]
          },
          table: {

            border:false,
            content: [
              {prop: 'postsTitle', label: '帖子标题'},
              {prop: 'nickName', label: '创建人'},
              {prop: 'createTime', label: '创建时间', type: 'time'},
            ],
          },
          resources: {
            api: selectPosts,
            refresh: 0,
            parameters: {

            }
          }
        }
      }
    },
    created(){
      setInterval(this.showMarquee, 2000)
      this.selectPosts('All',1,999)
    },
    methods:{
      selectPosts(All ,pageIndex,pageSize){
        this.invokeApi(selectPosts,{
          All ,pageIndex,pageSize
        }).then(response=>{
          this.arr=response.data
        })
      },
       goToAddPosts(){
         this.goto('./AddPosts')
       },
      showMarquee: function () {
        this.animate = true;
        setTimeout(()=>{
          this.marqueeList.push(this.marqueeList[0]);
          this.marqueeList.shift();
          this.animate = false;
        },500)},
    }

  }


</script>


<style scoped>
  .inner-container {
    animation: myMove 7s linear infinite;
    animation-fill-mode: forwards;

  }
  /*文字无缝滚动*/
  @keyframes myMove {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-150px);
    }

  }

</style>
