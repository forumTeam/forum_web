<template>
  <el-card>
    <!-- tabs 切换栏 -->
    <b-tabs :tabs="tabs" @change="tabChange"></b-tabs>

    <!-- 筛选操作 -->
    <b-searchers :searchCondition="searchCondition" @search="search"></b-searchers>
    <slot name="searchSlot"></slot>

    <!-- 顶部操作按钮 -->
    <b-buttons class="hidden-xs-only" :buttons="buttons"></b-buttons>
    <slot class="hidden-xs-only" name="clickSlot"></slot>

    <!-- Table 数据容器 -->
    <b-table :data="content" :table="table"></b-table>

    <!-- 分页 -->
    <el-pagination
      class="hidden-xs-only"
      background
      @current-change="OnCurrentChange"
      :current-page.sync="page.pageIndex"
      :page-size="page.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="page.total">
    </el-pagination>
    <div class="clearFloat"></div>
  </el-card>
</template>

<script>
  import BaseVue from '../BaseVue'
  import BTable from '../element/BTable'
  import BTabs from '../element/BTabs'
  import BSearchers from '../element/BSearchers'
  import BButtons from '../element/BButtons'

  export default {
    name: 'TableView',
    extends: BaseVue,
    components: { BTable, BTabs, BSearchers, BButtons },
    props: {
      tabs: {
        type: Array,
        default: []
      },
      table: {
        type: Object,
        default: {}
      },
      searchCondition: {
        type: Object,
        default: () => { return {} }
      },
      resources: {
        type: Object,
        default: {
          api: null,
          refresh: 0,
          parameters: {
          },
        }
      },
      buttons: {
        type: Array,
        default: () => { return [] }
      }
    },
    data() {
      return {
        currentTab: {
          prop: null,
          value: null
        },
        searchObj: {}
      }
    },
    methods: {
      /**
       * tab切换.
       */
      tabChange(tab) {
        this.currentTab = tab
        this.OnCurrentChange(1)
      },

      /**
       * 调用后台获取数据接口.
       */
      invokeApi() {
        if (this.resources && this.resources.api) {
          this.startLoading()
          return new Promise((resolve, reject) => {
            this.resources.api(this.getParameters()).then(response => {
              this.setData(response)
              this.endLoading()
              return resolve(response)
            }).catch(error => {
              this.endLoading()
              return reject(error)
            })
          })
        }
      },

      /**
       * 返回请求接口参数.
       */
      getParameters() {
        let parameters = {}

        /* 1、添加分页. */
        parameters.pageIndex = this.page.pageIndex
        parameters.pageSize = this.page.pageSize

        /* 2、添加额外参数. */
        if (this.resources && this.resources.parameters) {
          for (let prop in this.resources.parameters) {
            parameters[prop] = this.resources.parameters[prop]
          }
        }

        /* 3、添加Tab参数 */
        if (this.currentTab.prop) parameters[this.currentTab.prop] = this.currentTab.value

        /* 4、添加搜索条件 */
        if (this.searchObj && this.searchObj) {
          for (let prop in this.searchObj) {
            parameters[prop] = this.searchObj[prop]
          }
        }

        return parameters;
      },

      /**
       * 分页翻页.
       */
      search(searchObj) {
        this.searchObj = searchObj === null || searchObj === undefined ? {} : searchObj
        this.OnCurrentChange(1)
      },

      /**
       * 分页翻页.
       */
      OnCurrentChange(val) {
        this.page.pageIndex = val
        this.invokeApi()
      },
    },
    computed: {
      refresh() {
        return this.resources.refresh
      }
    },
    watch: {
      refresh() {
        this.OnCurrentChange(this.page.pageIndex)
      }
    }
  }
</script>

<style scoped>
  .el-pagination {
    margin-top: 10px;
    float: right;
  }
</style>
