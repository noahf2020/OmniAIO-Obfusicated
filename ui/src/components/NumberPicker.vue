<template>
  <div v-bind:value="val">
    <button class="inline-block bg-gray-600 h-10 border-r text-white px-1" v-on:click="decreaseValue(); $emit('input', val)">-</button>
    <input :value="val" v-on:change="val = parseInt($event.target.value); $emit('input', val)" :class="'inline-block bg-gray-600 text-gray-200 text-left rounded py-2 pl-3 pr-2 w-' + itemWidth" :placeholder="placeholder">
    <button class="inline-block bg-gray-600 h-10 border-l text-white px-1" v-on:click="increaseValue(); $emit('input', val)">+</button>
  </div>
</template>

<script>
export default {
  name: 'NumberPicker',
  data() {
    return {
      val: this.value
    }
  },
  props: {
    placeholder: String,
    value: {
      type: Number,
      default: null
    },
    itemWidth: {
      type: String,
      default: '24'
    }
  },
  computed: {

  },
  methods: {
    increaseValue: function() {
      if (this.val !== null) {
        this.val = parseInt(this.val) + 1;
      } else {
        this.val = 0;
      }
    },
    decreaseValue: function() {
      if (this.val > 0) {
        if (this.val !== null) {
          this.val = parseInt(this.val) - 1;
        } else {
          this.val = 0;
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
