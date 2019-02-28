<template>

  <div>

    <div>

      <el-card>
        <h3>今日头条</h3>
        <el-carousel :interval="4000" type="card" height="300px" loop="true">
          <el-carousel-item v-for="item in zoumaList" :key="item">
            <h3 class="tc">{{ item.dynamicTitle }}: {{ item.dynamicContent }}</h3>
          </el-carousel-item>
        </el-carousel>
      </el-card>
    </div>

    <div style="margin-top: 2%">
      <el-card>
        <h3>今日热门</h3>
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="一致性 Consistency" name="1">
            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </div>


  </div>


</template>


<script>
  import BaseVue from '../../components/BaseComponents/BaseVue'
  import {selectPosts } from '../../api/myPosts/index'
  import {selectDynamic } from '../../api/myDynamic/index'
  export default {
    extends:BaseVue,
    data(){
      return {
        activeNames: ['1'],
        arr: [],
        zoumaList: [
          {
            dynamicTitle: '江南一剪梅',
            dynamicContent: '海角天涯望古都，瑶琴一把系孤独'
          },
          {
            dynamicTitle: '秋物语',
            dynamicContent: '花魂散去天涯寂，云袖飘来海角平'
          }
        ],
        animate: false
      }
    },
    created(){
//      this.selectDynamic(1,10);
//      this.zoumaList=this.arr;
    },
    methods:{
      selectDynamic(pageIndex,pageSize){
        this.invokeApi(selectDynamic,{
          pageIndex,pageSize
        }).then(response=>{
          this.arr=response.data
        })
      },
      handleChange(val) {
        console.log(val);
      }

    }

  }



</script>


<style>
  .tc{
    text-align:center;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
