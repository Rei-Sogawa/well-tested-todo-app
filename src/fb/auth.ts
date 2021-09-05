import {
  createUserWithEmailAndPassword,
  onAuthStateChanged as fbAuthOnAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as fbAuthSignOut,
} from 'firebase/auth'

import { auth } from '@/firebaseApp'

export const signUp = ({ email, password }: { email: string; password: string }) =>
  createUserWithEmailAndPassword(auth, email, password)

export const signIn = ({ email, password }: { email: string; password: string }) =>
  signInWithEmailAndPassword(auth, email, password)

export const signOut = () => fbAuthSignOut(auth)

// SEE: https://stackoverflow.com/questions/54607400/typescript-remove-entries-from-tuple-type
// type RemoveFirstFromTuple<T extends any[]> = T['length'] extends 0
// ? []
// : T extends [unknown, ...infer Rest]
// ? Rest
// : []

export const onAuthStateChanged = (
  ...[nextOrObserver, error, completed]: Parameters<typeof fbAuthOnAuthStateChanged> extends [
    unknown,
    ...infer Rest
  ]
    ? Rest
    : []
) => fbAuthOnAuthStateChanged(auth, nextOrObserver, error, completed)
