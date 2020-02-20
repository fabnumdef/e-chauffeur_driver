<template>
  <article class="current-step">
    <header>
      <slot name="header" />
    </header>
    <step-locations
      :departure="previous"
      :arrival="destination"
    />
    <slot name="details" />
  </article>
</template>

<script>
import stepLocations from '~/components/step/locations.vue';

export default {
  components: {
    stepLocations,
  },
  props: {
    previous: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
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
      flex-wrap: wrap;
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
