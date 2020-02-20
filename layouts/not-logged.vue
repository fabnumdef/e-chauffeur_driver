<template>
  <div class="blue-layout">
    <nuxt />
  </div>
</template>
<script>
export default {

};
</script>

<style lang="scss">
  @import "~assets/css/head";
  .blue-layout {
    background: $blue-medium;
    min-height: 100%;
    padding: 50px;
    .label {
      color: $white;
      margin-left: 36px;
    }
    .control.has-icons- {
      &left, &right {
        .icon {
          color: $white;
        }
        .input:focus ~ .icon {
          color: $white;
        }
      }
    }
    .input, .textarea {
      border-color: $white;
      color: $white;
      &::placeholder {
        color: rgba($white, 0.8);
      }
    }
  }
</style>
