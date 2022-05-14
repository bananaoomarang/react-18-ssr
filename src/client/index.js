import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import App from './App'

const main = () => {
  const history = createBrowserHistory()
  const root = document.getElementById('react-app')
  hydrateRoot(root, (
    <BrowserRouter history={history}>
      <App />
    </BrowserRouter>
  ))
}

main()
