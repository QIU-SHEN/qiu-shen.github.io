<template>
    <div class="cover unselectable" v-if="showMusicPlayer">
        <div class="iconfont icon-guanbi" @click="exitPlayer"></div>
        <div class="img-box">
            <img :src="imgUrl" width="100px" height="100px">
        </div>
        <div class="info">
            <div class="MusicName">{{ MusicName }}</div>
            <div class="singer">{{ singer }}</div>
        </div>
        <div class="volume-box" v-show="showVolume">
            <span class="volume-down" @click="volumeDown"><i>-</i></span>
            <input type="range" class="volume-range" step="1" v-model.number="inputRange" @input="updateVolume" min="0"
                max="100" :style="{
                    background: `linear-gradient(to right, #555 0%, #555 ${volumeRange}, #ffffff ${volumeRange}, #ffffff 100%)`
                }">
            <span class="volume-up" @click="volumeUp"><i>+</i></span>
        </div>
        <div class="btn-box">
            <i class="iconfont icon-xunhuan" @click="repeat" :style="repeat_color"></i>
            <i class="iconfont icon-aixin_shixin" @click="favorite" :style="favorite_color"></i>
            <i class="iconfont icon-shengyin_shiti" @click="volume" :style="volume_color"></i>
        </div>
        <div class="music-box">
            <span class="current-time">{{ formatTime(currentTime) }}</span>
            <input type="range" class="Progress-bar" step="1" v-model="inputeProgress" @input="updateProgress"
                @change="updateMusic" :style="{
                    background: `linear-gradient(to right, #555 0%, #555 ${progressRange}, #ffffff ${progressRange}, #ffffff 100%)`
                }">
            <audio ref="audioElement" class="music-element">
                <source :src="musicUrl">
            </audio>
            <span class="duration">{{ formatTime(duration) }}</span>
        </div>
        <div class="play" @click="play">
            <div :class="isPlay"></div>
        </div>
    </div>
</template>

<script setup>

// 格式化时间

import { onMounted, onUnmounted, ref, watch, computed } from 'vue'

const emits = defineEmits(['show'])

const props = defineProps({
    showMusicPlayer: Boolean,
    MusicName: String,
    singer: String,
    imgUrl: String,
    musicUrl: String
})

const isPlay = ref('iconfont icon-kaishi1')
const audioElement = ref(null)
const inputRange = ref(80)
const inputeProgress = ref(0)
const currentTime = ref(0)
const duration = ref(0)
const repeat_color = ref('')
const favorite_color = ref('')
const volume_color = ref('')
const showVolume = ref(false)
let flag_isPlay = false
let flag_Input = false
let flag_repeat = false
let flag_favorite = false

//进度条覆盖区域着色
const progressRange = computed(() => {
    return inputeProgress.value + '%'
})
const volumeRange = computed(() => {
    return inputRange.value + '%'
})

// 播放/暂停控制
const play = async () => {
    flag_isPlay = !flag_isPlay
    if (flag_isPlay) {
        await audioElement.value.play()
        isPlay.value = 'iconfont icon-zanting'
    } else {
        audioElement.value.pause()
        isPlay.value = 'iconfont icon-kaishi1'
    }
}

// Promise保证条件达成再执行
const waitUntil = (condition) => {
    return new Promise((resolve) => {
        const check = () => {
            if (condition()) {
                resolve('完成')
            } else {
                setTimeout(check, 100)
            }
        }
        check()
    })
}

const loadSuccess = async () => {
    await waitUntil(() => audioElement.value && audioElement.value.duration > 0)
    // 获取音频总长度 
    duration.value = audioElement.value.duration
    // 播放位置发生变化时 实时更新当前播放时间
    audioElement.value.addEventListener('timeupdate', () => {
        if (!flag_Input) {
            currentTime.value = audioElement.value.currentTime
            inputeProgress.value = (currentTime.value / duration.value) * 100
        }
    })
    // 音频播放结束时 重置播放状态
    audioElement.value.addEventListener('ended', () => {
        flag_isPlay = false
        isPlay.value = 'iconfont icon-kaishi1'
        currentTime.value = 0
        inputeProgress.value = 0

    })
}
watch(() => props.musicUrl, () => {
    loadSuccess() // 切换音频时调用
})

// 根据拖动进度条更新时间进度
const updateProgress = () => {
    if (audioElement.value) {
        currentTime.value = (inputeProgress.value / 100) * audioElement.value.duration;
        //用户开始拖动
        flag_Input = true
    }
}
// 根据进度条位置更新音频进度
const updateMusic = () => {
    if (audioElement.value) {
        audioElement.value.currentTime = (inputeProgress.value / 100) * audioElement.value.duration;
    }
}

//格式化时间
const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}


onMounted(() => {
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('keydown', handleKeydown)
})


onUnmounted(() => {
    document.removeEventListener('mousedup', handleMouseUp)
    document.removeEventListener('keydown', handleKeydown)
})
// 监听鼠标抬起事件，结束拖动
const handleMouseUp = () => {
    if (flag_Input) {
        flag_Input = false
    }
}
//退出时执行
const exitPlayer = () => {
    emits('show', false)
    isPlay.value = 'iconfont icon-kaishi1'
    inputeProgress.value = 0
    currentTime.value = 0
    if (showVolume.value) volume()
    if (flag_favorite) favorite()
    if (flag_repeat) repeat()

}
// ESC键退出
const handleKeydown = (event) => {
    if (event.key === 'Escape') {
        exitPlayer();
    }
}

//循环播放
const repeat = () => {
    flag_repeat = !flag_repeat
    repeat_color.value = flag_repeat ? 'color:#ff2c80' : ''
    if (audioElement.value) {
        audioElement.value.loop = flag_repeat
    }
}
const favorite = () => {
    flag_favorite = !flag_favorite
    favorite_color.value = flag_favorite ? 'color:#ff2c80' : ''
}
const volume = () => {
    showVolume.value = !showVolume.value
    volume_color.value = showVolume.value ? 'color:#ff2c80' : ''
}

//音量设置
const volumeDown = () => {
    if (audioElement.value && inputRange.value >= 10) {
        inputRange.value -= 10
        audioElement.value.volume = inputRange.value / 100
    } else {
        inputRange.value = 0
        audioElement.value.volume = 0
    }
}
const volumeUp = () => {
    if (audioElement.value && inputRange.value <= 90) {
        inputRange.value += 10
        audioElement.value.volume = inputRange.value / 100
    } else {
        inputRange.value = 100
        audioElement.value.volume = 1
    }
}
const updateVolume = () => {
    if (audioElement.value) {
        audioElement.value.volume = inputRange.value / 100
    }
}

</script>

<style scoped>
.cover {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-family: '优设标题黑';
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    backdrop-filter: blur(15px);
}

.icon-guanbi {
    position: absolute;
    top: 15px;
    right: 20px;
    cursor: pointer;
}

.img-box img {
    border-radius: 50px;
    margin-bottom: 20px;
}

.cover input[type=range] {
    -webkit-appearance: none !important;
    appearance: none;
    margin: 0;
    padding: 0;
    height: 5px;
    outline: none;
    cursor: pointer;
    border-radius: 5px;

}

/* Chrome, Safari, Edge, Opera */
.cover input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none !important;
    /* 移除默认thumb样式 */
    background: rgb(60, 59, 59);
    height: 8px;
    width: 8px;
    border-radius: 50%;
    box-shadow: var(--shadow);
}

/* Firefox */
.cover input[type=range]::-moz-range-thumb {
    background: rgb(60, 59, 59);
    height: 8px;
    width: 8px;
    border-radius: 100%;
}

/* Internet Explorer 10+ */
.cover input[type=range]::-ms-thumb {
    -webkit-appearance: none !important;
    appearance: none;
    /* 标准属性 */
    background: rgb(60, 59, 59);
    height: 8px;
    width: 8px;
    border-radius: 100%;
}


.info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.info .MusicName {
    font-size: 20px;
}

.info .singer {
    font-size: 15px;
}

.btn-box {
    margin: 10px;
}

.btn-box i {
    font-size: 16px;
    margin: 0 15px;
    cursor: pointer;
}

.btn-box i:active {
    color: #ff2c80;
}

.volume-box {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 18px;
    gap: 5px;
}

.volume-box .volume-down,
.volume-box .volume-up {
    cursor: pointer;
}

.volume-box .volume-up::selection {
    background-color: unset;
}

.volume-box input[type=range] {
    height: 5px;
    width: 150px;
}

.music-box {
    display: flex;
    justify-content: center;
    align-items: center;
}

.music-box input[type=range] {
    height: 5px;
    width: 150px;
}

.music-box .current-time {
    position: relative;
    right: 10px;
}

.music-box .duration {
    position: relative;
    left: 10px;
}

.icon-kaishi1,
.icon-zanting {
    padding: 20px;
    font-size: 24px;
    cursor: pointer;
}

/* 设置为不可选中 属性 */
.unselectable {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
</style>