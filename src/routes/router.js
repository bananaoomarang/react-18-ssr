import { renderToPipeableStream } from 'react-dom/server'
import { matchPath } from 'react-router-dom'
import routes from './routes'
import Layout from './Layout'

const router = (req, res, next) => {
  const route = routes.find(() => matchPath(req.path, route))
  const staticRouteContext = {}

  const stream = renderToPipeableStream(<Layout location={req.url} context={staticRouteContext} />, {
    onShellReady () {
      res.status(200)
      res.setHeader('Content-type', 'text/html')
      res.write('<!DOCTYPE html>')
      stream.pipe(res)
    },
    onShellError (e) {
      console.error(e)
      res.status(500).send('oh no!')
    },
    onError (e) {
      console.error(e)
      res.status(500).end()
    }
  })
}
export default router
