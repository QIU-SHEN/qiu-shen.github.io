import { Router } from 'express'

const router = Router()

const API_URL = 'https://chat.ecnu.edu.cn/open/api/v1/chat/completions'
const API_KEY = process.env.ECNU_API_KEY
const MODEL = process.env.ECNU_MODEL || 'ecnu-max'

const SYSTEM_PROMPT =
  '你是 QIUSHEN 个人主页的项目介绍助手。' +
  '这个项目是一个用 Vue 3（Composition API + script setup）+ Vue Router + Vite 写的个人主页，' +
  '后端是 Express，笔记数据存为 server/data/notes.json。' +
  '页面包含：Home（就是这里，AI 聊天）、About（关于作者与网站的简介）、Blog（日志与标签）、' +
  'Notes（Markdown 笔记，可新建/编辑/删除）、Music（歌曲播放器）、Join（联系方式）。' +
  'QIUSHEN 是这个主页的作者，是一名学生开发者，正在学习前端。' +
  '回答风格简洁友好，多用短句，必要时用列表。' +
  '只回答和这个项目、作者、前端技术、笔记、本站功能相关的问题。' +
  '如果用户问完全不相关的话题（比如天气、明星、医疗诊断），礼貌地把话题引回项目本身。'

const MAX_HISTORY = 10

router.post('/', async (req, res) => {
  if (!API_KEY) {
    return res.status(500).json({
      error: 'missing_api_key',
      reply: '⚠️ 后端没有配置 ECNU_API_KEY，无法调用 AI。请联系站长。',
    })
  }

  const incoming = Array.isArray(req.body?.messages) ? req.body.messages : []
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...incoming
      .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .slice(-MAX_HISTORY),
  ]

  if (!messages.some(m => m.role === 'user')) {
    return res.status(400).json({ error: 'empty_conversation' })
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 60000)

  try {
    const upstream = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ model: MODEL, messages }),
      signal: controller.signal,
    })

    if (!upstream.ok) {
      const text = await upstream.text().catch(() => '')
      console.error(`[chat] upstream ${upstream.status}: ${text.slice(0, 200)}`)
      return res.status(502).json({
        error: 'upstream_error',
        status: upstream.status,
        reply: `⚠️ AI 服务返回了错误（${upstream.status}），请稍后再试。`,
      })
    }

    const data = await upstream.json()
    const reply = data?.choices?.[0]?.message?.content
    if (!reply) {
      return res.status(502).json({
        error: 'empty_reply',
        reply: '⚠️ AI 没有返回内容，请稍后再试。',
      })
    }
    res.json({ reply })
  } catch (e) {
    if (e.name === 'AbortError') {
      return res.status(504).json({
        error: 'timeout',
        reply: '⚠️ AI 响应超时，请稍后再试。',
      })
    }
    console.error('[chat]', e)
    res.status(500).json({
      error: 'server_error',
      reply: '⚠️ 后端出错，请稍后再试。',
    })
  } finally {
    clearTimeout(timer)
  }
})

export default router
