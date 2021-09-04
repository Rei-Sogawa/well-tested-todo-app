import { Box } from '@chakra-ui/react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { VFC } from 'react'
import { useHistory } from 'react-router-dom'

import { FormValues, UserRegistrationForm } from '@/components/UserRegistrationForm'
import { auth } from '@/firebaseApp'
import { routeByPattern } from '@/routes'

const SignUpPage: VFC = () => {
  const history = useHistory()

  const handleSubmit = async (formValues: FormValues) => {
    await createUserWithEmailAndPassword(auth, formValues.email, formValues.password)
    history.push(routeByPattern['/todos'].path())
  }

  return (
    <Box w="md" mx="auto" mt="5">
      <UserRegistrationForm submitButtonText="Sign Up" onSubmit={handleSubmit} />
    </Box>
  )
}

export default SignUpPage
