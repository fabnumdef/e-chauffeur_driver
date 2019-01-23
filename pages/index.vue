<template>
  <div class="container">
    <h1 class="title">
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
  </div>
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
};
</script>
