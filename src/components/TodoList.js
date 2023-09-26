import React from 'react'
import TodoItem from './TodoItem'
import { useState, useEffect } from 'react'
import { API, Auth, graphqlOperation } from 'aws-amplify'
import { todosByDate } from '../graphql/queries'

const TodoList = () => {
  const [todos, setTodos] = useState([])

  const getUserById = async () => {
    // console.log('getUserByID')
    try {
      const user = await Auth.currentAuthenticatedUser()

      return user
    } catch (error) {
      console.error('Authentication error:', error)
      // setError(error)
      throw error
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [todos])

  const fetchTasks = async () => {
    try {
      const user = await getUserById()
      const todoData = await API.graphql(
        graphqlOperation(todosByDate, {
          filter: {
            ownerID: {
              eq: user.username, // Filter tasks by userID
            },
          },
          type: 'Todo',
          sortDirection: 'ASC',
        }),
      )
      // console.log('todoData', todoData)
      const newTodo = todoData.data.todosByDate.items
      setTodos(newTodo)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }
  return (
    <div>
      <div className="w-full text-center flex items-center flex-col gap-5">
        <h1 className="text-purple-600 uppercase mt-4 font-semibold text-2xl">
          Task List
        </h1>

        <div className="w-full bg-slate-300 backdrop-blur-lg px-3 py-5 rounded-md">
          {todos.map((todo, index) => (
            <TodoItem key={todo.id} index={index} todo={todo} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TodoList
