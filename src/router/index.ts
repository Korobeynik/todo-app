import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import TodosView from '@/views/TodosView.vue'

const routes = [
  { path: '/', redirect: '/' },
  { path: '/login', component: LoginView },
  { path: '/todos', component: TodosView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
