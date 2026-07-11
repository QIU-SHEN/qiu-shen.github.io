<template>
    <div v-if="currentTrack" class="music-player-host">
        <audio
            ref="audioElement"
            class="music-element"
            :src="currentTrack.music"
            :loop="isRepeat"
            preload="metadata"
            @loadedmetadata="handleLoadedMetadata"
            @durationchange="handleLoadedMetadata"
            @timeupdate="handleTimeUpdate"
            @play="isPlaying = true"
            @pause="isPlaying = false"
            @ended="handleEnded"
            @error="handleAudioError"
        ></audio>

        <div
            v-if="playerMode === 'expanded'"
            class="cover unselectable"
            role="dialog"
            aria-modal="true"
            :aria-label="`音乐播放器：${currentTrack.MusicName}`"
        >
            <button
                class="close-button iconfont icon-guanbi"
                type="button"
                aria-label="收起播放器"
                title="收起播放器"
                @click="minimizePlayer"
            ></button>

            <div class="img-box">
                <img
                    :src="currentTrack.img"
                    :alt="`${currentTrack.MusicName}封面`"
                    width="100"
                    height="100"
                >
            </div>

            <div class="info">
                <div class="MusicName">{{ currentTrack.MusicName }}</div>
                <div class="singer">{{ currentTrack.singer }}</div>
            </div>

            <div v-show="showVolume" class="volume-box">
                <button class="volume-step" type="button" aria-label="降低音量" @click="volumeDown">−</button>
                <input
                    v-model.number="volumeValue"
                    class="volume-range"
                    type="range"
                    step="1"
                    min="0"
                    max="100"
                    aria-label="音量"
                    :style="volumeStyle"
                    @input="updateVolume"
                >
                <button class="volume-step" type="button" aria-label="提高音量" @click="volumeUp">+</button>
            </div>

            <div class="btn-box">
                <button
                    type="button"
                    aria-label="循环播放"
                    :aria-pressed="isRepeat"
                    @click="toggleRepeat"
                >
                    <i class="iconfont icon-xunhuan" :class="{ active: isRepeat }"></i>
                </button>
                <button
                    type="button"
                    aria-label="收藏"
                    :aria-pressed="isFavorite"
                    @click="toggleFavorite"
                >
                    <i class="iconfont icon-aixin_shixin" :class="{ active: isFavorite }"></i>
                </button>
                <button
                    type="button"
                    aria-label="显示音量控制"
                    :aria-expanded="showVolume"
                    @click="showVolume = !showVolume"
                >
                    <i class="iconfont icon-shengyin_shiti" :class="{ active: showVolume }"></i>
                </button>
            </div>

            <div class="music-box">
                <span class="current-time">{{ formatTime(currentTime) }}</span>
                <input
                    v-model.number="progressValue"
                    class="Progress-bar"
                    type="range"
                    step="0.1"
                    min="0"
                    max="100"
                    aria-label="播放进度"
                    :aria-valuetext="`${formatTime(currentTime)} / ${formatTime(duration)}`"
                    :disabled="duration <= 0"
                    :style="progressStyle"
                    @pointerdown="isSeeking = true"
                    @input="previewProgress"
                    @change="commitProgress"
                >
                <span class="duration">{{ formatTime(duration) }}</span>
            </div>

            <p v-if="loadError" class="player-error" role="status">{{ loadError }}</p>

            <button
                class="play"
                type="button"
                :aria-label="isPlaying ? '暂停音乐' : '播放音乐'"
                @click="togglePlay"
            >
                <i class="iconfont" :class="isPlaying ? 'icon-zanting' : 'icon-kaishi1'"></i>
            </button>
        </div>

        <MiniMusicPlayer
            v-else-if="playerMode === 'minimized'"
            :track="currentTrack"
            :is-playing="isPlaying"
            @expand="expandPlayer"
            @toggle="togglePlay"
            @close="stopPlayer"
        />
    </div>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import MiniMusicPlayer from './miniMusicPlayer.vue'
import { useMusicPlayer } from '../composables/useMusicPlayer.js'

const {
    currentTrack,
    playerMode,
    expandPlayer,
    minimizePlayer,
    closePlayer
} = useMusicPlayer()

const audioElement = ref(null)
const isPlaying = ref(false)
const isSeeking = ref(false)
const showVolume = ref(false)
const isRepeat = ref(false)
const isFavorite = ref(false)
const volumeValue = ref(80)
const progressValue = ref(0)
const currentTime = ref(0)
const duration = ref(0)
const loadError = ref('')

const rangeStyle = (value) => ({
    background: `linear-gradient(to right, var(--mk-primary) 0%, var(--mk-primary) ${value}%, var(--text-secondary) ${value}%, var(--text-secondary) 100%)`
})

const progressStyle = computed(() => rangeStyle(progressValue.value))
const volumeStyle = computed(() => rangeStyle(volumeValue.value))

const resetTimeline = () => {
    isPlaying.value = false
    isSeeking.value = false
    progressValue.value = 0
    currentTime.value = 0
    duration.value = 0
    loadError.value = ''
}

const resetPlayer = () => {
    resetTimeline()
    showVolume.value = false
    isRepeat.value = false
    isFavorite.value = false
    volumeValue.value = 80
}

watch(
    () => currentTrack.value?.music,
    async (musicUrl, previousUrl) => {
        if (!musicUrl) {
            resetPlayer()
            return
        }

        if (previousUrl && audioElement.value) {
            audioElement.value.pause()
        }

        resetTimeline()
        await nextTick()

        if (audioElement.value) {
            audioElement.value.volume = volumeValue.value / 100
            audioElement.value.load()
        }
    }
)

const togglePlay = async () => {
    const audio = audioElement.value
    if (!audio) return

    if (audio.paused) {
        try {
            loadError.value = ''
            await audio.play()
        } catch {
            isPlaying.value = false
            loadError.value = '暂时无法播放，请重新选择歌曲'
        }
    } else {
        audio.pause()
    }
}

const handleLoadedMetadata = () => {
    const audio = audioElement.value
    if (!audio) return

    duration.value = Number.isFinite(audio.duration) ? audio.duration : 0
    audio.volume = volumeValue.value / 100
    loadError.value = ''
}

const handleTimeUpdate = () => {
    const audio = audioElement.value
    if (!audio || isSeeking.value) return

    currentTime.value = Number.isFinite(audio.currentTime) ? audio.currentTime : 0
    progressValue.value = duration.value > 0
        ? Math.min(100, (currentTime.value / duration.value) * 100)
        : 0
}

const previewProgress = () => {
    isSeeking.value = true
    currentTime.value = duration.value > 0
        ? (progressValue.value / 100) * duration.value
        : 0
}

const commitProgress = () => {
    const audio = audioElement.value
    if (audio && duration.value > 0) {
        audio.currentTime = (progressValue.value / 100) * duration.value
        currentTime.value = audio.currentTime
    }
    isSeeking.value = false
}

const handleEnded = () => {
    isPlaying.value = false
    currentTime.value = 0
    progressValue.value = 0
}

const handleAudioError = () => {
    isPlaying.value = false
    loadError.value = '音乐加载失败，请重新选择歌曲'
}

const toggleRepeat = () => {
    isRepeat.value = !isRepeat.value
}

const toggleFavorite = () => {
    isFavorite.value = !isFavorite.value
}

const updateVolume = () => {
    if (audioElement.value) {
        audioElement.value.volume = volumeValue.value / 100
    }
}

const volumeDown = () => {
    volumeValue.value = Math.max(0, volumeValue.value - 10)
    updateVolume()
}

const volumeUp = () => {
    volumeValue.value = Math.min(100, volumeValue.value + 10)
    updateVolume()
}

const stopPlayer = () => {
    if (audioElement.value) {
        audioElement.value.pause()
        audioElement.value.currentTime = 0
    }
    resetPlayer()
    closePlayer()
}

const handleKeydown = (event) => {
    if (event.key === 'Escape' && playerMode.value === 'expanded') {
        minimizePlayer()
    }
}

const handlePointerUp = () => {
    if (isSeeking.value) commitProgress()
}

onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
    document.addEventListener('pointerup', handlePointerUp)
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
    document.removeEventListener('pointerup', handlePointerUp)
})

const formatTime = (seconds) => {
    if (!Number.isFinite(seconds) || seconds < 0) return '0:00'

    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}
</script>

<style scoped>
.cover {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    padding: 24px;
    font-family: '优设标题黑';
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1100;
    animation: fadeIn .3s ease;
    background: var(--bg-dialog);
    backdrop-filter: blur(15px);
}

.music-element {
    display: none;
}

.close-button {
    position: absolute;
    top: 15px;
    right: 20px;
    width: 40px;
    height: 40px;
    padding: 0;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    color: var(--text-primary);
    cursor: pointer;
}

.close-button:hover,
.close-button:focus-visible {
    color: var(--mk-primary);
}

.close-button:focus-visible,
.btn-box button:focus-visible,
.play:focus-visible,
.volume-step:focus-visible {
    outline: 2px solid var(--mk-primary);
    outline-offset: 2px;
}

.img-box img {
    display: block;
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: var(--shadow);
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

.cover input[type='range'] {
    appearance: none;
    margin: 0;
    padding: 0;
    height: 5px;
    border: 0;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
}

.cover input[type='range']:focus-visible {
    outline: 2px solid var(--mk-primary);
    outline-offset: 4px;
}

.cover input[type='range']:disabled {
    cursor: not-allowed;
    opacity: .5;
}

.cover input[type='range']::-webkit-slider-thumb {
    appearance: none;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--text-primary);
    box-shadow: var(--shadow);
}

.cover input[type='range']::-moz-range-thumb {
    width: 10px;
    height: 10px;
    border: 0;
    border-radius: 50%;
    background: var(--text-primary);
}

.volume-box {
    display: flex;
    align-items: center;
    gap: 7px;
    margin-top: 10px;
}

.volume-box input[type='range'] {
    width: 150px;
}

.volume-step {
    width: 28px;
    height: 28px;
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--text-primary);
    font-size: 21px;
    font-weight: 600;
    cursor: pointer;
}

.btn-box {
    display: flex;
    align-items: center;
    gap: 30px;
    margin: 12px;
}

.btn-box button {
    width: 32px;
    height: 32px;
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--text-primary);
    cursor: pointer;
}

.btn-box i {
    font-size: 16px;
}

.btn-box i.active,
.btn-box button:hover i {
    color: var(--mk-primary);
}

.music-box {
    width: min(100%, 260px);
    display: grid;
    grid-template-columns: 42px minmax(120px, 1fr) 42px;
    align-items: center;
    gap: 8px;
}

.music-box input[type='range'] {
    width: 100%;
}

.current-time,
.duration {
    font-variant-numeric: tabular-nums;
    text-align: center;
}

.player-error {
    margin: 12px 0 0;
    color: var(--mk-primary);
    font-size: 14px;
}

.play {
    width: 64px;
    height: 64px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    color: var(--text-primary);
    cursor: pointer;
}

.play:hover {
    color: var(--mk-primary);
}

.play i {
    font-size: 28px;
}

.unselectable {
    user-select: none;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@media (max-width: 768px) {
    .cover {
        min-height: 100dvh;
        padding: 28px 22px;
    }

    .close-button {
        top: 18px;
        right: 18px;
        width: 44px;
        height: 44px;
        font-size: 22px;
    }

    .img-box img {
        width: min(46vw, 180px);
        height: min(46vw, 180px);
    }

    .info .MusicName {
        font-size: 22px;
        text-align: center;
    }

    .btn-box {
        gap: 28px;
    }

    .btn-box i {
        font-size: 22px;
    }

    .volume-box {
        width: 100%;
        justify-content: center;
    }

    .volume-box input[type='range'] {
        width: min(58vw, 260px);
    }

    .music-box {
        width: min(100%, 340px);
        grid-template-columns: 44px minmax(0, 1fr) 44px;
    }

    .play {
        width: 70px;
        height: 70px;
    }

    .play i {
        font-size: 34px;
    }
}

@media (prefers-reduced-motion: reduce) {
    .cover {
        animation: none;
    }
}
</style>
