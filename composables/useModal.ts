import { ref } from 'vue'
import { createGlobalState } from '@vueuse/core'

function getInstance() {
  const modal = ref(null)
  const readonlyModal = readonly(modal)
  const hide = () => {
    modal.value = null
  }
  const show = (m: any) => {
    hide()
    modal.value = m
  }

  return {
    modal: readonlyModal,
    hide,
    show,
  }
}

export const useModal = createGlobalState(getInstance)