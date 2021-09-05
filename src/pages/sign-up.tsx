import { Box } from '@chakra-ui/react'
import { VFC } from 'react'
import { useHistory } from 'react-router-dom'

import {
  FormValues,
  UserRegistrationForm,
  UserRegistrationFormProps,
} from '@/components/UserRegistrationForm'
import { signUp } from '@/fb/auth'
import { routeByPattern } from '@/routes'

const Index: VFC = () => {
  const history = useHistory()

  const handleSubmit = async ({ email, password }: FormValues) => {
    await signUp({ email, password })
    history.push(routeByPattern['/todos'].path())
  }

  return <View onSubmit={handleSubmit} />
}

type ViewProps = {
  onSubmit: UserRegistrationFormProps['onSubmit']
}

const View: VFC<ViewProps> = ({ onSubmit }) => {
  return (
    <Box w="md" mx="auto" mt="5">
      <UserRegistrationForm submitButtonText="Sign Up" onSubmit={onSubmit} />
    </Box>
  )
}

export default Index
