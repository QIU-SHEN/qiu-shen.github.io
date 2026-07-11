<template>
    <div class="box">
        <div class="item" v-for="v,i in Music" :key="i" @click="openMusicPlayer(i)">
            <img :src="v.img">
            <div class="text">{{v.MusicName}}</div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { useMusicPlayer } from '../composables/useMusicPlayer.js'

    const { selectTrack } = useMusicPlayer()

    const Music = ref([
        {MusicName:'发如雪', singer:'周杰伦', img:'/music1.jpg', music:'/发如雪-周杰伦.mp3'},
        {MusicName:'说了再见', singer:'周杰伦', img:'/music2.jpg', music:'/说了再见-周杰伦.mp3'},
        {MusicName:'简单爱', singer:'周杰伦', img:'/music3.jpg', music:'/简单爱-周杰伦.mp3'},
        {MusicName:'轨迹', singer:'周杰伦', img:'/music4.jpg', music:'/轨迹-周杰伦.mp3'},
        {MusicName:'暗号', singer:'周杰伦', img:'/music5.jpg', music:'/暗号-周杰伦.mp3'},
        {MusicName:'天天', singer:'陶吉吉', img:'/music6.png', music:'/陶喆 - 天天.mp3'},
        {MusicName:'普通朋友', singer:'陶吉吉', img:'/music7.png', music:'/陶喆 - 普通朋友.mp3'},
    ])

    const openMusicPlayer = (i)=>{
        selectTrack(Music.value[i])
    }


</script>

<style scoped>
.box{
    display: flex;
    justify-content: center;
    align-items: center;
    width: clamp(620px, 48vw, 760px);
    height: min(64vh, 480px);
    gap: 8px;
    margin-bottom: 86px;
    transform: skewX(-15deg);
    font-family: '优设标题黑';
    overflow: hidden;
    box-shadow:var(--shadow);
}

.item{
    position: relative; /* 为绝对定位的子元素提供参考 */
    list-style: none;
    flex: 1 1 0;
    width: auto;
    height: 100%;
    transition: flex .35s ease, opacity .35s ease;
    overflow: hidden;
    
    /* 图片居中 */
    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid rgba(255, 255, 255, 0.1);
}


.box div img{
    display: block;
    width: calc(100% + 150px);
    max-width: none;
    height: 100%;
    object-fit: cover;
    /* 图片光影 */
    filter: brightness(1.1) contrast(1.05);
    
    /* 图片过渡 */
    transition: all 0.5s ease;

 /* 抵消容器的倾斜 */
    transform: skewX(15deg) scale(1.14);
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
    flex: .55 1 0;
    opacity: .8;
}

.box .item:hover{
    flex: 3.6 1 0;
    height: 100%;
    opacity: 1;
}
.box .item:hover img{
    transform: skewX(15deg) scale(1.04);
    filter: brightness(1.2) contrast(1.1);
}

@media (max-width: 768px) {
    .box {
        width: 100%;
        height: auto;
        min-height: 0;
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
        margin: 0;
        padding: 4px 0 18px;
        transform: none;
        box-shadow: none;
    }

    .item {
        flex: none;
        width: 100%;
        height: 88px;
        float: none;
        border-radius: 8px;
        transform: none;
        box-shadow: var(--shadow2);
        cursor: pointer;
    }

    .box div img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform: none;
    }

    .item .text {
        height: 36px;
        line-height: 36px;
        transform: none;
        left: 0;
        width: 100%;
        font-size: 15px;
    }

    .item:hover ~ .item,
    .item:has(~ .item:hover),
    .box .item:hover {
        flex: none;
        width: 100%;
        height: 88px;
        opacity: 1;
    }

    .box .item:hover img {
        transform: none;
    }
}
</style>
