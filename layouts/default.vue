<template>
  <div>
    <sidemenu-menu />
    <nuxt />
  </div>
</template>
<script>
import sidemenuMenu from '~/components/sidemenu-menu.vue';

export default {
  components: {
    sidemenuMenu,
  },
};
</script>

<style scoped lang="scss">
  @import "~assets/css/head";

  .is-menu {
    padding-right: 0;
    background: $blue-dark;
    margin-bottom: -$size-small;
  }
  .columns {
    height: 100%;
  }
  .is-map {
    margin-bottom: -$size-small * 2;
  }
</style>
