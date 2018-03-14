import wepy from 'wepy'

const baseUrl = 'http://192.168.0.117:89/'

export default {
    get(url, param, headers) {
        return new Promise((resolve, reject) => {
            wepy.request({
                url: baseUrl + url,
                data: param,
                header: headers,
                method: 'GET',
                success(res) {
                    resolve(res)
                },
                fail(res) {
                    reject(res)
                }
            })
        })
    },
    post(url, param, headers) {
        return new Promise((resolve, reject) => {
            wepy.request({
                url: baseUrl + url,
                data: param,
                header: headers,
                method: 'POST',
                success(res) {
                    resolve(res)
                },
                fail(res) {
                    reject(res)
                }
            })
        })
    }
}
