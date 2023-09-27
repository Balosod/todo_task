import React, { useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { updateTodo, deleteTodo } from '../graphql/mutations'
import { getTodo } from '../graphql/queries'

function TodoItem({ index, todo }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [todoData, setTodoData] = useState()
  const [isEditing, setIsEditing] = useState(false)
  const [share, setShare] = useState(false)
  const [updatedTodoName, setUpdatedTodoName] = useState(todo.todoName)

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const shareToggler = (todo) => {
    setShare(true)
    setTodoData(todo)
  }

  const backHandler = () => {
    setShare(false)
    setInfo('')
    setError('')
  }
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleShare = async () => {
    setError('')
    if (!isValidEmail(email)) {
      setError('Invalid email format')
      return
    } else {
      shareTaskWithEmail()
    }
  }

  const handleUpdate = async (todo) => {
    try {
      if (updatedTodoName === '') {
        setError("Input can't be empty")
        return
      }
      const updatedTask = await API.graphql(
        graphqlOperation(updateTodo, {
          input: {
            id: todo.id,
            todoName: updatedTodoName,
          },
        }),
      )
      console.log('updated', updatedTask)
      setError('')
      setIsEditing(false)
    } catch (error) {
      setError('something went wrong')
    }
  }

  const handleDelete = async (todo) => {
    try {
      await API.graphql(
        graphqlOperation(deleteTodo, {
          input: {
            id: todo.id,
          },
        }),
      )
      console.log('deleted')
      //   onDelete(task.id);
      setError('')
    } catch (error) {
      setError('something went wrong')
    }
  }

  /*
    update the task in the database with the shared email
    Return true if sharing is successful, false otherwise
    */
  const shareTaskWithEmail = async () => {
    try {
      console.log(todoData.id)
      const existingTodo = await API.graphql(
        graphqlOperation(getTodo, { id: todoData.id }),
      )

      console.log('existingTodo', existingTodo)
      const updatedSharedWith = [
        ...existingTodo.data.getTodo.sharedWith,
        ...[email],
      ]
      console.log(updatedSharedWith)

      const updatedTask = await API.graphql(
        graphqlOperation(updateTodo, {
          input: {
            id: todo.id,
            sharedWith: updatedSharedWith,
          },
        }),
      )
      const emailData = {
        to: email,
        subject: 'New Task',
        message: 'Hello, You got a new Task',
        from: 'balosod37@gmail.com',
      }
      sendEmail(emailData)

      //Check if the task was successfully updated
      if (updatedTask.data.updateTodo) {
        setInfo(`Task shared with ${email} successfully.`)
      } else {
        setInfo('')
        setError(`Failed to share task with ${email}.`)
      }
    } catch (error) {
      setError('something went wrong')
    }
  }

  const sendEmail = async (emailData) => {
    try {
      const response = await fetch(
        'https://757m4bnvzwigyhbsf3eedywmci0hassc.lambda-url.us-east-1.on.aws/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            mode: 'no-cors',
          },
          body: JSON.stringify(emailData),
        },
      )
      const responseBody = await response.json()

      if (response.ok) {
        console.log('Email sent successfully')
      } else {
        console.error('Failed to send email')
      }
    } catch (error) {
      console.error('Error sending email:', error)
    }
  }

  return (
    <div>
      {isEditing && !share && (
        <div>
          <div className="flex justify-between items-center mb-1">
            <div className="flex flex-row space-x-2">
              <div>{index + 1}</div>
              <input
                type="text"
                value={updatedTodoName}
                onChange={(e) => setUpdatedTodoName(e.target.value)}
                className="list-none w-2/3 text-left break-normal"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleUpdate(todo)}
                className="bg-purple-600 text-white text-xs px-2 py-2 font-medium rounded-md"
              >
                Update
              </button>
            </div>
          </div>
          <div className="bg-purple-600 h-0.5 mb-2"></div>
        </div>
      )}

      {!isEditing && !share && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <li className="list-none w-2/3 text-left break-normal">
              <div className="flex flex-row space-x-2">
                <div>{index + 1}</div>
                <div>{todo.todoName}</div>
              </div>
            </li>
            <div className="flex gap-3">
              <button
                onClick={() => shareToggler(todo)}
                className="bg-purple-600 text-white text-xs px-2 py-2 font-medium rounded-md"
              >
                Share
              </button>
              <button
                onClick={() => handleEditClick()}
                className="bg-white text-purple-600 text-xs px-2 py-2 font-medium rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(todo)}
                className="bg-white text-purple-600 text-xs px-2 py-2 font-medium rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
          <div className="bg-purple-600 h-0.5 mb-2"></div>
        </div>
      )}

      {share && (
        <div>
          <div className="flex justify-between items-center mb-1">
            <div className="flex flex-row space-x-2">
              <div>{index + 1}</div>
              <input
                type="text"
                value={email}
                placeholder="Enter user Email"
                onChange={(e) => setEmail(e.target.value)}
                className="list-none w-2/3 text-left break-normal"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => backHandler()}
                className=" mr-1 bg-white text-purple-600 text-xs px-2 py-2 font-medium rounded-md"
              >
                Back
              </button>
              <button
                onClick={handleShare}
                className="bg-white text-purple-600 text-xs px-2 py-2 font-medium rounded-md"
              >
                share
              </button>
            </div>
          </div>
          <div className="bg-purple-600 h-0.5 mb-2"></div>
        </div>
      )}
      {error && <div className="text-left text-xs  text-red-500">{error}</div>}
      {info && <div className="text-left text-xs  text-green-500">{info}</div>}
    </div>
  )
}

export default TodoItem
