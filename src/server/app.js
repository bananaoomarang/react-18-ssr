const express = require('express')
const createError = require('http-errors')
const app = express()

app.use(express.static('public'))

if (process.env.NODE_ENV === 'development') {
  app.use(function (req, res, next) {
    const ssrRouter = require('dist/ssr-router').app.default

    return ssrRouter(req, res, next)
  })
} else {
  const ssrRouter = require('dist/ssr-router').app.default
  app.use(ssrRouter)
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

module.exports = app
