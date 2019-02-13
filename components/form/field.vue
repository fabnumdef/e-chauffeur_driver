<template>
  <div
    class="field"
  >
    <div
      v-if="label"
      class="field-label is-normal"
    >
      <label
        :for="fieldId"
        class="label"
      >
        {{ label }}
      </label>
    </div>
    <div class="field-body">
      <div class="field">
        <div
          class="control"
          :class="{
            'has-icons-left': !!iconLeft,
            'has-icons-right': !!iconRight,
          }"
        >
          <slot />
          <span
            v-if="!!iconLeft"
            class="icon is-small is-left"
          >
            <fa-icon :icon="iconLeft" />
          </span>
          <span
            v-if="!!iconRight"
            class="icon is-small is-right"
          >
            <fa-icon :icon="iconRight" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    iconLeft: {
      type: Array,
      default: null,
    },
    iconRight: {
      type: Array,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    fieldId: {
      type: String,
      default: null,
    },
  },
};
</script>
