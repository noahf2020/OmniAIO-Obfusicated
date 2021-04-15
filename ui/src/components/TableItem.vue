<template>
  <td :class="classValue"><slot></slot></td>
</template>

<script>
export default {
  name: 'TableItem',
  props: {
    place: String,
    textAlign: {
      type: String,
      default: 'center'
    },
    backgroundColor: {
      type: String,
      default: 'bg-table-item'
    }
  },
  computed: {
      classValue: function() {
          if (this.place === "start") {
            return "mt-3 py-3 px-6 text-" + this.textAlign + " " + this.backgroundColor + " text-white rounded-tl-full rounded-bl-full";
          } else if (this.place === "end") {
            return "mt-3 px-6 text-" + this.textAlign + " " + this.backgroundColor + " text-white rounded-tr-full rounded-br-full";
          } else {
            return "mt-3 px-6 text-" + this.textAlign + " " + this.backgroundColor + " text-white"; // 25,25,25
          }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
