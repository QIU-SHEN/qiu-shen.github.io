<template>
  <div class="shell">
    <div class="content">
      <div class="item" @click="router.push('/Project/ai-sales-coach')">
        <h2>AI销售</h2>
      </div>

      <div class="item" @click="router.push('/Project/car-rental')">
        <h2>汽车租贸</h2>
      </div>

      <div class="item" @click="router.push('/Project/ai-customer-lifecycle')">
        <h2>AI运营引擎</h2>
      </div>
    </div>
  </div>
  <div class="nothing" style="height: 200px;"></div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style scoped>
.shell {
  position: relative;
  width: 60vw;
  height: 40vw;
  max-width: 380px;
  max-height: 250px;
  margin: 0;
  color: black;
  perspective: 1000px;
  transform-origin: center;
}

.content {
  display: flex;
  justify-self: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  transform-origin: center;
  transform-style: preserve-3d;
  transform: translateZ(-30vw) rotateY(0);
  animation: carousel 9s infinite cubic-bezier(0.77, 0, 0.175, 1) forwards;
}

.item {
  color: var(--text-third);
  display: flex;
  justify-content: center;
  align-items: center;
  font: 200 50px '优设标题黑';
  position: absolute;
  width: 60vw;
  height: 40vw;
  max-width: 380px;
  max-height: 250px;
  box-shadow: var(--shadow);
  border-radius: 6px;
  background-size: cover;
  background-position: center;
  -webkit-box-reflect: below 25px linear-gradient(transparent 5%, rgba(255, 255, 255, 0.3));
  cursor: pointer;
}

.item:nth-child(1) {
  background-image: var(--bg-image1);
  transform: rotateY(0) translateZ(35vw);
}

.item:nth-child(2) {
  background-image: var(--bg-image2);
  transform: rotateY(120deg) translateZ(35vw);
}

.item:nth-child(3) {
  background-image: var(--bg-image3);
  transform: rotateY(240deg) translateZ(35vw);
}

@keyframes carousel {
  0%,
  17.5% {
    transform: translateZ(-35vw) rotateY(0);
  }

  27.5%,
  45% {
    transform: translateZ(-35vw) rotateY(-120deg);
  }

  55%,
  72.5% {
    transform: translateZ(-35vw) rotateY(-240deg);
  }

  82.5%,
  100% {
    transform: translateZ(-35vw) rotateY(-360deg);
  }
}

@media (max-width: 768px) {
  .shell {
    width: 100%;
    height: auto;
    max-width: none;
    max-height: none;
    perspective: none;
  }

  .content {
    position: relative;
    display: grid;
    gap: 14px;
    width: 100%;
    height: auto;
    transform: none;
    animation: none;
  }

  .item {
    position: relative;
    width: 100%;
    height: 130px;
    max-width: none;
    max-height: none;
    transform: none !important;
    -webkit-box-reflect: unset;
    font-size: clamp(28px, 10vw, 50px);
  }

  .item:empty {
    display: none;
  }
}
</style>
