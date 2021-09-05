import { useAuth } from '@/contexts/auth'

const useCurrentUser = () => {
  const { uid } = useAuth()

  const isLoggedIn = !!uid

  return { isLoggedIn }
}
