<template>
  <div>
    <call-button />
    <nuxt-child />
  </div>
</template>
<script>
import callButton from '~/components/call-button.vue';

export default {
  components: {
    callButton,
  },
  async asyncData({ store, params }) {
    await store.dispatch('context/setCampus', params.campus);
    // @todo : redirect when campus not found
  },
};
</script>
