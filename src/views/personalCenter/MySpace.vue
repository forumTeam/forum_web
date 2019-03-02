<template>

  <div>

    <div>

      <el-card>
        <h3>今日头条</h3>
        <el-carousel :interval="4000" type="card" height="150px" autoplay arrow="hover">
          <el-carousel-item v-for="item in Headline" :key="item">
            <h3 class="tc" style="text-align: center">{{ item.dynamicTitle }}: {{ item.dynamicContent }}</h3>
          </el-carousel-item>
        </el-carousel>
      </el-card>
    </div>

    <div style="margin-top: 1%">
      <el-card>
        <h3>今日热门</h3>
        <el-collapse>
          <div  v-if="!HotToday" >暂无数据</div>
          <el-collapse-item  v-for="item in HotToday" :title="item.dynamicTitle"  name="1" :key="item">
            <div>{{item.dynamicContent}}</div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </div>
    <table-view :tabs="tableView.tabs"
                :table="tableView.table"
                :resources="tableView.resources"
                :buttons="tableView.buttons"
                :searchCondition="tableView.searchCondition"
                 style="margin-top: 1%">
    </table-view>

    <el-dialog
      :visible="add_space_show"
      title="添加动态"
      :before-close="closeReviseMaterial"
      width="20%">
         <el-form :rules="formRules">
           <el-form-item  label="标题">
             <el-input v-model="form.dynamicTitle"></el-input>
           </el-form-item>
           <el-form-item  label="内容">
             <el-input v-model="form.dynamicContent"></el-input>
           </el-form-item>
           <el-form-item>
             <el-button type="primary" @click="onSubmit" style="margin-left: 15%">立即创建</el-button>
             <el-button @click="close">取消</el-button>
           </el-form-item>

         </el-form>



    </el-dialog>




  </div>


</template>


<script>
  import TableView from '../../components/BaseComponents/view/TableView'
  import BaseVue from '../../components/BaseComponents/BaseVue'
  import {selectDynamic,addDynamic } from '../../api/myDynamic/index'
  export default {
    extends:BaseVue,
    components:{TableView},
    data(){
      return {
        Headline:[],
        HotToday:[],
        add_space_show:false,
        arr:[],
        form:{
          dynamicTitle:'',
          dynamicContent:'',
        },

        formRules:{
          dynamicTitle:[{ required:true,message:'请输入标题' }],
          dynamicContent:[{ required:true,message:'请输入内容' }]
        },


        tableView: {
          tabs: [
            {name: '我的动态', prop: 'myPosts', value: "myPosts",isDefault: true},
          ],
          buttons:[
            {type:'primary',name:'我要发动态',click:this.AddSpace}
          ],
          searchCondition: {
            labelWidth: '90px',
            content: [
              {prop: 'dynamicTitle', label: '动态标题'},
            ]
          },
          table: {

            border:false,
            content: [
              {prop: 'dynamicTitle', label: '动态标题'},
              {prop: 'nickName', label: '创建人'},
              {prop: 'createTime', label: '创建时间', type: 'time'},
            ],
          },
          resources: {
            api: selectDynamic,
            refresh: 0,
            parameters: {

            }
          }
        }
      }
    },
    created(){
      this.selectDynamic(0,15)
    },

    methods:{
      AddSpace(){
        this.add_space_show=true
        this.form={
          dynamicTitle:'',
          dynamicContent:'',
        }
      },
      selectDynamic(pageIndex,pageSize){
        this.invokeApi(selectDynamic,{pageIndex,pageSize}).then(response=>{
          this.arr=response.data
         for(let i=0; i<this.arr.length;i++){
            if (i<=3) this.Headline.push(this.arr[i])
            if (i>=4 && i<=6)  this.HotToday.push(this.arr[i])
           if (i=== 6 )break;
         }


        })
      },
      handleChange(val) {
        console.log(val);
      },
      close(){
        this.add_space_show=false
        this.form={
          dynamicTitle:'',
          dynamicContent:'',
        }
      },

      onSubmit() {
            this.invokeApi(addDynamic,this.form).then(response=>{
              this.close()
              this.selectDynamic(0,15)
              this.tableView.resources.refresh++
            })
      },
      closeReviseMaterial(){
        this.add_space_show=false
        this.form={
          dynamicTitle:'',
          dynamicContent:'',
        }
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
