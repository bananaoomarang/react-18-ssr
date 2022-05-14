const express = require('express')
const http = require('http')

const PORT = process.env.PORT || 3000
const app = require('./app')

if (process.env.NODE_ENV === 'development') {
  const chokidar = require('chokidar')
  require('source-map-support').install()

  const devApp = require('./app-dev')
  const devServer = http.createServer(devApp)
  devServer.listen(process.env.DEV_PORT || '3001')
  devServer.on('error', err => {
    throw err
  })
  devServer.on('listening', () => {
    console.log('dev listening')
  })

  // const watcher = chokidar.watch(['server', 'routes/api', 'dist/*.js', 'blog'])
  // watcher.on('ready', () => {
  //   watcher.on('all', debounce(onDevFileChange, 500, { leading: true }))
  // })
}

app.use(express.static('public'))

app
  .listen(PORT, () => {
    console.log(`Listening on ${PORT}...`)
  })
  .on('error', err => {
    throw err
  })
