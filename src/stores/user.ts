import { ref } from 'vue'
import { fetchUsers } from '../api/users'
import type { User } from '../types/index'
import router from '@/router'

const user = ref<User | null>(null)
const isLoading = ref<boolean>(false)
const error = ref<string>('')

const loadUserFromLocalStorage = () => {
  const storedUser = localStorage.getItem('currentUser')
  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser)
    } catch (e) {
      console.error('Unable to parse user data from localStorage', e)
      user.value = null
    }
  }
}

const saveUserToLocalStorage = (userData: User) => {
  localStorage.setItem('currentUser', JSON.stringify(userData))
}

const removeUserFromLocalStorage = () => {
  localStorage.removeItem('currentUser')
}

const login = async (username: string, phone: string) => {
  isLoading.value = true
  error.value = ''

  try {
    const users = await fetchUsers()
    const foundUser = users.find(
      (u) =>
        u.username === username && u.phone.replace(/[^0-9]/g, '') === phone.replace(/[^0-9]/g, ''),
    )

    if (foundUser) {
      user.value = foundUser
      saveUserToLocalStorage(foundUser)
    } else {
      error.value = 'Login error. User not found or credentials are incorrect.'
    }
  } catch (err) {
    error.value = (err as Error).message
  } finally {
    isLoading.value = false
  }
}

const logout = () => {
  user.value = null
  removeUserFromLocalStorage()
  router.push({ name: 'login' })
}

const isLoggedIn = () => {
  return !!user.value
}

loadUserFromLocalStorage()

export const useUserStore = () => {
  return {
    user,
    isLoading,
    error,
    login,
    logout,
    isLoggedIn,
  }
}
