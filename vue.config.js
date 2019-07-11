// vue.config.js
const path = require('path')

process.env.VUE_APP_CHECKOUT_API_URL = 'https://frontend.jasongwartz.now.sh'
process.env.VUE_APP_STRIPE_PUBLIC_KEY = 'pk_test_svsiEDfLy9Ibj501NJA5wv7C00mCpMpl3l'
process.env.VUE_APP_HONEYCOMB_PUBLIC_KEY = '737e1600677f83a69ea60fb1031f9f94'

const addStyleResource = (rule) => {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/sass/_base.scss')
      ]
    })
}

module.exports = {
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
  }
}
