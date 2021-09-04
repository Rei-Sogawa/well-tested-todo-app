import { generatePath } from 'react-router-dom'

import SignInPage from '@/pages/sign-in'
import SignUpPage from '@/pages/sign-up'
import TodosPage from '@/pages/todos'
import TodoPage from '@/pages/todos/[todoId]'

export const routeByPattern = {
  '/': {
    path: () => generatePath('/todos'),
    Component: TodosPage,
  },
  '/todos': {
    path: () => generatePath('/todos'),
    Component: TodosPage,
  },
  '/todos/:todoId': {
    path: ({ todoId }: { todoId: string }) => generatePath('/todos/:todoId', { todoId }),
    Component: TodoPage,
  },
  '/sign-up': {
    path: () => generatePath('/sign-up'),
    Component: SignUpPage,
  },
  '/sign-in': {
    path: () => generatePath('/sign-in'),
    Component: SignInPage,
  },
}

export type Pattern = keyof typeof routeByPattern
