<template>
   <div class="container">
    <input type="text" placeholder="Search" v-model="searchText" @keypress.enter="handleSearch">
    <a href="#" @click.prevent="handleSearch">
        <i class="iconfont icon-shou" style="font-size: 45px; font-weight:900;"></i>
        <i class="iconfont icon-a-sousuosousuokuang" style="font-size: 45px;"></i>
    </a>
   </div>
</template>

<script setup>
import { ref } from 'vue';

const searchText = ref('');
const handleSearch = () => {
    if (searchText.value.trim()) {
        window.open(`https://cn.bing.com/search?q=${encodeURIComponent(searchText.value)}`, '_blank')
    }
};
</script>

<style scoped>

.container {
    position: relative;
    width: 600px;
    height: 60px;
   padding: 0px;
   background-color: var(--bg-third);
   border-radius: 20px;
   box-shadow: 0 10px 50px var(--bg-third),0 0 0 10px white;
   display: flex;
   align-items: center;
   overflow: hidden;
}
.container input {
    width: 80%;
    height: 45px;
    color: #ffffff;
    font: 300 40px '优设标题黑';
    border: none;
    outline: none;
    margin-left: 10px;
    background-color: transparent;
    user-select: none;
    -webkit-user-select: none;
}
.container input::placeholder {
    color: var(--text-secondary);
}
.container a {
    display: flex;
    position: absolute;
    right: 10px;
    top: 10px;
    color: white;
    width: 40px;
    height: 40px;
    text-decoration: none;
}
.container a .iconfont {
   margin: 10px 28px;
   transition: .3s;
}
.container a .icon-a-sousuosousuokuang {
   transform: translateX(-140px) translateY(-10px);
    opacity: 1;
}
.container a .icon-shou {
    transform: translateX(-60px) translateY(-10px);
   opacity: 0;
}
.container a:hover .icon-a-sousuosousuokuang {
   transform: translateX(-140px) translateY(-10px);
   opacity: 0;
}
.container a:hover .icon-shou {
   transform: translateX(-30px) translateY(-10px);
   opacity: 1;
}

@keyframes box {
    0% {
        transform: rotate(0deg);
    }
    33% {
        transform: rotate(8deg);
    }
    66% {
        transform: rotate(-8deg);
    }
    100% {
        transform: rotate(0deg);
    }
}
</style>