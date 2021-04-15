<template>
  <input v-bind:value="value" v-on:input="$emit('input', $event.target.value)" :class="'bg-gray-600 text-gray-200 text-left rounded py-2 pl-3 pr-2 flex-grow w-' + itemWidth" type="text" :placeholder="placeholder" />
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    value: String,
    placeholder: String,
    itemWidth: {
      type: String,
      default: '24'
    }
  },
  computed: {

  },
  methods: {
    clickedDropdown: function() {
      this.showItems = !this.showItems;
    },
    select: function(index) {
      this.selected = this.items[index];
      this.clickedDropdown();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
