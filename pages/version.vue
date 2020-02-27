<script>
export default {
  layout: 'simple',
  auth: false,
  asyncData({ app }) {
    return { version: app.$env.VERSION };
  },
  render(createElement) {
    return createElement('div', this.version);
  },
};
</script>
