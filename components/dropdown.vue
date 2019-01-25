<template>
  <div
    class="dropdown is-up"
    :class="{ 'is-active': open }"
  >
    <div class="dropdown-trigger">
      <button
        class="button"
        aria-haspopup="true"
        aria-controls="dropdown-menu"
        @click="open = !open"
      >
        <span><slot /></span>
        <span class="icon is-small">
          <fa-icon :icon="['fas', 'angle-down']" />
        </span>
      </button>
    </div>
    <div
      class="dropdown-menu"
      role="menu"
    >
      <div class="dropdown-content">
        <button
          v-for="(option, id) in options"
          :key="id"
          class="dropdown-item"
          @click="propagate(id)"
        >
          {{ option }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({ open: false }),
  methods: {
    propagate(id) {
      this.$emit('click', id);
    },
  },
};
</script>
<style scoped lang="scss">
  @import "~assets/css/head";
  @import "~bulma/sass/components/dropdown.sass";
  .dropdown.is-fullwidth {
      display: flex;
      flex: 1;
    .dropdown-trigger, .button, .dropdown-menu, .dropdown-content, .dropdown-item {
      width: 100%;
    }
    &.is-danger {
      .button {
        background: $danger;
        color: $text-invert;
        border: none;
      }
      .dropdown-item {
        color: $danger;
        background: none;
        border: none;
        border-bottom: 1px solid $danger;
        cursor: pointer;
        padding: 10px;
      }
      .dropdown-menu {
      padding-bottom: 0;
      }
      .dropdown-content {
        border: 1px solid $danger;
        border-bottom: none;
        padding: 0;
      }
    }
  }
</style>
