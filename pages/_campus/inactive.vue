<template>
  <main class="full-screen">
    <img
      src="/icon-inactive.svg"
      alt="icon-inactive"
    >
    <div class="half-screen">
      <p>
        <strong>Vous avez au moins une étape enregistrée.</strong>
      </p>
      <p>
        Pour commencer, cliquez
        sur le bouton ci-dessous.
      </p>
    </div>
    <ec-button @click.native="startService">
      Commencer le service
    </ec-button>
  </main>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import ecButton from '~/components/elements/button.vue';
import campusLink from '~/helpers/generate-campus-link';

export default {
  components: {
    ecButton,
  },
  computed: {
    ...mapGetters({
      driverStatus: 'status/workStatus',
      statusList: 'status/list',
      campus: 'context/campus',
    }),
  },
  methods: {
    ...mapMutations({
      setDriverStatus: 'status/setWorkStatus',
    }),
    startService() {
      this.setDriverStatus(this.statusList.ACTIVE);
      this.$router.push(campusLink(this.campus.id, this.driverStatus));
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~assets/css/head";

  main {
    background-color: $primary;
    color: $white;
  }
</style>
