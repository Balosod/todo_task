import './styles/tailwind.css' // Import the Tailwind CSS file
import React from 'react'
import log from 'loglevel'
import { Amplify } from 'aws-amplify'
import { Routes, Route } from 'react-router-dom'
import AuthenticatorGuard from './guards/AuthenticatorGuard'
import awsconfig from './aws-exports'
import SignIn from './components/Auth/SignIn'
import SignUp from './components/Auth/SignUp'
import ConfirmSignup from './components/Auth/Verify'
import Todo from './pages/Todo'
import ShareTask from './pages/SharedTask'

Amplify.configure(awsconfig)
log.setLevel('debug')

function App() {
  return (
    <div className="min-h-full  flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signin/" element={<SignIn />} />
          <Route path="/verify/" element={<ConfirmSignup />} />

          <Route
            path="/todo/"
            element={
              <AuthenticatorGuard>
                <Todo />
              </AuthenticatorGuard>
            }
          />
          <Route
            path="/shared-task/"
            element={
              <AuthenticatorGuard>
                <ShareTask />
              </AuthenticatorGuard>
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
