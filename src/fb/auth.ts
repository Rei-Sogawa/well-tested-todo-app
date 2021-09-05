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

export const onAuthStateChanged = (
  ...[, nextOrObserver, error, completed]: Parameters<typeof fbAuthOnAuthStateChanged>
) => fbAuthOnAuthStateChanged(auth, nextOrObserver, error, completed)
