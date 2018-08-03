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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsInN1YlBhY2thZ2VzIiwid2luZG93IiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsInRhYkJhciIsImNvbG9yIiwic2VsZWN0ZWRDb2xvciIsImxpc3QiLCJzZWxlY3RlZEljb25QYXRoIiwiaWNvblBhdGgiLCJwYWdlUGF0aCIsInRleHQiLCJnbG9iYWxEYXRhIiwid3hVc2VySW5mbyIsInVzZXJJbmZvIiwiaXNJbml0U29ja2V0IiwidXNlIiwiaW50ZXJjZXB0b3IiLCJjYWxsIiwic2VsZiIsImdldFVzZXJJbmZvIiwidGhhdCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwid2VweSIsInN1Y2Nlc3MiLCJyZXMiLCJmYWlsIiwia2V5IiwidmFsIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDSTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7O0FBZ0VJLHdCQUFjO0FBQUE7O0FBQUE7O0FBQUEsY0E3RGRBLE1BNkRjLEdBN0RMO0FBQ0xDLG1CQUFPLENBQ0gsYUFERyxFQUVILGdCQUZHLEVBR0gsWUFIRyxFQUlILGdCQUpHLENBREY7QUFPTEMseUJBQWEsQ0FDVDtBQUNJLHdCQUFRLFVBRFo7QUFFSSx5QkFBUyxDQUNMLGVBREssRUFFTCxnQkFGSyxFQUdMLGFBSEssRUFJTCxpQkFKSyxFQUtMLHdCQUxLO0FBRmIsYUFEUyxFQVdUO0FBQ0ksd0JBQVEsUUFEWjtBQUVJLHlCQUFTLENBQ0wscUJBREssRUFFTCx3QkFGSyxFQUdMLDBCQUhLO0FBRmIsYUFYUyxDQVBSO0FBMkJMQyxvQkFBUTtBQUNKQyxxQ0FBcUIsT0FEakI7QUFFSkMsOENBQThCLFNBRjFCO0FBR0pDLHdDQUF3QixTQUhwQjtBQUlKQyx3Q0FBd0I7QUFKcEIsYUEzQkg7QUFpQ0xDLG9CQUFRO0FBQ0pDLHVCQUFPLE1BREg7QUFFSkMsK0JBQWUsU0FGWDtBQUdKQyxzQkFBTSxDQUFDO0FBQ0hDLHNDQUFrQixzQkFEZjtBQUVIQyw4QkFBVSxtQkFGUDtBQUdIQyw4QkFBVSxhQUhQO0FBSUhDLDBCQUFNO0FBSkgsaUJBQUQsRUFLSDtBQUNDSCxzQ0FBa0Isc0JBRG5CO0FBRUNDLDhCQUFVLG1CQUZYO0FBR0NDLDhCQUFVLGdCQUhYO0FBSUNDLDBCQUFNO0FBSlAsaUJBTEcsRUFVSDtBQUNDSCxzQ0FBa0Isc0JBRG5CO0FBRUNDLDhCQUFVLG1CQUZYO0FBR0NDLDhCQUFVLFlBSFg7QUFJQ0MsMEJBQU07QUFKUCxpQkFWRztBQUhGO0FBakNILFNBNkRLO0FBQUEsY0FOZEMsVUFNYyxHQU5EO0FBQ1RDLHdCQUFZLElBREg7QUFFVEMsc0JBQVUsSUFGRDtBQUdUQywwQkFBYztBQUhMLFNBTUM7O0FBRVYsY0FBS0MsR0FBTCxDQUFTLFlBQVQ7QUFDQUMscUNBQVlDLElBQVo7QUFIVTtBQUliOzs7O21DQUVVO0FBQ1AsZ0JBQUlDLE9BQU8sSUFBWDtBQUNBQSxpQkFBS0MsV0FBTDtBQUNIOzs7c0NBRWE7QUFDVixnQkFBTUMsT0FBTyxJQUFiO0FBQ0EsbUJBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNwQyxvQkFBSUgsS0FBS1QsVUFBTCxDQUFnQkMsVUFBcEIsRUFBZ0M7QUFDNUJVLDRCQUFRRixLQUFLVCxVQUFMLENBQWdCQyxVQUF4QjtBQUNILGlCQUZELE1BRU87QUFDSFksbUNBQUtMLFdBQUwsQ0FBaUI7QUFDYk0sK0JBRGEsbUJBQ0xDLEdBREssRUFDQTtBQUNUTixpQ0FBS1QsVUFBTCxDQUFnQkMsVUFBaEIsR0FBNkJjLElBQUliLFFBQWpDO0FBQ0FTLG9DQUFRSSxJQUFJYixRQUFaO0FBQ0gseUJBSlk7QUFLYmMsNEJBTGEsa0JBS047QUFDSFAsaUNBQUtULFVBQUwsQ0FBZ0JDLFVBQWhCLEdBQTZCLEVBQTdCO0FBQ0FVLG9DQUFRLEVBQVI7QUFDSDtBQVJZLHFCQUFqQjtBQVVIO0FBQ0osYUFmTSxDQUFQO0FBZ0JIOzs7c0NBRWFNLEcsRUFBS0MsRyxFQUFLO0FBQ3BCLGlCQUFLbEIsVUFBTCxDQUFnQmlCLEdBQWhCLElBQXVCQyxHQUF2QjtBQUNIOzs7c0NBRWFELEcsRUFBSztBQUNmLG1CQUFPLEtBQUtqQixVQUFMLENBQWdCaUIsR0FBaEIsQ0FBUDtBQUNIOzs7O0VBbkd3QkosZUFBS00sRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICAgIGltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcbiAgICBpbXBvcnQge2ludGVyY2VwdG9yfSBmcm9tICcuL3V0aWwvaHR0cEludGVyY2VwdG9yJ1xuXG4gICAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XG4gICAgICAgIGNvbmZpZyA9IHtcbiAgICAgICAgICAgIHBhZ2VzOiBbXG4gICAgICAgICAgICAgICAgJ3BhZ2VzL2luZGV4JyxcbiAgICAgICAgICAgICAgICAncGFnZXMvcHJhY3RpY2UnLFxuICAgICAgICAgICAgICAgICdwYWdlcy9taW5lJyxcbiAgICAgICAgICAgICAgICAncGFnZXMvcmVnaXN0ZXInXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgc3ViUGFja2FnZXM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICdyb290JzogJ3ByYWN0aWNlJyxcbiAgICAgICAgICAgICAgICAgICAgJ3BhZ2VzJzogW1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3BhZ2VzL2FycmFuZ2UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3BhZ2VzL3ByZXZLbm93JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdwYWdlcy90aGluaycsXG4gICAgICAgICAgICAgICAgICAgICAgICAncGFnZXMvcGxheVZpZGVvJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdwYWdlcy9yZXZpZXdGaW5pc2hUYXNrJ1xuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICdyb290JzogJ2NvdXJzZScsXG4gICAgICAgICAgICAgICAgICAgICdwYWdlcyc6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICdwYWdlcy9jb3Vyc2UtZGV0YWlsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdwYWdlcy9zZWxlY3RDbGFzc21hdGVzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdwYWdlcy9jcmVhdGVHcm91cFN1Y2Nlc3MnXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgd2luZG93OiB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcbiAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnIzFhYmNiMCcsXG4gICAgICAgICAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+S4quaAp+WMluWtpuS5oOS4reW/gycsXG4gICAgICAgICAgICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ3doaXRlJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRhYkJhcjoge1xuICAgICAgICAgICAgICAgIGNvbG9yOiAnIzY2NicsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDb2xvcjogJyMxYWJjYjAnLFxuICAgICAgICAgICAgICAgIGxpc3Q6IFt7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZXMvbWVudTAxLW9uLnBuZycsXG4gICAgICAgICAgICAgICAgICAgIGljb25QYXRoOiAnaW1hZ2VzL21lbnUwMS5wbmcnLFxuICAgICAgICAgICAgICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2luZGV4JyxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+WPkeeOsCdcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZXMvbWVudTAyLW9uLnBuZycsXG4gICAgICAgICAgICAgICAgICAgIGljb25QYXRoOiAnaW1hZ2VzL21lbnUwMi5wbmcnLFxuICAgICAgICAgICAgICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL3ByYWN0aWNlJyxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+W8gOWni+iQveWunidcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZXMvbWVudTAzLW9uLnBuZycsXG4gICAgICAgICAgICAgICAgICAgIGljb25QYXRoOiAnaW1hZ2VzL21lbnUwMy5wbmcnLFxuICAgICAgICAgICAgICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL21pbmUnLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn5oiR55qEJ1xuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBnbG9iYWxEYXRhID0ge1xuICAgICAgICAgICAgd3hVc2VySW5mbzogbnVsbCxcbiAgICAgICAgICAgIHVzZXJJbmZvOiBudWxsLFxuICAgICAgICAgICAgaXNJbml0U29ja2V0OiBmYWxzZVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBzdXBlcigpXG4gICAgICAgICAgICB0aGlzLnVzZSgncmVxdWVzdGZpeCcpXG4gICAgICAgICAgICBpbnRlcmNlcHRvci5jYWxsKHRoaXMpXG4gICAgICAgIH1cblxuICAgICAgICBvbkxhdW5jaCgpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgc2VsZi5nZXRVc2VySW5mbygpXG4gICAgICAgIH1cblxuICAgICAgICBnZXRVc2VySW5mbygpIHtcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGF0Lmdsb2JhbERhdGEud3hVc2VySW5mbykge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRoYXQuZ2xvYmFsRGF0YS53eFVzZXJJbmZvKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHdlcHkuZ2V0VXNlckluZm8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lmdsb2JhbERhdGEud3hVc2VySW5mbyA9IHJlcy51c2VySW5mb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzLnVzZXJJbmZvKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhaWwoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5nbG9iYWxEYXRhLnd4VXNlckluZm8gPSB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoe30pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEdsb2JhbERhdGEoa2V5LCB2YWwpIHtcbiAgICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YVtrZXldID0gdmFsXG4gICAgICAgIH1cblxuICAgICAgICBnZXRHbG9iYWxEYXRhKGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2xvYmFsRGF0YVtrZXldXG4gICAgICAgIH1cbiAgICB9XG4iXX0=