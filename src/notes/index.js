// 内置静态笔记加载器
// 在 src/notes/ 下新增 .md 文件即可自动出现在笔记页（无需后端）。
// 每个 .md 可在开头写 frontmatter：
//
// ---
// title: 标题
// tags: 标签1, 标签2
// date: 2026-06-01
// ---
// 正文（Markdown）...
//
// 文件名（去掉 .md）会作为这篇笔记的 id（出现在 URL 里）。

const modules = import.meta.glob('./*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

function parseFrontmatter(raw) {
  const m = /^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/.exec(raw)
  if (!m) return { meta: {}, body: raw }
  const meta = {}
  m[1].split('\n').forEach((line) => {
    const idx = line.indexOf(':')
    if (idx === -1) return
    const key = line.slice(0, idx).trim()
    const val = line.slice(idx + 1).trim()
    if (key) meta[key] = val
  })
  return { meta, body: m[2] }
}

const notes = Object.entries(modules)
  .map(([path, raw]) => {
    const slug = path.replace(/^\.\//, '').replace(/\.md$/, '')
    const { meta, body } = parseFrontmatter(raw)
    return {
      id: slug,
      title: meta.title || slug,
      tags: meta.tags
        ? meta.tags.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
      content: body.trim(),
      updatedAt: meta.date ? new Date(meta.date).getTime() : 0,
    }
  })
  .sort((a, b) => b.updatedAt - a.updatedAt)

export const noteList = notes

export function getNote(id) {
  return notes.find((n) => n.id === id) || null
}
