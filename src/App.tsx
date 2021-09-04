import { VFC } from 'react'
import { BrowserRouter as Router, Link, Switch } from 'react-router-dom'

import routes from '@/routes'

const Header: VFC = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to={routes['/todos'].url()}>Todos</Link>
        </li>
        <li>
          <Link to={routes['/todos/:todoId'].url({ todoId: '1' })}>Todo</Link>
        </li>
      </ul>
    </div>
  )
}

const App: VFC = () => {
  return (
    <Router>
      <Header />
      <Switch>
        {Object.keys(routes).map(
          (pattern) => routes[pattern as keyof typeof routes].Component
        )}
      </Switch>
    </Router>
  )
}

export default App
