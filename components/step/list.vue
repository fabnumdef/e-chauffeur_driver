<template>
  <div>
    <div
      v-for="(step, index) in steps"
      :key="index"
    >
      <svg
        width="12"
        height="38"
        viewBox="0 0 12 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="6"
          y1="2.53066e-08"
          x2="6"
          y2="38"
          stroke="#8192A9"
          stroke-width="2"
          stroke-dasharray="2 3"
        />
        <circle
          cx="6"
          cy="19"
          r="5"
          fill="#F9F9F9"
          stroke="#8192A9"
          stroke-width="2"
        />
      </svg>
      <ul>
        <li>
          {{ step.destination }} : <strong> {{ step.date }} </strong>
        </li>
        <li
          v-for="(detail, index) in step.details"
          :key="index"
        >
          {{ detail.key }} : <strong>{{ detail.value }}</strong>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    steps: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~assets/css/head";

  ul {
    margin-bottom: .5em;
    color: $gray;
    strong {
      color: inherit;
    }
  }
</style>
