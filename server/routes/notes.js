import { Router } from 'express'
import { all, find, create, update, remove } from '../db.js'

const router = Router()

router.get('/', (_req, res) => {
  const notes = all()
    .map(({ content, ...rest }) => rest)
    .sort((a, b) => b.updatedAt - a.updatedAt)
  res.json(notes)
})

router.get('/:id', (req, res) => {
  const note = find(req.params.id)
  if (!note) return res.status(404).json({ error: 'not_found' })
  res.json(note)
})

router.post('/', (req, res) => {
  const { title, content, tags } = req.body ?? {}
  if (!title || !content) {
    return res.status(400).json({ error: 'title_and_content_required' })
  }
  res.status(201).json(create({ title, content, tags }))
})

router.put('/:id', (req, res) => {
  const { title, content, tags } = req.body ?? {}
  const next = update(req.params.id, { title, content, tags })
  if (!next) return res.status(404).json({ error: 'not_found' })
  res.json(next)
})

router.delete('/:id', (req, res) => {
  const ok = remove(req.params.id)
  if (!ok) return res.status(404).json({ error: 'not_found' })
  res.status(204).end()
})

export default router
