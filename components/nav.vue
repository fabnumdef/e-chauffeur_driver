<template>
  <nav>
    <nuxt-link
      :class="isActive('campus')"
      :to="campus && campus.id ? campusLink(campus.id, driverStatus) : '/'"
    >
      <fa-icon :icon="['fas', 'car']" />
      Courses
    </nuxt-link>

    <nuxt-link
      :class="isActive('history')"
      :to="{ name: 'history' }"
    >
      <fa-icon :icon="['fas', 'history']" />
      Historique
    </nuxt-link>

    <nuxt-link
      :class="isActive('account')"
      :to="{ name: 'account' }"
    >
      <fa-icon :icon="['fas', 'user-circle']" />
      Compte
    </nuxt-link>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import campusLink from '~/helpers/generate-campus-link';
import { statuses } from '../store/status';

export default {
  data() {
    return {
      campusLink,
    };
  },
  computed: {
    ...mapGetters({
      campus: 'context/campus',
      driverStatus: 'status/workStatus',
    }),
  },
  methods: {
    isActive(name) {
      if (this.$route.name.split('-').find((string) => string === name)) {
        return statuses.ACTIVE;
      }
      return '';
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
    padding-top: 1em;
    a {
      background-color: $light-gray;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: .5em;
      cursor: pointer;
      font-size: 1em;
      color: $gray;
      &.active {
        color: $primary;
        font-weight: 700;
        pointer-events: none;
      }
      svg {
        margin-top: .3em;
        color: inherit;
      }
    }

  }
</style>
