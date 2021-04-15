<template>
  <div>
    <button v-bind:value="selected" id="dropBtn" v-on:click="clickedDropdown();" class="bg-gray-600 text-gray-200 text-left rounded pb-2 pt-1 pl-3 pr-2 flex-grow"><p :class="'inline-block w-' + buttonWidth">{{ selected }}</p> <unicon class="inline-block relative border-l border-gray-400" style="top: .35em;" name="direction" fill="grey" /></button>
    <div v-show="showItems" :class="'bg-gray-600 py-2 text-white mt-1 w-' + itemWidth  + ' rounded z-10 fixed max-h-28 overflow-auto'">
      <div class="rounded hover:text-gray-400 hover:bg-gray-200 px-2 cursor-pointer" v-for="(item, index)  in items" :key="index" v-on:click="select(index); $emit('input', selected); $emit('change', selected);">
        {{item}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  data() {
    return {
      showItems: false,
      selected: this.value
    }
  },
  props: {
    value: String,
    items: Array,
    buttonWidth: {
      type: String,
      default: '20'
    },
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
