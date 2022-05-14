const http = require('http')
const debounce = require('lodash.debounce')

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

  const watcher = chokidar.watch(['src'])
  watcher.on('ready', () => {
    watcher.on('all', debounce(onDevFileChange, 500, { leading: true }))
  })
}

let server = app
  .listen(PORT, () => {
    console.log(`Listening on ${PORT}...`)
  })
  .on('error', err => {
    throw err
  })

/**
 * Try to restart the server
 */
function restartServer () {
  server.close(() => {
    let newApp

    try {
      newApp = require('./app')
    } catch (e) {
      console.error(e)
      return
    }

    try {
      server = app.listen(PORT, () => {
        console.log(`Listening on ${PORT}...`)
      })
      .on('error', err => {
        throw err
      })
    } catch (e) {
      console.error(e)
    }
  })
}

/**
 * Bust require cache
 */
function onDevFileChange () {
  Object.keys(require.cache).forEach(id => {
    if (id.includes('node_modules')) {
      return
    }
    if (id.includes('/src/') || id.includes('/dist/')) {
      delete require.cache[id]
    }
  })
  restartServer()
}
