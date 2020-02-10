<template>
  <div>
    <reconnecting-hero :show="isReconnecting" />
    <nuxt-child />
    <!--  Insert call buttons here conditionnally  -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import reconnectingHero from '~/components/reconnecting-hero.vue';

export default {
  components: {
    reconnectingHero,
  },
  async asyncData({
    params: { campus }, store,
  }) {
    await store.dispatch('rides/fetchRides', campus);
    return { campus };
  },
  mounted() {
    // @todo redirect depending on steps status
  },
  computed: {
    ...mapGetters({
      // @todo getSteps
      isReconnecting: 'isReconnecting',
    }),
  },
  watch: {
    async isReconnecting() {
      if (!this.isReconnecting) {
        await this.$store.dispatch('rides/fetchRides', this.campus);
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
