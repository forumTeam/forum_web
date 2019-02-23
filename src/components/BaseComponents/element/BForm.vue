<template>

  <b-container
    :isHidden="form.isHidden"
    :isShowDropDownButton="form.isShowDropDownButton"
    :title="form.title"
    :pre-page-text="form.prePageText"
    :isHiddenPre="form.isHiddenPre"
    :icon="form.icon"
  >

  <el-form ref="model" :label-width="form.labelWidth || '100px'" :label-position="form.labelPosition || 'right'"
           :model="model">

    <el-row :gutter="20">
      <el-col v-for="(item,index ) in form.formItems " :sm="item.sm || 12 " :key="index">
        <el-form-item :rules="item.rules " :prop="item.name" :label="item.label+'：'">

          <!-- 直接进行显示-->
          <span v-if="item.type === 'normal'">{{ model[item.name] }}</span>

          <!--数值输入框-->
          <el-input-number class="inputClass" v-else-if="item.type === 'number'" v-model="model[item.name]"
                           :min="item.min || 0 " :max="item.max || 999" :label="item.label"
                           :disabled="isDisable(item)"></el-input-number>

          <!-- 密码输入框-->
          <el-input class="inputClass" v-else-if="item.type === 'password'"
                    :type="item['showPassword'] ? 'text' :'password' " v-model="model[item.name]"
                    :placeholder="'请输入'+item.label" :minlength="item.min || 0" :maxlength="item.max || 32"
                    :disabled="isDisable(item)">
            <div slot="suffix">
              <el-button v-show="item['showPassword']" style="margin-right: 10px;" type="text"
                         class="iconfont icon-17yanjing2"
                         @click="item['showPassword'] = !item['showPassword']"></el-button>
              <el-button v-show="!item['showPassword']" style="margin-right: 10px;" type="text"
                         class="iconfont icon-biyanjing"
                         @click="item['showPassword'] = !item['showPassword']"></el-button>
            </div>
          </el-input>

          <!--时间选择器-->
          <el-date-picker clearable class="inputClass" v-else-if="item.type === 'date'" v-model="model[item.name]"
                          type="date" :placeholder="'请输入' + item.label" :disabled="isDisabled(item)"></el-date-picker>

          <!-- 开关 -->
          <el-switch class="inputClass" v-else-if="item.type === 'switch'" v-model="model[item.name]"
                     :active-text="item.activeText || '是'" :inactive-text="item.inactiveText || '否'"
                     :disabled="isDisabled(item)"></el-switch>

          <!-- 图片上传 -->
          <div v-else-if="item.type === 'image'">

            <b-image-upload :prop="item.name" @change="uploadSuccess" :disabled="isDisabled(item)"
                            :default-image="model[item.name]"></b-image-upload>
          </div>
          <!--批量上传图片-->
          <div v-else-if="item.type==='batchImage'">
            <batch-upload-file :prop="item.name" @batchChange="batchUploadSuccess" :disabled="isDisabled(item)"
                               :default-image="model[item.name]"></batch-upload-file>
          </div>



          <!-- 显示多张 -->
          <div v-else-if="item.type=== 'normalImages'">
            <img v-for="(image,index) in model[item.name]" :key="index" v-if="image" @click="showImage(image)"
                 width="150px" height="150px" :src="getImage(image)" :alt="getImage(image)">
          </div>


          <!-- 下拉选框 -->
          <el-select class="inputClass" v-else-if="item.type === 'select'" v-model="model[item.name]"
                     :placeholder="'请选择' + item.label" :disabled="isDisabled(item)">
            <el-option v-if="item.options" v-for="option in item.options" :key="option.value" :label="option.label"
                       :value="option.value"></el-option>
          </el-select>

          <!-- 多行文本输入框 -->
          <el-input clearable v-else-if="item.type === 'textarea'" class="inputClass" v-model="model[item.name]"
                    type="textarea" :placeholder="'请输入' + item.label" :minlength="item.min || 0"
                    :maxlength="item.max || 32"
                    :disabled="isDisabled(item)"></el-input>

          <!-- Input输入框 -->
          <div v-else>
            <el-input clearable class="inputClass" v-model="model[item.name]" :placeholder="'请输入' + item.label"
                      :minlength="item.min || 0" :maxlength="item.max || 32"
                      :disabled="isDisabled(item)"></el-input>
            <span style="color: deepskyblue;" v-if="item.tips"> {{ form.message }} </span>
          </div>


        </el-form-item>
      </el-col>
    </el-row>


    <el-row :gutter="20" >
      <el-col :sm="12">
      <el-form-item>
        <el-button v-if="isShow(item.show)" v-for="(item, index) in form.operations" :key="index" :type="item.type || 'null'"
                   @click="OnClick(item)">{{ item.name }}
        </el-button>

      </el-form-item>
      </el-col>
    </el-row>
  </el-form>


  </b-container>
</template>


<script>
  import BContainer from './BContainer'
  import BaseVue from '../BaseVue'
  import BImageUpload from './BImageUpload'
  import BatchUploadFile from './BatchUploadFile'
  import typeFormatter from '../utils/formatters'
  import rules from '../utils/rules'

  export default {
    name: 'BForm',
    extends: BaseVue,
    components: {
      BImageUpload,
      BatchUploadFile,
      BContainer
    },
    props: {
      form: {
        api: '',  //后台接口
        type: Object,
        default: {
          model: {},  //表单数据
          labelWidth: null,  //表单标签的默认宽度
          labelPosition: '',  // 表单标签文字位置，默认right.
          formItems: null,  // 表单Item项，实例：{ required: true, name: 'code', label: '客户编码', rules:[], type: null }
          operations: null,   //表单操作按钮，实例：{ name: '保存', click: () => {}, type: null }
          isShowDropDownButton: true,// 是显示隐藏按钮.
          title: null, // 表单 抬头文字.
          prePageText: null,  // 上一步文字.
          isHiddenPre: false,  // 是否隐藏返回上一步.
          icon: null  //表单图标
        }
      }
    },
    created() {
      if (!this.form.model) this.form.model = {}

      this.initValidator()
    },
    mounted() {
      if (!this.form.model){
        this.Reset()
      }

    },
    computed: {
      originData: function () {
        return this.form.model
      },
    },
    data() {
      return {
        model: {},
        selectedImg: null,
        isHidden: false,
        showPassword: false
      }
    },


    methods: {

      OnClick(item) {
        if (!item.click) return
        if (typeof item.click === 'function') return this.OnClickOrigin(item)
        if (item.click === "OnSubmit")   this.OnSubmit()
        if (item.click === 'OnSave') this.OnSave()
        if (item.click === 'Reset') this.Reset()
        if (item.click === 'goto ') this.goto(item.path)
      },

      //请求api前 对表单数据进行处理
      OnClickOrigin(item) {
        this.$refs.model.validate((valid) => {
          if (valid) item.click(this.preProcessing(this.model))
        })
      },


      //表单提交前对表单数据进行处理
      preProcessing(model) {
        if (!model) return model
        let tempModel = JSON.parse(JSON.stringify(model))
        return tempModel
      },

      //提交表单
      OnSubmit() {
        this.$refs.model.validate((valid) => {
          if (valid) {
            this.invokeApi(this.form.api, this.preProcessing(this.model)).then(response => {
              this.Reset()
              this.messageBox({
                title: '成功',
                type: 'success',
                content: '是否返回上级页面'
              }).then(() => {
                this.prev()
              })
            }).catch(error => {
            })
          }
        })
      },

      //提交表单
      OnSave() {
        this.$refs.model.validate((valid) => {
          if (valid) {
            this.invokeApi(this.form.api, this.preProcessing(this.model)).then(response => {
              this.successMessageBox('保存成功')
            }).catch(error => {

            })
          }
        })
      },

      //重置表单
      Reset() {
        this.$refs.model.resetFields()
        this.model = JSON.parse(JSON.stringify(this.form.model))
        this.initFormatter()
      },

      initFormatter() {
        for (let item of  this.form.formItems) {
          if (item.type === 'normal') this.formatter(this.model[item.name], item)
        }
      },


      initValidator() {
        if (!this.form.formItems) return
        if (!this.form.formItems.rules || !(this.form.formItems.rules instanceof Array))
          for (let item of  this.form.formItems) {
            if (!item.rules || !(item.rules instanceof Array)) item.rules = []
            /* 1、是否必传字段 */
            if (item.required) item.rules.push(rules['required'](item))

            /* 2、标准校验器规则 */
            if (item.validator && rules[item.validator]) item.rules.push(rules[item.validator](item))

            /* 3、自定义校验器规则 */
            if (item.validator && typeof item.validator === 'function') item.rules.push(rules['validator'](item))

          }
      },


      formatter(currentValue, item) {
        if (currentValue === null || currentValue === undefined) return
        /* 自定义格式化 */
        if (item.formItems && typeof item.formatter === 'function') return this.model[item.name] = item.formatter(currentValue)

        /* 远程接口格式化 */
        /*if (item.formItems && item.formatter === 'remote' && item.table) return this.formatterRemote(currentValue,item) */

        /* 标准类型格式化 */
        if (item.formatter) return this.model[item.name] = typeFormatter[item.formatter](currentValue)

      },

      /**
       * 表单是否禁用
       * @param item
       * @returns {*}
       */
      isDisabled(item) {
        if (typeof item.disabled === 'function') return item.disabled(item, this.model)
        return item.disabled
      },
      /**
       * 放大图片
       * @param img
       */
      showImage(img) {
        this.selectedImg = img
      },
      /**
       * 关闭放大图片.
       * @author 潘溢林
       */
      closeImageShow() {
        this.selectedImg = null
      },

      /**
       * 上传图片成功
       * @param name
       * @param path
       */
      uploadSuccess({name, path}) {
        this.model[name] = path
      },
      /**
       * 批量上传
       * @param name
       * @param path
       */
      batchUploadSuccess({name, path}) {
        this.model[name] = path
      },
      /**
       * 是否展示操作按钮.
       */
      isShow(show) {
        if (show && typeof show === 'function') return show(this.form.model)
        return show !== false
      },
    },
    watch: {
      originData: function(value) {
        this.model = JSON.parse(JSON.stringify(value))
        this.initFormatter()
      }
    }


  }

</script>


<style scoped>
  .inputClass {
    width: 100%;
  }

  .hidden {
    height: 50px;
  }
</style>
