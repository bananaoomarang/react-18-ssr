import { Link } from 'react-router-dom'
import styles from './styles/Example.css'

const Example = () => (
  <div className={styles.layout}>
    <h1>An example page...</h1>
    <Link to='/'>Home</Link>
  </div>
)
export default Example
