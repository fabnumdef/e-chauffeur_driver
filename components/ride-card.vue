<template>
  <div class="box">
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
    <div
      v-if="ride.comments"
      class="comments"
    >
      <fa-icon :icon="['fas', 'headset']" />
      <p>{{ ride.comments }}</p>
    </div>
    <ul class="list-info">
      <li>Nombre de passagers : <strong>{{ ride.passengersCount }}</strong></li>
      <li>Heure de prise en charge : <strong>{{ ride.start|format_time('24_simple') }}</strong></li>
      <li>
        Tel. portable passager : <strong>{{ ride.phone ? 'Oui' : 'Non' }}</strong>
      </li>
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
      :cancel-only="cancelOnly"
      :no-cancel="noCancel"
      @change="updateRide(ride, $event)"
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
    },
    noCancel: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    updateRide(ride, transition) {
      return this.$api.query('rides').setMask('id').mutate(ride.id, transition);
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
  .input, /deep/ .control .icon {
    font-size: 24px;
  }

  .list-info {
    padding: $size-5 0;
    font-size: 21px;
  }

  .subtitle {
    font-weight: bold;
  }
  .comments {
    display: flex;
    /deep/ .fa-headset {
      background: $primary;
      color: findColorInvert($primary);
      box-sizing: content-box;
      border-radius: 100%;
      padding: 4px;
      font-size: 9px;
      margin-top: auto;
      margin-right: $size-small;
    }
    > p {
      background: $light-gray;
      padding: $size-small;
      border-radius: $size-small $size-small $size-small 0;
      box-sizing: content-box;
    }
  }
</style>
