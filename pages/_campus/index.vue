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
            {{ ride.departure.label }}
            <ride-status :status="ride.status" />
            <status-change :status="ride.status" />
          </div>
          <div class="box">
            <a
              v-if="ride.phone"
              :href="`tel:${ride.phone}`"
            >
              <fa-icon :icon="['fas', 'phone']" />
            </a>
            <ul>
              <li>Nombre de passagers : <strong>{{ ride.passengersCount }}</strong></li>
              <li>Heure de prise en charge</li>
            </ul>
            <button
              type="button"
              class="button is-danger is-outlined"
              @click="changeStatus(ride, 'cancel')"
            >
              Annuler la course
            </button>
          </div>
          {{ ride.id }}
          {{ ride.status }}
          <button
            v-if="stateCanChange(ride.status, 'accept')"
            @click="changeStatus(ride, 'accept')"
          >
            accept
          </button>
          <!--<button
          type="button"
          v-for="action in Object.values(actions)"
          :key="action"
          v-if="ride.status && ride.status.can(action)"
          @click="changeStatus(ride, action)">{{action}}</button>-->
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
import statusChange from '~/components/ride-status-change.vue';
import ridesToAccept from '~/components/rides-to-accept.vue';

export default {
  components: {
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
  .no-rides {
    padding: 15px;
    font-size: $size-4;
  }
</style>
