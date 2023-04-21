export const formatTime = (time: number) => {
    if (time < 60) return time + " min"
    return Math.floor(time / 60).toString().padStart(2, '0') + ":" + (time % 60).toString().padStart(2, '0') + "h"
}