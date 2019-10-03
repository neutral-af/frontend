const path = require('path')

// TODO: Set up a 'real' production build, with correct keys
process.env.VUE_APP_ENV = process.env.BUILD_ENV || 'staging'

process.env.VUE_APP_BACKEND_URL = process.env.VUE_APP_BACKEND_URL || (
  process.env.VUE_APP_ENV === 'prod' ? 'https://api.neutral.af/graphql' : 'https://backend-jasongwartz.neutral-af.now.sh/graphql'
)

if (!process.env.VUE_APP_STRIPE_PUBLIC_KEY) {
  console.error('The environment variable VUE_APP_STRIPE_PUBLIC_KEY must be provided.')
  process.exit(1)
}

if (!process.env.VUE_APP_HONEYCOMB_PUBLIC_KEY) {
  console.error('The environment variable VUE_APP_HONEYCOMB_PUBLIC_KEY was not provided, so tracking is disabled.')
}

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
