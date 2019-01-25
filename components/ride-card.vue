<template>
  <div class="box">
    <h2 class="subtitle">
      Course #{{ ride.id }}
    </h2>
    <ec-field
      label="Départ"
      :icon-left="['fas', 'map-marker-alt']"
    >
      <input
        v-model="ride.departure.label"
        disabled
        class="input"
      >
    </ec-field>
    <ec-field
      label="Arrivée"
      :icon-left="['fas', 'flag-checkered']"
    >
      <input
        v-model="ride.arrival.label"
        disabled
        class="input"
      >
    </ec-field>
    <a
      v-if="ride.phone"
      :href="`tel:${ride.phone}`"
      class="button is-rounded is-pulled-right phone-button"
    >
      <fa-icon :icon="['fas', 'phone']" />
    </a>
    <ul class="list-info">
      <li>Nombre de passagers : <strong>{{ ride.passengersCount }}</strong></li>
      <li>Heure de prise en charge : <strong>{{ ride.start|format_time('24_simple') }}</strong></li>
      <li v-if="ride.car">
        <strong v-if="ride.car.model">
          {{ ride.car.model.label }}
        </strong> / {{ ride.car.id }}
      </li>
    </ul>
    <status-change
      class="status-change"
      :status="ride.status"
      fullwidth
      @change="updateRide(ride, $event)"
      :cancel-only="cancelOnly"
    />
  </div>
</template>
<script>
  import ecField from '~/components/form/field.vue';
  import statusChange from '~/components/ride-status-change.vue';

  export default {
    components: {
      ecField,
      statusChange,

    },
    props: {
      ride: {
        type: Object,
        required: true,
      },
      cancelOnly: {
        type: Boolean,
        default: false,
      }
    },
    methods: {
      updateRide(ride, transition) {
        return this.$api.rides(this.campus, this.$auth.user.id, 'id').mutateRide(ride.id, transition);
      },
    },
  };
</script>
<style scoped lang="scss">
  @import "~assets/css/head";
  .input[disabled] {
    color: $text;
    background: transparent;
    border-color: $text;
    box-sizing: border-box;
  }

  .list-info {
    padding: $size-5 0;
  }

  .subtitle {
    font-weight: bold;
  }

  .phone-button {
    margin-top: $size-5;
    width: 34px;
    height: 34px;
    padding: 0;
    border-radius: 100%;
    box-shadow: 1px 2px 1px 0 rgba($black, 0.15);
  }
</style>
