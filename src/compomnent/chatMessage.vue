<template>
  <div :class="['msg', `msg-${role}`]">
    <div class="avatar">
      <i v-if="role === 'ai'" class="iconfont icon-ai250"></i>
      <span v-else>我</span>
    </div>
    <div class="bubble">
      <pre class="text">{{ text }}</pre>
    </div>
  </div>
</template>

<script setup>
defineProps({
  role: {
    type: String,
    default: 'user',
    validator: v => ['user', 'ai'].includes(v),
  },
  text: {
    type: String,
    default: '',
  },
})
</script>

<style scoped>
.msg {
  display: flex;
  gap: 10px;
  margin: 12px 0;
  align-items: flex-start;
  animation: pop 0.25s ease;
}

.msg-user {
  flex-direction: row-reverse;
}

@keyframes pop {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--bg-secondary);
  color: var(--mk-primary);
  font-size: 14px;
  font-weight: 600;
  border: 1px solid var(--border);
}

.bubble {
  max-width: 70%;
  padding: 10px 14px;
  border-radius: 12px;
  background-color: var(--card);
  border: 1px solid var(--border);
  box-shadow: var(--shadow2);
}

.msg-user .bubble {
  background: linear-gradient(135deg, var(--mk-primary), var(--mk-second));
  color: #fff;
  border-color: transparent;
}

.text {
  margin: 0;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
