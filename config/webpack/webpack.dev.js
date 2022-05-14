const commonConfig = require('./webpack.common')
const { DefinePlugin, HotModuleReplacementPlugin, LoaderOptionsPlugin } = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')

module.exports = Object.assign({}, commonConfig, {
  entry: ['webpack-hot-middleware/client', commonConfig.entry],
  mode: 'development',
  watch: true,
  devtool: 'cheap-module-source-map',
  cache: {
    name: 'client-dev-cache',
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  },
  module: {
    ...commonConfig.module,
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.global.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /\.global.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]'
              },
              importLoaders: 1,
              url: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    ...commonConfig.plugins,
    new LoaderOptionsPlugin({ debug: true }),
    new HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
    new ErrorOverlayPlugin()
  ]
})
