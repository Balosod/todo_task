import React, { useState, useEffect } from 'react'
import { API, Auth, graphqlOperation } from 'aws-amplify'
import { createTodo } from '../graphql/mutations'
import { Link } from 'react-router-dom'
import log from 'loglevel'
import TodoList from '../components/TodoList'
import { useNavigate } from 'react-router-dom'

const Todo = () => {
  const navigate = useNavigate()
  const [todoName, setTodoName] = useState('')
  const [error, setError] = useState('')

  const getUserById = async () => {
    console.log('getUserByID')
    try {
      const user = await Auth.currentAuthenticatedUser()

      return user
    } catch (error) {
      console.error('Authentication error:', error)
      setError(error)
      throw error
    }
  }

  const handleSubmit = async () => {
    try {
      if (todoName === '') {
        setError("Input can't be empty")
        return
      }

      const user = await getUserById()

      const newTodo = await API.graphql(
        graphqlOperation(createTodo, {
          input: {
            todoName: todoName,
            ownerID: user.username,
            type: 'Todo',
          },
        }),
      )
      setError('')
      setTodoName('')
      console.log('newTodo', newTodo)
    } catch (error) {
      console.log('error', error)
      setError(error.errors[0].message)
    }
  }

  const handleSignOut = async () => {
    try {
      // Sign out the user using AWS Cognito
      await Auth.signOut()

      // Redirect or update UI after successful sign-out
      navigate('/signin/')
    } catch (error) {
      setError(error)
    }
  }

  return (
    <div>
      <div className="flex justify-center items-center flex-col gap-8">
        <div className="flex justify-center items-center gap-6">
          <input
            className="w-72 border-2  rounded-md px-3 py-3 bg-[#E8ECF4] backdrop-blur-lg"
            value={todoName}
            onChange={(e) => {
              setTodoName(e.target.value)
            }}
            placeholder="Enter a new task"
          />
          <button
            className=" px-2 py-2 bg-purple-600 text-white text-xs font-medium rounded-md"
            onClick={handleSubmit}
          >
            Add Todo Item
          </button>
        </div>
        {error && (
          <div className="text-center text-xs mt-1 text-red-500">{error}</div>
        )}
      </div>
      <TodoList />

      <div className="flex justify-between">
        <button className=" mt-4 justify-self-end bg-purple-600 text-white text-xs px-2 py-2 font-medium rounded-md">
          <Link to="/shared-task">Shared Task</Link>
        </button>
        <button
          onClick={handleSignOut}
          className=" mt-4 justify-self-end bg-purple-600 text-white text-xs px-2 py-2 font-medium rounded-md"
        >
          SignOut
        </button>
      </div>
    </div>
  )
}

export default Todo
