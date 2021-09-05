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

export const Index: VFC = () => {
  const { isLoggedIn } = useAuth()
  const handleClickSignOut = () => signOut()

  return <View isLoggedIn={isLoggedIn} onClickSignOut={handleClickSignOut} />
}

type ViewProps = {
  isLoggedIn: boolean
  onClickSignOut: () => Promise<void>
}

const View: VFC<ViewProps> = ({ isLoggedIn, onClickSignOut }) => {
  // MEMO: Default の動作では、Header の外側をクリックしたときに close されない
  //       親 component で minH="100vh" 設定したら直るかも
  const { isOpen, onClose, onToggle } = useDisclosure()

  const menuBodyRef = useRef<HTMLDivElement>(null)
  useClickAway(menuBodyRef, () => {
    if (isOpen) onClose()
  })

  const handleClickSignOut = async () => {
    await onClickSignOut()
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
