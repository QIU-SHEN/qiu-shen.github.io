<template>
    <div class="box">
        <div class="item" v-for="v,i in Music" :key="i" @click="openMusicPlayer(i)">
            <img :src="v.img">
            <div class="text">{{v.MusicName}}</div>
        </div>
    </div>
    <MusicPlayer :MusicName="selectedMusic?.MusicName"
                 :showMusicPlayer="showMusicPlayer"
                 :singer="selectedMusic?.singer"
                 :imgUrl="selectedMusic?.img"
                 :musicUrl="selectedMusic?.music"
                 @show="showMusicPlayer = $event"></MusicPlayer>
</template>

<script setup>
 import {ref} from 'vue'
    import MusicPlayer from '../compomnent/musicPlayer.vue'

    const selectedMusic=ref()
    const showMusicPlayer = ref(false)

    const Music = ref([
        {MusicName:'发如雪', singer:'周杰伦', img:'../../public/music1.jpg', music:'../../public/发如雪-周杰伦.mp3'},
        {MusicName:'说了再见', singer:'周杰伦', img:'../../public/music2.jpg', music:'../../public/说了再见-周杰伦.mp3'},
        {MusicName:'简单爱', singer:'周杰伦', img:'../../public/music3.jpg', music:'../../public/简单爱-周杰伦.mp3'},
        {MusicName:'轨迹', singer:'周杰伦', img:'../../public/music4.jpg', music:'../../public/轨迹-周杰伦.mp3'},
        {MusicName:'暗号', singer:'周杰伦', img:'../../public/music5.jpg', music:'../../public/暗号-周杰伦.mp3'},
        {MusicName:'天天', singer:'陶吉吉', img:'../../public/music6.png', music:'../../public/陶喆 - 天天.mp3'},
        {MusicName:'普通朋友', singer:'陶吉吉', img:'../../public/music7.png', music:'../../public/陶喆 - 普通朋友.mp3'},
    ])

    const openMusicPlayer = (i)=>{
        selectedMusic.value=Music.value[i];
        showMusicPlayer.value = true;
    }


</script>

<style scoped>
.box{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 43vw;
    height: 60vh;
    gap: 10px;
    margin-bottom: 100px;
    transform: skewX(-15deg);
    font-family: '优设标题黑';
    box-shadow:var(--shadow);
}

.item{
    position: relative; /* 为绝对定位的子元素提供参考 */
    list-style: none;
    float:left;
    width: 6vw;
    height: 60vh;
    transition: all .3s;
    overflow: hidden;
    
    /* 图片居中 */
    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid rgba(255, 255, 255, 0.1);
}


.box div img{
    height: 80vh;
    /* 图片光影 */
    filter: brightness(1.1) contrast(1.05);
    
    /* 图片过渡 */
    transition: all 0.5s ease;

 /* 抵消容器的倾斜 */
    transform: skewX(15deg) scale(1.2);
}

.item .text{
    position: absolute;
    left: 0;
    bottom: 0;
    font-size: 16px;
    width: 100%;
    height: 30px;
    text-align: center;
    line-height: 30px;
    background-color: rgb(0, 0, 0,0.3);
    color: white;
    box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.3);

    /* 文字区域倾斜 */
    transform: skewX(15deg);
    width: calc(100% + 20px);
    left: -10px;
    
    /* 模糊 */
    backdrop-filter: blur(5px);
}

.item:hover ~ .item,
.item:has(~ .item:hover) {
    width: 3vw;
    opacity: .8;
}

.box .item:hover{
    width: 30vw;
    height: 70vh;
    opacity: 1;
}
.box .item:hover img{
    transform: skewX(15deg) scale(1.05);
    filter: brightness(1.2) contrast(1.1);
}
</style>