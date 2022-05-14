const path = require('path')
const { DefinePlugin } = require('webpack')
const commonConfig = require('./webpack.common')

module.exports = Object.assign({}, commonConfig, {
  entry: path.resolve(__dirname, '..', '..', 'src/routes/router.js'),
  cache: {
    name: 'server-prod-cache',
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.global.css$/,
        use: [
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
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
                exportOnlyLocals: true
              },
              importLoaders: 1
            }
          }
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, '..', '..', 'dist'),
    publicPath: '/dist/',
    filename: 'ssr-router.js',
    library: 'app',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    ...commonConfig.plugins,
    new DefinePlugin({ WEBPACK_SERVER_BUNDLE: JSON.stringify(true) })
  ]
})
