const serverProdConfig = require('./webpack.server.prod')

module.exports = Object.assign({}, serverProdConfig, {
  watch: true,
  mode: 'development',
  cache: {
    name: 'server-dev-cache',
    type: 'filesystem',
    buildDependencies: {
      config: [__filename, './.swcrc']
    }
  },
  module: {
    ...serverProdConfig.module,
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader'
        }
      },
      ...serverProdConfig.module.rules.filter(rule => rule.use && rule.use.loader !== 'babel-loader')
    ]
  }
})
