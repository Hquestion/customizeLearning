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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbImdldCIsInVybCIsInBhcmFtIiwiaGVhZGVycyIsInNlbmRSZXF1ZXN0IiwicG9zdCIsInVwbG9hZEZpbGUiLCJmaWxlUGF0aCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZmlsZVVwbG9hZFNlcnZlciIsIm5hbWUiLCJmb3JtRGF0YSIsInN1Y2Nlc3MiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwiZGF0YSIsIkpTT04iLCJwYXJzZSIsImhhbmRsZVN1Y2Nlc3MiLCJ0aGVuIiwiZmFpbCIsImhhbmRsZUZhaWwiLCJtZXRob2QiLCJyZXF1ZXN0IiwiaHR0cFNlcnZlclVybCIsImhlYWRlciIsImVyck1zZyIsIkZsYWciLCJyZWplY3RSZWFzb24iLCJyZWplY3RUeXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7a0JBRWU7QUFDWEEsT0FEVyxlQUNQQyxHQURPLEVBQ0ZDLEtBREUsRUFDS0MsT0FETCxFQUNjO0FBQ3JCLGVBQU9DLFlBQVlILEdBQVosRUFBaUIsS0FBakIsRUFBd0JDLEtBQXhCLEVBQStCQyxPQUEvQixDQUFQO0FBQ0gsS0FIVTtBQUlYRSxRQUpXLGdCQUlOSixHQUpNLEVBSURDLEtBSkMsRUFJTUMsT0FKTixFQUllO0FBQ3RCLGVBQU9DLFlBQVlILEdBQVosRUFBaUIsTUFBakIsRUFBeUJDLEtBQXpCLEVBQWdDQyxPQUFoQyxDQUFQO0FBQ0gsS0FOVTtBQU9YRyxjQVBXLHNCQU9BTCxHQVBBLEVBT0tNLFFBUEwsRUFPZUwsS0FQZixFQU9zQjtBQUM3QixlQUFPLElBQUlNLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDcEMsMkJBQUtKLFVBQUwsQ0FBZ0I7QUFDWkwscUJBQUssaUJBQU9VLGdCQUFQLEdBQTBCVixHQURuQjtBQUVaTSwwQkFBVUEsUUFGRTtBQUdaSyxzQkFBTSxNQUhNO0FBSVpDLDBCQUFVWCxLQUpFO0FBS1pZLHlCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDbkJDLDRCQUFRQyxHQUFSLENBQVksTUFBWjtBQUNBRCw0QkFBUUMsR0FBUixDQUFZRixHQUFaO0FBQ0FBLHdCQUFJRyxJQUFKLEdBQVdDLEtBQUtDLEtBQUwsQ0FBV0wsSUFBSUcsSUFBZixDQUFYO0FBQ0FHLGtDQUFjTixHQUFkLEVBQW1CTyxJQUFuQixDQUF3QmIsT0FBeEIsRUFBaUNDLE1BQWpDO0FBQ0gsaUJBVlc7QUFXWmEsb0JBWFksZ0JBV1BSLEdBWE8sRUFXRjtBQUNOUywrQkFBV1QsR0FBWCxFQUFnQk8sSUFBaEIsQ0FBcUJiLE9BQXJCLEVBQThCQyxNQUE5QjtBQUNIO0FBYlcsYUFBaEI7QUFlSCxTQWhCTSxDQUFQO0FBaUJIO0FBekJVLEM7OztBQTRCZixTQUFTTixXQUFULENBQXFCSCxHQUFyQixFQUEwQndCLE1BQTFCLEVBQWtDdkIsS0FBbEMsRUFBeUNDLE9BQXpDLEVBQWtEO0FBQzlDLFdBQU8sSUFBSUssT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNwQyx1QkFBS2dCLE9BQUwsQ0FBYTtBQUNUekIsaUJBQUssaUJBQU8wQixhQUFQLEdBQXVCMUIsR0FEbkI7QUFFVGlCLGtCQUFNaEIsS0FGRztBQUdUMEIsb0JBQVF6QixPQUhDO0FBSVRzQixvQkFBUUEsV0FBVyxNQUFYLEdBQW9CLE1BQXBCLEdBQTZCLEtBSjVCO0FBS1RYLG1CQUxTLG1CQUtEQyxHQUxDLEVBS0k7QUFDVE0sOEJBQWNOLEdBQWQsRUFBbUJPLElBQW5CLENBQXdCYixPQUF4QixFQUFpQ0MsTUFBakM7QUFDSCxhQVBRO0FBUVRhLGdCQVJTLGdCQVFKUixHQVJJLEVBUUM7QUFDTlMsMkJBQVdULEdBQVgsRUFBZ0JPLElBQWhCLENBQXFCYixPQUFyQixFQUE4QkMsTUFBOUI7QUFDSDtBQVZRLFNBQWI7QUFZSCxLQWJNLENBQVA7QUFjSDs7QUFFRCxTQUFTVyxhQUFULENBQXVCTixHQUF2QixFQUE0QjtBQUN4QixXQUFPLElBQUlQLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDcEMsWUFBSUssSUFBSWMsTUFBSixLQUFlLFlBQWYsSUFBK0JkLElBQUljLE1BQUosS0FBZSxlQUFsRCxFQUFtRTtBQUMvRCxnQkFBSWQsSUFBSUcsSUFBSixJQUFZSCxJQUFJRyxJQUFKLENBQVNZLElBQXpCLEVBQStCO0FBQzNCckIsd0JBQVFNLElBQUlHLElBQVo7QUFDSCxhQUZELE1BRU87QUFDSCxvQkFBSWEsZUFBZTtBQUNmQyxnQ0FBWSxXQURHO0FBRWZkLDBCQUFNSCxJQUFJRztBQUZLLGlCQUFuQjtBQUlBUix1QkFBT3FCLFlBQVA7QUFDSDtBQUNKLFNBVkQsTUFVTztBQUNILGdCQUFJQSxnQkFBZTtBQUNmQyw0QkFBWTtBQURHLGFBQW5CO0FBR0F0QixtQkFBT3FCLGFBQVA7QUFDSDtBQUNKLEtBakJNLENBQVA7QUFrQkg7O0FBRUQsU0FBU1AsVUFBVCxDQUFvQlQsR0FBcEIsRUFBeUI7QUFDckIsV0FBTyxJQUFJUCxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3BDLFlBQUlxQixlQUFlO0FBQ2ZDLHdCQUFZO0FBREcsU0FBbkI7QUFHQXRCLGVBQU9xQixZQUFQO0FBQ0gsS0FMTSxDQUFQO0FBTUgiLCJmaWxlIjoiaHR0cFNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGdldCh1cmwsIHBhcmFtLCBoZWFkZXJzKSB7XHJcbiAgICAgICAgcmV0dXJuIHNlbmRSZXF1ZXN0KHVybCwgJ0dFVCcsIHBhcmFtLCBoZWFkZXJzKVxyXG4gICAgfSxcclxuICAgIHBvc3QodXJsLCBwYXJhbSwgaGVhZGVycykge1xyXG4gICAgICAgIHJldHVybiBzZW5kUmVxdWVzdCh1cmwsICdQT1NUJywgcGFyYW0sIGhlYWRlcnMpXHJcbiAgICB9LFxyXG4gICAgdXBsb2FkRmlsZSh1cmwsIGZpbGVQYXRoLCBwYXJhbSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHdlcHkudXBsb2FkRmlsZSh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGNvbmZpZy5maWxlVXBsb2FkU2VydmVyICsgdXJsLFxyXG4gICAgICAgICAgICAgICAgZmlsZVBhdGg6IGZpbGVQYXRoLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ2ZpbGUnLFxyXG4gICAgICAgICAgICAgICAgZm9ybURhdGE6IHBhcmFtLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+S4iuS8oOaIkOWKnycpXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5kYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVTdWNjZXNzKHJlcykudGhlbihyZXNvbHZlLCByZWplY3QpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVGYWlsKHJlcykudGhlbihyZXNvbHZlLCByZWplY3QpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2VuZFJlcXVlc3QodXJsLCBtZXRob2QsIHBhcmFtLCBoZWFkZXJzKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDogY29uZmlnLmh0dHBTZXJ2ZXJVcmwgKyB1cmwsXHJcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtLFxyXG4gICAgICAgICAgICBoZWFkZXI6IGhlYWRlcnMsXHJcbiAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kID09PSAnUE9TVCcgPyAnUE9TVCcgOiAnR0VUJyxcclxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZVN1Y2Nlc3MocmVzKS50aGVuKHJlc29sdmUsIHJlamVjdClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbChyZXMpIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZUZhaWwocmVzKS50aGVuKHJlc29sdmUsIHJlamVjdClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVTdWNjZXNzKHJlcykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBpZiAocmVzLmVyck1zZyA9PT0gJ3JlcXVlc3Q6b2snIHx8IHJlcy5lcnJNc2cgPT09ICd1cGxvYWRGaWxlOm9rJykge1xyXG4gICAgICAgICAgICBpZiAocmVzLmRhdGEgJiYgcmVzLmRhdGEuRmxhZykge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCByZWplY3RSZWFzb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0VHlwZTogJ1JFUV9FUlJPUicsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogcmVzLmRhdGFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlamVjdChyZWplY3RSZWFzb24pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgcmVqZWN0UmVhc29uID0ge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0VHlwZTogJ1JFUV9GQUlMJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlamVjdChyZWplY3RSZWFzb24pXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gaGFuZGxlRmFpbChyZXMpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgbGV0IHJlamVjdFJlYXNvbiA9IHtcclxuICAgICAgICAgICAgcmVqZWN0VHlwZTogJ1JFUV9GQUlMJ1xyXG4gICAgICAgIH1cclxuICAgICAgICByZWplY3QocmVqZWN0UmVhc29uKVxyXG4gICAgfSlcclxufVxyXG4iXX0=