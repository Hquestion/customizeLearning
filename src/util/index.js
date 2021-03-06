export function parseTime(time) {
    if (!time) {
        return ''
    }
    time = time.replace(/T/g, ' ')
    time = time.replace(/-/g, '/')
    time = time.slice(0, 19)
    let date = new Date(time)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    return `${year}年${month}月${day}日`
}

export function getLastDays(createTime) {
    let now = new Date()
    let startDate = new Date(createTime)
    let seconds = Math.ceil((now - startDate) / 1000)
    let minutes = Math.ceil(seconds / 60)
    let hours = Math.ceil(minutes / 60)
    let days = Math.ceil(hours / 24)
    // if (minutes < 60) {
    //     return `${minutes}分钟`
    // } else if (hours < 24) {
    //     return `${hours}小时`
    // } else {
    return `${days}`
    // }
}

export function getMessageSendTime(timeStr) {
    if (!timeStr) {
        return ''
    }
    timeStr = timeStr.replace(/T/g, ' ')
    timeStr = timeStr.replace(/-/g, '/')
    timeStr = timeStr.slice(0, 19)
    let date = new Date(timeStr)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let now = new Date()
    let nowYear = now.getFullYear()
    let nowMonth = now.getMonth() + 1
    let nowDay = now.getDate()
    let resultStr = ''
    let minuteStr = minute < 10 ? ('0' + minute) : minute
    if (nowYear === year && nowMonth === month && nowDay === day) {
        resultStr = `${hour}:${minuteStr}`
    } else if (nowYear !== year) {
        resultStr = `${year}年${month}月${day}日 ${hour}:${minuteStr}`
    } else {
        resultStr = `${month}月${day}日 ${hour}:${minuteStr}`
    }
    return resultStr
}
