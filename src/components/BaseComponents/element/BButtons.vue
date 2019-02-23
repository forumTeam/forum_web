<template>
  <div class="BTopClick">
    <el-button v-for="(item, index) in buttons"
               :type="item.type"
               @click="click(item)"
               :key="index"
               :plain="item.plain"
               :size="item.size ? item.size : 'small'"
               :round="item.round"
               :disabled="item.disabled === undefined ? false : item.disabled"
               v-if="item.show === undefined ? true : item.show"
               :icon="item.icon"
               :circle="item.circle">
      {{ item.name }}
    </el-button>
  </div>
</template>

<script>
  export default {
    name: 'BTopClick',
    props: {
      buttons: {
        type: Array,
        default: []
      }
    },
    methods: {
      click(button) {
         if (button.click !== undefined && button.click !== null) button.click()
      }
    }
  }
</script>

<style scoped>
.BTopClick{
  margin: 5px 0 5px 0;
}
</style>
