<template>
  <div class="doc-layout">
    <!-- 左侧侧边栏：笔记列表 -->
    <aside class="doc-sidebar">
      <div class="sidebar-header">
        <h2>笔记</h2>
      </div>
      <ul class="sidebar-list">
        <li
          v-for="n in notes"
          :key="n.id"
          class="sidebar-item"
          :class="{ active: n.id === noteId }"
          @click="router.push(`/Notes/${n.id}`)"
        >
          <span class="sidebar-item-title">{{ n.title }}</span>
          <span class="sidebar-item-meta">{{ formatDate(n.updatedAt) }}</span>
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
            <span v-if="note.updatedAt" class="meta-item">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
              {{ formatDate(note.updatedAt) }}
            </span>
            <span v-if="note.tags.length" class="meta-item meta-tags">
              <Tag v-for="t in note.tags" :key="t" :tag="t" />
            </span>
            <span class="meta-item">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
              约 {{ wordCount }} 字
            </span>
            <span class="meta-item">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
              {{ readingTime }}
            </span>
          </div>
          <hr class="article-divider" />
        </header>

        <!-- 文章内容 -->
        <div class="article-content" ref="contentRef">
          <Markdown :source="note.content" />
        </div>
      </article>
    </main>

    <!-- 右侧悬浮 TOC -->
    <aside class="doc-toc" v-if="headings.length">
      <div class="toc-header">此页内容</div>
      <ul class="toc-list">
        <li
          v-for="h in headings"
          :key="h.id"
          class="toc-item"
          :class="['toc-h' + h.level, { active: activeHeading === h.id }]"
          @click="scrollToHeading(h.id)"
        >
          {{ h.text }}
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

const noteId = computed(() => route.params.id)

const formatDate = (ts) => {
  if (!ts) return ''
  const d = new Date(ts)
  const pad = n => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

const wordCount = computed(() => {
  if (!note.value) return 0
  return note.value.content.replace(/\s/g, '').length
})

const readingTime = computed(() => {
  const mins = Math.max(1, Math.ceil(wordCount.value / 300))
  return `约 ${mins} 分钟`
})

const loadNote = async () => {
  note.value = getNote(route.params.id)
  headings.value = []
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
    els.forEach((el, i) => {
      const id = `heading-${i}`
      el.id = id
      list.push({ id, level: parseInt(el.tagName[1]), text: el.textContent })
    })
    headings.value = list
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
}

/* ===== 左侧侧边栏 ===== */
.doc-sidebar {
  width: 260px;
  flex-shrink: 0;
  border-right: 1px solid var(--border);
  background-color: var(--bg-secondary);
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
  padding: 16px 16px 12px;
  border-bottom: 1px solid var(--border);
}
.sidebar-header h2 {
  margin: 0;
  font-size: 18px;
  color: var(--mk-primary);
  font-family: '优设标题黑', sans-serif;
}

.sidebar-list {
  flex: 1;
  overflow-y: auto;
  list-style: none;
  margin: 0;
  padding: 8px 0;
}
.sidebar-list::-webkit-scrollbar {
  width: 4px;
}
.sidebar-list::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 2px;
}

.sidebar-item {
  padding: 10px 16px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-left: 3px solid transparent;
}
.sidebar-item:hover {
  background-color: var(--bg-primary);
}
.sidebar-item.active {
  background-color: var(--bg-primary);
  border-left-color: var(--mk-primary);
}
.sidebar-item-title {
  font-size: 14px;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sidebar-item-meta {
  font-size: 11px;
  color: var(--text-secondary);
}

.sidebar-empty {
  padding: 20px 16px;
  text-align: center;
  color: var(--text-secondary);
  font-size: 13px;
}

/* ===== 中间主内容区 ===== */
.doc-main {
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  padding: 32px 40px 60px;
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
  color: var(--text-secondary);
  padding: 80px 20px;
}

/* 文章头 */
.article-header {
  margin-bottom: 8px;
}
.article-title {
  margin: 0 0 12px;
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.4;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  font-size: 13px;
  color: var(--text-secondary);
}
.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
}
.meta-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.article-divider {
  border: none;
  border-top: 1px solid var(--border);
  margin: 16px 0;
}

/* 文章内容 */
.article-content {
  max-width: 800px;
}

/* ===== 右侧 TOC ===== */
.doc-toc {
  width: 200px;
  flex-shrink: 0;
  padding: 16px 12px;
  border-left: 1px solid var(--border);
  overflow-y: auto;
  user-select: none;
  -webkit-user-select: none;
}
.doc-toc::-webkit-scrollbar {
  width: 4px;
}
.doc-toc::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 2px;
}

.toc-header {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 10px;
}

.toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.toc-item {
  font-size: 13px;
  color: var(--text-secondary);
  padding: 4px 0;
  cursor: pointer;
  transition: color 0.15s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.toc-item:hover {
  color: var(--mk-primary);
}
.toc-item.active {
  color: var(--mk-primary);
  font-weight: 600;
}
.toc-h2 { padding-left: 0; }
.toc-h3 { padding-left: 14px; }
.toc-h4 { padding-left: 28px; }

/* 响应式 */
@media (max-width: 1000px) {
  .doc-toc {
    display: none;
  }
}
@media (max-width: 768px) {
  .doc-layout {
    flex-direction: column;
    height: auto;
    overflow: visible;
  }
  .doc-sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--border);
    max-height: 200px;
  }
  .doc-main {
    overflow-y: visible;
    padding: 20px;
  }
}
</style>
