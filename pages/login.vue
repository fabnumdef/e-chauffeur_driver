<template>
  <div>
    <main class="container content">
      <h1>Me connecter</h1>
      <hr >
      <form @submit.prevent="login(user)">
        <div class="field">
          <label class="label">Mon email</label>
          <div class="control">
            <input
              v-model="user.email"
              required="required"
              class="input"
              type="email"
              placeholder="Email"
              autofocus="autofocus" >
          </div>
        </div>

        <div class="field">
          <label class="label">Votre code secret</label>
          <div class="control">
            <input
              v-model="user.password"
              required="required"
              class="input"
              type="password"
              placeholder="Tous les caractères sont acceptés" >
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-primary">Me connecter</button>
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
const DEFAULT_REDIRECT = '/rides';

export default {
  async asyncData({ query: { redirect } }) {
    return {
      redirectTo: redirect || DEFAULT_REDIRECT,
      user: {
        email: null,
        password: null,
      },
    };
  },
  computed: {
  },
  methods: {
    async login(data) {
      await this.$auth.login({ data });
      this.$toast.success('Bienvenue !');
    },
  },
};
</script>
