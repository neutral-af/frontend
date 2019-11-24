const path = require('path')

// Here we use an object to remap incoming env vars onto how they are used in templates
const config = {
  branch: { key: 'NOW_GITHUB_COMMIT_REF', value: null },
  environment: { key: 'VUE_APP_ENV', value: '' },
  backendUrl: { key: 'VUE_APP_BACKEND_URL', value: '' },
  stripePublicKey: { key: 'VUE_APP_STRIPE_PUBLIC_KEY', value: '' },
  honeycombPublicKey: { key: 'VUE_APP_HONEYCOMB_PUBLIC_KEY', value: '' }
}

config.branch.value = process.env[config.branch.key]
console.log(`=> Config: detected git branch ${config.branch.value}`)

config.environment.value = process.env[config.environment.key] || (
  config.branch.value ? (config.branch.value === 'master' ? 'prod' : 'staging') : 'dev'
)
console.log(`=> Config: detected environment ${config.environment.value}`)

config.backendUrl.value = config.backendUrl.value || (
  config.environment.value === 'prod' ? 'https://api.neutral.af/graphql' : 'https://backend-jasongwartz.neutral-af.now.sh/graphql'
)
console.log(`=> Config: using backend URL ${config.backendUrl.value}`)

config.stripePublicKey.value = process.env[config.stripePublicKey.key]
if (config.stripePublicKey.value) {
  console.log(`=> Config: Using stripe key from ${config.stripePublicKey.key} env var`)
} else {
  config.stripePublicKey.value = process.env[`${config.environment.value.toUpperCase()}_${config.stripePublicKey.key}`]
  if (config.stripePublicKey.value) {
    console.log(`=> Config: Found stripe key at ${config.environment.value.toUpperCase()}_${config.stripePublicKey.key}.`)
  } else {
    console.error(`=> Config: Either ${config.stripePublicKey.key} or ${config.environment.value.toUpperCase()}_${config.stripePublicKey.key} must be provided.`)
    process.exit(1)
  }
}

config.honeycombPublicKey.value = process.env[config.honeycombPublicKey.key]
if (!config.honeycombPublicKey.value) {
  console.error('=> Config: The environment variable VUE_APP_HONEYCOMB_PUBLIC_KEY was not provided, so tracking is disabled.')
}

// Map config object onto environment variables
Object.values(config).map((el) => (process.env[el.key] = el.value))

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
