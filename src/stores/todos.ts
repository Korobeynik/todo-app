import { ref, computed } from 'vue'
import { fetchTodos, createTodo } from '../api/todos'
import type { Todo } from '../types/index'
import { useToastStore } from './toast'

const todos = ref<Todo[]>([])
const isLoading = ref<boolean>(false)
const error = ref<string>('')

const filterStatus = ref('All')
const filterUserId = ref('All Users')
const searchQuery = ref('')
const favorites = ref<number[]>([])

const { showToast } = useToastStore()

const loadFavorites = () => {
  const storedFavorites = localStorage.getItem('favoriteTodos')
  if (storedFavorites) {
    try {
      favorites.value = JSON.parse(storedFavorites)
    } catch (e) {
      console.error('Error parsing favorites from localStorage', e)
      favorites.value = []
    }
  }
}

const saveFavorites = () => {
  localStorage.setItem('favoriteTodos', JSON.stringify(favorites.value))
}

const getTodos = async () => {
  isLoading.value = true
  error.value = ''
  try {
    todos.value = await fetchTodos()
  } catch (err) {
    error.value = (err as Error).message
  } finally {
    isLoading.value = false
  }
}

const addTodo = async (newTodo: Omit<Todo, 'id'>) => {
  error.value = ''
  try {
    const addedTodo = await createTodo(newTodo)

    if (addedTodo) {
      todos.value.unshift(addedTodo)
      showToast('New task successfully added.')
    } else {
      error.value = 'Error'
      console.error('Error creating task')
    }
  } catch (err) {
    error.value = (err as Error).message
    console.error('Error creating task', err)
  }
}

const toggleFavorite = (id: number) => {
  const index = favorites.value.indexOf(id)
  if (index > -1) {
    favorites.value.splice(index, 1)
    showToast('Task deleted from favorites')
  } else {
    favorites.value.push(id)
    showToast('Task successfully added to favorites.')
  }
  saveFavorites()
}

const uniqueUserIds = computed(() => {
  const ids = todos.value.map((todo) => todo.userId)
  return [...new Set(ids)].sort((a, b) => a - b)
})

const filteredTodos = computed(() => {
  let filteredList = [...todos.value]

  if (filterStatus.value === 'Completed') {
    filteredList = filteredList.filter((todo) => todo.completed)
  } else if (filterStatus.value === 'Uncompleted') {
    filteredList = filteredList.filter((todo) => !todo.completed)
  } else if (filterStatus.value === 'Favorites') {
    filteredList = filteredList.filter((todo) => favorites.value.includes(todo.id))
  }

  if (filterUserId.value !== 'All Users') {
    const selectedUserId = Number(filterUserId.value)
    filteredList = filteredList.filter((todo) => todo.userId === selectedUserId)
  }

  if (searchQuery.value) {
    filteredList = filteredList.filter((todo) =>
      todo.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  }

  return filteredList
})

export const useTodosStore = () => {
  return {
    todos,
    isLoading,
    error,
    filterStatus,
    filterUserId,
    searchQuery,
    favorites,
    uniqueUserIds,
    filteredTodos,
    loadFavorites,
    getTodos,
    addTodo,
    toggleFavorite,
  }
}
