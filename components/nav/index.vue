<template>
  <nav>
    <nav-button
      content="Courses"
      link="#"
      icon="car"
    />
    <nav-button
      content="Historique"
      link="#"
      icon="car"
    />
    <nav-button
      content="Compte"
      link="#"
      icon="car"
    />
  </nav>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import navButton from '~/components/nav/button.vue';

export default {
  components: {
    navButton,
  },
  computed: {
    ...mapGetters(['isMenuOpen']),
    ...mapGetters({
      campus: 'context/campus',
    }),
  },
  methods: {
    ...mapMutations(['toggleMenu']),
    logout() {
      try {
        this.$auth.logout();
      } finally {
        this.$toasted.success('À bientôt !');
        this.$router.push('/login');
        this.toggleMenu(false);
      }
    },
  },
};
</script>

<style scoped lang="scss">
  @import "~assets/css/head";
  @import "~bulma/sass/components/menu.sass";

  nav {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 1em;
  }
</style>
