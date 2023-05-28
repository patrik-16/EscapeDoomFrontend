export const formatTime = (time: number) => {
    if (time < 60) return time + " min"
    return Math.floor(time / 60).toString().padStart(2, '0') + ":" + (time % 60).toString().padStart(2, '0') + "h"
}

export const formatDate = (date: Date): string => {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}