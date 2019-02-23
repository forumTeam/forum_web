<template>
  <el-pagination
    background
    :current-change="OnCurrentChange"
    :current-page="page.pageIndex"
    :page-size="page.pageSize"
    layout="total,prev,pager,next,jumper"
    :total="page.total"
  >
  </el-pagination>
</template>


<script>
  export default {
    name: 'BPagination',
    props: {
      page: {
        type: Object,
        default: {
          pageIndex: 1,
          pageSize: 15,
          total: 0
        }
      }
    },
    methods: {
      OnCurrentChange(currentPageIndex) {
        this.$emit('change', currentPageIndex)
      }
    }
  }

</script>
