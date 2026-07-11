<template>
  <!-- 遮罩层 -->
  <Transition name="mask">
    <div v-if="isOpen" class="drawer-mask" @click="$emit('close')"></div>
  </Transition>

  <!-- 抽屉主体 -->
  <Transition name="drawer">
    <div v-if="isOpen" class="drawer-container">
      <div class="drawer-header">
        <h2>AI 助手</h2>
        <div class="iconfont icon-guanbi close-btn" @click="$emit('close')"></div>
      </div>

      <!-- AI 聊天面板 -->
      <div class="panel chat-panel">
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
import { ref, nextTick } from 'vue';
import axios from 'axios';
import ChatMessage from './chatMessage.vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
});

const emit = defineEmits(['close', 'update:isOpen']);

// 默认调用同域云函数；静态部署时可用公开的 VITE_CHAT_API_URL 指向外部代理。
const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL || '/api/chat';
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
        messages: history,
      },
      {
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        timeout: 60000,
      }
    );
    const reply = data?.reply;
    messages.value.push({
      role: 'ai',
      text: reply || '⚠️ AI 没有返回内容，请稍后再试。',
    });
  } catch (e) {
    messages.value.push({
      role: 'ai',
      text: e.response?.data?.reply || '⚠️ AI 助手暂时无法响应，请稍后再试。',
    });
  } finally {
    chatLoading.value = false;
    await scrollToBottom();
  }
};

// 打开时自动推送问候
const initChat = () => {
  if (!greeted) {
    messages.value.push(GREETING);
    greeted = true;
  }
  nextTick(() => {
    chatInputRef.value?.focus();
    scrollToBottom();
  });
};

defineExpose({ initChat });
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

/* 面板 */
.panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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

@media (max-width: 768px) {
  .drawer-container {
    width: 100%;
    height: 100dvh;
    border-left: none;
  }

  .drawer-header {
    padding: 14px 16px;
  }

  .drawer-header h2 {
    font-size: 20px;
  }

  .chat-window {
    padding: 14px 14px;
  }

  .chat-input-area {
    padding: 12px;
    gap: 8px;
  }

  .chat-input {
    border-radius: 10px;
    font-size: 16px;
  }

  .send-btn {
    width: 44px;
    height: 44px;
    border-radius: 10px;
  }
}
</style>
