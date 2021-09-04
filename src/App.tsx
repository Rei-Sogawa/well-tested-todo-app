import { VFC } from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

import { Pattern, routeByPattern } from '@/routes'

const Header: VFC = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to={routeByPattern['/todos'].path()}>Todos</Link>
        </li>
        <li>
          <Link to={routeByPattern['/todos/:todoId'].path({ todoId: '1' })}>Todo</Link>
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
        {Object.keys(routeByPattern).map((pattern, index) => {
          const { Component } = routeByPattern[pattern as Pattern]
          return (
            <Route key={index} path={pattern} exact>
              <Component />
            </Route>
          )
        })}
      </Switch>
    </Router>
  )
}

export default App
