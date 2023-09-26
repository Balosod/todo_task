import React from 'react'
import { useState, useEffect } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { listTodos, todosByDate } from '../graphql/queries'
import { Auth } from 'aws-amplify'
import { Link } from 'react-router-dom'

const ShareTask = () => {
  const [assigTask, setAssignTask] = useState([])

  const getUserEmail = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser()
      console.log('Authenticated User:', user)

      const userEmail = user.attributes.email

      return userEmail
    } catch (error) {
      console.error('Authentication error:', error)
      throw error
    }
  }

  useEffect(() => {
    fetchAssignTasks()
  }, [])

  const fetchAssignTasks = async () => {
    try {
      const email = await getUserEmail()

      const response = await API.graphql(
        graphqlOperation(todosByDate, {
          filter: {
            sharedWith: { contains: email },
          },
          type: 'Todo',
          sortDirection: 'ASC',
        }),
      )
      const todoData = response.data.todosByDate.items

      setAssignTask(todoData)
    } catch (error) {
      console.error('Error fetching shared tasks:', error)
    }
  }

  return (
    <div className="w-full text-center flex items-center flex-col gap-5">
      <h1 className="text-purple-600 uppercase mt-4 font-semibold text-2xl">
        My Assign Todo
      </h1>
      <div className="w-full bg-slate-300 backdrop-blur-lg px-3 py-5 rounded-md">
        {assigTask.map((todo, index) => (
          <div key={todo.id}>
            <div className="flex flex-row space-x-2">
              <div>{index + 1}</div>
              <div className="item-center w-full">{todo.todoName}</div>
            </div>

            <div className="bg-purple-600 h-0.5 mb-2"></div>
          </div>
        ))}
      </div>
      <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10">
        <Link to="/todo/">View All Todo</Link>
      </button>
    </div>
  )
}

export default ShareTask
