import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import Header from '../Header/Header'

function SignUp() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSignUp = async () => {
    try {
      // Sign up the user using AWS Cognito
      const signupData = await Auth.signUp({
        username: email.trim(),
        password: password.trim(),
        email: email.trim(),
      })
      console.log('signup', signupData)

      // Redirect UI after successful sign-up
      navigate('/verify')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div>
      <Header
        heading="Signup to create an account"
        paragraph="Already have an account? "
        linkName="Signin"
        linkUrl="/signin/"
      />

      <div className="my-5">
        <label className="sr-only">Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
          placeholder="Enter your Email"
        />
        <label className="sr-only">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className=" mt-4 rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
          placeholder="Enter your password"
        />
      </div>
      <button
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
        onClick={handleSignUp}
      >
        Sign Up
      </button>

      {error && (
        <div className="text-center text-xs mt-2 text-red-500">{error}</div>
      )}
    </div>
  )
}

export default SignUp
