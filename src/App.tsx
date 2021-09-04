import {
  Avatar,
  Box,
  ChakraProvider,
  Container,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react'
import { signOut } from 'firebase/auth'
import { VFC } from 'react'
import { useRef } from 'react'
import { BrowserRouter as Router, Link as ReactRouterLink, Route, Switch } from 'react-router-dom'
import { useClickAway } from 'react-use'

import { AuthProvider, useAuth } from '@/contexts/auth'
import { Pattern, routeByPattern } from '@/routes'

import { auth } from './firebaseApp'

const Header: VFC = () => {
  const { isLoggedIn } = useAuth()

  const { isOpen, onClose, onToggle } = useDisclosure()

  const menuBodyRef = useRef<HTMLDivElement>(null)
  useClickAway(menuBodyRef, () => {
    if (isOpen) onClose()
  })

  const handleClickSignOut = async () => {
    await signOut(auth)
    onClose()
  }

  return (
    <Box bg="gray.800" py={3}>
      <Container maxWidth="container.md">
        <HStack h="32px" justifyContent="space-between">
          <Link
            as={ReactRouterLink}
            to={routeByPattern['/todos'].path()}
            color="white"
            fontWeight="bold"
            _focus={{ boxShadow: 'none' }}
          >
            Todos
          </Link>

          {isLoggedIn ? (
            <Menu isOpen={isOpen} placement="bottom-end">
              <Box ref={menuBodyRef}>
                <MenuButton onClick={onToggle}>
                  <Avatar size="sm" />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={handleClickSignOut}>Sign out</MenuItem>
                </MenuList>
              </Box>
            </Menu>
          ) : (
            <HStack spacing={4}>
              <Link
                as={ReactRouterLink}
                to={routeByPattern['/sign-in'].path()}
                color="white"
                _focus={{ boxShadow: 'none' }}
              >
                Sign in
              </Link>
              <Link
                as={ReactRouterLink}
                to={routeByPattern['/sign-up'].path()}
                color="white"
                _focus={{ boxShadow: 'none' }}
                border="1px"
                rounded="md"
                py="1"
                px="2"
              >
                Sign up
              </Link>
            </HStack>
          )}
        </HStack>
      </Container>
    </Box>
  )
}

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
