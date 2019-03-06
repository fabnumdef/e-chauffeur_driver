<template>
  <section>
    <header class="container">
      <p class="pretitle">
        {{ 'now'|format_date('full') }}
      </p>
    </header>
    <div
      v-swiper:ridesSwipe="{pagination: {
        el: '.swiper-pagination'
      }}"
    >
      <div class="container">
        <div class="swiper-pagination" />
      </div>
      <div class="swiper-wrapper">
        <div
          v-for="ride in rides"
          :key="ride.id"
          class="swiper-slide"
        >
          <div
            class="notification"
            :class="getColorClass(ride.status)"
          >
            <div class="container">
              <ride-status
                :status="ride.status"
                class="is-pulled-right"
              />
              <p class="poi-label">
                Prochaine destination
              </p>
              <p class="poi">
                {{ ride.departure.label }}
              </p>
              <status-change
                :status="ride.status"
                no-cancel
                @change="changeStatus(ride, $event)"
              />
            </div>
          </div>

          <ride-card
            class="container"
            :ride="ride"
            cancel-only
          />
        </div>
      </div>
    </div>
    <div
      v-if="rides.length < 1"
      class="notification is-success"
    >
      <div class="container">
        <p class="poi">
          Pas de courses
        </p>
      </div>
    </div>
    <rides-to-accept :campus="campus" />
  </section>
</template>
<script>
import { mapGetters } from 'vuex';
import { actions, states } from '~/api/status';
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
  computed: {
    actions: () => actions,
    ...mapGetters({
      rides: 'rides/ridesToDo',
    }),
  },
  async asyncData({
    params, store,
  }) {
    await store.dispatch('rides/fetchRides', params.campus);
    return { campus: params.campus };
  },
  methods: {
    async changeStatus(ride, status) {
      return this.$api.rides(this.campus, this.$auth.user.id, 'id').mutateRide(ride.id, status);
    },
    getColorClass(status) {
      switch (status) {
        case states.ACCEPTED:
          return 'is-gray';
        case states.STARTED:
        case states.WAITING:
          return 'is-warning';
        case states.IN_PROGRESS:
        case states.DELIVERED:
          return 'is-primary';
        default:
          return '';
      }
    },
  },
};
</script>

<style scoped lang="scss">
  @import "~assets/css/head";
  .notification {
    z-index: 1;
    box-shadow: 0 10px 20px 0 rgba($black, 0.15);
    color: $white;
    /deep/ .tag {
      font-weight: bold;
    }
    &.is-gray {
      background-color: $gray;
      /deep/ .tag {
        color: $gray;
      }
    }
    &.is-primary /deep/ .tag {
      color: $primary;
    }
    &.is-warning /deep/ .tag {
      color: $warning;
    }
  }

  /deep/ > .box {
    $underNotifCorrection: 40px;
    margin-top: -$underNotifCorrection;
    padding-top: $underNotifCorrection;
    margin-bottom: $underNotifCorrection;
  }

  header {
    margin-top: 10px;
    margin-bottom: 10px;
    .pretitle {
      text-transform: uppercase;
      color: $dark-gray;
      font-weight: bold;
    }
  }

  .no-rides {
    padding: 15px;
    font-size: $size-4;
  }

  .poi {
    font-size: $size-1;
    line-height: $size-2;
    padding-top: $size-7;
    padding-bottom: $size-7;
    font-weight: bold;
    &-label {
      font-size: $size-7;
    }
  }
  /deep/ .swiper-pagination {
    position: relative;
    text-align: left;
    &-bullet {
      height: 4px;
      width: 60px;
      border-radius: 0;
      margin: 3px;
    }
  }
</style>
