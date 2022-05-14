const app = require('express')()
const proxy = require('express-http-proxy')

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackClientConfig = require('config/webpack/webpack.dev.js')
const webpackServerConfig = require('config/webpack/webpack.server.dev.js')
const serverCompiler = webpack(webpackServerConfig)
const clientCompiler = webpack(webpackClientConfig)

app.use(webpackDevMiddleware(serverCompiler, {
  writeToDisk: true,
  publicPath: webpackServerConfig.output.publicPath,
  serverSideRender: true
}))
app.use(webpackDevMiddleware(clientCompiler, {
  writeToDisk: true,
  publicPath: webpackClientConfig.output.publicPath,
  serverSideRender: true
}))
app.use(webpackHotMiddleware(clientCompiler))

app.use(proxy(`localhost:${process.env.PORT || 3000}`, {
  limit: '20mb'
}))
module.exports = app
