import wepy from 'wepy'

const baseUrl = 'http://192.168.0.117:89/'

export default {
    get(url, param, headers) {
        return sendRequest(url, 'GET', param, headers)
    },
    post(url, param, headers) {
        return sendRequest(url, 'POST', param, headers)
    }
}

function sendRequest(url, method, param, headers) {
    return new Promise((resolve, reject) => {
        wepy.request({
            url: baseUrl + url,
            data: param,
            header: headers,
            method: method === 'POST' ? 'POST' : 'GET',
            success(res) {
                handleSuccess(res).then(resolve, reject)
            },
            fail(res) {
                handleFail(res).then(resolve, reject)
            }
        })
    })
}

function handleSuccess(res) {
    return new Promise((resolve, reject) => {
        if (res.errMsg === 'request:ok') {
            if (res.data && res.data.Flag) {
                resolve(res.data)
            } else {
                let rejectReason = {
                    rejectType: 'REQ_ERROR',
                    data: res.data
                }
                reject(rejectReason)
            }
        } else {
            let rejectReason = {
                rejectType: 'REQ_FAIL'
            }
            reject(rejectReason)
        }
    })
}

function handleFail(res) {
    return new Promise((resolve, reject) => {
        let rejectReason = {
            rejectType: 'REQ_FAIL'
        }
        reject(rejectReason)
    })
}
