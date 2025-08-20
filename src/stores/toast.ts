import { ref } from 'vue'

const message = ref('')
const isVisible = ref(false)
let timeout: ReturnType<typeof setTimeout> | null = null

const showToast = (text: string) => {
  if (timeout) {
    clearTimeout(timeout)
  }
  message.value = text
  isVisible.value = true

  timeout = setTimeout(() => {
    isVisible.value = false
  }, 3000)
}

export const useToastStore = () => {
  return {
    message,
    isVisible,
    showToast,
  }
}
