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
          :to="{name: 'campus', params: { campus: campus.id }}"
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

export default {
  async asyncData({ store }) {
    await store.dispatch('context/fetchAccessibleCampuses');
  },
  computed: {
    ...mapGetters({
      campuses: 'context/accessibleCampuses',
    }),
  },
  mounted() {
    if (this.campuses && this.campuses.length === 1) {
      const [campus] = this.campuses;
      this.$router.push({ name: 'campus', params: { campus: campus.id } });
    }
  },
};
</script>

<style lang="scss" scoped>

</style>
