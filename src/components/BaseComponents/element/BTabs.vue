<template>
  <el-tabs :active-name="name" v-if="tabs" @tab-click="tabClick">
    <el-tab-pane v-for="(item, index) in tabs" :label="item.name" :name="item.name" :key="index"></el-tab-pane>
  </el-tabs>
</template>

<script>

  export default {
    name: 'BTabs',
    props: {
      tabs: {
        type: Array,
        default: []
      },
    },
    created() {
      this.setDefault()
    },
    data() {
      return {
        name: null,
      }
    },
    methods: {
      tabClick(tab) {
        for (let item of this.tabs) {
          if (item.name === tab.name) return this.$emit('change', item)
        }
      },
      setDefault() {
        for (let item of this.tabs) {
          if (item.isDefault) {
            this.name = item.name
            return this.$emit('change', item)
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
