import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import notesRouter from './routes/notes.js'
import chatRouter from './routes/chat.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
app.use(cors())
app.use(express.json({ limit: '2mb' }))

app.use('/api/notes', notesRouter)
app.use('/api/chat', chatRouter)

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'server_error' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`[server] API listening on http://localhost:${PORT}`)
  console.log(`[server] db at ${join(__dirname, 'data', 'notes.json')}`)
})
