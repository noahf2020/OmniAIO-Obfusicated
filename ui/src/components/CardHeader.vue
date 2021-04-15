<template>
    <div :class="cardClass">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'CardHeader',
  props: {
    backgroundColor: {
      type: String,
      default: "gray"
    },
    backgroundShade: {
      type: String,
      default: "200"
    }
  },
  computed: {
    cardClass: function() {
      return 'py-1/3 bg-' + this.backgroundColor + '-' + this.backgroundShade + ' rounded-bl-lg rounded-br-lg';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
