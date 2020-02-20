<template>
  <div>
    <div
      v-for="(step, j) in steps"
      :key="j"
    >
      <img
        src="/step-list-icon.svg"
        alt="list-icon"
      >
      <ul>
        <li>
          {{ step.destination }} : <strong> {{ getDate(step.date) }} </strong>
        </li>
        <li>
          {{ step.passengersCount.key }} : <strong>{{ step.passengersCount.value }}</strong>
        </li>
        <ul v-if="step.phone.length > 0">
          Téléphone :
          <li
            v-for="(phone, i) in step.phone"
            :key="i"
          >
            {{ phone }}
          </li>
        </ul>
      </ul>
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon';

export default {
  props: {
    steps: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    getDate(date) {
      return DateTime.fromISO(date).toFormat("HH 'h' mm");
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
