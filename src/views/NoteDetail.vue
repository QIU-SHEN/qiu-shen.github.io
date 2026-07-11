<template>
  <div class="doc-layout">
    <!-- 左侧侧边栏：笔记列表 -->
    <aside class="doc-sidebar">
      <div class="sidebar-header">
        <h2>笔记</h2>
        <span class="sidebar-count">{{ notes.length }}</span>
      </div>
      <ul class="sidebar-list">
        <li
          v-for="n in notes"
          :key="n.id"
          class="sidebar-item"
          @click="router.push(`/Notes/${n.id}`)"
        >
          <span class="sidebar-item-title">{{ n.title }}</span>
          <div class="sidebar-item-meta">
            <span v-if="n.updatedAt">{{ formatDate(n.updatedAt) }}</span>
            <span v-if="n.updatedAt && n.tags.length" aria-hidden="true">·</span>
            <div v-if="n.tags.length" class="sidebar-item-tags">
              <Tag v-for="t in n.tags" :key="t" :tag="t" />
            </div>
          </div>
        </li>
        <li v-if="notes.length === 0" class="sidebar-empty">
          暂无笔记
        </li>
      </ul>
    </aside>

    <!-- 中间主内容区 -->
    <main class="doc-main">
      <div v-if="!note" class="state">笔记不存在。</div>

      <article v-else class="doc-article">
        <!-- 文章头 -->
        <header class="article-header">
          <h1 class="article-title">{{ note.title }}</h1>
          <div class="article-meta">
            <span v-if="note.updatedAt">{{ formatDate(note.updatedAt) }}</span>
            <span v-if="note.updatedAt" aria-hidden="true">·</span>
            <span>{{ wordCount.toLocaleString() }} 字</span>
            <span aria-hidden="true">·</span>
            <span>{{ readingTime }}</span>
            <div v-if="note.tags.length" class="meta-tags">
              <Tag v-for="t in note.tags" :key="t" :tag="t" />
            </div>
          </div>
        </header>

        <!-- 文章内容 -->
        <div class="article-content" ref="contentRef">
          <Markdown :source="renderedContent" />
        </div>
      </article>
    </main>

    <!-- 右侧悬浮 TOC -->
    <aside class="doc-toc" v-if="headings.length">
      <div class="toc-header">目录</div>
      <ul class="toc-list">
        <li
          v-for="h in visibleHeadings"
          :key="h.id"
          class="toc-item"
          :class="['toc-h' + h.level, { active: activeHeading === h.id }]"
        >
          <button
            v-if="h.hasChildren"
            class="toc-toggle"
            :class="{ expanded: !isHeadingCollapsed(h.id) }"
            type="button"
            :aria-expanded="!isHeadingCollapsed(h.id)"
            :aria-label="`${isHeadingCollapsed(h.id) ? '展开' : '收起'}${h.text}`"
            @click.stop="toggleHeading(h.id)"
          >
            <span class="toc-toggle-icon" aria-hidden="true">›</span>
          </button>
          <span v-else class="toc-toggle-spacer" aria-hidden="true"></span>
          <button class="toc-link" type="button" @click="scrollToHeading(h.id)">
            {{ h.text }}
          </button>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Markdown from '../compomnent/markdown.vue'
import Tag from '../compomnent/tag.vue'
import { noteList, getNote } from '../notes/index.js'

const router = useRouter()
const route = useRoute()
const notes = noteList
const note = ref(null)
const contentRef = ref(null)
const headings = ref([])
const activeHeading = ref('')
const mainRef = ref(null)
const collapsedHeadingIds = ref(new Set())

const formatDate = (ts) => {
  if (!ts) return ''
  const d = new Date(ts)
  const pad = n => String(n).padStart(2, '0')
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`
}

const normalizeHeading = (text) =>
  text.replace(/[*_`]/g, '').replace(/\s+#+\s*$/, '').trim()

const renderedContent = computed(() => {
  if (!note.value) return ''
  const content = note.value.content
  const heading = /^\s*#{1,3}\s+(.+?)\r?\n/.exec(content)
  if (!heading || normalizeHeading(heading[1]) !== normalizeHeading(note.value.title)) {
    return content
  }
  return content
    .slice(heading[0].length)
    .replace(/^\s+/, '')
    .replace(/^(?:\+\+\+|---)\s*\r?\n\s*/, '')
})

const wordCount = computed(() => {
  if (!note.value) return 0
  return renderedContent.value.replace(/\s/g, '').length
})

const readingTime = computed(() => {
  const mins = Math.max(1, Math.ceil(wordCount.value / 300))
  return `${mins} 分钟阅读`
})

const visibleHeadings = computed(() => {
  const collapsed = collapsedHeadingIds.value
  return headings.value.filter((heading) =>
    !heading.parentIds.some((parentId) => collapsed.has(parentId))
  )
})

const isHeadingCollapsed = (id) => collapsedHeadingIds.value.has(id)

const toggleHeading = (id) => {
  const next = new Set(collapsedHeadingIds.value)
  if (next.has(id)) {
    next.delete(id)
  } else {
    next.add(id)
  }
  collapsedHeadingIds.value = next
}

const loadNote = async () => {
  note.value = getNote(route.params.id)
  headings.value = []
  collapsedHeadingIds.value = new Set()
  if (!note.value) return
  await nextTick()
  extractHeadings()
  bindScroll()
}

const extractHeadings = () => {
  // 用 requestAnimationFrame 确保 v-html 已渲染
  requestAnimationFrame(() => {
    if (!contentRef.value) return
    const els = contentRef.value.querySelectorAll('h1, h2, h3, h4')
    const list = []
    const stack = []
    els.forEach((el, i) => {
      const id = `heading-${i}`
      const level = parseInt(el.tagName[1])
      el.id = id

      while (stack.length && stack[stack.length - 1].level >= level) {
        stack.pop()
      }

      const heading = {
        id,
        level,
        text: el.textContent,
        parentIds: stack.map((parent) => parent.id),
        hasChildren: false,
      }

      if (stack.length) {
        stack[stack.length - 1].hasChildren = true
      }

      list.push(heading)
      stack.push(heading)
    })
    headings.value = list
    collapsedHeadingIds.value = new Set(
      list.filter((heading) => heading.hasChildren).map((heading) => heading.id)
    )
    if (list.length) activeHeading.value = list[0].id
  })
}

const scrollToHeading = (id) => {
  const el = document.getElementById(id)
  const container = document.querySelector('.doc-main')
  if (el && container) {
    container.scrollTo({
      top: el.offsetTop - container.offsetTop - 20,
      behavior: 'smooth',
    })
  }
}

const onScroll = () => {
  if (!headings.value.length || !contentRef.value) return
  const container = contentRef.value.closest('.doc-main')
  if (!container) return
  const scrollTop = container.scrollTop
  for (let i = headings.value.length - 1; i >= 0; i--) {
    const el = document.getElementById(headings.value[i].id)
    if (el && el.offsetTop - container.offsetTop <= scrollTop + 120) {
      activeHeading.value = headings.value[i].id
      return
    }
  }
  activeHeading.value = headings.value[0]?.id ?? ''
}

// 滚动监听绑定到 doc-main 容器
const bindScroll = () => {
  const el = document.querySelector('.doc-main')
  if (el && el !== mainRef.value) {
    el.addEventListener('scroll', onScroll, { passive: true })
    mainRef.value = el
  }
}

onMounted(loadNote)

onUnmounted(() => {
  if (mainRef.value) {
    mainRef.value.removeEventListener('scroll', onScroll)
  }
})

watch(() => route.params.id, () => {
  if (route.params.id) loadNote()
})
</script>

<style scoped>
.doc-layout {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--bg-primary);
}

.doc-sidebar {
  width: 248px;
  flex-shrink: 0;
  border-right: 1px solid var(--bg-secondary);
  background-color: var(--bg-primary);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  user-select: none;
  -webkit-user-select: none;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 26px 20px 18px;
}
.sidebar-header h2 {
  margin: 0;
  font-size: 24px;
  line-height: 1;
  color: var(--text-primary);
  font-family: '优设标题黑', sans-serif;
}
.sidebar-count {
  color: var(--text-primary);
  font-size: 12px;
  opacity: 0.38;
}

.sidebar-list {
  flex: 1;
  overflow-y: auto;
  list-style: none;
  margin: 0;
  padding: 2px 10px 72px;
}
.sidebar-list::-webkit-scrollbar {
  width: 3px;
}
.sidebar-list::-webkit-scrollbar-thumb {
  background: var(--border);
}

.sidebar-item {
  padding: 11px 10px 12px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 7px;
}
@media (hover: hover) and (pointer: fine) {
  .sidebar-item:hover .sidebar-item-title {
    color: var(--mk-primary);
  }
}
.sidebar-item-title {
  font-size: 14px;
  line-height: 1.35;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.15s ease;
}
.sidebar-item-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}
.sidebar-item-meta {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 11px;
  color: var(--text-primary);
}
.sidebar-item-meta > span {
  opacity: 0.48;
}

.sidebar-empty {
  padding: 24px 10px;
  text-align: center;
  color: var(--text-primary);
  font-size: 13px;
  opacity: 0.45;
}

.doc-main {
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  padding: 48px 48px 100px;
}
.doc-main::-webkit-scrollbar {
  width: 6px;
}
.doc-main::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 3px;
}

.state {
  text-align: center;
  color: var(--text-primary);
  padding: 80px 20px;
  opacity: 0.45;
}

.article-header {
  margin-bottom: 46px;
}
.article-title {
  margin: 0 0 14px;
  font-size: 40px;
  font-weight: 400;
  color: var(--text-primary);
  font-family: '优设标题黑', sans-serif;
  line-height: 1.18;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 13px;
  color: var(--text-primary);
}
.article-meta > span {
  opacity: 0.48;
}
.meta-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-left: 6px;
}

.doc-article {
  width: min(820px, 100%);
  margin: 0 auto;
}

.article-content {
  max-width: none;
}
.article-content :deep(.markdown-body) {
  font-size: 16px;
  line-height: 1.9;
}
.article-content :deep(.markdown-body > :first-child) {
  margin-top: 0;
}
.article-content :deep(.markdown-body h1) {
  margin: 56px 0 20px;
  padding: 0;
  border: 0;
  font-size: 30px;
  line-height: 1.35;
}
.article-content :deep(.markdown-body h2) {
  margin: 44px 0 16px;
  font-size: 24px;
  line-height: 1.4;
}
.article-content :deep(.markdown-body h3) {
  margin: 32px 0 12px;
  font-size: 19px;
  line-height: 1.5;
}
.article-content :deep(.markdown-body h4) {
  margin: 26px 0 10px;
  font-size: 17px;
  line-height: 1.5;
}
.article-content :deep(.markdown-body p) {
  margin: 14px 0;
}
.article-content :deep(.markdown-body ul),
.article-content :deep(.markdown-body ol) {
  margin: 14px 0;
}
.article-content :deep(.markdown-body li) {
  margin: 6px 0;
}
.article-content :deep(.markdown-body a) {
  border: 0;
  text-decoration: underline;
  text-underline-offset: 3px;
}
.article-content :deep(.markdown-body blockquote) {
  margin: 24px 0;
  padding: 2px 0 2px 18px;
  border-left: 2px solid var(--mk-primary);
  border-radius: 0;
  background: none;
  color: var(--text-primary);
  opacity: 0.78;
}
.article-content :deep(.markdown-body code) {
  border-radius: 2px;
}
.article-content :deep(.markdown-body pre) {
  margin: 24px 0;
  padding: 18px 20px;
  border: 0;
  border-left: 2px solid var(--mk-primary);
  border-radius: 0;
  background-color: var(--bg-secondary);
}
.article-content :deep(.markdown-body hr) {
  margin: 36px 0;
  border-top-color: var(--bg-secondary);
}
.article-content :deep(.markdown-body table) {
  margin: 22px 0;
  border-top: 1px solid var(--bg-secondary);
}
.article-content :deep(.markdown-body th),
.article-content :deep(.markdown-body td) {
  padding: 10px 12px;
  border: 0;
  border-bottom: 1px solid var(--bg-secondary);
}
.article-content :deep(.markdown-body th) {
  color: var(--text-primary);
  font-weight: 600;
}
.article-content :deep(.markdown-body img) {
  display: block;
  margin: 28px auto;
  border-radius: 2px;
}

.doc-toc {
  width: 190px;
  flex-shrink: 0;
  padding: 30px 14px 80px 0;
  border-left: 0;
  overflow-y: auto;
  user-select: none;
  -webkit-user-select: none;
}
.doc-toc::-webkit-scrollbar {
  width: 3px;
}
.doc-toc::-webkit-scrollbar-thumb {
  background: var(--border);
}

.toc-header {
  margin: 0 0 14px 18px;
  font-size: 12px;
  font-weight: 400;
  color: var(--text-primary);
  opacity: 0.38;
}

.toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.toc-item {
  display: flex;
  align-items: center;
  min-width: 0;
  font-size: 13px;
  color: var(--text-primary);
  opacity: 0.48;
  transition: color 0.15s, opacity 0.15s;
  white-space: nowrap;
}
.toc-item:hover {
  opacity: 0.78;
}
.toc-item.active {
  color: var(--mk-primary);
  font-weight: 600;
  opacity: 1;
}
.toc-toggle,
.toc-toggle-spacer {
  width: 18px;
  height: 24px;
  flex: 0 0 18px;
}
.toc-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  cursor: pointer;
}
.toc-toggle-icon {
  display: block;
  font-size: 16px;
  line-height: 1;
  transform: rotate(0deg);
  transition: transform 0.18s ease;
}
.toc-toggle.expanded .toc-toggle-icon {
  transform: rotate(90deg);
}
.toc-toggle:focus-visible,
.toc-link:focus-visible {
  outline: none;
  color: var(--mk-primary);
}
.toc-link {
  flex: 1;
  min-width: 0;
  padding: 3px 0;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
.toc-h1 { padding-left: 0; }
.toc-h2 { padding-left: 6px; }
.toc-h3 { padding-left: 18px; }
.toc-h4 { padding-left: 30px; }

/* 响应式 */
@media (min-width: 1600px) {
  .doc-main {
    padding: 56px clamp(72px, 7vw, 120px) 110px;
  }

  .doc-article {
    width: min(940px, 100%);
  }

  .article-title {
    font-size: 46px;
  }

  .article-meta {
    font-size: 14px;
  }

  .article-content :deep(.markdown-body) {
    font-size: 18px;
    line-height: 1.9;
  }

  .article-content :deep(.markdown-body h1) {
    margin-top: 64px;
    font-size: 34px;
  }

  .article-content :deep(.markdown-body h2) {
    margin-top: 50px;
    font-size: 27px;
  }

  .article-content :deep(.markdown-body h3) {
    margin-top: 36px;
    font-size: 21px;
  }

  .article-content :deep(.markdown-body p) {
    margin: 16px 0;
  }

  .article-content :deep(.markdown-body li) {
    margin: 7px 0;
  }

  .article-content :deep(.markdown-body code),
  .article-content :deep(.markdown-body pre code) {
    font-size: 14px;
  }

  .doc-toc {
    width: 210px;
    padding: 38px 20px 90px 0;
  }

  .toc-item {
    font-size: 14px;
  }

  .toc-item {
    min-height: 27px;
  }
}

@media (max-width: 1100px) {
  .doc-toc {
    display: none;
  }
}
@media (max-width: 768px) {
  .doc-layout {
    position: relative;
    top: auto;
    left: auto;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .doc-sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--bg-secondary);
    max-height: 36dvh;
  }
  .sidebar-header {
    padding: 4px 10px 14px;
  }
  .sidebar-header h2 {
    font-size: 21px;
  }
  .sidebar-list {
    padding: 0 0 20px;
  }
  .doc-main {
    min-height: 0;
    overflow-y: auto;
    padding: 24px 4px 64px;
  }

  .article-header {
    margin-bottom: 34px;
  }

  .article-title {
    font-size: 32px;
  }

  .article-meta {
    gap: 7px;
    font-size: 12px;
  }

  .article-content :deep(.markdown-body) {
    font-size: 15px;
    line-height: 1.85;
  }

  .article-content :deep(.markdown-body h1) {
    margin-top: 42px;
    font-size: 26px;
  }

  .article-content :deep(.markdown-body h2) {
    margin-top: 36px;
    font-size: 22px;
  }

  .article-content :deep(.markdown-body h3) {
    margin-top: 28px;
    font-size: 18px;
  }

  .article-content :deep(.markdown-body pre) {
    margin: 20px 0;
    padding: 14px;
  }
}
</style>
