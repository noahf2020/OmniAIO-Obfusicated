<template>
  <!-- First button is default secon is icon-only -->
  <button v-if="!isIconOnly" @click="$emit('click', $event);" class="bg-gray-600 text-white border-2 rounded-full py-3 px-6 hover:bg-gray-700 focus:outline-none" :class="'border-' + color + '-' + shade"><div class="inline-flex self-center"><unicon class="relative" style="top: .2em;" width="20" height="20" :name="iconShown" fill="white" /></div> {{ text }}</button>
  <button v-else @click="$emit('click', $event);" class="focus:outline-none"><div class="inline-flex self-center"><unicon class="relative" v-on:mouseover="mouseOver" style="top: .2em;" width="20" height="20" :name="iconShown" :fill="isHover ? 'grey' : 'white'" /></div></button>
</template>

<script>
export default {
  name: 'Action',
  props: {
    text: String,
    iconName: String,
    borderColor: String,
    borderShade: String,
    type: String,
    iconOnly: String,
    isHover: {
      type: Boolean,
      default: false
    }
  },
  computed: {
      iconShown: function() {
          return this.iconName || "play";
      },
      shade: function() {
          return this.borderShade || "400";
      },
      color: function() {
          return this.borderColor || "green";
      },
      isIconOnly: function() {
        if (this.iconOnly == "true") {
          return true;
        } else {
          return false;
        }
      }
  },
  methods: {
    mouseOver: function(){
          this.isHover = !this.isHover;   
          console.log(this.isHover);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
