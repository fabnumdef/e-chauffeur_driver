<template>
  <div
    v-if="rides.length"
    class="modal is-active"
  >
    <div class="modal-background" />
    <div class="modal-content">
      <ride-card
        v-for="ride in rides"
        :key="ride.id"
        :ride="ride"
        no-cancel
      />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import rideCard from '~/components/ride-card.vue';

export default {
  components: {
    rideCard,
  },
  props: {
    campus: {
      type: String,
      default: null,
    },
  },
  computed: {
    ...mapGetters({
      rides: 'rides/ridesToAccept',
    }),
  },
};
</script>
<style scoped lang="scss">
  @import "~assets/css/head";
  @import "~bulma/sass/components/modal.sass";
</style>
