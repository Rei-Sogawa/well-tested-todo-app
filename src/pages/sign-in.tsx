import { Box } from '@chakra-ui/react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { VFC } from 'react'
import { useHistory } from 'react-router-dom'

import { FormValues, UserRegistrationForm } from '@/components/UserRegistrationForm'
import { auth } from '@/firebaseApp'
import { routeByPattern } from '@/routes'

const SignInPage: VFC = () => {
  const history = useHistory()

  const handleSubmit = async (formValues: FormValues) => {
    await signInWithEmailAndPassword(auth, formValues.email, formValues.password)
    history.push(routeByPattern['/todos'].path())
  }

  return (
    <Box w="md" mx="auto" mt="5">
      <UserRegistrationForm submitButtonText="Sign In" onSubmit={handleSubmit} />
    </Box>
  )
}

export default SignInPage
