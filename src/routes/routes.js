import Home from '../client/pages/Home'
import Example from '../client/pages/Example'

const routes = [
  {
    'path': '/',
    component: Home,
    exact: true
  },
  {
    'path': '/example',
    component: Example,
  }
]
export default routes
