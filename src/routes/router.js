import { renderToPipeableStream } from 'react-dom/server'
import Layout from './Layout'

const router = (req, res, next) => {
  const stream = renderToPipeableStream(<Layout />, {
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
