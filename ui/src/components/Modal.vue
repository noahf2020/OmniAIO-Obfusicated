<template>
    <div :class="'fixed z-' + z + ' inset-0 overflow-y-auto'" v-if="shown=='true'">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0" v-on:click="closeModal($event)">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 opacity-75 clickableHide" style="background-color: #575757"></div>
        </div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <slot></slot>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    shown: {
      type: String,
      default: "false",
    },
    z: {
      type: String,
      default: "10"
    }
  },
  computed: {
  },
  methods: {
    closeModal(event) {
      if (event.target.classList.contains("clickableHide")) {
        // this.shown = "false";
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
