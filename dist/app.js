'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

var _httpInterceptor = require('./util/httpInterceptor.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$app) {
    _inherits(_default, _wepy$app);

    function _default() {
        _classCallCheck(this, _default);

        var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

        _this.config = {
            pages: ['pages/index', 'pages/practice', 'pages/mine', 'pages/register'],
            subPackages: [{
                'root': 'practice',
                'pages': ['pages/arrange', 'pages/prevKnow', 'pages/think', 'pages/playVideo', 'pages/reviewFinishTask']
            }, {
                'root': 'course',
                'pages': ['pages/course-detail', 'pages/selectClassmates', 'pages/createGroupSuccess']
            }],
            window: {
                backgroundTextStyle: 'light',
                navigationBarBackgroundColor: '#1abcb0',
                navigationBarTitleText: '个性化学习中心',
                navigationBarTextStyle: 'white'
            },
            tabBar: {
                color: '#666',
                selectedColor: '#1abcb0',
                list: [{
                    selectedIconPath: 'images/menu01-on.png',
                    iconPath: 'images/menu01.png',
                    pagePath: 'pages/index',
                    text: '发现'
                }, {
                    selectedIconPath: 'images/menu02-on.png',
                    iconPath: 'images/menu02.png',
                    pagePath: 'pages/practice',
                    text: '开始落实'
                }, {
                    selectedIconPath: 'images/menu03-on.png',
                    iconPath: 'images/menu03.png',
                    pagePath: 'pages/mine',
                    text: '我的'
                }]
            }
        };
        _this.globalData = {
            wxUserInfo: null,
            userInfo: null,
            isInitSocket: false
        };

        _this.use('requestfix');
        _httpInterceptor.interceptor.call(_this);
        return _this;
    }

    _createClass(_default, [{
        key: 'onLaunch',
        value: function onLaunch() {
            var self = this;
            self.getUserInfo();
        }
    }, {
        key: 'getUserInfo',
        value: function getUserInfo() {
            var that = this;
            return new Promise(function (resolve, reject) {
                if (that.globalData.wxUserInfo) {
                    resolve(that.globalData.wxUserInfo);
                } else {
                    _wepy2.default.getUserInfo({
                        success: function success(res) {
                            that.globalData.wxUserInfo = res.userInfo;
                            resolve(res.userInfo);
                        },
                        fail: function fail() {
                            that.globalData.wxUserInfo = {};
                            resolve({});
                        }
                    });
                }
            });
        }
    }, {
        key: 'setGlobalData',
        value: function setGlobalData(key, val) {
            this.globalData[key] = val;
        }
    }, {
        key: 'getGlobalData',
        value: function getGlobalData(key) {
            return this.globalData[key];
        }
    }]);

    return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsInN1YlBhY2thZ2VzIiwid2luZG93IiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsInRhYkJhciIsImNvbG9yIiwic2VsZWN0ZWRDb2xvciIsImxpc3QiLCJzZWxlY3RlZEljb25QYXRoIiwiaWNvblBhdGgiLCJwYWdlUGF0aCIsInRleHQiLCJnbG9iYWxEYXRhIiwid3hVc2VySW5mbyIsInVzZXJJbmZvIiwiaXNJbml0U29ja2V0IiwidXNlIiwiY2FsbCIsInNlbGYiLCJnZXRVc2VySW5mbyIsInRoYXQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInN1Y2Nlc3MiLCJyZXMiLCJmYWlsIiwia2V5IiwidmFsIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDSTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7O0FBZ0VJLHdCQUFjO0FBQUE7O0FBQUE7O0FBQUEsY0E3RGRBLE1BNkRjLEdBN0RMO0FBQ0xDLG1CQUFPLENBQ0gsYUFERyxFQUVILGdCQUZHLEVBR0gsWUFIRyxFQUlILGdCQUpHLENBREY7QUFPTEMseUJBQWEsQ0FDVDtBQUNJLHdCQUFRLFVBRFo7QUFFSSx5QkFBUyxDQUNMLGVBREssRUFFTCxnQkFGSyxFQUdMLGFBSEssRUFJTCxpQkFKSyxFQUtMLHdCQUxLO0FBRmIsYUFEUyxFQVdUO0FBQ0ksd0JBQVEsUUFEWjtBQUVJLHlCQUFTLENBQ0wscUJBREssRUFFTCx3QkFGSyxFQUdMLDBCQUhLO0FBRmIsYUFYUyxDQVBSO0FBMkJMQyxvQkFBUTtBQUNKQyxxQ0FBcUIsT0FEakI7QUFFSkMsOENBQThCLFNBRjFCO0FBR0pDLHdDQUF3QixTQUhwQjtBQUlKQyx3Q0FBd0I7QUFKcEIsYUEzQkg7QUFpQ0xDLG9CQUFRO0FBQ0pDLHVCQUFPLE1BREg7QUFFSkMsK0JBQWUsU0FGWDtBQUdKQyxzQkFBTSxDQUFDO0FBQ0hDLHNDQUFrQixzQkFEZjtBQUVIQyw4QkFBVSxtQkFGUDtBQUdIQyw4QkFBVSxhQUhQO0FBSUhDLDBCQUFNO0FBSkgsaUJBQUQsRUFLSDtBQUNDSCxzQ0FBa0Isc0JBRG5CO0FBRUNDLDhCQUFVLG1CQUZYO0FBR0NDLDhCQUFVLGdCQUhYO0FBSUNDLDBCQUFNO0FBSlAsaUJBTEcsRUFVSDtBQUNDSCxzQ0FBa0Isc0JBRG5CO0FBRUNDLDhCQUFVLG1CQUZYO0FBR0NDLDhCQUFVLFlBSFg7QUFJQ0MsMEJBQU07QUFKUCxpQkFWRztBQUhGO0FBakNILFNBNkRLO0FBQUEsY0FOZEMsVUFNYyxHQU5EO0FBQ1RDLHdCQUFZLElBREg7QUFFVEMsc0JBQVUsSUFGRDtBQUdUQywwQkFBYztBQUhMLFNBTUM7O0FBRVYsY0FBS0MsR0FBTCxDQUFTLFlBQVQ7QUFDQSxxQ0FBWUMsSUFBWjtBQUhVO0FBSWI7Ozs7bUNBRVU7QUFDUCxnQkFBSUMsT0FBTyxJQUFYO0FBQ0FBLGlCQUFLQyxXQUFMO0FBQ0g7OztzQ0FFYTtBQUNWLGdCQUFNQyxPQUFPLElBQWI7QUFDQSxtQkFBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3BDLG9CQUFJSCxLQUFLUixVQUFMLENBQWdCQyxVQUFwQixFQUFnQztBQUM1QlMsNEJBQVFGLEtBQUtSLFVBQUwsQ0FBZ0JDLFVBQXhCO0FBQ0gsaUJBRkQsTUFFTztBQUNILG1DQUFLTSxXQUFMLENBQWlCO0FBQ2JLLCtCQURhLG1CQUNMQyxHQURLLEVBQ0E7QUFDVEwsaUNBQUtSLFVBQUwsQ0FBZ0JDLFVBQWhCLEdBQTZCWSxJQUFJWCxRQUFqQztBQUNBUSxvQ0FBUUcsSUFBSVgsUUFBWjtBQUNILHlCQUpZO0FBS2JZLDRCQUxhLGtCQUtOO0FBQ0hOLGlDQUFLUixVQUFMLENBQWdCQyxVQUFoQixHQUE2QixFQUE3QjtBQUNBUyxvQ0FBUSxFQUFSO0FBQ0g7QUFSWSxxQkFBakI7QUFVSDtBQUNKLGFBZk0sQ0FBUDtBQWdCSDs7O3NDQUVhSyxHLEVBQUtDLEcsRUFBSztBQUNwQixpQkFBS2hCLFVBQUwsQ0FBZ0JlLEdBQWhCLElBQXVCQyxHQUF2QjtBQUNIOzs7c0NBRWFELEcsRUFBSztBQUNmLG1CQUFPLEtBQUtmLFVBQUwsQ0FBZ0JlLEdBQWhCLENBQVA7QUFDSDs7OztFQW5Hd0IsZUFBS0UsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICAgIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgICBpbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nXHJcbiAgICBpbXBvcnQge2ludGVyY2VwdG9yfSBmcm9tICcuL3V0aWwvaHR0cEludGVyY2VwdG9yJ1xyXG5cclxuICAgIGV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xyXG4gICAgICAgIGNvbmZpZyA9IHtcclxuICAgICAgICAgICAgcGFnZXM6IFtcclxuICAgICAgICAgICAgICAgICdwYWdlcy9pbmRleCcsXHJcbiAgICAgICAgICAgICAgICAncGFnZXMvcHJhY3RpY2UnLFxyXG4gICAgICAgICAgICAgICAgJ3BhZ2VzL21pbmUnLFxyXG4gICAgICAgICAgICAgICAgJ3BhZ2VzL3JlZ2lzdGVyJ1xyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBzdWJQYWNrYWdlczogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICdyb290JzogJ3ByYWN0aWNlJyxcclxuICAgICAgICAgICAgICAgICAgICAncGFnZXMnOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdwYWdlcy9hcnJhbmdlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3BhZ2VzL3ByZXZLbm93JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3BhZ2VzL3RoaW5rJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3BhZ2VzL3BsYXlWaWRlbycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdwYWdlcy9yZXZpZXdGaW5pc2hUYXNrJ1xyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3Jvb3QnOiAnY291cnNlJyxcclxuICAgICAgICAgICAgICAgICAgICAncGFnZXMnOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdwYWdlcy9jb3Vyc2UtZGV0YWlsJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3BhZ2VzL3NlbGVjdENsYXNzbWF0ZXMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAncGFnZXMvY3JlYXRlR3JvdXBTdWNjZXNzJ1xyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgd2luZG93OiB7XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnbGlnaHQnLFxyXG4gICAgICAgICAgICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyMxYWJjYjAnLFxyXG4gICAgICAgICAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+S4quaAp+WMluWtpuS5oOS4reW/gycsXHJcbiAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnd2hpdGUnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRhYkJhcjoge1xyXG4gICAgICAgICAgICAgICAgY29sb3I6ICcjNjY2JyxcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ29sb3I6ICcjMWFiY2IwJyxcclxuICAgICAgICAgICAgICAgIGxpc3Q6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlcy9tZW51MDEtb24ucG5nJyxcclxuICAgICAgICAgICAgICAgICAgICBpY29uUGF0aDogJ2ltYWdlcy9tZW51MDEucG5nJyxcclxuICAgICAgICAgICAgICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn5Y+R546wJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZXMvbWVudTAyLW9uLnBuZycsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvblBhdGg6ICdpbWFnZXMvbWVudTAyLnBuZycsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9wcmFjdGljZScsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+W8gOWni+iQveWunidcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2VzL21lbnUwMy1vbi5wbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb25QYXRoOiAnaW1hZ2VzL21lbnUwMy5wbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvbWluZScsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+aIkeeahCdcclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdsb2JhbERhdGEgPSB7XHJcbiAgICAgICAgICAgIHd4VXNlckluZm86IG51bGwsXHJcbiAgICAgICAgICAgIHVzZXJJbmZvOiBudWxsLFxyXG4gICAgICAgICAgICBpc0luaXRTb2NrZXQ6IGZhbHNlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgc3VwZXIoKVxyXG4gICAgICAgICAgICB0aGlzLnVzZSgncmVxdWVzdGZpeCcpXHJcbiAgICAgICAgICAgIGludGVyY2VwdG9yLmNhbGwodGhpcylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uTGF1bmNoKCkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgc2VsZi5nZXRVc2VySW5mbygpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRVc2VySW5mbygpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXNcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGF0Lmdsb2JhbERhdGEud3hVc2VySW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhhdC5nbG9iYWxEYXRhLnd4VXNlckluZm8pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHdlcHkuZ2V0VXNlckluZm8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5nbG9iYWxEYXRhLnd4VXNlckluZm8gPSByZXMudXNlckluZm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzLnVzZXJJbmZvKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWlsKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5nbG9iYWxEYXRhLnd4VXNlckluZm8gPSB7fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh7fSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRHbG9iYWxEYXRhKGtleSwgdmFsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YVtrZXldID0gdmFsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRHbG9iYWxEYXRhKGtleSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nbG9iYWxEYXRhW2tleV1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiJdfQ==