<template>
    <table class="table-auto mx-2 border-separate">
        <slot></slot>
    </table>
</template>

<script>
export default {
  name: 'Table',
  props: {
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  table {
     border-spacing: 0.4rem;
  }
</style>
