<template>
  <div class="doc-layout">
    <!-- 左侧侧边栏 -->
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

    <!-- 右侧主内容 -->
    <main class="doc-main">
      <div v-if="notes.length === 0" class="empty-hero">
        <h2>还没有笔记</h2>
      </div>
      <div v-else class="welcome">
        <span>{{ notes.length }} 篇</span>
        <h2>选择一篇笔记</h2>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Tag from '../compomnent/tag.vue'
import { noteList } from '../notes/index.js'

const router = useRouter()
const notes = noteList

const formatDate = (ts) => {
  if (!ts) return ''
  const d = new Date(ts)
  const pad = n => String(n).padStart(2, '0')
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`
}
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-hero,
.welcome {
  text-align: left;
  color: var(--text-primary);
}
.empty-hero h2 {
  margin: 0;
  font-size: 26px;
  font-family: '优设标题黑', sans-serif;
}

.welcome span {
  display: block;
  margin-bottom: 10px;
  font-size: 12px;
  opacity: 0.42;
}
.welcome h2 {
  margin: 0;
  font-size: 30px;
  color: var(--text-primary);
  font-family: '优设标题黑', sans-serif;
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
    padding: 20px 12px;
  }
  .welcome h2,
  .empty-hero h2 {
    font-size: 24px;
  }
}
</style>
