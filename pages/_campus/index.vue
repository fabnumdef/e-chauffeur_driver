<template>
  <section>
    <header class="container">
      <sidemenu-button />
    </header>
    <reconnecting-hero :show="isReconnecting" />
    <div
      v-swiper:ridesSwipe="{pagination: {
        el: '.swiper-pagination'
      }}"
      @slideChange="slideChange"
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
              <div
                class="pretitle"
                :class="!isToday(ride.start) ? 'is-not-today' : ''"
              >
                {{ ride.start|format_date('full') }}
              </div>
              <ride-status
                :status="ride.status"
                class="is-pulled-right"
              />
              <p class="poi-label">
                Prochaine destination
              </p>
              <p class="poi">
                {{ getNextStopLabel(ride) }}
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
import * as states from '@fabnumdef/e-chauffeur_lib-vue/api/status/states';
import * as actions from '@fabnumdef/e-chauffeur_lib-vue/api/status/transitions';
import rideStatus from '~/components/ride-status-badge.vue';
import rideCard from '~/components/ride-card.vue';
import statusChange from '~/components/ride-status-change.vue';
import ridesToAccept from '~/components/rides-to-accept.vue';
import reconnectingHero from '~/components/reconnecting-hero.vue';
import sidemenuButton from '~/components/sidemenu-button.vue';

export default {
  components: {
    sidemenuButton,
    rideCard,
    rideStatus,
    statusChange,
    ridesToAccept,
    reconnectingHero,
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
      isReconnecting: 'isReconnecting',
    }),
  },
  watch: {
    async isReconnecting() {
      if (!this.isReconnecting) {
        await this.$store.dispatch('rides/fetchRides', this.campus);
      }
    },
    rides() {
      this.slideChange();
    },
  },
  mounted() {
    this.slideChange();
    this.$socket.emit('driverConnected', {
      driverId: this.$auth.user.id,
      campusId: this.campus,
    });
  },
  methods: {
    isToday(date) {
      const today = new Date();
      const target = new Date(date);
      return today.getFullYear() === target.getFullYear()
      && today.getMonth() === target.getMonth()
      && today.getDate() === target.getDate();
    },
    async changeStatus(ride, status) {
      return this.$api.rides(this.campus, this.$auth.user.id, 'id').mutateRide(ride, status);
    },
    slideChange() {
      this.$store.dispatch('rides/selectRide', this.ridesSwipe.activeIndex);
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
    getNextStopLabel({ status, departure, arrival }) {
      switch (status) {
        case states.IN_PROGRESS:
        case states.DELIVERED:
          return arrival.label;
        case states.ACCEPTED:
        case states.STARTED:
        case states.WAITING:
        default:
          return departure.label;
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
  @keyframes alarmDate {
    0% { color: $white; }
    50% { color: $warning; }
    100% { color: $white; }
  }
  .pretitle {
    text-transform: uppercase;
    max-width: 250px;
    font-weight: bold;
    &.is-not-today {
      animation: alarmDate 4s infinite;
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
