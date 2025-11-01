// server.js — Local backend entry point
import app from './app.js'

const port = process.env.BACKEND_PORT || 3001

app.listen(port, 'localhost', () => {
  console.log(`✅ Backend listening at http://localhost:${port}`)
})

