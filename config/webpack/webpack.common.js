const path = require('path')
const { DefinePlugin, ProvidePlugin } = require('webpack')

module.exports = {
  entry: path.resolve(__dirname, '..', '..', 'src/client/index.js'),
  output: {
    path: path.resolve(__dirname, '..', '..', 'public', 'assets', 'dist'),
    filename: '[name].js',
    publicPath: '/dist/'
  },
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}
