<template>
  <button>
    <fa-icon :icon="['fas', 'chevron-right']" />
    <slot />
  </button>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
  @import "~assets/css/head";

  button {
    padding: .8em 2em;
    color: $primary;
    font-weight: 700;
    font-size: 1em;
    text-transform: uppercase;
    cursor: pointer;
    svg {
      font-size: .8em;
      margin-right: 1em;
    }
  }
</style>
