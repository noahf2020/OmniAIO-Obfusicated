<template>
  <!-- First button is default secon is icon-only -->
  <button v-if="isSelected" class="text-left pl-5 rounded-lg mx-2 py-1 mt-10 text-white w-10/12 bg-gray-400 bg-opacity-50 focus:outline-none"><unicon class="relative" style="top: .35em;" fill="white" :name="iconShown"></unicon> {{text}}</button>
  <button v-else class="text-left pl-5 rounded-lg mx-2 py-1 mt-8 text-white w-10/12 hover:bg-gray-600 hover:bg-opacity-50 focus:outline-none"><unicon class="relative" style="top: .35em;" fill="white" :name="iconShown"></unicon> {{text}}</button>
</template>

<script>
export default {
  name: 'SidebarButton',
  props: {
    text: String,
    iconName: String,
    selected: String
  },
  computed: {
      iconShown: function() {
          return this.iconName || "bars";
      },
      isSelected: function() {
        if (this.selected == "true") {
          return true;
        } else {
          return false;
        }
      }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
