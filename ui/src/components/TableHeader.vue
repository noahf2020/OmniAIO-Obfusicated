<template>
  <th :class="classValue"><slot></slot></th>
</template>

<script>
export default {
  name: 'TableHeader',
  props: {
    place: String
  },
  computed: {
      classValue: function() {
          if (this.place === "start") {
            return "bg-table-header text-white rounded-tl-full rounded-bl-full";
          } else if (this.place === "end") {
            return "py-1 text-center bg-table-header text-white rounded-tr-full rounded-br-full";
          } else {
            return "py-1 text-center bg-table-header text-white"; //39,39,39
          }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
