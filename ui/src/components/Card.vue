<template>
    <div :class="cardClass">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    gradientLColor: {
      type: String,
      default: "purple"
    },
    gradientRColor: {
      type: String,
      default: "purple"
    },
    gradientLShade: {
      type: String,
      default: "300"
    },
    gradientRShade: {
      type: String,
      default: "500"
    }
  },
  computed: {
    cardClass: function() {
      return 'container bg-gradient-to-r from-' + this.gradientLColor + '-' + this.gradientLShade + ' to-' + this.gradientRColor + '-' + this.gradientRShade + ' rounded-lg';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
