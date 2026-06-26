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
          <span @click="router.push('/About'); aboutTitle = 'About'">About</span>
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
    <footer>
      <p>© 2025 QIUSHEN. All rights reserved.</p>
    </footer>

    <!-- 浮动功能按钮（任务 / AI 助手） -->
    <div class="float-btn iconfont icon-list" @click="openDrawer" title="功能菜单"></div>

    <!-- 多功能抽屉组件 -->
    <TaskDrawer v-model:isOpen="isOpen" v-model:activeTab="activeTab" @close="isOpen = false" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import TaskDrawer from './compomnent/taskDrawer.vue';

const router = useRouter();
const aboutTitle = ref('Home');
const flag_isDark = ref(true);
const isOpen = ref(false);
const activeTab = ref('chat');

const openDrawer = () => {
  if (isOpen.value) {
    // 如果已打开，切到另一个 tab；如果同一 tab 就关闭
    activeTab.value = activeTab.value === 'task' ? 'chat' : 'task';
  } else {
    isOpen.value = true;
  }
};
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
</style>
