<template>
  <main>
    <header>
      <h1>
        Historique du jour
      </h1>
    </header>
    <ul>
      <li
        v-for="(ride, index) in rides"
        :key="index"
      >
        <h2 v-if="rides.length === 0">
          Vous n'avez pas encore de courses terminées aujourd'hui
        </h2>
        <ride-card
          v-else
          :previous="ride.departure.label"
          :destination="ride.arrival.label"
        >
          <template #header>
            <h2>Course #{{ ride.id }}</h2>
            <h3>{{ `${convertDate(ride.start)} - ${convertDate(ride.end)}` }}</h3>
          </template>
        </ride-card>
      </li>
    </ul>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import { DateTime } from 'luxon';
import { DELIVERED } from '@fabnumdef/e-chauffeur_lib-vue/api/status/states';
import rideCard from '~/components/step/current.vue';
import { isToday } from '../helpers/date-helpers';

export default {
  components: {
    rideCard,
  },
  data() {
    return {
      rides: null,
    };
  },
  computed: {
    ...mapGetters({
      campus: 'context/campus',
    }),
  },
  async mounted() {
    if (!this.campus) {
      this.$router.push('/');
      return;
    }
    const { data } = await this.$api.rides(
      this.campus.id,
      'id,start,end,departure(label),arrival(label)',
    ).getDriverRides(this.$auth.user.id, DELIVERED);
    this.rides = data.filter((ride) => (
      isToday(DateTime.fromISO(ride.start).toJSDate())
      && DateTime.fromISO(ride.end).toJSDate() < new Date()
    ));
  },
  methods: {
    convertDate(date) {
      return DateTime.fromISO(date).toFormat("HH'h'mm");
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~assets/css/head";

  main {
    padding-bottom: 4em;
    header {
      background-color: $primary;
      width: 100%;
      height: 110px;
      display: flex;
      align-items: center;
      justify-self: center;
      h1 {
        text-align: center;
        width: 100%;
        color: $white;
        font-size: 2em;
        font-weight: 700;
        margin: 1em;
      }
    }
    ul {
      padding: 2em;
      width: 100%;
      li {
        margin-bottom: 3em;
        h2 {
          font-size: 1em;
          text-transform: uppercase;
        }
        h3 {
          font-weight: 700;
          font-size: 1.2em;
          margin-bottom: .5em;
        }
      }


    }
  }

</style>
