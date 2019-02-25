<template>
  <div class="container">
    <h1 class="title">
      Une erreur s'est produite
    </h1>
    <div class="box">
      <p>
        Erreur : {{ error.message }}
      </p>
      <nuxt-link
        class="button"
        to="/"
      >
        Retour à l'accueil
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => ({}),
    },
  },
  layout: 'default',
};
</script>

<style scoped lang="scss">
  @import "~assets/css/head";

  .is-menu {
    padding-right: 0;
    background: $blue-dark;
    margin-bottom: -$size-small;
    min-height: 100vh;
  }
  .column.content-col {
    padding: $size-medium !important;
  }
  .columns {
    height: 100%;
  }
  .is-map {
    margin-bottom: -$size-small * 2;
  }
</style>
