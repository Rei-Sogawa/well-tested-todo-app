import { ChakraProvider, Container } from '@chakra-ui/react'
import { VFC } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Header } from '@/components/Header'
import { AuthProvider } from '@/contexts/auth'
import { Pattern, routeByPattern } from '@/routes'

const App: VFC = () => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <Header />
          <Container maxWidth="container.md">
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
          </Container>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App
