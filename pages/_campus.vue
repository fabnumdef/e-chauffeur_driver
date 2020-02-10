<template>
  <nuxt-child />
</template>
<script>
export default {
  async asyncData({ store, params, redirect }) {
    if (!params.campus) {
      redirect('/');
    }
    await store.dispatch('context/setCampus', params.campus);
  },
};
</script>
