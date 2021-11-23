export default {
  head: {
    title: 'wmf-shop',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    {src: '~/assets/style/global.scss', lang: 'scss'}
  ],
  server: {
    port: 3005,
  },
  plugins: [],
  components: true,
  buildModules: ['@nuxtjs/style-resources'],
  // styleResources: {
  //   //обязательно подключить здесь для рабочих scss переменнных
  //   scss: ['~/assets/style/_mixins.scss', '~/assets/style/_skeleton_btn_buy.scss']
  // },
  modules: ['@nuxtjs/axios',],
  axios: {},
  build: {},
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  }
}
