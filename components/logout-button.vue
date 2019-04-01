<template>
  <button
    class="button"
    @click="logout()"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    customLogout: {
      type: Boolean,
      default: false,
    },
    toastedMessage: {
      type: String,
      default: 'À bientôt !',
    },
    redirectPage: {
      type: String,
      default: '/login',
    },
  },
  methods: {
    logout() {
      return (this.customLogout) ? this.$emit('click') : this.defaultLogout();
    },
    defaultLogout() {
      try {
        this.$auth.logout();
      } finally {
        this.$toasted.success(this.toastedMessage);
        this.$router.push(this.redirectPage);
      }
    },
  },
};
</script>
