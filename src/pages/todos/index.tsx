import { Box, Container } from '@chakra-ui/react'
import { VFC } from 'react'

import { TodoForm, TodoFormProps } from '@/components/TodoForm'
import { useAuth } from '@/contexts/auth'
import { addTodo } from '@/fb/store/todos'

const Index: VFC = () => {
  const { uid } = useAuth()

  const handleSubmit: ViewProps['onSubmit'] = async ({ title }) => {
    await addTodo({ title, creatorId: uid })
  }

  return <View onSubmit={handleSubmit} />
}

type ViewProps = {
  onSubmit: TodoFormProps['onSubmit']
}

const View: VFC<ViewProps> = ({ onSubmit }) => {
  return (
    <Container maxWidth="container.sm" py="5">
      <Box boxSize="sm" mx="auto">
        <TodoForm onSubmit={onSubmit} />
      </Box>
    </Container>
  )
}

export default Index
