<template>
  <div>
    <input
      v-bind="$attrs"
      type="password"
      class="input"
      :class="{ 'is-danger': !isValid}"
      :value="val || value"
      @input="input"
    >
    <p
      v-if="!lengthCheck"
      class="help is-danger"
    >
      Le mot de passe doit faire au moins {{ minLength }} caractères,
      il est recommandé d'y inclure chiffres, majuscules/minuscules, caractères spéciaux...
    </p>
  </div>
</template>
<script>

export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    minLength: {
      type: Number,
      default: 8,
    },
  },
  data: () => ({
    val: null,
  }),
  computed: {
    isValid() {
      return this.lengthCheck;
    },
    lengthCheck() {
      const { length } = this.val || this.value || '';
      return length === 0 || length >= this.minLength;
    },
  },
  methods: {
    input({ target = {} } = {}) {
      this.val = target.value;
      this.$emit(
        'input',
        target.value,
      );
    },
  },
};
</script>
