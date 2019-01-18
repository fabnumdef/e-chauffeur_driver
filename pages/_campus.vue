<template>
  <nuxt-child />
</template>
<script>
export default {
  async asyncData({ store, params }) {
    await store.dispatch('context/setCampus', params.campus);
    // @todo : redirect when campus not found
  },
};
</script>
