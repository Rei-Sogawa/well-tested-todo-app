import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { createContext, ReactNode, useContext, useState, VFC } from 'react'

import { auth } from '@/firebaseApp'

export type Value = {
  uid: string | undefined
}

const AuthContext = createContext<Value | undefined>(undefined)

type AuthProviderProps = {
  children: ReactNode
}

const AuthProvider: VFC<AuthProviderProps> = ({ children }) => {
  const [value, setValue] = useState<Value>({ uid: undefined })

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setValue({ uid: user ? user.uid : undefined })
    })
  }, [])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  const { uid } = context
  const isLoggedIn = !!uid
  return { uid, isLoggedIn }
}

export { AuthProvider, useAuth }
