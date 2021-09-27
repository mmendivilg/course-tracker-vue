module.exports = {
  transpileDependencies: [
    'vuetify'
  ],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'es',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  configureWebpack:{
    output: {
      filename: '[name].[hash].bundle.js'
    }
  }
}
