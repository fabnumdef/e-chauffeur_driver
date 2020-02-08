const pkg = require('./package');

module.exports = {
  head: {
    title: 'e-Chauffeur - Chauffeur',
    link: [
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Source+Sans+Pro:400,700' },
    ],
  },

  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/',
    },
    plugins: [
      { src: '~/plugins/geolocation.js', client: 'only' },
      { src: '~/plugins/socket.js', client: 'only' },
      { src: '~/plugins/push-notif.js', client: 'only' },
    ],
    scopeKey: pkg.name,
  },

  router: {
    middleware: ['auth', 'menu'],
  },

  css: [
    'swiper/dist/css/swiper.css',
    { src: '~assets/css/main.scss', lang: 'scss' },
  ],

  plugins: [
    { src: '~/plugins/swiper.js', ssr: false },
  ],

  modules: [
    [
      '@fabnumdef/e-chauffeur_lib-vue',
      {
        components: {
          ecButton: 'atoms/button.vue',
        },
        api: {
          jwt: 'jwt',
          rides: 'rides',
          campuses: 'campuses',
          users: 'users',
        },
        withAuth: true,
        authPlugins: [
          { src: 'auth-renew', mode: 'client' },
          { src: 'user-expiration', mode: 'client' },
        ],
        prometheus: {
          host: '0.0.0.0',
        },
      },
    ],
  ],

  fontAwesome: {
    packs: [
      {
        package: '@fortawesome/free-solid-svg-icons',
        icons: [
          'faUser',
          'faKey',
          'faPhone',
          'faFlagCheckered',
          'faMapMarkerAlt',
          'faAngleDown',
          'faHeadset',
          'faSpinner',
          'faBars',
          'faCar',
        ],
      },
    ],
  },

  manifest: {
    name: 'e-Chauffeur - Chauffeur',
    short_name: 'e-Chauffeur',
    description: 'Application chauffeur',
  },
  workbox: {
    importScripts: [
      'push.js',
    ],
  },
};
