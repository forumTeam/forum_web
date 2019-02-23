<template>
  <div>
    <el-table ref="BTable"
              :data="data"
              :border="table.border !== false"
              :max-height="table.maxHeight === null ? 500 : table.maxHeight"
              @select-all="selectAll"
              @selection-change="selectChange"
              @select="select">

      <el-table-column
        v-if="table.multipleSelect"
        align="center"
        type="selection"
        width="55">
      </el-table-column>

      <el-table-column v-for="(item, index) in table.content"
                       :key="index"
                       :width="item.width"
                       :min-width="item.minWidth"
                       :prop="item.prop"
                       :label="item.label"
                       :formatter="item.formatter"
                       :header-align="item.headerAlign ? item.headerAlign : 'center'"
                       :align="item.align ? item.align : 'center'"
                       :show-overflow-tooltip="item.showOverflowTooltip !== false">
        <template slot-scope="scope">
          <span v-if="item.type === 'boolean'">{{ formatterBoolean(scope.row[item.prop]) }}</span>
          <span v-else-if="item.type === 'time'">{{ formatterTime(scope.row[item.prop]) }}</span>
          <span v-else-if="item.type === 'money'">{{ scope.row[item.prop] / 100 }}</span>
          <span v-else-if="item.type === 'date'">{{ formatterTime(scope.row[item.prop], '{y}-{m}-{d}') }}</span>
          <span v-else-if="item.type === 'image'">
            <img v-if="scope.row[item.prop]" style="width: auto; height: 40px; cursor: pointer;" :src="getImage(scope.row[item.prop])" :alt="getImage(scope.row[item.prop])" @click="openImageShow(scope.row[item.prop])">
          </span>
          <span v-else-if="item.table">{{ formatterEnum(scope.row[item.prop], item.table, item.prop) }}</span>
          <span v-else>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="table.operations && table.operations.length > 0"
                       label="操作"
                       width="120px"
                       align="center">
        <template slot-scope="scope">
          <el-button v-if="isDropDown()" v-show="isMethod(table.operations[0].show, 0, table.operations[0], true)" :disabled="isMethod(table.operations[0].disabled, 0, table.operations[0], false)" size="mini" @click="getClickEvent(table.operations[0].click, 0, scope.row)">{{ table.operations[0].name }}</el-button>
          <el-dropdown v-else trigger="hover">
            <el-button plain size="mini">更多操作 <i class="el-icon-arrow-down"></i></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item, index) in table.operations" v-show="isMethod(item.show, scope.$index, scope.row, true)" :disabled="isMethod(item.disabled, scope.$index, scope.row, false)" @click.native="getClickEvent(item.click, scope.$index, scope.row)" :key="index">
                {{item.name}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible="imageShow !== null" :before-close="closeImageShow">
      <img v-if="imageShow" width="100%" height="100%" :src="getImage(imageShow)" :alt="getImage(imageShow)">
    </el-dialog>
  </div>
</template>

<script>
  import { FUNCTION } from '../utils/consts'
  import { formatterTime } from '../utils/formatters'
  import BaseVue from '../BaseVue'

  export default {
    name: 'BTable',
    extends: BaseVue,
    props: {
      data: {
        type: Array,
        default: []
      },
      table: {
        type: Object,
        default: {
          maxHeight: 500,
          selectAll: null,
          selectChange: null,
          toggleRowSelection: null,
          clearSelection: null,
          border: true,
          multipleSelect: false,
          content: [],
          operations: []
        }
      }
    },
    data() {
      return {
        imageShow: null,
      }
    },
    created() {
      if (this.table.enums) this.getEnums(this.table.enums)
    },
    methods: {

      /* 数据格式化区域 */

      formatterBoolean(value) {
        return value ? '是' : '否'
      },

      formatterEnum(value, table, field) {
        if (this.enums[table] && this.enums[table][field]) {
          for (let item of this.enums[table][field]) {
            if (item.value === value) return item.text
          }
        }
        return value
      },

      formatterTime(value, format) {
        if (value === null) return ''
        return formatterTime(value, format)
      },


      /**
       * 获取点击事件.
       * @param method 点击事件方法
       * @param index 当前行索引
       * @param row 当前行对象
       * @return function
       */
      getClickEvent(method, index, row) {
        if (method === null || typeof method !== 'function') return null
        return method({index, row})
      },

      isMethod(method, index, row, defaultValue) {
        if (typeof method === FUNCTION) return method({ index, row })
        return method === undefined ? defaultValue : method
      },

      /**
       * 是否需要下拉列表.
       * @return boolean
       */
      isDropDown() {
        return this.table.operations !== null && this.table.operations.length === 1;
      },

      /**
       * 表格全选事件.
       * @param data 选中的数据
       * @return boolean
       */
      selectAll(data) {
        if (typeof this.table.selectAll === FUNCTION) this.table.selectAll(data)
      },

      /**
       * 表格多选事件.
       * @return boolean
       */
      selectChange(data) {
        if (typeof this.table.selectChange === FUNCTION) this.table.selectChange(data)
      },

      /**
       * 表格复选框选中事件.
       * @param selection 选中的行数据数组
       * @param row 当前选中行
       * @return boolean
       */
      select(selection, row) {
        if (typeof this.table.select === FUNCTION) this.table.select({ selection, row })
      },

      /**
       * 图片放大.
       */
      openImageShow(image) {
        this.imageShow = image
      },

      /**
       * 关闭图片放大框.
       */
      closeImageShow() {
        this.imageShow = null
      },
    }
  }
</script>

<style scoped>

</style>
