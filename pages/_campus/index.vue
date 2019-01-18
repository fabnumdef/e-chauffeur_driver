<template>
  <section>
    <ul>
      <li
        v-for="ride in rides"
        :key="ride.id"
      >
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
      </li>
    </ul>
  </section>
</template>
<script>
import { mapGetters } from 'vuex';
import { actions } from '~/api/status';

export default {
  async asyncData({
    params, store,
  }) {
    await store.dispatch('rides/fetchRides', params.campus);
    return { campus: params.campus };
  },
  computed: {
    actions: () => actions,
    ...mapGetters({
      rides: 'rides/rides',
    }),
  },
  methods: {
    changeStatus(ride, status) {
      return this.$api.rides(this.campus, this.$auth.user.id, 'id').mutateRide(ride.id, status);
    },
  },
};
</script>
