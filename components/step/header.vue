<template>
  <header :class="rideStatus ? 'active' : ''">
    <aside>Destination</aside>
    <h1>{{ destination }}</h1>
    <ec-button @click.native="emitClick">
      {{ rideStatus ? 'Etape terminée' : "Commencer l'étape" }}
    </ec-button>
  </header>
</template>

<script>
import ecButton from '~/components/elements/button.vue';

export default {
  components: {
    ecButton,
  },
  props: {
    destination: {
      type: String,
      required: true,
    },
    rideStatus: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    emitClick() {
      this.$emit('updateStep');
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~assets/css/head";

  header {
    background-color: $primary;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1em;
    color: $white;
    &.active {
      background-color: $green;
    }
    h1 {
      font-size: 2em;
      font-weight: 700;
      text-transform: uppercase;
    }
    button {
      width: 100%;
      color: $black;
    }
  }
</style>
