<template>
    <div class="tag">{{ tag }}</div>
</template>

<script setup>
const props = defineProps({
    tag:{
        style:String,
        default:'空白'
    }
})
</script>

<style scoped>
.tag{
    display: flex;  
    justify-content: center;
    align-items: center;
    padding: 5px;
    border-radius: 20px;
    background-color: rgba(102, 255, 176, 0.3);
    border: 2px solid rgba(102, 255, 176);
    min-width: 40px;
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.tag:hover{
     transform: translateY(-8px) scale(1.15);
}
</style>