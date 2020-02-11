<template>
  <div class="locations">
    <svg
      width="12"
      height="73"
      viewBox="0 0 12 73"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="6"
        y1="12"
        x2="6"
        y2="61"
        stroke="black"
        stroke-width="2"
        stroke-dasharray="2 3"
      />
      <circle
        cx="6"
        cy="67"
        r="5"
        stroke="#1C1C1C"
        stroke-width="2"
      />
      <circle
        cx="6"
        cy="6"
        r="5"
        stroke="#1C1C1C"
        stroke-width="2"
      />
    </svg>
    <div class="container">
      <div class="departure">
        <p>Départ</p>
        <h3>{{ departure }}</h3>
      </div>
      <div class="arrival">
        <p>Arrivée</p>
        <h3>{{ arrival }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    departure: {
      type: String,
      required: true,
    },
    arrival: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~assets/css/head";

  .locations {
    position: relative;
    margin-bottom: 1em;
    svg {
      position: absolute;
      left: 0;
      bottom: .5em;
    }
    .container {
      margin-left: 2em;
      p {
        font-size: .8em;
      }
      h3 {
        font-size: 1.3em;
        border-bottom: 1px solid $light-gray;
        margin-bottom: .5em;
      }
    }
  }
</style>
