<template>
    <div class="w-full bg-gray-700 pl-5 py-1 rounded-full text-gray-300 overflow-hidden mt-2 text-xs"><p class="float-left"><slot></slot></p> <unicon class="border-l-2 float-right pl-2 border-gray-400 pr-2" style="top: .3em;" name="play" fill="white"></unicon></div>
</template>

<script>
export default {
  name: 'ProxyItem',
  props: {
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
