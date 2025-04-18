import payload from 'payload'
import config from './payload.config'

let initialized = false

export async function initPayload() {
  if (!initialized) {
    await payload.init({
      config, // 👈 pass the actual config object, not a string path
    })
    initialized = true
  }
}

export default payload
