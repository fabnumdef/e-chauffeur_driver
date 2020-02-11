<template>
  <article class="current-step">
    <header>
      <h2>Etape en cours</h2>
      <h2>{{ date }}</h2>
    </header>
    <step-locations
      :departure="previous"
      :arrival="destination"
    />
    <h2>Détails :</h2>
    <ul>
      <li
        v-for="(detail, index) in details"
        :key="index"
      >
        {{ detail.key }} : <strong>{{ detail.value }}</strong>
      </li>
    </ul>
  </article>
</template>

<script>
import stepLocations from '~/components/step/locations.vue';

export default {
  components: {
    stepLocations,
  },
  props: {
    date: {
      type: String,
      required: true,
    },
    previous: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    details: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~assets/css/head";

  article {
    header {
      display: flex;
      justify-content: space-between;
    }
    h2, li {
      font-size: 1.3em;
      font-weight: 700;
      margin-bottom: .5em;
    }
    li {
      font-weight: unset;
    }
  }
</style>
