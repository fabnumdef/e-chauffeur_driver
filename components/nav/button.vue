<template>
  <button class="button">
    <fa-icon :icon="['fas', icon]"></fa-icon>
    <a :href="link">{{ content }}</a>
  </button>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
  button {
    width: 100%;
    height: 100%;
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1em;
    &:hover {
    background-color: red;
    }
  }
</style>
