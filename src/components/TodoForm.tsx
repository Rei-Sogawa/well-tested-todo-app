import { FormControl, Input } from '@chakra-ui/react'
import { FormEventHandler, VFC } from 'react'
import { useForm } from 'react-hook-form'

type FormValues = {
  title: string
}

export type TodoFormProps = {
  defaultValues?: FormValues
  onSubmit: (values: FormValues) => Promise<void>
}

export const TodoForm: VFC<TodoFormProps> = ({ defaultValues, onSubmit }) => {
  const { handleSubmit: handleSubmitHookForm, register, reset } = useForm({ defaultValues })
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    await handleSubmitHookForm(onSubmit)(e)
    reset()
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <Input
          id="title"
          required
          {...register('title')}
          size="lg"
          placeholder="What needs to be done?"
          autoComplete="off"
        />
      </FormControl>
    </form>
  )
}
