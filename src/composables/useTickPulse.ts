import { ref, watch, onBeforeUnmount, type WatchSource } from 'vue'

export function useTickPulse(
  isRunning: WatchSource<boolean>,
  options?: { intervalMs?: number; pulseMs?: number },
) {
  const tickPulse = ref(false)

  const intervalMs = options?.intervalMs ?? 1000
  const pulseMs = options?.pulseMs ?? 120

  let intervalId: ReturnType<typeof setInterval> | null = null
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  const clearTimers = () => {
    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
    }
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
    tickPulse.value = false
  }

  watch(
    isRunning,
    (running) => {
      clearTimers()

      if (!running) return

      intervalId = setInterval(() => {
        tickPulse.value = true
        timeoutId = setTimeout(() => {
          tickPulse.value = false
          timeoutId = null
        }, pulseMs)
      }, intervalMs)
    },
    { immediate: true },
  )

  onBeforeUnmount(() => {
    clearTimers()
  })

  return { tickPulse }
}
