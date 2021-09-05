import {
  Avatar,
  Box,
  Container,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react'
import { useRef, VFC } from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useClickAway } from 'react-use'

import { useAuth } from '@/contexts/auth'
import { signOut } from '@/fb/auth'
import { routeByPattern } from '@/routes'

export const Header: VFC = () => {
  const { isLoggedIn } = useAuth()

  const { isOpen, onClose, onToggle } = useDisclosure()

  const menuBodyRef = useRef<HTMLDivElement>(null)
  useClickAway(menuBodyRef, () => {
    if (isOpen) onClose()
  })

  const handleClickSignOut = async () => {
    await signOut()
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
                fontWeight="bold"
                _focus={{ boxShadow: 'none' }}
              >
                Sign in
              </Link>
              <Link
                as={ReactRouterLink}
                to={routeByPattern['/sign-up'].path()}
                color="white"
                fontWeight="bold"
                _focus={{
                  boxShadow: 'none',
                }}
                borderWidth="1px"
                borderColor="gray.500"
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
