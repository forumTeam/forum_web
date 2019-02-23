<template>
  <div>
    <el-upload
      :headers="getHeaders()"
      :before-upload="beforeUpload"
      :show-file-list="true"
      :file-list="imageList"
      :data="additionalArgument"
      name="image"
      :action="getAction()"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-success="uploadSuccess"
      :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="dialogImageUrl">
    </el-dialog>
  </div>
</template>
<script>
  import { getToken } from '../../../utils/auth'
  import BaseVue from '../BaseVue'

  export default {
    name: 'BatchUploadFile',
    extends: BaseVue,
    props: {
      prop: {
        type: String,
        default: ''
      },
      defaultImage: {
        type: Array,
        default: null
      }
    },
    data() {
      return {
        imageList: [],
        image: [],
        defaultImages: [],
        dialogImageUrl: '',
        dialogVisible: false,
        additionalArgument: {
          platformType: 'platform'
        }
      }
    },
    methods: {
      handleRemove(file, fileList) {
        this.defaultImages = []
        this.defaultImages = fileList.map(item => {
          return item.url.replace(process.env.IMAGE_URL, '')
        })
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
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
      pushDefaultImages(image) {
        if (!this.defaultImages) this.defaultImages = []
        this.defaultImages.push(image)
      },
      uploadSuccess(response) {
        this.dialogImageUrl = process.env.IMAGE_URL + response.data
        this.pushDefaultImages(response.data)
        this.endLoading()
      }
    },
    watch: {
      defaultImage: function(value) {
        if (this.defaultImages.length === value.length) return
        this.defaultImages = value
      },
      defaultImages: function(value) {
        this.imageList = []
        this.image = []
        for (let i = 0; i < value.length; i++) {
          this.imageList.push({ name: '', url: process.env.IMAGE_URL + value[i] })
          this.image.push(value[i])
        }
      },
      image: function(value) {
        this.$emit('batchChange', {
          name: this.prop,
          path : value
        })
      }
    }
  }
</script>
