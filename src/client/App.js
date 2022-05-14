import { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import routes from '../routes/routes'

const App = () => (
  <Suspense fallback={<h1>loading...</h1>}>
    {routes.map((route, index) => <Route key={index} {...route} />)}
  </Suspense>
)
export default App
