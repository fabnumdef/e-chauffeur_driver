<template>
  <section>
    <h1 class="title container">
      Courses
    </h1>
    <div
      v-if="rides.length < 1"
      class="no-rides container"
    >
      En attente de courses, vous n'avez aucune course à effectuer pour l'instant.
    </div>
    <div
      v-else
      v-swiper:ridesSwipe="{}"
    >
      <div class="swiper-wrapper">
        <div class="swiper-pagination swiper-pagination-bullets" />
        <div
          v-for="ride in rides"
          :key="ride.id"
          class="swiper-slide"
        >
          <div class="notification is-primary">
            <div class="container">
              {{ ride.departure.label }}
              <ride-status :status="ride.status" />
              <status-change :status="ride.status" no-cancel @change="changeStatus(ride, $event)"/>
            </div>
          </div>

          <ride-card class="container" :ride="ride" cancel-only/>
        </div>
      </div>
    </div>
    <rides-to-accept :campus="campus" />
  </section>
</template>
<script>
import { mapGetters } from 'vuex';
import { actions } from '~/api/status';
import rideStatus from '~/components/ride-status-badge.vue';
import rideCard from '~/components/ride-card.vue';
import statusChange from '~/components/ride-status-change.vue';
import ridesToAccept from '~/components/rides-to-accept.vue';

export default {
  components: {
    rideCard,
    rideStatus,
    statusChange,
    ridesToAccept,
  },
  async asyncData({
    params, store,
  }) {
    await store.dispatch('rides/fetchRides', params.campus);
    return { campus: params.campus };
  },
  computed: {
    actions: () => actions,
    ...mapGetters({
      rides: 'rides/ridesToDo',
    }),
  },
  methods: {
    async changeStatus(ride, status) {
      return this.$api.rides(this.campus, this.$auth.user.id, 'id').mutateRide(ride.id, status);
    },
  },
};
</script>
<style scoped lang="scss">
  @import "~assets/css/head";
  .notification {
    z-index: 1;
    box-shadow: 0 10px 20px 0 rgba($black, 0.15);
  }
  /deep/ .box {
    $underNotifCorrection: 40px;
    margin-top: -$underNotifCorrection;
    padding-top: $underNotifCorrection;
  }
  .no-rides {
    padding: 15px;
    font-size: $size-4;
  }
</style>
