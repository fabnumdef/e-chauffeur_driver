<template>
  <header :class="driving ? 'active' : ''">
    <aside>Destination</aside>
    <h1>{{ destination }}</h1>
    <ec-button @click.native="emitClick">
      {{ buttonContent }}
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
    driving: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonContent() {
      return this.driving ? 'Etape terminée' : "Commencer l'étape";
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
