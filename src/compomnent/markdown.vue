<template>
  <div class="markdown-body" v-html="html"></div>
</template>

<script setup>
import { computed } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

const props = defineProps({
  source: {
    type: String,
    default: '',
  },
})

marked.setOptions({ gfm: true, breaks: true })

const html = computed(() =>
  DOMPurify.sanitize(marked.parse(props.source ?? '', { async: false }))
)
</script>

<style scoped>
.markdown-body {
  color: var(--text-primary);
  font-size: 15px;
  line-height: 1.75;
  word-break: break-word;
}

.markdown-body :deep(h1) {
  font-size: 28px;
  margin: 24px 0 12px;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--border);
}
.markdown-body :deep(h2) {
  font-size: 22px;
  margin: 22px 0 10px;
}
.markdown-body :deep(h3) {
  font-size: 18px;
  margin: 18px 0 8px;
}
.markdown-body :deep(p) {
  margin: 10px 0;
}
.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  padding-left: 24px;
  margin: 10px 0;
}
.markdown-body :deep(li) {
  margin: 4px 0;
}
.markdown-body :deep(a) {
  color: var(--mk-primary);
  text-decoration: none;
  border-bottom: 1px dashed var(--mk-primary);
}
.markdown-body :deep(a:hover) {
  opacity: 0.8;
}
.markdown-body :deep(blockquote) {
  margin: 12px 0;
  padding: 8px 16px;
  border-left: 4px solid var(--mk-primary);
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border-radius: 4px;
}
.markdown-body :deep(code) {
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
  background-color: var(--bg-secondary);
  padding: 2px 6px;
  border-radius: 4px;
}
.markdown-body :deep(pre) {
  margin: 12px 0;
  padding: 14px 16px;
  background-color: var(--bg-secondary);
  border-radius: 8px;
  overflow-x: auto;
  border: 1px solid var(--border);
}
.markdown-body :deep(pre code) {
  background-color: transparent;
  padding: 0;
  font-size: 13px;
}
.markdown-body :deep(hr) {
  border: none;
  border-top: 1px solid var(--border);
  margin: 18px 0;
}
.markdown-body :deep(table) {
  border-collapse: collapse;
  margin: 12px 0;
  width: 100%;
}
.markdown-body :deep(th),
.markdown-body :deep(td) {
  border: 1px solid var(--border);
  padding: 6px 12px;
  text-align: left;
}
.markdown-body :deep(img) {
  max-width: 100%;
  border-radius: 8px;
}
</style>
