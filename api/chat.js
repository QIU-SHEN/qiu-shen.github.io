const API_URL = 'https://api.deepseek.com/chat/completions'
const MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-v4-flash'
const MAX_HISTORY = 10
const MAX_MESSAGE_LENGTH = 2000
const MAX_TOTAL_LENGTH = 8000

const SYSTEM_PROMPT =
  '你是 QIUSHEN 个人主页的 AI 助手。' +
  '网站使用 Vue 3、Vue Router 与 Vite 构建。' +
  '页面包含 Home（首页）、About（作者介绍）、Project（项目入口与项目详情）、' +
  'Notes（Markdown 笔记）、Music（音乐播放器）和 Join（联系方式）。' +
  'QIUSHEN 是网站作者，是一名软件工程专业学生，关注 FDE、AI 辅助开发和全栈工程。' +
  '回答风格简洁友好，多用短句，必要时使用列表。' +
  '优先回答本站内容、作者经历、项目、笔记和技术相关问题。' +
  '遇到完全无关的问题时，礼貌地把话题引回本站。'

const parseBody = (body) => {
  if (!body) return {}
  if (typeof body === 'string') {
    try {
      return JSON.parse(body)
    } catch {
      return {}
    }
  }
  return body
}

const sanitizeMessages = (messages) => {
  if (!Array.isArray(messages)) return []

  let totalLength = 0
  const sanitized = []

  for (const message of messages.slice(-MAX_HISTORY).reverse()) {
    if (!message || !['user', 'assistant'].includes(message.role)) continue
    if (typeof message.content !== 'string') continue

    const content = message.content.trim().slice(0, MAX_MESSAGE_LENGTH)
    if (!content) continue
    if (totalLength + content.length > MAX_TOTAL_LENGTH) break

    totalLength += content.length
    sanitized.unshift({ role: message.role, content })
  }

  return sanitized
}

const isSameOrigin = (request) => {
  const origin = request.headers.origin
  if (!origin) return true

  const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)
  if (allowedOrigins.includes(origin)) return true

  const host = request.headers['x-forwarded-host'] || request.headers.host
  if (!host) return false

  try {
    return new URL(origin).host === host
  } catch {
    return false
  }
}

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store')

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ error: 'method_not_allowed' })
  }

  if (!isSameOrigin(request)) {
    return response.status(403).json({ error: 'forbidden_origin' })
  }

  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) {
    return response.status(503).json({
      error: 'service_not_configured',
      reply: 'AI 助手暂未配置，请稍后再试。',
    })
  }

  const messages = sanitizeMessages(parseBody(request.body).messages)
  if (!messages.some((message) => message.role === 'user')) {
    return response.status(400).json({
      error: 'empty_conversation',
      reply: '请输入内容后再发送。',
    })
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 55000)

  try {
    const upstream = await fetch(API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        max_tokens: 800,
        stream: false,
      }),
      signal: controller.signal,
    })

    if (!upstream.ok) {
      const details = await upstream.text().catch(() => '')
      console.error(`[chat] DeepSeek ${upstream.status}: ${details.slice(0, 200)}`)
      return response.status(502).json({
        error: 'upstream_error',
        reply: `AI 服务暂时不可用（${upstream.status}），请稍后再试。`,
      })
    }

    const data = await upstream.json()
    const reply = data?.choices?.[0]?.message?.content?.trim()
    if (!reply) {
      return response.status(502).json({
        error: 'empty_reply',
        reply: 'AI 没有返回内容，请稍后再试。',
      })
    }

    return response.status(200).json({ reply })
  } catch (error) {
    if (error.name === 'AbortError') {
      return response.status(504).json({
        error: 'timeout',
        reply: 'AI 响应超时，请稍后再试。',
      })
    }

    console.error('[chat]', error)
    return response.status(500).json({
      error: 'server_error',
      reply: 'AI 助手暂时无法响应，请稍后再试。',
    })
  } finally {
    clearTimeout(timeout)
  }
}
