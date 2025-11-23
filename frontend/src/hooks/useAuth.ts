import { useState, useEffect } from 'react'
import { loginService } from '../api/loginService'
import type { LoggedUser } from '../types/user'
import { useUserStore } from '../usersStore'

export const useAuth = () => {
  const [user, setUser] = useState<LoggedUser | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const init = async () => {
      const user = await loginService.restoreLogin()
      setUser(user)
    }
    useUserStore.setState({ user });
    init()
  }, [])

  const handleLogin = async (username: string, password: string) => {
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      useUserStore.setState({ user });
      setErrorMessage(null)
      return true
    } catch {
      setErrorMessage("Usuario o contraseña incorrectos")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return false
    }
  }

  const handleLogout = async () => {
    await loginService.logout()
    setUser(null)
    useUserStore.setState({ user: null });
  }

  return { user, errorMessage, handleLogin, handleLogout }
}
