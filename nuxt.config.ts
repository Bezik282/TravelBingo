
export default defineNuxtConfig({
  compatibilityDate: '2025-07-01',

  devtools: {
    enabled: true
  },

  css: [
    '../app/assets/css/main.css'
  ],

  app: {
    head: {
      title: 'Travel Bingo',
      meta: [
        {
          name: 'description',
          content: 'Our adventures, one bingo at a time.'
        },
        {
          name: 'theme-color',
          content: '#0077B6'
        }
      ]
    }
  }
})
