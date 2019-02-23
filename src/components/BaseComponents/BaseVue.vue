<script>
  import {Obj} from '../../utils/constats'
  import { errorMessageBox,messageBox} from '../../utils/message'
  // import { batchSelectDictionary } from './api/index'
  import {mapGetters} from 'vuex'

  export default {
    name: 'BaseVue',
    created() {

    },

    computed: {
      ...mapGetters([
        'name',
        'userInfo'
      ])
    },

    data() {
      return {
        content: [],
        page: {
          pageIndex: Obj.pageIndex,
          pageSize: Obj.pageSize,
          order: Obj.order,
          total: 0
        },
        tabStatus: null,
        enums: {},
        defaultStatus: 0
      }
    },

    methods: {
      startLoading() {
        this.$store.commit('APP_MAIN_LOADING', true)
      },
      endLoading() {
        this.$store.commit('APP_MAIN_LOADING', false)
      },
      setPageSize(pageSize) {
        this.page.pagesize = pageSize
      },
      setPageIndex(pageIndex) {
        this.page.pageIndex = pageIndex
      },
      setOrder(order) {
        this.page.order = order
      },

      /**
       * 接口列表返回值
       * @param response
       * @returns {number}
       */
      setData(response){
        this.content=response.data
        this.page.total=0

        if (this.data === null) {
          this.content=[]
          return this.page.total=0
        }

        if (response.paginator !== null ) this.page.total=response.paginator.totalCount
      },


      /**
       * 没有分页对象返回值
       * @param response
       */
      setDtaNotPageinator(response){
        this.content=response.data
      },

      /**
       * 路由跳转
       * @param path
       * @param params
       */
      goto(path,params){
        if (params !== null && params !== undefined) {
          for (let prop in params){
            params[prop]=JSON.stringify(params[prop])
          }
        }
        this.$router.push({
          path:path,
          query:params
        })
      },

      /**
       * 获取路由参数
       * @param key
       * @returns {*}
       */
      getQuery(key){
        let value=this.$router.query[key]
        if (!value) return null
        return JSON.parse(value)
      },

      /**
       * 上一页
       */
      prev(){
        this.$router.go(-1)
      },

      /**
       * 调用后台接口
       * @param api
       * @param params
       * @returns {Promise<any>}
       */
      invokeApi(api,params){
        this.startLoading()
        return new  Promise((resolve, reject) => {
          api(params).then(response =>{
            this.endLoading()
            return resolve(response)
          }).catch(error=>{
            this.endLoading()
            return reject(error)
          })
        })
      },

      /**
       * 提示框
       * @param title
       * @param content
       * @param sureBtnText
       * @param cancelBtenText
       * @param type
       * @returns {*}
       */
      messageBox({ title='提示',content='content',sureBtnText='确认',cancelBtenText='取消',type='warning' }){
        return messageBox({title,content,sureBtnText,cancelBtenText,type})
      },
      /**
       * 弹出错误提示框.
       */
      errorMessageBox(message) {
        return errorMessageBox(message)
      },
      /**
       * 成功提示框
       * @param message
       * @returns {*}
       */
      successMessageBox(message) {
        return successMessageBox(message)
      },
      /**
       * 获取图片完整路径
       * @param image
       * @returns {*}
       */
      getImage(image) {
        return  process.env.IMAGE_URL + image
      },
    }
  }


</script>
