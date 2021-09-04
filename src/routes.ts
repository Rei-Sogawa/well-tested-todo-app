import { generatePath } from 'react-router-dom'

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
}

export type Pattern = keyof typeof routeByPattern
