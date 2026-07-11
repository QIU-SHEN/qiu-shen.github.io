<template>
    <div class="tag">{{ tag }}</div>
</template>

<script setup>
const props = defineProps({
    tag:{
        type:String,
        default:'空白'
    }
})
</script>

<style scoped>
.tag{
    display: inline-flex;
    align-items: center;
    padding: 0;
    border: 0;
    background: none;
    color: var(--text-primary);
    font-size: 11px;
    line-height: 1.5;
    white-space: nowrap;
    opacity: 0.68;
    transition: color 0.15s ease, opacity 0.15s ease;
}
.tag::before {
    content: '#';
    margin-right: 1px;
    color: var(--mk-primary);
}
.tag:hover{
    color: var(--mk-primary);
    opacity: 1;
}
</style>
