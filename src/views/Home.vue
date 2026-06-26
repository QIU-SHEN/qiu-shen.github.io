<template>

   <div class="homepage">
      <!-- 中间一句话 考虑轮播 -->
       <div class="mid-container">
          <div style="margin-bottom: 60px;">
             <Search></Search>
          </div>
         <i class="sentence animation">Mabe we just need more time.</i>
       </div>
   </div>
   <div class="nothing" style="height: 200px;"></div>
</template>

<script setup>
import Search from '../compomnent/search.vue'
</script>

<style scoped>
.homepage {
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 20px;
   font-family: Arial, sans-serif;
   height: 500px;
}


.sentence {
   font-size: 60px;
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
      width: 570px;
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
</style>
