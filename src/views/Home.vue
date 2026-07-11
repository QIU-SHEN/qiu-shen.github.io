<template>
   <div class="homepage">
      <div class="jump-modules">
         <button
            v-for="item in jumpModules"
            :key="item.path"
            class="jump-link"
            type="button"
            @click="router.push(item.path)"
         >
            {{ item.title }}
         </button>
      </div>

      <div class="mid-container">
         <i class="sentence animation">Mabe we just need more time.</i>
      </div>
   </div>
   <div class="nothing" style="height: 200px;"></div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const jumpModules = [
   {
      title: '关于我',
      path: '/About',
   },
   {
      title: '项目集',
      path: '/Project',
   },
]
</script>

<style scoped>
.homepage {
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   gap: 72px;
   padding: 20px;
   font-family: Arial, sans-serif;
   min-height: 500px;
   width: 100%;
}

.jump-modules {
   display: flex;
   justify-content: center;
   align-items: center;
   gap: 72px;
}

.jump-link {
   padding: 0;
   border: 0;
   background: none;
   color: var(--text-primary);
   font-family: '优设标题黑', sans-serif;
   font-size: 30px;
   line-height: 1;
   cursor: pointer;
   transition: color 0.2s ease;
}

.jump-link:hover,
.jump-link:focus-visible {
   color: var(--mk-primary);
}

.jump-link:focus-visible {
   outline: none;
   text-decoration: underline;
   text-underline-offset: 6px;
}

.sentence {
   --sentence-width: min(570px, calc(100vw - 40px));
   font-size: clamp(28px, 8vw, 60px);
   font-family: "Agency FB";
   border-right: 2px solid var(--text-primary);
   white-space: nowrap;
   overflow: hidden;
   width: 0;
   display: block;
   user-select: none;
   -webkit-user-select: none;
}

.animation {
   animation:
      grow 3.5s steps(28) 1s forwards,
      blink 0.7s infinite;
}

@keyframes grow {
   from {
      width: 0;
   }

   to {
      width: var(--sentence-width);
   }
}

@keyframes blink {
   from {
      border-right-color: transparent;
   }

   to {
      border-right-color: var(--text-primary);
   }
}

@media (max-width: 768px) {
   .homepage {
      min-height: 55dvh;
      padding: 0;
      gap: 42px;
   }

   .jump-modules {
      gap: 44px;
   }

   .jump-link {
      font-size: 24px;
   }
}
</style>
