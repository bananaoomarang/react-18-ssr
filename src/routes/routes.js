import { lazy } from 'react'

const routes = [
  {
    'path': '/',
    component: lazy(() => import('../client/pages/Home')),
    exact: true
  },
  {
    'path': '/example',
    component: lazy(() => import('../client/pages/Example')),
  }
]
export default routes
