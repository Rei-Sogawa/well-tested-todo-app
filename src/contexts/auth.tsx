import { useEffect } from 'react'
import { createContext, ReactNode, useContext, useState, VFC } from 'react'

import { onAuthStateChanged } from '@/fb/auth'

type Value = {
  uid: string | undefined
}

const AuthContext = createContext<Value | undefined>(undefined)

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider: VFC<AuthProviderProps> = ({ children }) => {
  const [value, setValue] = useState<Value>({ uid: undefined })

  useEffect(() => {
    onAuthStateChanged((user) => {
      setValue({ uid: user ? user.uid : undefined })
    })
  }, [])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  const { uid } = context
  const isLoggedIn = !!uid
  return { uid, isLoggedIn }
}
