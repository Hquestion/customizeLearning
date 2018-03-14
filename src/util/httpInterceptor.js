import wepy from 'wepy'

var requestCount = 0
var clearLoadingTimer = null

export function interceptor() {
    // 拦截request请求
    this.intercept('request', {
        // 发出请求时的回调函数
        config (p) {
            requestCount++
            console.log(requestCount)
            // 对所有request请求中的OBJECT参数对象统一附加时间戳属性
            p.timestamp = +new Date()
            // 必须返回OBJECT参数对象，否则无法发送请求到服务端
            wepy.showLoading({
                title: '加载中。。',
                mask: true
            })
            clearTimeout(clearLoadingTimer)
            return p
        },

        // 请求成功后的回调函数
        success (p) {
            // 可以在这里对收到的响应数据对象进行加工处理
            console.log('request success: ', p)
            // 必须返回响应数据对象，否则后续无法对响应数据进行处理
            return p
        },

        // 请求失败后的回调函数
        fail (p) {
            console.log('request fail: ', p)
            // 必须返回响应数据对象，否则后续无法对响应数据进行处理
            return p
        },

        // 请求完成时的回调函数(请求成功或失败都会被执行)
        complete (p) {
            requestCount--
            console.log('request complete: ', requestCount)
            clearTimeout(clearLoadingTimer)
            if (requestCount === 0) {
                clearLoadingTimer = setTimeout(function() {
                    wepy.hideLoading()
                }, 200)
            }
        }
    })
}
