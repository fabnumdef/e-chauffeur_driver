<template>
  <div>
    <nuxt />
    <ec-nav />
  </div>
</template>

<script>
import ecNav from '~/components/nav.vue';

export default {
  components: {
    ecNav,
  },
};
</script>

<style lang="scss" scoped>
  div {
    height: 100%;
  }
</style>
