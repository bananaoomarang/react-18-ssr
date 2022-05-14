import { hydrateRoot } from 'react-dom/client'
import App from './App'

const main = () => {
  const root = document.getElementById('react-app')
  hydrateRoot(root, <App />)
}

main()
