<template>
  <div >
    <div class="imageBox">
      <el-upload
      :headers="getHeaders()"
      :before-upload="beforeUpload"
      :show-file-list="true"
      :file-list="imageList"
      :data="additionalArgument"
      name="image"
      class="avatar-uploader"
      ref="uploadImage"
      :action="getAction()"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-success="uploadSuccess"
      :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
    </div>
    <el-dialog :visible.sync="showDialog">
      <img width="100%" :src="imageUrl" :alt="imageUrl">
    </el-dialog>
  </div>
</template>


<script>
  import BaseVue from '../BaseVue'
  import { getToken } from '../../../utils/auth'
  export default {
    name: 'BImageUpload',
    extends: BaseVue,
    props:{
      prop:{
        type: String,
        default: ''
      },
      defaultImage: {
        type: String,
        default: null
      }
    },
    data(){
      return {
        imageList: [],
        showDialog: false,
        imageUrl: '',
        additionalArgument: {
          forumType: 'forum'
        }
      }
    },
    methods:{
      getHeaders() {
        return {
          token: getToken()
        }
      },
      beforeUpload() {
        this.startLoading()
      },
      getAction() {
        return process.env.BASE_API + '/system/uploadFile/image'
      },
      handlePictureCardPreview(file) {
        this.imageUrl = file.url
        this.showDialog = true
      },
      uploadSuccess(response) {
        this.imageUrl = process.env.IMAGE_URL + response.data
        this.$emit('change', {
          name: this.prop,
          path: response.data
        })
        this.endLoading()
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
    },
    defaultImage: function(value) {
      if (value) {
        this.imageUrl = process.env.IMAGE_URL + value
        this.imageList = []
        this.imageList.push({
          name: '',
          url: this.imageUrl
        })
      }
    }

  }
</script>


<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #747474;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .imageBox {
    width: 150px;
    height: 150px;
    overflow: hidden;
  }
</style>
