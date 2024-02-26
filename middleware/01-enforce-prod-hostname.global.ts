export default defineNuxtRouteMiddleware(() => {
  const expectedHostname = 'www.seisiun.app'
  if (process.client && import.meta.env.PROD && window.location.hostname !== expectedHostname) {
    window.location.href = `https://${expectedHostname}${window.location.pathname}`
    return false
  }
})