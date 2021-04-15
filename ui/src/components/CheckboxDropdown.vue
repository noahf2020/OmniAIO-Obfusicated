<template>
  <div>
    <button v-bind:value="profileNames" id="dropBtn" v-on:click="clickedDropdown();" class="bg-gray-600 text-gray-200 text-left rounded pb-2 pt-1 pl-3 pr-2 flex-grow"><p :class="'inline-block w-' + buttonWidth">{{ prompt }}</p> <unicon class="inline-block relative border-l border-gray-400" style="top: .35em;" name="direction" fill="grey" /></button>
    <div v-show="showItems" :class="'bg-gray-600 py-2 text-white mt-1 w-' + itemWidth  + ' rounded z-10 fixed max-h-28 overflow-auto'">
      <div class="rounded hover:text-gray-400 hover:bg-gray-200 px-2 cursor-pointer" v-for="(item, index)  in profileNames" :key="index" v-on:click="$emit('input', profileNames); $emit('change', profileNames);">
        <input  v-model="profileNames[index]" class="mt-4" :id="'add-profile-' + index" type="checkbox"><label class="text-white ml-2" :for="'add-profile-' + index">{{ index }}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckboxDropdown',
  data() {
    return {
      showItems: false,
      profileNamesOut: this.profileNames
    }
  },
  props: {
    profileNames: Object,
    prompt: {
      type: String,
      default: "Profiles selected"
    },
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
    select: function() {
      this.clickedDropdown();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
