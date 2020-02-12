<template>
  <div>
    <reconnecting-hero :show="isReconnecting" />
    <nuxt-child />
    <!--  Insert call buttons here conditionnally  -->
    <call-button />
    <passenger-call-button />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import reconnectingHero from '~/components/reconnecting-hero.vue';
import callButton from '~/components/elements/call-button.vue';
import passengerCallButton from '~/components/elements/passenger-call-button.vue';
import campusLink from '~/helpers/generate-campus-link';

export default {
  components: {
    reconnectingHero,
    callButton,
    passengerCallButton,
  },
  async asyncData({
    params: { campus }, store, redirect,
  }) {
    if (!campus) {
      redirect('/');
    }
    await store.dispatch('context/setCampus', campus);
    store.commit('status/setStatus');
    await store.dispatch('rides/fetchRides', campus);
    return { campus };
  },
  computed: {
    ...mapGetters({
      steps: 'rides/steps',
      isReconnecting: 'isReconnecting',
    }),
  },
  watch: {
    async isReconnecting() {
      if (!this.isReconnecting) {
        await this.$store.dispatch('rides/fetchRides', this.campus);
      }
    },
    steps() {
      if (this.steps.length < 1) {
        this.$router.push(campusLink(this.campus, 'break'));
      }
    },
    mounted() {
      if (this.steps.length > 0) {
        this.$router.push(campusLink(this.campus, 'inactive'));
      } else {
        this.$router.push(campusLink(this.campus, 'break'));
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
