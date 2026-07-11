<template>
    <aside class="mini-player" aria-label="迷你音乐播放器">
        <button
            class="mini-cover"
            type="button"
            :aria-label="`展开播放器：${track.MusicName}`"
            :title="`${track.MusicName} - ${track.singer}`"
            @click="$emit('expand')"
        >
            <img
                :class="{ spinning: isPlaying }"
                :src="track.img"
                :alt="`${track.MusicName}封面`"
            >
        </button>

        <button
            class="mini-control mini-toggle"
            type="button"
            :aria-label="isPlaying ? '暂停音乐' : '播放音乐'"
            :title="isPlaying ? '暂停' : '播放'"
            @click="$emit('toggle')"
        >
            <i class="iconfont" :class="isPlaying ? 'icon-zanting' : 'icon-kaishi1'"></i>
        </button>

        <button
            class="mini-control mini-close"
            type="button"
            aria-label="停止并关闭播放器"
            title="停止并关闭"
            @click="$emit('close')"
        >
            ×
        </button>
    </aside>
</template>

<script setup>
defineProps({
    track: {
        type: Object,
        required: true
    },
    isPlaying: {
        type: Boolean,
        default: false
    }
})

defineEmits(['expand', 'toggle', 'close'])
</script>

<style scoped>
.mini-player {
    position: fixed;
    right: 20px;
    bottom: calc(58px + env(safe-area-inset-bottom, 0px));
    width: 72px;
    height: 72px;
    padding: 4px;
    border: 2px solid var(--border);
    border-radius: 50%;
    background: var(--card);
    box-shadow: var(--shadow);
    z-index: 200;
    animation: mini-player-in .25s ease-out;
}

.mini-cover {
    width: 100%;
    height: 100%;
    padding: 0;
    overflow: hidden;
    border: 0;
    border-radius: 50%;
    background: transparent;
    cursor: pointer;
}

.mini-cover img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
}

.mini-cover img.spinning {
    animation: album-spin 8s linear infinite;
}

.mini-control {
    position: absolute;
    width: 28px;
    height: 28px;
    padding: 0;
    border: 1px solid var(--border);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-secondary);
    color: var(--text-primary);
    box-shadow: var(--shadow2);
    cursor: pointer;
    line-height: 1;
}

.mini-control:hover,
.mini-control:focus-visible {
    color: var(--mk-primary);
    transform: scale(1.08);
}

.mini-control:focus-visible,
.mini-cover:focus-visible {
    outline: 2px solid var(--mk-primary);
    outline-offset: 2px;
}

.mini-toggle {
    left: -6px;
    bottom: -3px;
}

.mini-toggle i {
    font-size: 13px;
}

.mini-close {
    top: -7px;
    right: -5px;
    font-size: 20px;
}

@keyframes album-spin {
    to {
        transform: rotate(360deg);
    }
}

@keyframes mini-player-in {
    from {
        opacity: 0;
        transform: scale(.7) translateY(12px);
    }
    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

@media (max-width: 768px) {
    .mini-player {
        right: 12px;
        bottom: calc(116px + env(safe-area-inset-bottom, 0px));
        width: 64px;
        height: 64px;
    }
}

@media (prefers-reduced-motion: reduce) {
    .mini-player,
    .mini-cover img.spinning {
        animation: none;
    }
}
</style>
