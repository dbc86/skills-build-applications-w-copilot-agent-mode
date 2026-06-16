export const API_BASE_URL = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000'

// example usage
console.log(`API running at ${API_BASE_URL}`)
