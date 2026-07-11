<template>
  <div id="back" :class="flag_isDark ? '' : 'nodark'">
    <div class="nav-container">
      <nav>
        <div class="logo">
          <h1 class="title1">{{ aboutTitle }}</h1>
          <strong>导航</strong>
        </div>
        <div class="nav-links">
          <span @click="router.push('/Home'); aboutTitle = 'Home'">Home</span>
          <span @click="router.push('/Project'); aboutTitle = 'Project'">Project</span>
          <span @click="router.push('/Notes'); aboutTitle = 'Notes'">Notes</span>
          <span @click="router.push('/Music'); aboutTitle = 'Music'">Music</span>
          <span @click="router.push('/Join'); aboutTitle = 'Join'">Join</span>
          <div class="marker"></div>
        </div>
        <div class="style-container">
          <div class="style iconfont" :class="flag_isDark ? 'icon-ai250' : 'icon-yejianmoshi'"
          @click="flag_isDark = !flag_isDark"></div>
        </div>
      </nav>
    </div>

    <div class="contentRouter">
      <router-view></router-view>
    </div>

    <!-- 全局音乐播放器，切换路由时保持播放 -->
    <MusicPlayer />

    <footer>
      <p>© 2025 QIUSHEN. All rights reserved.</p>
    </footer>

    <!-- 浮动按钮（AI 助手） -->
    <div
      v-if="aiAssistantEnabled"
      class="float-btn iconfont icon-list"
      @click="isOpen = !isOpen"
      title="AI 助手"
    ></div>

    <!-- AI 助手抽屉 -->
    <TaskDrawer
      v-if="aiAssistantEnabled"
      v-model:isOpen="isOpen"
      @close="isOpen = false"
      ref="taskDrawerRef"
    />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { defineAsyncComponent, ref, watch } from 'vue';
import MusicPlayer from './compomnent/musicPlayer.vue';

const router = useRouter();
const aiAssistantEnabled = import.meta.env.VITE_ENABLE_AI_ASSISTANT !== 'false';
const TaskDrawer = aiAssistantEnabled
  ? defineAsyncComponent(() => import('./compomnent/taskDrawer.vue'))
  : null;
const aboutTitle = ref('Home');
const flag_isDark = ref(true);
const isOpen = ref(false);
const taskDrawerRef = ref(null);

if (aiAssistantEnabled) {
  watch(isOpen, (v) => {
    if (v) taskDrawerRef.value?.initChat();
  });
}
</script>


<style scoped>
.logo {
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 50px;
  user-select: none;
  -webkit-user-select: none;
}

.title1 {
  margin: 0;
  box-shadow: var(--shadow2);
  border-radius: 20px;
  user-select: none;
  -webkit-user-select: none;
}

.contentRouter {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow-y: auto;
  user-select: auto;
}

.nav-container {
  position: relative;
  height: 60px;
  /* 导航栏高度 */
  z-index: 1000;
}

nav {
  position: fixed;
  /* 固定导航栏 紧贴顶部 */
  top: -60px;
  width: 100%;
  /* 宽度100% */
  height: 60px;
  /* 高度60px */
  display: flex;
  justify-content: space-around;
  /* 水平居中 */
  align-items: center;
  background-color: var(--bg-secondary);
  font-size: 20px;
  opacity: 0.7;
  /* 透明度 */
  z-index: 100;
  /* 确保导航栏在最上层 */
}

.nav-links {
  display: flex;
  align-items: center;
  justify-content: center;
}

.marker {
  display: none;
}

.nav-container:hover nav {
  top: 0;
  transition: top 0.3s ease-in-out;
  opacity: 1;
}

.nav-container:not(:hover) nav {
  top: -60px;
  transition: top 0.3s ease-in-out;
}

.nav-links span {
  padding: 10px 20px;
  margin: 20px 0;
  text-transform: uppercase;
  transition: .5s;
  user-select: none;
  -webkit-user-select: none;
}

.nav-links span:hover {
  color: var(--mk-primary);
  border-bottom: 3px solid var(--mk-primary);
  cursor: pointer;
}

.style-container {
  display: flex;
  flex-direction: row;
  justify-self: center;
  align-items: center;
  gap: 10px;
}

.style {
  height: 10px;
  width: 10px;
  font-size: 25px;
  padding: 0;
  margin: 0;
}

.style:hover {
  cursor: pointer;
  transform: scale(1.2);
  transition: .3s;
}

.purple {
  background-color: #6572be;
}

.black {
  background-color: black;
}

footer {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-secondary);
  font-size: 16px;
  opacity: 0.8;
  z-index: 100;
}

/* 浮动功能按钮 */
.float-btn {
  position: fixed;
  right: 0;
  top: 120px;
  width: 50px;
  height: 50px;
  border-radius: 50% 0 0 50%;
  background: var(--mk-primary);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
  box-shadow:
    -4px 0 15px var(--mk-second),
    inset 2px 0 10px rgba(255, 255, 255, 0.2),
    0 0 20px var(--ripple);
  z-index: 99;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transform: translateX(35px);
}

.float-btn:hover {
  transform: translateX(0) scale(1.1);
  box-shadow:
    -4px 0 25px var(--mk-second),
    inset 2px 0 15px rgba(255, 255, 255, 0.3),
    0 0 35px var(--ripple),
    0 0 50px var(--mk-primary);
  border-radius: 50%;
}

.float-btn:active {
  transform: translateX(0) scale(0.95);
}

@media (max-width: 768px) {
  .logo {
    gap: 10px;
  }

  .title1 {
    font-size: 20px;
    border-radius: 12px;
  }

  .logo strong {
    display: none;
  }

  .contentRouter {
    min-height: 100dvh;
    height: 100dvh;
    align-items: stretch;
    justify-content: flex-start;
    padding: 96px 14px 58px;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }

  .nav-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    z-index: 1000;
  }

  nav {
    top: 0;
    height: auto;
    min-height: 72px;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 8px 12px;
    padding: 10px 14px;
    box-sizing: border-box;
    font-size: 15px;
    opacity: 0.96;
    backdrop-filter: blur(12px);
  }

  .nav-container:hover nav,
  .nav-container:not(:hover) nav {
    top: 0;
    transition: none;
  }

  .nav-links {
    order: 3;
    width: 100%;
    justify-content: space-between;
    gap: 4px;
  }

  .nav-links span {
    flex: 1;
    min-width: 0;
    padding: 8px 2px;
    margin: 0;
    text-align: center;
    font-size: 14px;
  }

  .style {
    width: 32px;
    height: 32px;
    font-size: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  footer {
    height: 36px;
    font-size: 12px;
    padding: 0 12px;
    box-sizing: border-box;
  }

  .float-btn {
    top: auto;
    right: 10px;
    bottom: 54px;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    transform: none;
    font-size: 22px;
  }

  .float-btn:hover {
    transform: scale(1.04);
  }
}

@media (max-width: 420px) {
  .contentRouter {
    padding-top: 104px;
  }

  .nav-links span {
    font-size: 13px;
  }
}
</style>
