'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.interceptor = interceptor;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requestCount = 0;
var clearLoadingTimer = null;

function interceptor() {
    // 拦截request请求
    this.intercept('request', {
        // 发出请求时的回调函数
        config: function config(p) {
            requestCount++;
            var isIgnoreLoading = p.header && !!p.header.ignoreLoading;
            // 必须返回OBJECT参数对象，否则无法发送请求到服务端
            if (requestCount <= 1 && !isIgnoreLoading) {
                _wepy2.default.showLoading({
                    title: '加载中',
                    mask: true
                });
            }
            clearTimeout(clearLoadingTimer);
            return p;
        },


        // 请求成功后的回调函数
        success: function success(p) {
            // 可以在这里对收到的响应数据对象进行加工处理
            console.log('request success: ', p);
            // 必须返回响应数据对象，否则后续无法对响应数据进行处理
            return p;
        },


        // 请求失败后的回调函数
        fail: function fail(p) {
            console.log('request fail: ', p);
            // 必须返回响应数据对象，否则后续无法对响应数据进行处理
            return p;
        },


        // 请求完成时的回调函数(请求成功或失败都会被执行)
        complete: function complete(p) {
            requestCount--;
            console.log('request complete: ', requestCount);
            clearTimeout(clearLoadingTimer);
            if (requestCount === 0) {
                clearLoadingTimer = setTimeout(function () {
                    _wepy2.default.hideLoading();
                }, 200);
            }
        }
    });
    // 拦截request请求
    this.intercept('uploadFile', {
        // 发出请求时的回调函数
        config: function config(p) {
            requestCount++;
            var isIgnoreLoading = p.header && !!p.header.ignoreLoading;
            // 必须返回OBJECT参数对象，否则无法发送请求到服务端
            if (requestCount <= 1 && !isIgnoreLoading) {
                _wepy2.default.showLoading({
                    title: '加载中',
                    mask: true
                });
            }
            clearTimeout(clearLoadingTimer);
            return p;
        },


        // 请求成功后的回调函数
        success: function success(p) {
            // 可以在这里对收到的响应数据对象进行加工处理
            console.log('request success: ', p);
            // 必须返回响应数据对象，否则后续无法对响应数据进行处理
            return p;
        },


        // 请求失败后的回调函数
        fail: function fail(p) {
            console.log('request fail: ', p);
            // 必须返回响应数据对象，否则后续无法对响应数据进行处理
            return p;
        },


        // 请求完成时的回调函数(请求成功或失败都会被执行)
        complete: function complete(p) {
            requestCount--;
            console.log('request complete: ', requestCount);
            clearTimeout(clearLoadingTimer);
            if (requestCount === 0) {
                clearLoadingTimer = setTimeout(function () {
                    _wepy2.default.hideLoading();
                }, 200);
            }
        }
    });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBJbnRlcmNlcHRvci5qcyJdLCJuYW1lcyI6WyJpbnRlcmNlcHRvciIsInJlcXVlc3RDb3VudCIsImNsZWFyTG9hZGluZ1RpbWVyIiwiaW50ZXJjZXB0IiwiY29uZmlnIiwicCIsImlzSWdub3JlTG9hZGluZyIsImhlYWRlciIsImlnbm9yZUxvYWRpbmciLCJzaG93TG9hZGluZyIsInRpdGxlIiwibWFzayIsImNsZWFyVGltZW91dCIsInN1Y2Nlc3MiLCJjb25zb2xlIiwibG9nIiwiZmFpbCIsImNvbXBsZXRlIiwic2V0VGltZW91dCIsImhpZGVMb2FkaW5nIl0sIm1hcHBpbmdzIjoiOzs7OztRQUtnQkEsVyxHQUFBQSxXOztBQUxoQjs7Ozs7O0FBRUEsSUFBSUMsZUFBZSxDQUFuQjtBQUNBLElBQUlDLG9CQUFvQixJQUF4Qjs7QUFFTyxTQUFTRixXQUFULEdBQXVCO0FBQzFCO0FBQ0EsU0FBS0csU0FBTCxDQUFlLFNBQWYsRUFBMEI7QUFDdEI7QUFDQUMsY0FGc0Isa0JBRWRDLENBRmMsRUFFWDtBQUNQSjtBQUNBLGdCQUFJSyxrQkFBbUJELEVBQUVFLE1BQUYsSUFBWSxDQUFDLENBQUNGLEVBQUVFLE1BQUYsQ0FBU0MsYUFBOUM7QUFDQTtBQUNBLGdCQUFJUCxnQkFBZ0IsQ0FBaEIsSUFBcUIsQ0FBQ0ssZUFBMUIsRUFBMkM7QUFDdkMsK0JBQUtHLFdBQUwsQ0FBaUI7QUFDYkMsMkJBQU8sS0FETTtBQUViQywwQkFBTTtBQUZPLGlCQUFqQjtBQUlIO0FBQ0RDLHlCQUFhVixpQkFBYjtBQUNBLG1CQUFPRyxDQUFQO0FBQ0gsU0FkcUI7OztBQWdCdEI7QUFDQVEsZUFqQnNCLG1CQWlCYlIsQ0FqQmEsRUFpQlY7QUFDUjtBQUNBUyxvQkFBUUMsR0FBUixDQUFZLG1CQUFaLEVBQWlDVixDQUFqQztBQUNBO0FBQ0EsbUJBQU9BLENBQVA7QUFDSCxTQXRCcUI7OztBQXdCdEI7QUFDQVcsWUF6QnNCLGdCQXlCaEJYLENBekJnQixFQXlCYjtBQUNMUyxvQkFBUUMsR0FBUixDQUFZLGdCQUFaLEVBQThCVixDQUE5QjtBQUNBO0FBQ0EsbUJBQU9BLENBQVA7QUFDSCxTQTdCcUI7OztBQStCdEI7QUFDQVksZ0JBaENzQixvQkFnQ1paLENBaENZLEVBZ0NUO0FBQ1RKO0FBQ0FhLG9CQUFRQyxHQUFSLENBQVksb0JBQVosRUFBa0NkLFlBQWxDO0FBQ0FXLHlCQUFhVixpQkFBYjtBQUNBLGdCQUFJRCxpQkFBaUIsQ0FBckIsRUFBd0I7QUFDcEJDLG9DQUFvQmdCLFdBQVcsWUFBVztBQUN0QyxtQ0FBS0MsV0FBTDtBQUNILGlCQUZtQixFQUVqQixHQUZpQixDQUFwQjtBQUdIO0FBQ0o7QUF6Q3FCLEtBQTFCO0FBMkNBO0FBQ0EsU0FBS2hCLFNBQUwsQ0FBZSxZQUFmLEVBQTZCO0FBQ3pCO0FBQ0FDLGNBRnlCLGtCQUVqQkMsQ0FGaUIsRUFFZDtBQUNQSjtBQUNBLGdCQUFJSyxrQkFBbUJELEVBQUVFLE1BQUYsSUFBWSxDQUFDLENBQUNGLEVBQUVFLE1BQUYsQ0FBU0MsYUFBOUM7QUFDQTtBQUNBLGdCQUFJUCxnQkFBZ0IsQ0FBaEIsSUFBcUIsQ0FBQ0ssZUFBMUIsRUFBMkM7QUFDdkMsK0JBQUtHLFdBQUwsQ0FBaUI7QUFDYkMsMkJBQU8sS0FETTtBQUViQywwQkFBTTtBQUZPLGlCQUFqQjtBQUlIO0FBQ0RDLHlCQUFhVixpQkFBYjtBQUNBLG1CQUFPRyxDQUFQO0FBQ0gsU0Fkd0I7OztBQWdCekI7QUFDQVEsZUFqQnlCLG1CQWlCaEJSLENBakJnQixFQWlCYjtBQUNSO0FBQ0FTLG9CQUFRQyxHQUFSLENBQVksbUJBQVosRUFBaUNWLENBQWpDO0FBQ0E7QUFDQSxtQkFBT0EsQ0FBUDtBQUNILFNBdEJ3Qjs7O0FBd0J6QjtBQUNBVyxZQXpCeUIsZ0JBeUJuQlgsQ0F6Qm1CLEVBeUJoQjtBQUNMUyxvQkFBUUMsR0FBUixDQUFZLGdCQUFaLEVBQThCVixDQUE5QjtBQUNBO0FBQ0EsbUJBQU9BLENBQVA7QUFDSCxTQTdCd0I7OztBQStCekI7QUFDQVksZ0JBaEN5QixvQkFnQ2ZaLENBaENlLEVBZ0NaO0FBQ1RKO0FBQ0FhLG9CQUFRQyxHQUFSLENBQVksb0JBQVosRUFBa0NkLFlBQWxDO0FBQ0FXLHlCQUFhVixpQkFBYjtBQUNBLGdCQUFJRCxpQkFBaUIsQ0FBckIsRUFBd0I7QUFDcEJDLG9DQUFvQmdCLFdBQVcsWUFBVztBQUN0QyxtQ0FBS0MsV0FBTDtBQUNILGlCQUZtQixFQUVqQixHQUZpQixDQUFwQjtBQUdIO0FBQ0o7QUF6Q3dCLEtBQTdCO0FBMkNIIiwiZmlsZSI6Imh0dHBJbnRlcmNlcHRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcblxyXG5sZXQgcmVxdWVzdENvdW50ID0gMFxyXG5sZXQgY2xlYXJMb2FkaW5nVGltZXIgPSBudWxsXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW50ZXJjZXB0b3IoKSB7XHJcbiAgICAvLyDmi6bmiKpyZXF1ZXN06K+35rGCXHJcbiAgICB0aGlzLmludGVyY2VwdCgncmVxdWVzdCcsIHtcclxuICAgICAgICAvLyDlj5Hlh7ror7fmsYLml7bnmoTlm57osIPlh73mlbBcclxuICAgICAgICBjb25maWcgKHApIHtcclxuICAgICAgICAgICAgcmVxdWVzdENvdW50KytcclxuICAgICAgICAgICAgbGV0IGlzSWdub3JlTG9hZGluZyA9IChwLmhlYWRlciAmJiAhIXAuaGVhZGVyLmlnbm9yZUxvYWRpbmcpXHJcbiAgICAgICAgICAgIC8vIOW/hemhu+i/lOWbnk9CSkVDVOWPguaVsOWvueixoe+8jOWQpuWImeaXoOazleWPkemAgeivt+axguWIsOacjeWKoeerr1xyXG4gICAgICAgICAgICBpZiAocmVxdWVzdENvdW50IDw9IDEgJiYgIWlzSWdub3JlTG9hZGluZykge1xyXG4gICAgICAgICAgICAgICAgd2VweS5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGNsZWFyTG9hZGluZ1RpbWVyKVxyXG4gICAgICAgICAgICByZXR1cm4gcFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIOivt+axguaIkOWKn+WQjueahOWbnuiwg+WHveaVsFxyXG4gICAgICAgIHN1Y2Nlc3MgKHApIHtcclxuICAgICAgICAgICAgLy8g5Y+v5Lul5Zyo6L+Z6YeM5a+55pS25Yiw55qE5ZON5bqU5pWw5o2u5a+56LGh6L+b6KGM5Yqg5bel5aSE55CGXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXF1ZXN0IHN1Y2Nlc3M6ICcsIHApXHJcbiAgICAgICAgICAgIC8vIOW/hemhu+i/lOWbnuWTjeW6lOaVsOaNruWvueixoe+8jOWQpuWImeWQjue7reaXoOazleWvueWTjeW6lOaVsOaNrui/m+ihjOWkhOeQhlxyXG4gICAgICAgICAgICByZXR1cm4gcFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIOivt+axguWksei0peWQjueahOWbnuiwg+WHveaVsFxyXG4gICAgICAgIGZhaWwgKHApIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3QgZmFpbDogJywgcClcclxuICAgICAgICAgICAgLy8g5b+F6aG76L+U5Zue5ZON5bqU5pWw5o2u5a+56LGh77yM5ZCm5YiZ5ZCO57ut5peg5rOV5a+55ZON5bqU5pWw5o2u6L+b6KGM5aSE55CGXHJcbiAgICAgICAgICAgIHJldHVybiBwXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8g6K+35rGC5a6M5oiQ5pe255qE5Zue6LCD5Ye95pWwKOivt+axguaIkOWKn+aIluWksei0pemDveS8muiiq+aJp+ihjClcclxuICAgICAgICBjb21wbGV0ZSAocCkge1xyXG4gICAgICAgICAgICByZXF1ZXN0Q291bnQtLVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncmVxdWVzdCBjb21wbGV0ZTogJywgcmVxdWVzdENvdW50KVxyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoY2xlYXJMb2FkaW5nVGltZXIpXHJcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0Q291bnQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGNsZWFyTG9hZGluZ1RpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgICAgIH0sIDIwMClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICAvLyDmi6bmiKpyZXF1ZXN06K+35rGCXHJcbiAgICB0aGlzLmludGVyY2VwdCgndXBsb2FkRmlsZScsIHtcclxuICAgICAgICAvLyDlj5Hlh7ror7fmsYLml7bnmoTlm57osIPlh73mlbBcclxuICAgICAgICBjb25maWcgKHApIHtcclxuICAgICAgICAgICAgcmVxdWVzdENvdW50KytcclxuICAgICAgICAgICAgbGV0IGlzSWdub3JlTG9hZGluZyA9IChwLmhlYWRlciAmJiAhIXAuaGVhZGVyLmlnbm9yZUxvYWRpbmcpXHJcbiAgICAgICAgICAgIC8vIOW/hemhu+i/lOWbnk9CSkVDVOWPguaVsOWvueixoe+8jOWQpuWImeaXoOazleWPkemAgeivt+axguWIsOacjeWKoeerr1xyXG4gICAgICAgICAgICBpZiAocmVxdWVzdENvdW50IDw9IDEgJiYgIWlzSWdub3JlTG9hZGluZykge1xyXG4gICAgICAgICAgICAgICAgd2VweS5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGNsZWFyTG9hZGluZ1RpbWVyKVxyXG4gICAgICAgICAgICByZXR1cm4gcFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIOivt+axguaIkOWKn+WQjueahOWbnuiwg+WHveaVsFxyXG4gICAgICAgIHN1Y2Nlc3MgKHApIHtcclxuICAgICAgICAgICAgLy8g5Y+v5Lul5Zyo6L+Z6YeM5a+55pS25Yiw55qE5ZON5bqU5pWw5o2u5a+56LGh6L+b6KGM5Yqg5bel5aSE55CGXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXF1ZXN0IHN1Y2Nlc3M6ICcsIHApXHJcbiAgICAgICAgICAgIC8vIOW/hemhu+i/lOWbnuWTjeW6lOaVsOaNruWvueixoe+8jOWQpuWImeWQjue7reaXoOazleWvueWTjeW6lOaVsOaNrui/m+ihjOWkhOeQhlxyXG4gICAgICAgICAgICByZXR1cm4gcFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIOivt+axguWksei0peWQjueahOWbnuiwg+WHveaVsFxyXG4gICAgICAgIGZhaWwgKHApIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3QgZmFpbDogJywgcClcclxuICAgICAgICAgICAgLy8g5b+F6aG76L+U5Zue5ZON5bqU5pWw5o2u5a+56LGh77yM5ZCm5YiZ5ZCO57ut5peg5rOV5a+55ZON5bqU5pWw5o2u6L+b6KGM5aSE55CGXHJcbiAgICAgICAgICAgIHJldHVybiBwXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8g6K+35rGC5a6M5oiQ5pe255qE5Zue6LCD5Ye95pWwKOivt+axguaIkOWKn+aIluWksei0pemDveS8muiiq+aJp+ihjClcclxuICAgICAgICBjb21wbGV0ZSAocCkge1xyXG4gICAgICAgICAgICByZXF1ZXN0Q291bnQtLVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncmVxdWVzdCBjb21wbGV0ZTogJywgcmVxdWVzdENvdW50KVxyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoY2xlYXJMb2FkaW5nVGltZXIpXHJcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0Q291bnQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGNsZWFyTG9hZGluZ1RpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgICAgIH0sIDIwMClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuIl19