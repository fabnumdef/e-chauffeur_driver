<template>
  <header :class="getColorClass(status)">
    <p>Destination</p>
    <h1>{{ destination }}</h1>
    <button @click="handleClick">Commencer la course</button>
  </header>
</template>

<script>
import * as states from '@fabnumdef/e-chauffeur_lib-vue/api/status/states';

export default {
  props: {
    status: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    isStarted: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    getColorClass(status) {
      switch (status) {
        case states.STARTED:
          return 'is-gray';
        case states.WAITING:
          return 'is-warning';
        default:
          return '';
      }
    },
    handleClick() {
      this.$emit('updateStatus', !this.isStarted);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
