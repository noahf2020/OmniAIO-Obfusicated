<template>
    <div :class="'w-full bg-gray-700 py-1 rounded-full text-' + textColor + '-' + textShade + ' overflow-hidden mt-2 text-center'"><slot></slot></div>
</template>

<script>
export default {
  name: 'PingItem',
  props: {
    textColor: {
      type: String,
      default: 'gray'
    },
    textShade: {
      type: String,
      default: '300'
    }
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
