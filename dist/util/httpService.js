'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _config = require('./../config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    get: function get(url, param, headers) {
        return sendRequest(url, 'GET', param, headers);
    },
    post: function post(url, param, headers) {
        return sendRequest(url, 'POST', param, headers);
    },
    uploadFile: function uploadFile(url, filePath, param) {
        return new Promise(function (resolve, reject) {
            _wepy2.default.uploadFile({
                url: _config2.default.fileUploadServer + url,
                filePath: filePath,
                name: 'file',
                formData: param,
                success: function success(res) {
                    console.log('上传成功');
                    console.log(res);
                    res.data = JSON.parse(res.data);
                    handleSuccess(res).then(resolve, reject);
                },
                fail: function fail(res) {
                    handleFail(res).then(resolve, reject);
                }
            });
        });
    }
};


function sendRequest(url, method, param, headers) {
    return new Promise(function (resolve, reject) {
        _wepy2.default.request({
            url: _config2.default.httpServerUrl + url,
            data: param,
            header: headers,
            method: method === 'POST' ? 'POST' : 'GET',
            success: function success(res) {
                handleSuccess(res).then(resolve, reject);
            },
            fail: function fail(res) {
                handleFail(res).then(resolve, reject);
            }
        });
    });
}

function handleSuccess(res) {
    return new Promise(function (resolve, reject) {
        if (res.errMsg === 'request:ok' || res.errMsg === 'uploadFile:ok') {
            if (res.data && res.data.Flag) {
                resolve(res.data);
            } else {
                var rejectReason = {
                    rejectType: 'REQ_ERROR',
                    data: res.data
                };
                reject(rejectReason);
            }
        } else {
            var _rejectReason = {
                rejectType: 'REQ_FAIL'
            };
            reject(_rejectReason);
        }
    });
}

function handleFail(res) {
    return new Promise(function (resolve, reject) {
        var rejectReason = {
            rejectType: 'REQ_FAIL'
        };
        reject(rejectReason);
    });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbImdldCIsInVybCIsInBhcmFtIiwiaGVhZGVycyIsInNlbmRSZXF1ZXN0IiwicG9zdCIsInVwbG9hZEZpbGUiLCJmaWxlUGF0aCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwid2VweSIsImNvbmZpZyIsImZpbGVVcGxvYWRTZXJ2ZXIiLCJuYW1lIiwiZm9ybURhdGEiLCJzdWNjZXNzIiwicmVzIiwiY29uc29sZSIsImxvZyIsImRhdGEiLCJKU09OIiwicGFyc2UiLCJoYW5kbGVTdWNjZXNzIiwidGhlbiIsImZhaWwiLCJoYW5kbGVGYWlsIiwibWV0aG9kIiwicmVxdWVzdCIsImh0dHBTZXJ2ZXJVcmwiLCJoZWFkZXIiLCJlcnJNc2ciLCJGbGFnIiwicmVqZWN0UmVhc29uIiwicmVqZWN0VHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O2tCQUVlO0FBQ1hBLE9BRFcsZUFDUEMsR0FETyxFQUNGQyxLQURFLEVBQ0tDLE9BREwsRUFDYztBQUNyQixlQUFPQyxZQUFZSCxHQUFaLEVBQWlCLEtBQWpCLEVBQXdCQyxLQUF4QixFQUErQkMsT0FBL0IsQ0FBUDtBQUNILEtBSFU7QUFJWEUsUUFKVyxnQkFJTkosR0FKTSxFQUlEQyxLQUpDLEVBSU1DLE9BSk4sRUFJZTtBQUN0QixlQUFPQyxZQUFZSCxHQUFaLEVBQWlCLE1BQWpCLEVBQXlCQyxLQUF6QixFQUFnQ0MsT0FBaEMsQ0FBUDtBQUNILEtBTlU7QUFPWEcsY0FQVyxzQkFPQUwsR0FQQSxFQU9LTSxRQVBMLEVBT2VMLEtBUGYsRUFPc0I7QUFDN0IsZUFBTyxJQUFJTSxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3BDQywyQkFBS0wsVUFBTCxDQUFnQjtBQUNaTCxxQkFBS1csaUJBQU9DLGdCQUFQLEdBQTBCWixHQURuQjtBQUVaTSwwQkFBVUEsUUFGRTtBQUdaTyxzQkFBTSxNQUhNO0FBSVpDLDBCQUFVYixLQUpFO0FBS1pjLHlCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDbkJDLDRCQUFRQyxHQUFSLENBQVksTUFBWjtBQUNBRCw0QkFBUUMsR0FBUixDQUFZRixHQUFaO0FBQ0FBLHdCQUFJRyxJQUFKLEdBQVdDLEtBQUtDLEtBQUwsQ0FBV0wsSUFBSUcsSUFBZixDQUFYO0FBQ0FHLGtDQUFjTixHQUFkLEVBQW1CTyxJQUFuQixDQUF3QmYsT0FBeEIsRUFBaUNDLE1BQWpDO0FBQ0gsaUJBVlc7QUFXWmUsb0JBWFksZ0JBV1BSLEdBWE8sRUFXRjtBQUNOUywrQkFBV1QsR0FBWCxFQUFnQk8sSUFBaEIsQ0FBcUJmLE9BQXJCLEVBQThCQyxNQUE5QjtBQUNIO0FBYlcsYUFBaEI7QUFlSCxTQWhCTSxDQUFQO0FBaUJIO0FBekJVLEM7OztBQTRCZixTQUFTTixXQUFULENBQXFCSCxHQUFyQixFQUEwQjBCLE1BQTFCLEVBQWtDekIsS0FBbEMsRUFBeUNDLE9BQXpDLEVBQWtEO0FBQzlDLFdBQU8sSUFBSUssT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNwQ0MsdUJBQUtpQixPQUFMLENBQWE7QUFDVDNCLGlCQUFLVyxpQkFBT2lCLGFBQVAsR0FBdUI1QixHQURuQjtBQUVUbUIsa0JBQU1sQixLQUZHO0FBR1Q0QixvQkFBUTNCLE9BSEM7QUFJVHdCLG9CQUFRQSxXQUFXLE1BQVgsR0FBb0IsTUFBcEIsR0FBNkIsS0FKNUI7QUFLVFgsbUJBTFMsbUJBS0RDLEdBTEMsRUFLSTtBQUNUTSw4QkFBY04sR0FBZCxFQUFtQk8sSUFBbkIsQ0FBd0JmLE9BQXhCLEVBQWlDQyxNQUFqQztBQUNILGFBUFE7QUFRVGUsZ0JBUlMsZ0JBUUpSLEdBUkksRUFRQztBQUNOUywyQkFBV1QsR0FBWCxFQUFnQk8sSUFBaEIsQ0FBcUJmLE9BQXJCLEVBQThCQyxNQUE5QjtBQUNIO0FBVlEsU0FBYjtBQVlILEtBYk0sQ0FBUDtBQWNIOztBQUVELFNBQVNhLGFBQVQsQ0FBdUJOLEdBQXZCLEVBQTRCO0FBQ3hCLFdBQU8sSUFBSVQsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNwQyxZQUFJTyxJQUFJYyxNQUFKLEtBQWUsWUFBZixJQUErQmQsSUFBSWMsTUFBSixLQUFlLGVBQWxELEVBQW1FO0FBQy9ELGdCQUFJZCxJQUFJRyxJQUFKLElBQVlILElBQUlHLElBQUosQ0FBU1ksSUFBekIsRUFBK0I7QUFDM0J2Qix3QkFBUVEsSUFBSUcsSUFBWjtBQUNILGFBRkQsTUFFTztBQUNILG9CQUFJYSxlQUFlO0FBQ2ZDLGdDQUFZLFdBREc7QUFFZmQsMEJBQU1ILElBQUlHO0FBRkssaUJBQW5CO0FBSUFWLHVCQUFPdUIsWUFBUDtBQUNIO0FBQ0osU0FWRCxNQVVPO0FBQ0gsZ0JBQUlBLGdCQUFlO0FBQ2ZDLDRCQUFZO0FBREcsYUFBbkI7QUFHQXhCLG1CQUFPdUIsYUFBUDtBQUNIO0FBQ0osS0FqQk0sQ0FBUDtBQWtCSDs7QUFFRCxTQUFTUCxVQUFULENBQW9CVCxHQUFwQixFQUF5QjtBQUNyQixXQUFPLElBQUlULE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDcEMsWUFBSXVCLGVBQWU7QUFDZkMsd0JBQVk7QUFERyxTQUFuQjtBQUdBeEIsZUFBT3VCLFlBQVA7QUFDSCxLQUxNLENBQVA7QUFNSCIsImZpbGUiOiJodHRwU2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZydcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGdldCh1cmwsIHBhcmFtLCBoZWFkZXJzKSB7XG4gICAgICAgIHJldHVybiBzZW5kUmVxdWVzdCh1cmwsICdHRVQnLCBwYXJhbSwgaGVhZGVycylcbiAgICB9LFxuICAgIHBvc3QodXJsLCBwYXJhbSwgaGVhZGVycykge1xuICAgICAgICByZXR1cm4gc2VuZFJlcXVlc3QodXJsLCAnUE9TVCcsIHBhcmFtLCBoZWFkZXJzKVxuICAgIH0sXG4gICAgdXBsb2FkRmlsZSh1cmwsIGZpbGVQYXRoLCBwYXJhbSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgd2VweS51cGxvYWRGaWxlKHtcbiAgICAgICAgICAgICAgICB1cmw6IGNvbmZpZy5maWxlVXBsb2FkU2VydmVyICsgdXJsLFxuICAgICAgICAgICAgICAgIGZpbGVQYXRoOiBmaWxlUGF0aCxcbiAgICAgICAgICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgICAgICAgICAgZm9ybURhdGE6IHBhcmFtLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5LiK5Lyg5oiQ5YqfJylcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgICAgICAgICAgICByZXMuZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZVN1Y2Nlc3MocmVzKS50aGVuKHJlc29sdmUsIHJlamVjdClcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZhaWwocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZUZhaWwocmVzKS50aGVuKHJlc29sdmUsIHJlamVjdClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cbn1cblxuZnVuY3Rpb24gc2VuZFJlcXVlc3QodXJsLCBtZXRob2QsIHBhcmFtLCBoZWFkZXJzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDogY29uZmlnLmh0dHBTZXJ2ZXJVcmwgKyB1cmwsXG4gICAgICAgICAgICBkYXRhOiBwYXJhbSxcbiAgICAgICAgICAgIGhlYWRlcjogaGVhZGVycyxcbiAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kID09PSAnUE9TVCcgPyAnUE9TVCcgOiAnR0VUJyxcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlU3VjY2VzcyhyZXMpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhaWwocmVzKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlRmFpbChyZXMpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGhhbmRsZVN1Y2Nlc3MocmVzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKHJlcy5lcnJNc2cgPT09ICdyZXF1ZXN0Om9rJyB8fCByZXMuZXJyTXNnID09PSAndXBsb2FkRmlsZTpvaycpIHtcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YSAmJiByZXMuZGF0YS5GbGFnKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlamVjdFJlYXNvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0VHlwZTogJ1JFUV9FUlJPUicsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHJlcy5kYXRhXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlamVjdChyZWplY3RSZWFzb24pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgcmVqZWN0UmVhc29uID0ge1xuICAgICAgICAgICAgICAgIHJlamVjdFR5cGU6ICdSRVFfRkFJTCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlamVjdChyZWplY3RSZWFzb24pXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5mdW5jdGlvbiBoYW5kbGVGYWlsKHJlcykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGxldCByZWplY3RSZWFzb24gPSB7XG4gICAgICAgICAgICByZWplY3RUeXBlOiAnUkVRX0ZBSUwnXG4gICAgICAgIH1cbiAgICAgICAgcmVqZWN0KHJlamVjdFJlYXNvbilcbiAgICB9KVxufVxuIl19