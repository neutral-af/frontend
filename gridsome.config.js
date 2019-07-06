const path = require('path')

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/sass/_utilities.scss'),
        path.resolve(__dirname, './src/assets/sass/_variables.scss')
      ]
    })
}

module.exports = {
  chainWebpack (config) {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => {
      const rule = config.module.rule('scss').oneOf(type)
      addStyleResource(rule)
    })
  },
  siteName: 'Carbon Offset',
  siteDescription: 'Removes the carbon emissions from your online purchases',
  plugins: []
}
