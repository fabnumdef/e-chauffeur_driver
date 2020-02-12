<template>
  <a
    v-if="phone && steps.length > 0"
    :href="`tel:${phone}`"
    class="button is-pulled-right phone-button"
  >
    <fa-icon icon="phone" />
  </a>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      steps: 'rides/steps',
    }),
    phone() {
      if (this.steps.length > 1) {
        const [current] = this.steps;
        return current.phone;
      }
      return null;
    },
  },
};
</script>
<style lang="scss" scoped>
  @import "~assets/css/head";
  .phone-button {
    position: fixed;
    bottom: 4em;
    right: 4em;
    background: $green;
    color: findColorInvert($primary);
    border-radius: 100%;
    padding: $size-small;
    border: 1px solid $white;
    font-size: $size-medium;
    box-sizing: border-box;
   }
</style>
