---
title: Vue 3 script setup 小记
tags: Vue, 前端
date: 2026-06-25
---

# Vue 3 script setup 小记

记录一些日常用 `<script setup>` 时常翻的点。

## ref 还是 reactive

- `ref` 适合单个值，访问要 `.value`
- `reactive` 适合对象，访问不用 `.value`，但解构会丢响应性

```js
import { ref, reactive } from 'vue'

const count = ref(0)
const form = reactive({ name: '', tags: [] })

count.value++        // ref 要 .value
form.name = 'QIUSHEN' // reactive 直接改
```

## defineProps / defineEmits

在 `<script setup>` 里它们是编译宏，不用 import：

```js
const props = defineProps({
  isOpen: { type: Boolean, default: false },
})
const emit = defineEmits(['close', 'update:isOpen'])
```

## v-model 自定义组件

父组件 `v-model:isOpen="x"` 等价于：

| 父组件写法 | 子组件需要 |
| --- | --- |
| `v-model:isOpen` | prop `isOpen` + emit `update:isOpen` |

## 小结

`<script setup>` 写起来更短，逻辑也更聚合，是 Vue 3 推荐的默认写法。
