import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Auth } from 'aws-amplify'

const ConfirmSignup = () => {
  const navigate = useNavigate()
  const [verificationCode, setVerificationCode] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const confirmUserSignup = async () => {
    try {
      const username = email
      const code = verificationCode.trim()

      await Auth.confirmSignUp(username, code)

      // Confirmation successful, navigate to the next screen
      navigate('/signin/')
    } catch (err) {
      setError('Invalid verification code or email')
    }
  }

  return (
    <div className="my-5">
      <h2 className="mt-6 mb-4 text-center text-2xl font-extrabold text-purple-600">
        Confirm Signup
      </h2>
      <label className="sr-only">Email</label>
      <input
        type="text"
        placeholder="Enter your Email"
        value={email}
        className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="sr-only">Verification Code</label>
      <input
        type="text"
        placeholder="Verification Code"
        className=" mt-4 rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <button
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
        onClick={confirmUserSignup}
      >
        Confirm
      </button>
      {error && (
        <div className="text-center text-xs mt-2 text-red-500">{error}</div>
      )}
    </div>
  )
}

export default ConfirmSignup
