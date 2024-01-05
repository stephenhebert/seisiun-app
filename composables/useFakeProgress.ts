import { ref } from 'vue'

const INTERVAL = 100

export function useFakeProgress({ autoStart = true} = {}) {
  const progress = ref(0)
  const randomProgress = ref(0)
  const durationMs = ref(0)
  let i
  let step
  let updateTimer
  let randomUpdateTimer

  const startProgress = () => {
    updateTimer = setInterval(() => {
      onProgressUpdate()
    }, INTERVAL)
  }

  const onProgressUpdate = () => {
    durationMs.value += INTERVAL
    i += step
    // progress.value = 1 - Math.exp(-1 * durationMs.value / 1000)
    progress.value = Math.round(Math.atan(i) / (Math.PI / 2) * 1000) / 1000
    if (progress.value > .7) step = 0.1
  }

  const startRandomProgressUpdate = () => {
    randomUpdateTimer = setTimeout(() => {
      randomProgress.value = progress.value
      startRandomProgressUpdate()
    }, Math.random() * 1000)
  }

  const start = () => {
    progress.value = 0
    i = 0
    step = 0.5
    startProgress()
    startRandomProgressUpdate()
  }

  const end = () => {
    progress.value = 1
    clearInterval(updateTimer)
    clearTimeout(randomUpdateTimer)
  }

  if (autoStart) {
    start()
  }

  return { 
    progress, 
    randomProgress,
    start,
    end,
    durationMs
  }
}