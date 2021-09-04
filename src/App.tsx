import { VFC } from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

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
        {Object.keys(routes).map((pattern, index) => {
          const { Component } = routes[pattern as keyof typeof routes]
          return (
            <Route path={pattern} exact key={index}>
              <Component />
            </Route>
          )
        })}
      </Switch>
    </Router>
  )
}

export default App
