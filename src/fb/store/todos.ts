import { addDoc, collection } from 'firebase/firestore'

import { db } from '@/firebaseApp'

export const todosRef = collection(db, 'todos')

export type TodoData = {
  title: string
  creatorId: string
}

const getDefaultData = (): TodoData => ({
  title: '',
  creatorId: '',
})

export const addTodo = (data: Partial<TodoData>) =>
  addDoc(todosRef, { ...getDefaultData(), ...data })
