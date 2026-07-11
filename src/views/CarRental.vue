<template>
  <main class="about-page">
    <article class="about-content">
      <Markdown :source="carRentalContent" />
      <button class="back-button" type="button" @click="$router.go(-1)">返回</button>
    </article>
  </main>
</template>

<script setup>
import Markdown from '../compomnent/markdown.vue'
import carRentalContent from '../content/carRental.md?raw'
</script>

<style scoped>
.about-page {
  width: 100%;
  max-width: 100%;
  height: 100%;
  min-height: 0;
  min-width: 0;
  overflow-y: auto;
  padding: 76px 24px 96px;
  box-sizing: border-box;
}

.about-content {
  width: min(760px, 100%);
  min-width: 0;
  margin: 0 auto;
  overflow-wrap: anywhere;
}

.back-button {
  display: block;
  margin: 44px auto 0;
  padding: 6px 14px;
  border: 0;
  border-radius: 5px;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  font-family: '优设标题黑', sans-serif;
  font-size: 18px;
  cursor: pointer;
  transition: color 0.2s ease, background-color 0.2s ease;
}

.back-button:hover,
.back-button:focus-visible {
  background-color: var(--mk-primary);
  color: white;
}

@media (max-width: 768px) {
  .about-page {
    width: auto;
    overflow-x: hidden;
    padding: 0 4px 40px;
  }

  .about-content {
    width: 100%;
    max-width: 100%;
  }

  .back-button {
    width: 100%;
    min-height: 42px;
    margin-top: 32px;
  }
}
</style>
