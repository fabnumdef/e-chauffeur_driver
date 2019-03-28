<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <h1 class="title">
          Sélection du campus
        </h1>
      </div>
      <div class="column is-narrow">
        <logout-button
          class="is-danger is-small"
        >
          Se déconnecter
        </logout-button>
      </div>
    </div>
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
import logoutButton from '~/components/logout-button.vue';

export default {
  components: {
    logoutButton,
  },
  computed: {
    ...mapGetters({
      campuses: 'context/accessibleCampuses',
    }),
  },
  async asyncData({ store }) {
    await store.dispatch('context/fetchAccessibleCampuses');
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
  .container {
    margin-top: 10px;
  }
</style>
