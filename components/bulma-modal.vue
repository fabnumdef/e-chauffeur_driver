<template>
  <div class="modal is-active">
    <div
      class="modal-background"
      @click="$emit('close')"
    />
    <div class="modal-content box">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import "~assets/css/head";
  @import "~bulma/sass/components/modal.sass";
</style>
