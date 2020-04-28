<template>
  <button
    v-bind="$attrs"
    class="button"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
  @import "~assets/css/head";
  $button-color: $primary;

  @import "~bulma/sass/elements/button.sass";
</style>
