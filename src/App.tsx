import { Box, ChakraProvider, Container, HStack, Link } from '@chakra-ui/react'
import { VFC } from 'react'
import { BrowserRouter as Router, Link as ReactRouterLink, Route, Switch } from 'react-router-dom'

import { Pattern, routeByPattern } from '@/routes'

const Header: VFC = () => {
  return (
    <Box bg="gray.800" color="white" fontWeight="bold" py="4">
      <Container maxWidth="container.md">
        <HStack spacing="4">
          <Link
            as={ReactRouterLink}
            to={routeByPattern['/todos'].path()}
            _focus={{ boxShadow: 'none' }}
          >
            Todos
          </Link>
        </HStack>
      </Container>
    </Box>
  )
}

const App: VFC = () => {
  return (
    <ChakraProvider>
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
    </ChakraProvider>
  )
}

export default App
