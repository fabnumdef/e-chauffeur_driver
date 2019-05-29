<template>
  <div>
    <div
      v-if="isMenuOpen"
      class="background"
      @click="toggleMenu(false)"
    />
    <aside
      v-show="isMenuOpen"
      class="menu"
    >
      <p class="title">
        <sidemenu-button inverted /> Menu
      </p>
      <ul class="menu-list">
        <li>
          <nuxt-link
            :to="{name: 'index' }"
          >
            <fa-icon icon="car" /> Courses
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            :to="{name: 'account'}"
          >
            <fa-icon icon="user" /> Mon compte
          </nuxt-link>
        </li>
      </ul>
      <button
        class="button is-text logout"
        @click="logout()"
      >
        Se déconnecter
      </button>
    </aside>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import sidemenuButton from './sidemenu-button';

export default {
  components: {
    sidemenuButton,
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

  $menu-item-color: findColorInvert($primary);
  $menu-width: 250px;

  @import "~bulma/sass/components/menu.sass";

  .menu {
    height: 100%; /* 100% Full-height */
    width: $menu-width;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    background-color: $primary;
    font-weight: bold;
    font-size: $size-5;
    .title {
      font-size: $size-4;
      color: $menu-item-color;
      text-transform: uppercase;
      line-height: $size-3;
      vertical-align: middle;
      margin: $size-7/2;
      margin-bottom: $size-6;
    }
    .logout {
      margin-top: 20px;
      display: block;
      width: 100%;
      text-transform: initial;
      color: $white;
      font-size: $size-5;
      &:hover {
        color: $black;
      }
    }
  }
  .background {
    background: rgba($black, 0.4);
    z-index: 10;
    top: 0;
    position: fixed;
    height: 100vh;
    width: 100vw;
  }
</style>
