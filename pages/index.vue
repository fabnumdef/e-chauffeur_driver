<template>
  <div class="container">
    <div class="columns">
      <p class="column">
        <sidemenu-button />
      </p>
      <div class="column is-narrow pretitle">
        Sélection du campus
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
import sidemenuButton from '~/components/sidemenu-button.vue';

export default {
  components: {
    sidemenuButton,
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
