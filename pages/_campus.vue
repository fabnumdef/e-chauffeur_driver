<template>
  <div>
    <call-button />
    <passenger-call-button />
    <nuxt-child />
  </div>
</template>
<script>
import callButton from '~/components/call-button.vue';
import passengerCallButton from '~/components/passenger-call-button.vue';

export default {
  components: {
    callButton,
    passengerCallButton,
  },
  async asyncData({ store, params }) {
    await store.dispatch('context/setCampus', params.campus);
    // @todo : redirect when campus not found
  },
};
</script>
