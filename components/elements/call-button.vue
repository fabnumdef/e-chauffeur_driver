<template>
  <a
    v-if="campus.phone && campus.phone.drivers"
    :href="`tel:${campus.phone.drivers}`"
    class="button is-pulled-right phone-button"
  >
    <fa-icon icon="headset" />
  </a>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({ campus: 'context/campus' }),
  },
};
</script>
<style lang="scss" scoped>
  @import "~assets/css/head";
  .phone-button {
     position: fixed;
    bottom: 4em;
    right: 1em;
     z-index: 3;
     background: $primary;
    color: findColorInvert($primary);
    border: 1px solid $white;
    border-radius: 100%;
    padding: $size-small;
    font-size: $size-medium;
    box-sizing: border-box;
   }
</style>
