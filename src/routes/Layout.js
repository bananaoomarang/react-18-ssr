import { StaticRouter } from 'react-router'
import App from '../client/App'

const Layout = ({ location, staticRouteContext }) => (
  <body>
    <div id='react-app'>
      <StaticRouter location={location} context={staticRouteContext}>
        <App />
      </StaticRouter>
    </div>

    <script type='application/javascript' src='/assets/dist/main.js' />
  </body>
)
export default Layout
