export function parseTime(time) {
    let date = new Date(time)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDay()
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
