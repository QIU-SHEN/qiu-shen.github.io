<template>
<div class="about-me">
    <h1>加入 我</h1>
    <p>微信 13792163368</p>
    <button class="back-button" @click="$router.go(-1)"> 返回 </button>
</div>
</template>

<script setup>

</script>

<style scoped>
.about-me {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 80vw;
    color: var(--mk-primary);
    font-family: '优设标题黑', sans-serif;
}
h1 {
    margin: 0;
    font-size: 40px;
}
.back-button {
    align-self: center;
    padding: 5px 10px;
    font-size: 20px;
    background-color: var(--bg-secondary);
    color: var(--text-primary);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-family: '优设标题黑', sans-serif;
    position: absolute;
    bottom: 50px;
}
.back-button:hover {
    background-color: var(--mk-primary);
    color: white;
    transition: 0.3s;
}
</style>