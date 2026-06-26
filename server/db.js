import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataDir = join(__dirname, 'data')
const dbPath = join(dataDir, 'notes.json')

if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true })

if (!existsSync(dbPath)) {
  writeFileSync(dbPath, '[]', 'utf8')
}

let cache = null

const read = () => {
  if (cache !== null) return cache
  try {
    cache = JSON.parse(readFileSync(dbPath, 'utf8'))
  } catch {
    cache = []
  }
  return cache
}

const write = (notes) => {
  cache = notes
  writeFileSync(dbPath, JSON.stringify(notes, null, 2), 'utf8')
}

export const all = () => read()

export const find = (id) => read().find(n => String(n.id) === String(id))

export const create = ({ title, content, tags }) => {
  const notes = read()
  const now = Date.now()
  const note = {
    id: notes.length ? Math.max(...notes.map(n => n.id)) + 1 : 1,
    title,
    content,
    tags: Array.isArray(tags) ? tags : [],
    createdAt: now,
    updatedAt: now,
  }
  notes.push(note)
  write(notes)
  return note
}

export const update = (id, { title, content, tags }) => {
  const notes = read()
  const idx = notes.findIndex(n => String(n.id) === String(id))
  if (idx === -1) return null
  const next = {
    ...notes[idx],
    title: title ?? notes[idx].title,
    content: content ?? notes[idx].content,
    tags: Array.isArray(tags) ? tags : (typeof tags === 'string' ? tags : notes[idx].tags),
    updatedAt: Date.now(),
  }
  notes[idx] = next
  write(notes)
  return next
}

export const remove = (id) => {
  const notes = read()
  const next = notes.filter(n => String(n.id) !== String(id))
  if (next.length === notes.length) return false
  write(next)
  return true
}
