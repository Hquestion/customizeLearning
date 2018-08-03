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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBJbnRlcmNlcHRvci5qcyJdLCJuYW1lcyI6WyJpbnRlcmNlcHRvciIsInJlcXVlc3RDb3VudCIsImNsZWFyTG9hZGluZ1RpbWVyIiwiaW50ZXJjZXB0IiwiY29uZmlnIiwicCIsImlzSWdub3JlTG9hZGluZyIsImhlYWRlciIsImlnbm9yZUxvYWRpbmciLCJ3ZXB5Iiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsIm1hc2siLCJjbGVhclRpbWVvdXQiLCJzdWNjZXNzIiwiY29uc29sZSIsImxvZyIsImZhaWwiLCJjb21wbGV0ZSIsInNldFRpbWVvdXQiLCJoaWRlTG9hZGluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7UUFLZ0JBLFcsR0FBQUEsVzs7QUFMaEI7Ozs7OztBQUVBLElBQUlDLGVBQWUsQ0FBbkI7QUFDQSxJQUFJQyxvQkFBb0IsSUFBeEI7O0FBRU8sU0FBU0YsV0FBVCxHQUF1QjtBQUMxQjtBQUNBLFNBQUtHLFNBQUwsQ0FBZSxTQUFmLEVBQTBCO0FBQ3RCO0FBQ0FDLGNBRnNCLGtCQUVkQyxDQUZjLEVBRVg7QUFDUEo7QUFDQSxnQkFBSUssa0JBQW1CRCxFQUFFRSxNQUFGLElBQVksQ0FBQyxDQUFDRixFQUFFRSxNQUFGLENBQVNDLGFBQTlDO0FBQ0E7QUFDQSxnQkFBSVAsZ0JBQWdCLENBQWhCLElBQXFCLENBQUNLLGVBQTFCLEVBQTJDO0FBQ3ZDRywrQkFBS0MsV0FBTCxDQUFpQjtBQUNiQywyQkFBTyxLQURNO0FBRWJDLDBCQUFNO0FBRk8saUJBQWpCO0FBSUg7QUFDREMseUJBQWFYLGlCQUFiO0FBQ0EsbUJBQU9HLENBQVA7QUFDSCxTQWRxQjs7O0FBZ0J0QjtBQUNBUyxlQWpCc0IsbUJBaUJiVCxDQWpCYSxFQWlCVjtBQUNSO0FBQ0FVLG9CQUFRQyxHQUFSLENBQVksbUJBQVosRUFBaUNYLENBQWpDO0FBQ0E7QUFDQSxtQkFBT0EsQ0FBUDtBQUNILFNBdEJxQjs7O0FBd0J0QjtBQUNBWSxZQXpCc0IsZ0JBeUJoQlosQ0F6QmdCLEVBeUJiO0FBQ0xVLG9CQUFRQyxHQUFSLENBQVksZ0JBQVosRUFBOEJYLENBQTlCO0FBQ0E7QUFDQSxtQkFBT0EsQ0FBUDtBQUNILFNBN0JxQjs7O0FBK0J0QjtBQUNBYSxnQkFoQ3NCLG9CQWdDWmIsQ0FoQ1ksRUFnQ1Q7QUFDVEo7QUFDQWMsb0JBQVFDLEdBQVIsQ0FBWSxvQkFBWixFQUFrQ2YsWUFBbEM7QUFDQVkseUJBQWFYLGlCQUFiO0FBQ0EsZ0JBQUlELGlCQUFpQixDQUFyQixFQUF3QjtBQUNwQkMsb0NBQW9CaUIsV0FBVyxZQUFXO0FBQ3RDVixtQ0FBS1csV0FBTDtBQUNILGlCQUZtQixFQUVqQixHQUZpQixDQUFwQjtBQUdIO0FBQ0o7QUF6Q3FCLEtBQTFCO0FBMkNBO0FBQ0EsU0FBS2pCLFNBQUwsQ0FBZSxZQUFmLEVBQTZCO0FBQ3pCO0FBQ0FDLGNBRnlCLGtCQUVqQkMsQ0FGaUIsRUFFZDtBQUNQSjtBQUNBLGdCQUFJSyxrQkFBbUJELEVBQUVFLE1BQUYsSUFBWSxDQUFDLENBQUNGLEVBQUVFLE1BQUYsQ0FBU0MsYUFBOUM7QUFDQTtBQUNBLGdCQUFJUCxnQkFBZ0IsQ0FBaEIsSUFBcUIsQ0FBQ0ssZUFBMUIsRUFBMkM7QUFDdkNHLCtCQUFLQyxXQUFMLENBQWlCO0FBQ2JDLDJCQUFPLEtBRE07QUFFYkMsMEJBQU07QUFGTyxpQkFBakI7QUFJSDtBQUNEQyx5QkFBYVgsaUJBQWI7QUFDQSxtQkFBT0csQ0FBUDtBQUNILFNBZHdCOzs7QUFnQnpCO0FBQ0FTLGVBakJ5QixtQkFpQmhCVCxDQWpCZ0IsRUFpQmI7QUFDUjtBQUNBVSxvQkFBUUMsR0FBUixDQUFZLG1CQUFaLEVBQWlDWCxDQUFqQztBQUNBO0FBQ0EsbUJBQU9BLENBQVA7QUFDSCxTQXRCd0I7OztBQXdCekI7QUFDQVksWUF6QnlCLGdCQXlCbkJaLENBekJtQixFQXlCaEI7QUFDTFUsb0JBQVFDLEdBQVIsQ0FBWSxnQkFBWixFQUE4QlgsQ0FBOUI7QUFDQTtBQUNBLG1CQUFPQSxDQUFQO0FBQ0gsU0E3QndCOzs7QUErQnpCO0FBQ0FhLGdCQWhDeUIsb0JBZ0NmYixDQWhDZSxFQWdDWjtBQUNUSjtBQUNBYyxvQkFBUUMsR0FBUixDQUFZLG9CQUFaLEVBQWtDZixZQUFsQztBQUNBWSx5QkFBYVgsaUJBQWI7QUFDQSxnQkFBSUQsaUJBQWlCLENBQXJCLEVBQXdCO0FBQ3BCQyxvQ0FBb0JpQixXQUFXLFlBQVc7QUFDdENWLG1DQUFLVyxXQUFMO0FBQ0gsaUJBRm1CLEVBRWpCLEdBRmlCLENBQXBCO0FBR0g7QUFDSjtBQXpDd0IsS0FBN0I7QUEyQ0giLCJmaWxlIjoiaHR0cEludGVyY2VwdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxubGV0IHJlcXVlc3RDb3VudCA9IDBcbmxldCBjbGVhckxvYWRpbmdUaW1lciA9IG51bGxcblxuZXhwb3J0IGZ1bmN0aW9uIGludGVyY2VwdG9yKCkge1xuICAgIC8vIOaLpuaIqnJlcXVlc3Tor7fmsYJcbiAgICB0aGlzLmludGVyY2VwdCgncmVxdWVzdCcsIHtcbiAgICAgICAgLy8g5Y+R5Ye66K+35rGC5pe255qE5Zue6LCD5Ye95pWwXG4gICAgICAgIGNvbmZpZyAocCkge1xuICAgICAgICAgICAgcmVxdWVzdENvdW50KytcbiAgICAgICAgICAgIGxldCBpc0lnbm9yZUxvYWRpbmcgPSAocC5oZWFkZXIgJiYgISFwLmhlYWRlci5pZ25vcmVMb2FkaW5nKVxuICAgICAgICAgICAgLy8g5b+F6aG76L+U5ZueT0JKRUNU5Y+C5pWw5a+56LGh77yM5ZCm5YiZ5peg5rOV5Y+R6YCB6K+35rGC5Yiw5pyN5Yqh56uvXG4gICAgICAgICAgICBpZiAocmVxdWVzdENvdW50IDw9IDEgJiYgIWlzSWdub3JlTG9hZGluZykge1xuICAgICAgICAgICAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6IHRydWVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGNsZWFyTG9hZGluZ1RpbWVyKVxuICAgICAgICAgICAgcmV0dXJuIHBcbiAgICAgICAgfSxcblxuICAgICAgICAvLyDor7fmsYLmiJDlip/lkI7nmoTlm57osIPlh73mlbBcbiAgICAgICAgc3VjY2VzcyAocCkge1xuICAgICAgICAgICAgLy8g5Y+v5Lul5Zyo6L+Z6YeM5a+55pS25Yiw55qE5ZON5bqU5pWw5o2u5a+56LGh6L+b6KGM5Yqg5bel5aSE55CGXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncmVxdWVzdCBzdWNjZXNzOiAnLCBwKVxuICAgICAgICAgICAgLy8g5b+F6aG76L+U5Zue5ZON5bqU5pWw5o2u5a+56LGh77yM5ZCm5YiZ5ZCO57ut5peg5rOV5a+55ZON5bqU5pWw5o2u6L+b6KGM5aSE55CGXG4gICAgICAgICAgICByZXR1cm4gcFxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIOivt+axguWksei0peWQjueahOWbnuiwg+WHveaVsFxuICAgICAgICBmYWlsIChwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncmVxdWVzdCBmYWlsOiAnLCBwKVxuICAgICAgICAgICAgLy8g5b+F6aG76L+U5Zue5ZON5bqU5pWw5o2u5a+56LGh77yM5ZCm5YiZ5ZCO57ut5peg5rOV5a+55ZON5bqU5pWw5o2u6L+b6KGM5aSE55CGXG4gICAgICAgICAgICByZXR1cm4gcFxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIOivt+axguWujOaIkOaXtueahOWbnuiwg+WHveaVsCjor7fmsYLmiJDlip/miJblpLHotKXpg73kvJrooqvmiafooYwpXG4gICAgICAgIGNvbXBsZXRlIChwKSB7XG4gICAgICAgICAgICByZXF1ZXN0Q291bnQtLVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3QgY29tcGxldGU6ICcsIHJlcXVlc3RDb3VudClcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChjbGVhckxvYWRpbmdUaW1lcilcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0Q291bnQgPT09IDApIHtcbiAgICAgICAgICAgICAgICBjbGVhckxvYWRpbmdUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxuICAgICAgICAgICAgICAgIH0sIDIwMClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG4gICAgLy8g5oum5oiqcmVxdWVzdOivt+axglxuICAgIHRoaXMuaW50ZXJjZXB0KCd1cGxvYWRGaWxlJywge1xuICAgICAgICAvLyDlj5Hlh7ror7fmsYLml7bnmoTlm57osIPlh73mlbBcbiAgICAgICAgY29uZmlnIChwKSB7XG4gICAgICAgICAgICByZXF1ZXN0Q291bnQrK1xuICAgICAgICAgICAgbGV0IGlzSWdub3JlTG9hZGluZyA9IChwLmhlYWRlciAmJiAhIXAuaGVhZGVyLmlnbm9yZUxvYWRpbmcpXG4gICAgICAgICAgICAvLyDlv4Xpobvov5Tlm55PQkpFQ1Tlj4LmlbDlr7nosaHvvIzlkKbliJnml6Dms5Xlj5HpgIHor7fmsYLliLDmnI3liqHnq69cbiAgICAgICAgICAgIGlmIChyZXF1ZXN0Q291bnQgPD0gMSAmJiAhaXNJZ25vcmVMb2FkaW5nKSB7XG4gICAgICAgICAgICAgICAgd2VweS5zaG93TG9hZGluZyh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcbiAgICAgICAgICAgICAgICAgICAgbWFzazogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoY2xlYXJMb2FkaW5nVGltZXIpXG4gICAgICAgICAgICByZXR1cm4gcFxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIOivt+axguaIkOWKn+WQjueahOWbnuiwg+WHveaVsFxuICAgICAgICBzdWNjZXNzIChwKSB7XG4gICAgICAgICAgICAvLyDlj6/ku6XlnKjov5nph4zlr7nmlLbliLDnmoTlk43lupTmlbDmja7lr7nosaHov5vooYzliqDlt6XlpITnkIZcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXF1ZXN0IHN1Y2Nlc3M6ICcsIHApXG4gICAgICAgICAgICAvLyDlv4Xpobvov5Tlm57lk43lupTmlbDmja7lr7nosaHvvIzlkKbliJnlkI7nu63ml6Dms5Xlr7nlk43lupTmlbDmja7ov5vooYzlpITnkIZcbiAgICAgICAgICAgIHJldHVybiBwXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8g6K+35rGC5aSx6LSl5ZCO55qE5Zue6LCD5Ye95pWwXG4gICAgICAgIGZhaWwgKHApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXF1ZXN0IGZhaWw6ICcsIHApXG4gICAgICAgICAgICAvLyDlv4Xpobvov5Tlm57lk43lupTmlbDmja7lr7nosaHvvIzlkKbliJnlkI7nu63ml6Dms5Xlr7nlk43lupTmlbDmja7ov5vooYzlpITnkIZcbiAgICAgICAgICAgIHJldHVybiBwXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8g6K+35rGC5a6M5oiQ5pe255qE5Zue6LCD5Ye95pWwKOivt+axguaIkOWKn+aIluWksei0pemDveS8muiiq+aJp+ihjClcbiAgICAgICAgY29tcGxldGUgKHApIHtcbiAgICAgICAgICAgIHJlcXVlc3RDb3VudC0tXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncmVxdWVzdCBjb21wbGV0ZTogJywgcmVxdWVzdENvdW50KVxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGNsZWFyTG9hZGluZ1RpbWVyKVxuICAgICAgICAgICAgaWYgKHJlcXVlc3RDb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNsZWFyTG9hZGluZ1RpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXG4gICAgICAgICAgICAgICAgfSwgMjAwKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcbn1cbiJdfQ==