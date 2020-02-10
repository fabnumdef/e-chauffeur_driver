<template>
  <div>
    <nuxt />
    <ec-nav />
  </div>
</template>

<script>
import ecNav from '~/components/nav';

export default {
  components: {
    ecNav,
  },
};
</script>

<style lang="scss" scoped>
  div {
    height: 100%;
    main.full-screen {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      /deep/ svg.main-icon, div {
        margin: 3em 0;
      }
      /deep/ div {
        width: 50%;
      }
      /deep/ strong {
        color: inherit;
      }
    }
  }

</style>
