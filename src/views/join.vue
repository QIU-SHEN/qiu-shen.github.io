<template>
  <div class="join-container">
    <div class="circle-button" @mouseenter="isHovered = true" @mouseleave="isHovered = false"
    @click="router.push('/join/joinUs')">
      <!-- 波纹层 -->
      <div class="ripple-layer">
        <div class="ripple" v-for="ripple in ripples" :key="ripple.id" :style="{
          '--scale': ripple.scale,
          '--opacity': ripple.opacity
        }"></div>
      </div>

      <span class="circle-text">加入我们</span>
    </div>
  </div>
  <div style="height: 140px"></div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();

const isHovered = ref(false)
const ripples = ref([])
let rippleId = 0

// 监听悬停状态，触发波纹
watch(isHovered, (newVal) => {
  if (newVal) {
    startRippleEffect()
  }else{
    stopRippleEffect()
  }
})

const startRippleEffect = () => {
  // 清除现有波纹
  ripples.value = []

  // 创建多个波纹，错开时间
  const rippleCount = 4 // 波纹数量
  const rippleInterval = 300 // 波纹间隔时间(ms)

  for (let i = 0; i < rippleCount; i++) {
    setTimeout(() => {
      const ripple = {
        id: rippleId++,
        scale: 1,
        opacity: 0.6
      }
      ripples.value.push(ripple)
      // 波纹动画完成后移除
      setTimeout(() => {
        const index = ripples.value.findIndex(r => r.id === ripple.id)
        if (index > -1) {
          ripples.value.splice(index, 1)
        }
      }, 1000)
    }, i * rippleInterval)
  }
}
const stopRippleEffect = () => {
  ripples.value = []
}
</script>

<style scoped>
.join-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.circle-button {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
   background: radial-gradient(
    circle at center,
    transparent 0%,
    transparent 50%,
    var(--ripple) 80%,
    var(--ripple) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.8s ease;
  overflow: visible;
  /* 改为visible让波纹可见 */
  z-index: 1;
  animation: breathe 3s ease-in-out infinite;
  transition: all 0.5s cubic-bezier(0.1, 0.01, 0.8, 1.7);
}

@keyframes breathe {
  0%, 100% {
    transform: scale(1);
    opacity: 0.7;
    box-shadow: 0 0 20px var(--mk-second);
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
    box-shadow: 0 0 40px var(--ripple),
                0 0 60px var(--mk-second);
  }
}

/* 波纹容器 */
.ripple-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  pointer-events: none;
  /* 元素不响应任何指针事件 */
  z-index: -1;
}

/* 单个波纹 */
.ripple {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid var(--ripple);
  opacity: var(--opacity, 0);
  transform: scale(var(--scale, 1));
  animation: rippleExpand 1s ease-out forwards;
}

/* 波纹动画 */
@keyframes rippleExpand {
  0% {
    transform: scale(1);
    opacity: var(--opacity, 0.6);
  }

  100% {
    transform: scale(2.5);
    /* 波纹扩散范围 */
    opacity: 0;
  }
}

.circle-text {
  font-size: 0px;
  font-weight: bold;
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.1, 0.01, 0.8, 1.7);
  white-space: nowrap;
  z-index: 2;
  position: relative;
}

/* 悬停时的扩展效果 */
.circle-button:hover {
  width: 600px;
  height: 600px;
  animation: extended .8s linear;
}

.circle-button:hover .circle-text {
  font-size: 100px;
  opacity: 1;
  animation: extendedText .8s linear;
}

/* 扩展动画 */
@keyframes extended {
  0% {
    width: 60px;
    height: 60px;
  }

  75% {
    width: 100px;
    height: 100px;
  }

  100% {
    width: 600px;
    height: 600px;
  }
}

/* 文字动画 */
@keyframes extendedText {
  0% {
    font-size: 0px;
    opacity: 0;
  }

  75% {
    font-size: 12px;
    opacity: 1;
  }

  100% {
    font-size: 100px;
    opacity: 1;
  }
}


/* 添加一些微妙的脉冲动画 */
.circle-button::before {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border-radius: 50%;
  background: var(--border-second);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.circle-button:hover::before {
  opacity: 1;
}
</style>