import { Box } from '@chakra-ui/react'
import { VFC } from 'react'
import { useHistory } from 'react-router-dom'

import { FormValues, UserRegistrationForm } from '@/components/UserRegistrationForm'
import { signUp } from '@/fb/auth'
import { routeByPattern } from '@/routes'

const SignUpPage: VFC = () => {
  const history = useHistory()

  const handleSubmit = async ({ email, password }: FormValues) => {
    await signUp({ email, password })
    history.push(routeByPattern['/todos'].path())
  }

  return (
    <Box w="md" mx="auto" mt="5">
      <UserRegistrationForm submitButtonText="Sign Up" onSubmit={handleSubmit} />
    </Box>
  )
}

export default SignUpPage
