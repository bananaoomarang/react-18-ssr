const serverProdConfig = require('./webpack.server.prod')

module.exports = Object.assign({}, serverProdConfig, {
  watch: true,
  mode: 'development',
  devtool: 'cheap-module-source-map',
  cache: {
    name: 'server-dev-cache',
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  },
  module: {
    ...serverProdConfig.module,
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            envName: 'development-server'
          }
        }
      },
      ...serverProdConfig.module.rules.filter(rule => rule.use && rule.use.loader !== 'babel-loader')
    ]
  }
})
