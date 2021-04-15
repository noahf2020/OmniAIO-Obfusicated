<template>
  <div>
    <input :id="name" type="checkbox" :name="name" :value="name" class="hidden">
    <label :for="name" :class="classValue">{{ name }}</label>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    place: String,
    name: String
  },
  computed: {
    classValue: function() {
          if (this.place === "start") {
            return "bg-purple-500 opacity-70 w-14 text-center block text-white cursor-pointer rounded-tl-full rounded-bl-full";
          } else if (this.place === "end") {
            return "bg-purple-500 opacity-70 w-14 text-center block text-white cursor-pointer rounded-tr-full rounded-br-full";
          } else {
            return "bg-purple-500 opacity-70 w-14 text-center block text-white cursor-pointer";
          }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  input[type="checkbox"]:checked + label {
      @apply bg-purple-300;
      @apply opacity-100;
  }
</style>
