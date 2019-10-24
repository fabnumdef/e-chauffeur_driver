<template>
  <a
    v-if="selectedRide.phone && rides.length > 0"
    :href="`tel:${selectedRide.phone}`"
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
      selectedRide: 'rides/selectedRide',
      rides: 'rides/ridesToDo',
    }),
  },
};
</script>
<style lang="scss" scoped>
  @import "~assets/css/head";
  .phone-button {
     position: fixed;
     bottom: 10px;
     right: 65px;
     z-index: 3;
     background: $green;
    color: findColorInvert($primary);
    border-radius: 100%;
    padding: $size-small;
    border: none;
    font-size: $size-medium;
    box-sizing: border-box;
   }
</style>
