<template>
  <button
    type="button"
    class="button"
    :class="{ 'is-inverted': inverted }"
    aria-label="menu"
    aria-expanded="false"
    @click="toggleMenu()"
  >
    <fa-icon
      size="lg"
      icon="bars"
    />
  </button>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  props: {
    inverted: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(['isMenuOpen']),
  },
  methods: {
    ...mapMutations(['toggleMenu']),
  },
};
</script>
<style scoped lang="scss">
  @import "~assets/css/head";
  .button {
    background: transparent;
    border: none;
    &.is-inverted {
      color: $white;
    }
  }
</style>
