<template>
  <div>
    <div>


      <!--评论弹窗-->
      <el-dialog
        title="请输入评论内容"
        :visible.sync="dialogVisible"
        width="25%"
        :before-close="handleClose">

        <el-form>
          <el-form-item>
            <el-input v-model="postsContent" type="textarea"></el-input>
          </el-form-item>

        </el-form>


        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="comment()">确 定</el-button>
  </span>

      </el-dialog>


      <b-form :form="form"></b-form>
      <table-view :tabs="tableView.tabs"
                  :table="tableView.table"
                  :resources="tableView.resources"
                  :buttons="tableView.buttons"
                  :operations="tableView.operations"
                  :searchCondition="tableView.searchCondition"
      >
      </table-view>

    </div>
  </div>


</template>


<script>
  import BForm from '../../../components/BaseComponents/element/BForm'
  import TableView from '../../../components/BaseComponents/view/TableView'
  import BaseVue from '../../../components/BaseComponents/BaseVue'
  import {selectPostsDetail} from '../../../api/myPosts/index'
  import {addPostsDetail,selectComment } from '../../../api/myPosts/index'
  import { successMessageBox,errorMessageBox } from "../../../utils/message";

  export default {
    name: 'myPosts',
    extends: BaseVue,
    components: {TableView, BForm},
    data() {
      return {
        dialogVisible: false,
        pkPostsId:'',
        postsContent:'',
        form: {
          api: '',
          title: '帖子详情',
          labelWidth: '140px',
          model: {},
          formItems: [
            {name: 'postsTitle', label: '帖子标题', required: true, type: 'normal'},
            {name: 'postsContent', label: '帖子内容', required: true, type: 'normal'},
          ],
        },
        tableView: {
          tabs: [
            {name: '评论', prop: 'myPosts', value: "myPosts", isDefault: true},
          ],
          buttons: [
            {type: 'primary', name: '我要评论', click: this.goToAddPosts}
          ],
          table: {

            border: false,
            content: [
              {prop: 'nickName', label: '评论人'},
              {prop: 'content', label: '评论内容'},
              {prop: 'createTime', label: '创建时间', type: 'time'},
            ],
          },
          operations:[

          ],
          resources: {
            api: selectComment,
            refresh: 0,
            parameters: {
              pkPostsId:this.$route.query.pkPostsId
            }
          }
        }
      }
    },
    created() {
     this.create()
    },
    methods: {

      create(){
        this.pkPostsId=this.$route.query.pkPostsId
        this.invokeApi(selectPostsDetail,{ pkPostsId : this.pkPostsId}).then(response =>{
          this.form.model=response.data
        })

      },

      goToAddPosts(){
        this.dialogVisible=true
      },
      handleClose(){
        this.dialogVisible=false
      },
      comment(){
        this.pkPostsId=this.$route.query.pkPostsId
        this.dialogVisible = false
        this.invokeApi(addPostsDetail,{ pkPostsId : this.pkPostsId,content:this.postsContent}).then(response =>{
          successMessageBox('评论成功')
          this.tableView.resources.refresh++
        }).catch(error=>{

        })
      }

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
