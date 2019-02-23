<template>

  <!-- 搜索器 默认只显示前两个个筛选条件，其它筛选条件放置更多查询中. -->
  <div v-if="searchCondition && searchCondition.content && searchCondition.content.length > 0">
    <el-form :model="searchObj" label-position="right" :label-width="searchCondition.labelWidth === null ? '50px' : searchCondition.labelWidth" :rules="searchCondition.rules">

      <!-- 第一个筛选条件 -->
      <el-row :gutter="20">
        <el-col v-if="searchCondition.content[0]" :span="3.5">
          <el-form-item :label-width="searchCondition.content[0].labelWidth" :prop="searchCondition.content[0].prop" :label="searchCondition.content[0].label">
            <el-input size="mini"
                      clearable
                      class="searchInput"
                      v-model="searchObj[searchCondition.content[0].prop]"
                      :placeholder="searchCondition.content[0].placeholder ? searchCondition.content[0].placeholder : '请输入' + searchCondition.content[0].label "
                      :prefix-icon="searchCondition.content[0].prefixIcon"
                      :suffix-icon="searchCondition.content[0].suffixIcon"></el-input>
          </el-form-item>
        </el-col>

        <!-- 第二个筛选条件 -->
        <el-col v-if="searchCondition.content[1]" :span="3.5">
          <el-form-item :label-width="searchCondition.content[1].labelWidth" :prop="searchCondition.content[1].prop" :label="searchCondition.content[1].label">
            <el-select size="mini" v-if="searchCondition.content[1].type === 'option'"
                       v-model="searchObj[searchCondition.content[1].prop]"
                       :placeholder="searchCondition.content[1].placeholder ? searchCondition.content[1].placeholder : '请选择' + searchCondition.content[1].label">
              <el-option
                v-for="item in searchCondition.content[1].options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-input v-else
                      size="mini"
                      clearable
                      class="searchInput"
                      v-model="searchObj[searchCondition.content[1].prop]"
                      :placeholder="searchCondition.content[1].placeholder ? searchCondition.content[1].placeholder : '请输入' + searchCondition.content[1].label"
                      :prefix-icon="searchCondition.content[1].prefixIcon"
                      :suffix-icon="searchCondition.content[1].suffixIcon"></el-input>
          </el-form-item>
        </el-col>

        <!-- 查询按钮 -->
        <el-col class="hidden-xs-only" :span="3.5">
          <el-form-item label-width="0">
            <el-button size="mini" @click="search(searchObj)">查询</el-button>
            <el-button v-if="searchCondition && searchCondition.content.length > 2" size="mini" @click="visible = true">更多查询</el-button>
          </el-form-item>
        </el-col>
        <el-col class="hidden-sm-and-up">
          <el-button style="width: 100%; margin-bottom: 10px;" size="mini" type="primary" @click="search(searchObj)">查询</el-button>
        </el-col>

      </el-row>
    </el-form>

    <!-- 更多查询对话框 -->
    <el-dialog style="min-width: 800px;" v-if="searchCondition && searchCondition.content.length > 2" title="更多查询" :visible="visible" :before-close="closeSearchDialog">
      <el-form :model="searchDialogObj"
               ref="searchDialogObj"
               :rules="searchCondition.rules"
               label-position="right"
               :label-width="searchCondition.labelWidth === null ? '50px' : searchCondition.labelWidth">
        <el-form-item v-for="(item, index) in searchCondition.content"
                      :key="index"
                      :label-width="item.labelWidth"
                      :prop="item.prop"
                      :label="item.label">

          <!-- 文本输入框 -->
          <el-input v-if="!item.type || item.type === 'text'"
                    class="searchInput"
                    clearable
                    v-model="searchDialogObj[item.prop]"
                    :placeholder="item.placeholder ? item.placeholder : '请输入' + item.label "
                    :prefix-icon="item.prefixIcon"
                    :suffix-icon="item.suffixIcon"></el-input>

          <!-- 筛选时间 -->

          <!-- 日期选择器 -->
          <div v-else-if="item.type === 'time'">

            <el-select style="width: 120px;" v-model="item.timeType" placeholder="请选择筛选时间类型">
              <el-option label="当天" :value="0"></el-option>
              <el-option label="之前" :value="1"></el-option>
              <el-option label="之后" :value="2"></el-option>
              <el-option label="时间段" :value="3"></el-option>
            </el-select>

            <!-- 日期选择器 -->
            <el-date-picker
              clearable
              v-if="item.timeType < 3"
              v-model="searchDialogObj[item.prop]"
              :placeholder="'请选择' + item.label"
              type="date"></el-date-picker>

            <el-date-picker
              clearable
              style="width: 300px;"
              v-else-if="item.timeType === 3"
              v-model="searchDialogObj[item.prop]"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"></el-date-picker>
          </div>

          <!-- 开关 -->
          <el-switch
            v-else-if="item.type === 'switch'"
            v-model="searchDialogObj[item.prop]"
            :active-text="item.activeText"
            :inactive-text="item.inactiveText">
          </el-switch>

          <!-- 下拉选框 -->
          <el-select v-if="item.type === 'option'"
                     v-model="searchDialogObj[item.prop]"
                     :placeholder="item.placeholder ? item.placeholder : '请选择' + item.label">
            <el-option
              v-for="option in item.options"
              :key="option.value"
              :label="option.label"
              :value="option.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col>
              <el-button style="width: 100%;" type="primary" @click="search(searchDialogObj)">查&nbsp;&nbsp;&nbsp;&nbsp;询</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-button style="width: 100%; margin-top: 10px;" @click="reset">重 置</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: 'BSearchers',
    props: {
      searchCondition: {
        type: Object,
        default: {}
      }
    },
    created() {
    },
    data() {
      return {
        searchObj: {},
        searchDialogObj: {},
        visible: false
      }
    },
    methods: {

      /**
       * 关闭更多查询对话框.
       * @author 潘溢林
       */
      closeSearchDialog() {
        this.visible = false
      },

      /**
       * 根据条件进行查询.
       * @author 潘溢林
       */
      search(conditions) {
        let realConditions = conditions

        for (let condition of this.searchCondition.content) {
          if (realConditions[condition.prop] === '') realConditions[condition.prop] = null
          if (condition.type === 'time' && condition.timeType !== 0) {
            conditions[this.addPrefix('start', condition.prop)] = null
            conditions[this.addPrefix('end', condition.prop)] = null

            /* 之前 */
            if (condition.timeType === 1) {
              realConditions[this.addPrefix('end', condition.prop)] = conditions[condition.prop]
            }

            /* 之后 */
            if (condition.timeType === 2) {
              realConditions[this.addPrefix('start', condition.prop)] = conditions[condition.prop]
            }

            /* 时间段 */
            if (condition.timeType === 3 && conditions[condition.prop]) {
              realConditions[this.addPrefix('start', condition.prop)] = conditions[condition.prop][0]
              realConditions[this.addPrefix('end', condition.prop)] = conditions[condition.prop][1]
            }

            realConditions[condition.prop] = null
          } else if (condition.type === 'time' && condition.timeType === 0) {
            realConditions[this.addPrefix('start', condition.prop)] = null
            realConditions[this.addPrefix('end', condition.prop)] = null
          }
        }

        this.$emit('search', realConditions)
        this.closeSearchDialog()
      },

      /**
       * 为字段添加前缀.
       * @author 潘溢林
       * @param prop 对象字段
       * @param prefix 前缀
       * @return 添加前缀后的字段名
       */
      addPrefix(prefix, prop) {
        return prefix + prop.substring(0,1).toUpperCase() + prop.substring(1)
      },

      reset() {
        this.searchDialogObj = {}
        this.$refs.searchDialogObj.resetFields()
      }
    }
  }
</script>

<style>

  .searchInput {
    width: 100%;
  }

  .el-date-editor .el-range-separator {
    padding: 0 !important;
  }

</style>
