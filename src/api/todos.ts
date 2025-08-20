import type { Todo } from '../types/index'

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos')
  if (!response.ok) {
    throw new Error('Unable to retrieve the task list.')
  }
  return response.json()
}

export const createTodo = async (newTodo: Omit<Todo, 'id'>): Promise<Todo> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    body: JSON.stringify(newTodo),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  })

  if (!response.ok) {
    throw new Error('Unable to add a new task.')
  }

  return response.json()
}
