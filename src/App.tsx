import { Box, ChakraProvider, Container, Flex } from '@chakra-ui/react'
import { VFC } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Index as Header } from '@/components/Header'
import { AuthProvider } from '@/contexts/auth'
import { Pattern, routeByPattern } from '@/routes'

const App: VFC = () => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <Flex direction="column" minH="100vh" alignItems="stretch">
            <Header />
            <Box flex="1">
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
            </Box>
          </Flex>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App
