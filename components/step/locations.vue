<template>
  <div class="locations">
    <img
      src="/locations-icon.svg"
      alt="locations-icon"
    >
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
    img {
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
