<template>
  <!-- 遮罩层 -->
  <Transition name="mask">
    <div v-if="isOpen" class="drawer-mask" @click="$emit('close')"></div>
  </Transition>

  <!-- 抽屉主体 -->
  <Transition name="drawer">
    <div v-if="isOpen" class="drawer-container">
      <div class="drawer-header">
        <h2>{{ activeTab === 'task' ? '任务清单' : 'AI 助手' }}</h2>
        <div class="iconfont icon-guanbi close-btn" @click="$emit('close')"></div>
      </div>

      <!-- Tab 切换 -->
      <div class="tab-bar">
        <div
          class="tab"
          :class="{ active: activeTab === 'task' }"
          @click="switchTab('task')"
        >
          <i class="iconfont icon-list"></i>
          <span>任务</span>
        </div>
        <div
          class="tab"
          :class="{ active: activeTab === 'chat' }"
          @click="switchTab('chat')"
        >
          <i class="iconfont icon-ai250"></i>
          <span>AI</span>
        </div>
      </div>

      <!-- 任务面板 -->
      <div v-if="activeTab === 'task'" class="panel">
        <div class="add-task-area">
          <input
            v-model="newTaskText"
            type="text"
            placeholder="添加新任务..."
            class="task-input"
            @keyup.enter="addTask"
          />
          <button class="add-btn iconfont icon-xunhuan" @click="addTask" title="添加任务"></button>
        </div>

        <div class="task-list">
          <div v-if="tasks.length === 0" class="empty-state">
            暂无任务，添加一个吧！
          </div>
          <div
            v-for="task in tasks"
            :key="task.id"
            class="task-item"
            :class="{ completed: task.completed }"
          >
            <div class="checkbox-container" @click="toggleTask(task.id)">
              <div class="checkbox" :class="{ checked: task.completed }">
                <span v-if="task.completed" class="checkmark">✓</span>
              </div>
            </div>
            <span class="task-text">{{ task.text }}</span>
            <div class="delete-btn iconfont icon-guanbi" @click="deleteTask(task.id)" title="删除任务"></div>
          </div>
        </div>

        <div class="drawer-footer">
          <span>{{ completedCount }} / {{ tasks.length }} 已完成</span>
        </div>
      </div>

      <!-- AI 聊天面板 -->
      <div v-else class="panel chat-panel">
        <div class="chat-window" ref="chatWindowRef">
          <div v-if="messages.length === 0" class="empty">
            <i class="iconfont icon-ai250"></i>
            <p>开始第一条消息吧 👋</p>
          </div>
          <ChatMessage
            v-for="(m, i) in messages"
            :key="i"
            :role="m.role"
            :text="m.text"
          />
          <div v-if="chatLoading" class="typing">AI 正在思考...</div>
        </div>

        <div class="chat-input-area">
          <textarea
            v-model="chatInput"
            class="chat-input"
            placeholder="输入消息，Enter 发送，Shift+Enter 换行"
            rows="1"
            @keydown="onChatKeydown"
            @input="autoGrow"
            ref="chatInputRef"
          ></textarea>
          <button class="send-btn" :disabled="!chatInput.trim() || chatLoading" @click="sendChat">
            <i class="iconfont icon-shou"></i>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue';
import axios from 'axios';
import ChatMessage from './chatMessage.vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  activeTab: {
    type: String,
    default: 'task'
  }
});

const emit = defineEmits(['close', 'update:isOpen', 'update:activeTab']);

const tasks = ref(loadTasks());
const newTaskText = ref('');

const completedCount = computed(() => {
  return tasks.value.filter(t => t.completed).length;
});

function loadTasks() {
  const saved = localStorage.getItem('qiushen_tasks');
  return saved ? JSON.parse(saved) : [];
}

const addTask = () => {
  const text = newTaskText.value.trim();
  if (text) {
    tasks.value.unshift({
      id: Date.now(),
      text: text,
      completed: false
    });
    newTaskText.value = '';
    saveTasks();
  }
};

const toggleTask = (id) => {
  const task = tasks.value.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
  }
};

const deleteTask = (id) => {
  tasks.value = tasks.value.filter(t => t.id !== id);
  saveTasks();
};

const saveTasks = () => {
  localStorage.setItem('qiushen_tasks', JSON.stringify(tasks.value));
};

watch(tasks, saveTasks, { deep: true });

// ===== AI 聊天 =====
// 纯前端直连 DeepSeek 大模型（无后端，DeepSeek 接口支持浏览器跨域）。
// Key 从 .env 的 VITE_DEEPSEEK_API_KEY 读取（.env 已被 gitignore，不进版本库）。
// 注意：构建后 key 仍会打进 dist bundle，公开部署前请设额度上限或换代理。
const CHAT_API_URL = 'https://api.deepseek.com/chat/completions';
const CHAT_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;
const CHAT_MODEL = 'deepseek-chat';
const SYSTEM_PROMPT =
  '你是 QIUSHEN 个人主页的项目介绍助手。' +
  '这个项目是一个用 Vue 3（Composition API + script setup）+ Vue Router + Vite 写的纯前端个人主页，没有后端。' +
  '页面包含：Home（首页）、About（关于作者与网站的简介）、' +
  'Notes（内置的 Markdown 笔记，只读浏览，文档站式布局）、Music（歌曲播放器）、Join（联系方式）。' +
  '右侧悬浮抽屉里有任务清单和你（AI 助手）。' +
  'QIUSHEN 是这个主页的作者，是一名正在学习前端的学生开发者。' +
  '回答风格简洁友好，多用短句，必要时用列表。' +
  '只回答和这个项目、作者、前端技术、笔记、本站功能相关的问题。' +
  '如果用户问完全不相关的话题（比如天气、明星、医疗诊断），礼貌地把话题引回项目本身。';
const MAX_HISTORY = 10;

const messages = ref([]);
const chatInput = ref('');
const chatLoading = ref(false);
const chatWindowRef = ref(null);
const chatInputRef = ref(null);

const GREETING = {
  role: 'ai',
  text: '你好！我是 QIUSHEN 个人主页的 AI 助手。可以问我这个项目用了什么技术、有什么功能、作者是谁、笔记怎么看，或者音乐页面在哪。',
};
let greeted = false;

const autoGrow = () => {
  const el = chatInputRef.value;
  if (!el) return;
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 120) + 'px';
};

const onChatKeydown = (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendChat();
  }
};

const scrollToBottom = async () => {
  await nextTick();
  if (chatWindowRef.value) {
    chatWindowRef.value.scrollTop = chatWindowRef.value.scrollHeight;
  }
};

const sendChat = async () => {
  const text = chatInput.value.trim();
  if (!text || chatLoading.value) return;

  messages.value.push({ role: 'user', text });
  chatInput.value = '';
  autoGrow();
  await scrollToBottom();

  chatLoading.value = true;
  try {
    const history = messages.value
      .filter(m => !(m.role === 'ai' && m === GREETING))
      .map(m => ({
        role: m.role === 'ai' ? 'assistant' : m.role,
        content: m.text,
      }))
      .slice(-MAX_HISTORY);

    const { data } = await axios.post(
      CHAT_API_URL,
      {
        model: CHAT_MODEL,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history],
      },
      {
        headers: {
          Authorization: `Bearer ${CHAT_API_KEY}`,
          'Content-Type': 'application/json; charset=utf-8',
        },
        timeout: 60000,
      }
    );
    const reply = data?.choices?.[0]?.message?.content;
    messages.value.push({
      role: 'ai',
      text: reply || '⚠️ AI 没有返回内容，请稍后再试。',
    });
  } catch (e) {
    messages.value.push({
      role: 'ai',
      text: '⚠️ 调用 AI 失败，请稍后再试（可能是网络或跨域限制）。',
    });
  } finally {
    chatLoading.value = false;
    await scrollToBottom();
  }
};

// 切 Tab：不自动关抽屉，但要记住最关心的视图
const switchTab = (tab) => {
  emit('update:activeTab', tab);
  if (tab === 'chat') {
    nextTick(() => {
      if (!greeted) {
        messages.value.push(GREETING);
        greeted = true;
      }
      chatInputRef.value?.focus();
      scrollToBottom();
    });
  }
};
</script>

<style scoped>
/* 遮罩层动画 */
.mask-enter-active,
.mask-leave-active {
  transition: opacity 0.3s ease;
}

.mask-enter-from,
.mask-leave-to {
  opacity: 0;
}

.drawer-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

/* 抽屉动画 */
.drawer-enter-active,
.drawer-leave-active {
  transition: transform 0.3s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(100%);
}

.drawer-container {
  position: fixed;
  top: 0;
  right: 0;
  width: 380px;
  height: 100vh;
  background-color: var(--bg-secondary);
  box-shadow: var(--shadow);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--border);
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid var(--border);
}

.drawer-header h2 {
  margin: 0;
  color: var(--text-primary);
  font-size: 22px;
}

.close-btn {
  font-size: 24px;
  cursor: pointer;
  color: var(--text-primary);
  transition: transform 0.3s;
  padding: 5px;
}

.close-btn:hover {
  transform: rotate(90deg);
  color: var(--mk-primary);
}

/* Tab 切换栏 */
.tab-bar {
  display: flex;
  padding: 8px 12px;
  gap: 8px;
  border-bottom: 1px solid var(--border);
}

.tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
  color: var(--text-secondary);
  font-size: 14px;
  transition: all 0.25s;
}

.tab .iconfont {
  font-size: 16px;
}

.tab:hover {
  color: var(--mk-primary);
  background-color: var(--bg-primary);
}

.tab.active {
  color: #fff;
  background: var(--mk-primary);
  box-shadow: var(--shadow);
}

/* 面板 */
.panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 添加任务区域 */
.add-task-area {
  display: flex;
  padding: 20px;
  gap: 10px;
  border-bottom: 1px solid var(--border);
}

.task-input {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid var(--border);
  border-radius: 20px;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-size: 14px;
  outline: none;
  transition: all 0.3s;
}

.task-input:focus {
  border-color: var(--mk-primary);
  box-shadow: 0 0 8px var(--mk-second);
}

.task-input::placeholder {
  color: var(--text-secondary);
}

.add-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: var(--mk-primary);
  color: white;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
}

.add-btn:hover {
  transform: scale(1.1) rotate(90deg);
  box-shadow: var(--shadow);
}

/* 任务列表 */
.task-list {
  flex: 1;
  overflow-y: auto;
  padding: 10px 20px;
}

.empty-state {
  text-align: center;
  color: var(--text-secondary);
  padding: 40px 20px;
  font-size: 14px;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 12px;
  background-color: var(--card);
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  border: 1px solid transparent;
}

.task-item:hover {
  transform: translateY(-4px);
  border-color: var(--border);
  box-shadow: var(--shadow);
}

.task-item.completed {
  opacity: 0.6;
}

.task-item.completed .task-text {
  text-decoration: line-through;
  color: var(--text-secondary);
}

/* 复选框 */
.checkbox-container {
  cursor: pointer;
  flex-shrink: 0;
}

.checkbox {
  width: 22px;
  height: 22px;
  border: 2px solid var(--border);
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  background-color: var(--bg-primary);
}

.checkbox.checked {
  background-color: var(--mk-primary);
  border-color: var(--mk-primary);
}

.checkmark {
  color: white;
  font-size: 14px;
  font-weight: bold;
}

/* 任务文本 */
.task-text {
  flex: 1;
  color: var(--text-primary);
  font-size: 14px;
  word-break: break-all;
}

/* 删除按钮 */
.delete-btn {
  font-size: 18px;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 5px;
  opacity: 0;
  transition: all 0.3s;
}

.task-item:hover .delete-btn {
  opacity: 1;
}

.delete-btn:hover {
  color: #ff4757;
  transform: scale(1.2);
}

/* 底部统计 */
.drawer-footer {
  padding: 15px 20px;
  border-top: 1px solid var(--border);
  color: var(--text-secondary);
  font-size: 12px;
  text-align: center;
}

/* 滚动条样式 */
.task-list::-webkit-scrollbar {
  width: 6px;
}

.task-list::-webkit-scrollbar-track {
  background: transparent;
}

.task-list::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 3px;
}

.task-list::-webkit-scrollbar-thumb:hover {
  background: var(--mk-primary);
}

/* ===== 聊天面板 ===== */
.chat-panel {
  padding: 0;
}

.chat-window {
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
}

.chat-window::-webkit-scrollbar {
  width: 6px;
}

.chat-window::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 3px;
}

.empty {
  text-align: center;
  color: var(--text-secondary);
  margin: auto;
}

.empty .iconfont {
  font-size: 50px;
  color: var(--mk-primary);
  opacity: 0.6;
}

.empty p {
  margin-top: 12px;
  font-size: 14px;
}

.typing {
  color: var(--text-secondary);
  font-size: 13px;
  margin: 8px 0;
  padding-left: 46px;
  font-style: italic;
}

.chat-input-area {
  display: flex;
  gap: 10px;
  padding: 14px 16px;
  border-top: 1px solid var(--border);
  background-color: var(--bg-primary);
}

.chat-input {
  flex: 1;
  resize: none;
  padding: 10px 14px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 14px;
  font-family: inherit;
  line-height: 1.5;
  outline: none;
  max-height: 120px;
  transition: border-color 0.2s;
}

.chat-input:focus {
  border-color: var(--mk-primary);
}

.send-btn {
  align-self: flex-end;
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 12px;
  background: var(--mk-primary);
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.send-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: var(--shadow);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
