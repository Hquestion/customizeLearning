import wepy from 'wepy'
import config from '../config'

export default {
    get(url, param, headers) {
        return sendRequest(url, 'GET', param, headers)
    },
    post(url, param, headers) {
        return sendRequest(url, 'POST', param, headers)
    },
    uploadFile(url, filePath, param) {
        return new Promise((resolve, reject) => {
            wepy.uploadFile({
                url: config.fileUploadServer + url,
                filePath: filePath,
                name: 'file',
                formData: param,
                success: function(res) {
                    console.log('上传成功')
                    console.log(res)
                    res.data = JSON.parse(res.data)
                    handleSuccess(res).then(resolve, reject)
                },
                fail(res) {
                    handleFail(res).then(resolve, reject)
                }
            })
        })
    }
}

function sendRequest(url, method, param, headers) {
    return new Promise((resolve, reject) => {
        wepy.request({
            url: config.httpServerUrl + url,
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
        if (res.errMsg === 'request:ok' || res.errMsg === 'uploadFile:ok') {
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
