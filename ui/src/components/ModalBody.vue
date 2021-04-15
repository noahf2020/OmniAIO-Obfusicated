<template>
    <div class="modalBody inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
      <div class="modalBody bg-gray-400 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <slot></slot>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ModalBody',
  props: {
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
