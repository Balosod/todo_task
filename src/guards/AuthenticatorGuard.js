import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Auth } from 'aws-amplify'

function AuthenticatorGuard({ children }) {
  const [authenticated, setAuthenticated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await Auth.currentAuthenticatedUser()
        setAuthenticated(true)
      } catch (error) {
        setAuthenticated(false)
        navigate('/signin', { replace: true })
      }
    }

    checkAuth()
  }, [])

  if (authenticated) {
    return children
  }

  // You can also return null or a loading component while checking authentication
  return null
}

export default AuthenticatorGuard
