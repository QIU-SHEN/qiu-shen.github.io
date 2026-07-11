import { readonly, ref } from 'vue'

const currentTrack = ref(null)
const playerMode = ref('idle')

const selectTrack = (track) => {
    if (!track) return

    if (currentTrack.value?.music === track.music) {
        playerMode.value = 'expanded'
        return
    }

    currentTrack.value = { ...track }
    playerMode.value = 'expanded'
}

const expandPlayer = () => {
    if (currentTrack.value) playerMode.value = 'expanded'
}

const minimizePlayer = () => {
    if (currentTrack.value) playerMode.value = 'minimized'
}

const closePlayer = () => {
    playerMode.value = 'idle'
    currentTrack.value = null
}

export const useMusicPlayer = () => ({
    currentTrack: readonly(currentTrack),
    playerMode: readonly(playerMode),
    selectTrack,
    expandPlayer,
    minimizePlayer,
    closePlayer
})
