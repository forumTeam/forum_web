<template>
  <span class="uploadFile" @click.stop="handleUpload">
    <el-input
      :style="'width:'+  width || '100%'"
      ref="inputFile"
      :size="size"
      v-model="realBtnText"
      @focus="loseFocus"
      :placeholder="loadedProgress == null ? placeholder:'上传进度' + loadedProgress+'%' ">
      <i slot="prefix" class="el-input__icon el-icon-upload2"></i>
      <i v-if="realBtnText !=null && realBtnText !== ''"
         :style="'cursor:pointer; margin-right:'+(downloadable && realBtnText? '12px;':'0px;')" slot="suffix"
         class="el-input__icon el-icon-circle-close"
         @click.stop="onClear"></i>
      <i slot="suffix" v-if="downloadable&&btnText" class="el-icon-download"
         style="cursor:pointer;color: #409EFF; margin-right: -40px;" @click.stop="onLoad"></i>
    </el-input>
    <input :id="id" type="file" :accept="accept" class="c-hide" @change="handleFileChange">
  </span>
</template>

<script>
  import { getFileSuffix } from '../../../utils/common'
  import { errorMessageBox } from '../../../utils/message'
  import { fileUpload } from '../../../api/common'

  export default {
    name: 'uploadFile',
    props: {
      width: {
        type: String,
        default: '100%'
      },
      accept: {
        type: String,
        default: '*'
      },
      downloadable: {
        type: Boolean,
        default: false
      },
      size: {
        type: String,
        default: 'small'
      },
      placeholder: {
        type: String,
        default: '请上传文件'
      },
      id: {  // 颜色类型
        type: String,
        default: 'uploadFileId'
      },
      showLoading: { // 显示加载
        type: Boolean,
        default: true
      },
      type: {  // 颜色类型
        type: String,
        default: 'primary'
      },
      fileSuffix: {
        type: String,
        default: null
      },
      myStyle: {  // style风格定义
        type: String,
        default: ''
      },
      // 按钮大小
      size: {
        type: String,
        default: 'small'
      },

      // 是否显示按钮图标
      showIcon: {
        type: Boolean,
        default: true
      },

      // 按钮图标
      icon: {
        type: String,
        default: 'el-icon-printer'
      },

      // 携带数据
      data: {
        type: null,
        default: null
      },

      // 按妞
      btnText: {
        type: String,
        default: '导入'
      }
    },
    computed: {
      icons: function() {
        if (!this.showIcon) {
          return ''
        } else {
          return this.icon
        }
      }
    },
    created() {
      this.realBtnText = this.btnText
    },
    data() {
      return {
        realBtnText: '',
        precent: '',
        loadedProgress: null,
        loading: false
      }
    },
    methods: {
      onLoad() {
        alert('下载了')
      },
      onClear() {
        this.realBtnText = this.btnText
        document.getElementById(this.id).value = ''
      },
      /**
       * 按妞点击事件监听
       */
      handleUpload() {
        this.loseFocus()
        if (this.loadedProgress == null && !this.clear) document.getElementById(this.id).click()
      },
      /**
       * 上传文件点击事件
       * @param e
       */
      handleFileChange(e) {
        if (this.fileSuffix) {
          let curFileSuffix = getFileSuffix(e.target.files[0].name)
          if (this.fileSuffix.indexOf(curFileSuffix) === -1) {
            errorMessageBox('请上传' + this.fileSuffix + '格式的文件')
            return
          }
        }
        if (e.target.files[0]) {
          this.fileUploadAPI(e.target.files[0])
        } else {
          this.loseFocus()
        }
      },
      loseFocus() {
        let input = this.$refs.inputFile.$refs.input
        if (input) {
          setTimeout(() => {
            input.blur()
          }, 200)
        }
      },
      /**
       * 上传文件api
       * @param file
       */
      fileUploadAPI(file) {
        if (this.showLoading) this.loading = true
        return new Promise((resolve, reject) => {
          fileUpload(file, progressEvent => {
            // 上传文件的进度
            const loaded = progressEvent.loaded
            const total = progressEvent.total
            this.loadedProgress = (loaded / total) * 100 | 0
            this.$emit('upLoadProgress', { 'progressEvent': progressEvent })
            // this.$nextTick(() => {this.precent = ((loaded / total) * 100 | 0)})
          }).then(response => {
            if (this.showLoading) this.loading = false
            this.loadedProgress = null
            this.realBtnText = file.name
            // 回传接口返回的response, 跟的携带的数据
            this.$emit('upLoadSuccess', { 'response': response, data: this.data, file: file })
          }).catch((error) => {
            this.loadedProgress = null
            if (this.showLoading) this.loading = false
            this.$emit('upLoadError', { 'error': error, data: this.data })
            this.onClear()
          })
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .uploadFile {
    input {
      display: none;
      z-index: -9999;
    }
  }
</style>
