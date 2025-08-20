import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'
import LoginView from '../views/LoginView.vue'
import TodosView from '../views/TodosView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/todos',
      name: 'todos',
      component: TodosView,
      beforeEnter: (to, from, next) => {
        const { isLoggedIn } = useUserStore()
        if (isLoggedIn()) {
          next()
        } else {
          next('/')
        }
      },
    },
  ],
})

export default router
