import type { User } from '../types/index'

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  if (!response.ok) {
    throw new Error('Unable to retrieve user data.')
  }
  return response.json()
}
