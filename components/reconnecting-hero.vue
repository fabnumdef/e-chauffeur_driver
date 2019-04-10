<template>
  <div
    v-if="show"
    class="notification reconnecting"
  >
    <div class="container">
      <p>
        Aucune connection avec la Centrale!
      </p>
      <p>
        Si le problème persiste, contactez le service.
      </p>
      <p>
        <fa-icon
          :icon="['fas', 'spinner']"
          :pulse="true"
        />&nbsp;
        Tentative de reconnection
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~assets/css/head";

  .reconnecting {
    background-color: $red;
    color: $white;
    font-weight: bold;
  }

</style>
