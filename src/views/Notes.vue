<template>
  <div class="doc-layout">
    <!-- 左侧侧边栏 -->
    <aside class="doc-sidebar">
      <div class="sidebar-header">
        <h2>笔记</h2>
      </div>
      <ul class="sidebar-list">
        <li
          v-for="n in notes"
          :key="n.id"
          class="sidebar-item"
          @click="router.push(`/Notes/${n.id}`)"
        >
          <span class="sidebar-item-title">{{ n.title }}</span>
          <div class="sidebar-item-tags" v-if="n.tags.length">
            <Tag v-for="t in n.tags" :key="t" :tag="t" />
          </div>
          <span class="sidebar-item-meta">{{ formatDate(n.updatedAt) }}</span>
        </li>
        <li v-if="notes.length === 0" class="sidebar-empty">
          暂无笔记
        </li>
      </ul>
    </aside>

    <!-- 右侧主内容 -->
    <main class="doc-main">
      <div v-if="notes.length === 0" class="empty-hero">
        <i class="iconfont icon-list"></i>
        <h2>还没有笔记</h2>
        <p>在 src/notes/ 下新建一个 .md 文件即可</p>
      </div>
      <div v-else class="welcome">
        <h2>选择一篇笔记开始阅读</h2>
        <p>从左侧列表中选择一篇笔记吧。</p>
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
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
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
}

/* 左侧侧边栏 */
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
  border-left-color: var(--mk-primary);
}

.sidebar-item-title {
  font-size: 14px;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sidebar-item-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
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

/* 右侧主内容 */
.doc-main {
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-hero {
  text-align: center;
  color: var(--text-secondary);
}
.empty-hero .iconfont {
  font-size: 48px;
  color: var(--mk-primary);
  opacity: 0.5;
}
.empty-hero h2 {
  margin: 16px 0 8px;
  font-size: 20px;
  color: var(--text-primary);
}
.empty-hero p {
  font-size: 14px;
}

.welcome {
  text-align: center;
  color: var(--text-secondary);
}
.welcome h2 {
  margin: 0 0 8px;
  font-size: 20px;
  color: var(--text-primary);
}
.welcome p {
  font-size: 14px;
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
