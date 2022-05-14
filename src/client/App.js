import { Route, Switch } from 'react-router-dom'
import routes from '../routes/routes'

const App = () => (
  <>
    {routes.map((route, index) => <Route key={index} {...route} />)}
  </>
)
export default App
