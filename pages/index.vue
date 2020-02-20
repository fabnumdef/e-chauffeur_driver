<template>
  <main>
    <h1 class="column is-narrow pretitle">
      Sélection du campus
    </h1>
    <ul
      v-if="campuses"
      class="columns"
    >
      <li
        v-for="campus in campuses"
        :key="campus.id"
        class="column"
      >
        <nuxt-link
          :to="{name: `campus-${driverStatus}`, params: { campus: campus.id }}"
          class="box"
        >
          {{ campus.name }}
        </nuxt-link>
      </li>
    </ul>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import campusLink from '~/helpers/generate-campus-link';

export default {
  async asyncData({ store }) {
    await store.dispatch('context/fetchAccessibleCampuses');
  },
  computed: {
    ...mapGetters({
      campuses: 'context/accessibleCampuses',
      driverStatus: 'status/workStatus',
    }),
  },
  mounted() {
    if (this.campuses && this.campuses.length === 1) {
      const [campus] = this.campuses;
      this.$router.push(campusLink(campus.id, this.driverStatus));
    }
  },
};
</script>

<style lang="scss" scoped>

</style>
