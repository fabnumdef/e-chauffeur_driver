<template>
  <ul v-if="campuses">
    <li
      v-for="campus in campuses"
      :key="campus.id"
    >
      <nuxt-link :to="{name: 'campus', params: { campus: campus.id }}">
        Voir mes courses sur le campus {{ campus.name }}
      </nuxt-link>
    </li>
  </ul>
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
