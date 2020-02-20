<template>
  <main class="full-screen">
    <img
      src="/icon-break.svg"
      alt="break-icon"
    >
    <div class="half-screen">
      <p>
        Vous n'avez actuellement
        <strong>aucune course programmée.</strong>
      </p>
    </div>
  </main>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import campusLink from '~/helpers/generate-campus-link';

export default {
  computed: {
    ...mapGetters({
      driverStatus: 'status/workStatus',
      statusList: 'status/list',
      campus: 'context/campus',
    }),
  },
  methods: {
    ...mapMutations({
      setStatus: 'status/setWorkStatus',
    }),
    // @todo need to implement break system
    startBreak() {
      this.setStatus(this.statusList.BREAK);
      this.$router.push(campusLink(this.campus.id, this.driverStatus));
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~assets/css/head";

  main {
    background-color: $orange;
    color: $white;
  }
</style>
