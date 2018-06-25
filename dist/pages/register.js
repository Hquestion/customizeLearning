'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _richButton = require('./../components/rich-button.js');

var _richButton2 = _interopRequireDefault(_richButton);

var _api = require('./../api/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_wepy$page) {
    _inherits(Home, _wepy$page);

    function Home() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Home);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Home.__proto__ || Object.getPrototypeOf(Home)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '个性化学习中心'
        }, _this.$repeat = {}, _this.$props = { "rich-button": { "size": "big", "theme": "green", "text": "立即绑定", "xmlns:v-on": "" } }, _this.$events = { "rich-button": { "v-on:tap": "doRegister" } }, _this.components = {
            'rich-button': _richButton2.default
        }, _this.data = {
            openid: null,
            userInfo: null,
            name: '',
            idCard: ''
        }, _this.methods = {
            idCardInput: function idCardInput(e) {
                this.idCard = e.detail.value;
            },
            userNameInput: function userNameInput(e) {
                this.name = e.detail.value;
            },
            doRegister: function doRegister() {
                var _this2 = this;

                var param = {
                    openid: this.openid,
                    SFZH: this.idCard,
                    XM: this.name,
                    nickName: this.userInfo && this.userInfo.nickName,
                    avatarUrl: this.userInfo && this.userInfo.avatarUrl,
                    gender: this.userInfo && this.userInfo.gender
                };
                (0, _api.userRegister)(param).then(function (res) {
                    console.log(res);
                    _this2.$parent.setGlobalData('userInfo', res);
                    _wepy2.default.switchTab({
                        url: '/pages/index'
                    });
                }, function (res) {
                    _wepy2.default.showToast({
                        title: '绑定失败'
                    });
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Home, [{
        key: 'init',
        value: function init() {}
    }, {
        key: 'onLoad',
        value: function onLoad(option) {
            var _this3 = this;

            this.openid = option.openid;
            this.$parent.getUserInfo().then(function (res) {
                _this3.userInfo = res;
                _this3.$apply();
            });
        }
    }]);

    return Home;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Home , 'pages/register'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZ2lzdGVyLmpzIl0sIm5hbWVzIjpbIkhvbWUiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicmljaEJ1dHRvbiIsImRhdGEiLCJvcGVuaWQiLCJ1c2VySW5mbyIsIm5hbWUiLCJpZENhcmQiLCJtZXRob2RzIiwiaWRDYXJkSW5wdXQiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJ1c2VyTmFtZUlucHV0IiwiZG9SZWdpc3RlciIsInBhcmFtIiwiU0ZaSCIsIlhNIiwibmlja05hbWUiLCJhdmF0YXJVcmwiLCJnZW5kZXIiLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsInJlcyIsIiRwYXJlbnQiLCJzZXRHbG9iYWxEYXRhIiwid2VweSIsInN3aXRjaFRhYiIsInVybCIsInNob3dUb2FzdCIsInRpdGxlIiwib3B0aW9uIiwiZ2V0VXNlckluZm8iLCIkYXBwbHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDSTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7Ozs7O3NMQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBSVZDLE8sR0FBVSxFLFFBQ2pCQyxNLEdBQVMsRUFBQyxlQUFjLEVBQUMsUUFBTyxLQUFSLEVBQWMsU0FBUSxPQUF0QixFQUE4QixRQUFPLE1BQXJDLEVBQTRDLGNBQWEsRUFBekQsRUFBZixFLFFBQ1RDLE8sR0FBVSxFQUFDLGVBQWMsRUFBQyxZQUFXLFlBQVosRUFBZixFLFFBQ1RDLFUsR0FBYTtBQUNGLDJCQUFlQztBQURiLFMsUUFJTkMsSSxHQUFPO0FBQ0hDLG9CQUFRLElBREw7QUFFSEMsc0JBQVUsSUFGUDtBQUdIQyxrQkFBTSxFQUhIO0FBSUhDLG9CQUFRO0FBSkwsUyxRQU9QQyxPLEdBQVU7QUFDTkMsdUJBRE0sdUJBQ01DLENBRE4sRUFDUztBQUNYLHFCQUFLSCxNQUFMLEdBQWNHLEVBQUVDLE1BQUYsQ0FBU0MsS0FBdkI7QUFDSCxhQUhLO0FBSU5DLHlCQUpNLHlCQUlRSCxDQUpSLEVBSVc7QUFDYixxQkFBS0osSUFBTCxHQUFZSSxFQUFFQyxNQUFGLENBQVNDLEtBQXJCO0FBQ0gsYUFOSztBQU9ORSxzQkFQTSx3QkFPTztBQUFBOztBQUNULG9CQUFJQyxRQUFRO0FBQ1JYLDRCQUFRLEtBQUtBLE1BREw7QUFFUlksMEJBQU0sS0FBS1QsTUFGSDtBQUdSVSx3QkFBSSxLQUFLWCxJQUhEO0FBSVJZLDhCQUFVLEtBQUtiLFFBQUwsSUFBaUIsS0FBS0EsUUFBTCxDQUFjYSxRQUpqQztBQUtSQywrQkFBVyxLQUFLZCxRQUFMLElBQWlCLEtBQUtBLFFBQUwsQ0FBY2MsU0FMbEM7QUFNUkMsNEJBQVEsS0FBS2YsUUFBTCxJQUFpQixLQUFLQSxRQUFMLENBQWNlO0FBTi9CLGlCQUFaO0FBUUEsdUNBQWFMLEtBQWIsRUFBb0JNLElBQXBCLENBQXlCLGVBQU87QUFDNUJDLDRCQUFRQyxHQUFSLENBQVlDLEdBQVo7QUFDQSwyQkFBS0MsT0FBTCxDQUFhQyxhQUFiLENBQTJCLFVBQTNCLEVBQXVDRixHQUF2QztBQUNBRyxtQ0FBS0MsU0FBTCxDQUFlO0FBQ1hDLDZCQUFLO0FBRE0scUJBQWY7QUFHSCxpQkFORCxFQU1HLGVBQU87QUFDTkYsbUNBQUtHLFNBQUwsQ0FBZTtBQUNYQywrQkFBTztBQURJLHFCQUFmO0FBR0gsaUJBVkQ7QUFXSDtBQTNCSyxTOzs7OzsrQkE4QkgsQ0FFTjs7OytCQUVNQyxNLEVBQVE7QUFBQTs7QUFDWCxpQkFBSzVCLE1BQUwsR0FBYzRCLE9BQU81QixNQUFyQjtBQUNBLGlCQUFLcUIsT0FBTCxDQUFhUSxXQUFiLEdBQTJCWixJQUEzQixDQUFnQyxlQUFPO0FBQ25DLHVCQUFLaEIsUUFBTCxHQUFnQm1CLEdBQWhCO0FBQ0EsdUJBQUtVLE1BQUw7QUFDSCxhQUhEO0FBSUg7Ozs7RUEzRDZCUCxlQUFLUSxJOztrQkFBbEJ4QyxJIiwiZmlsZSI6InJlZ2lzdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgICBpbXBvcnQgcmljaEJ1dHRvbiBmcm9tICcuLi9jb21wb25lbnRzL3JpY2gtYnV0dG9uJ1xuXG4gICAgaW1wb3J0IHt1c2VyUmVnaXN0ZXJ9IGZyb20gJy4uL2FwaSdcblxuICAgIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgICAgICBjb25maWcgPSB7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Liq5oCn5YyW5a2m5Lmg5Lit5b+DJ1xuICAgICAgICB9XG5cbiAgICAgICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInJpY2gtYnV0dG9uXCI6e1wic2l6ZVwiOlwiYmlnXCIsXCJ0aGVtZVwiOlwiZ3JlZW5cIixcInRleHRcIjpcIueri+WNs+e7keWumlwiLFwieG1sbnM6di1vblwiOlwiXCJ9fTtcclxuJGV2ZW50cyA9IHtcInJpY2gtYnV0dG9uXCI6e1widi1vbjp0YXBcIjpcImRvUmVnaXN0ZXJcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgICAgICAgICdyaWNoLWJ1dHRvbic6IHJpY2hCdXR0b25cbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICBvcGVuaWQ6IG51bGwsXG4gICAgICAgICAgICB1c2VySW5mbzogbnVsbCxcbiAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgICAgaWRDYXJkOiAnJ1xuICAgICAgICB9XG5cbiAgICAgICAgbWV0aG9kcyA9IHtcbiAgICAgICAgICAgIGlkQ2FyZElucHV0KGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlkQ2FyZCA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXNlck5hbWVJbnB1dChlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkb1JlZ2lzdGVyKCkge1xuICAgICAgICAgICAgICAgIGxldCBwYXJhbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgb3BlbmlkOiB0aGlzLm9wZW5pZCxcbiAgICAgICAgICAgICAgICAgICAgU0ZaSDogdGhpcy5pZENhcmQsXG4gICAgICAgICAgICAgICAgICAgIFhNOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIG5pY2tOYW1lOiB0aGlzLnVzZXJJbmZvICYmIHRoaXMudXNlckluZm8ubmlja05hbWUsXG4gICAgICAgICAgICAgICAgICAgIGF2YXRhclVybDogdGhpcy51c2VySW5mbyAmJiB0aGlzLnVzZXJJbmZvLmF2YXRhclVybCxcbiAgICAgICAgICAgICAgICAgICAgZ2VuZGVyOiB0aGlzLnVzZXJJbmZvICYmIHRoaXMudXNlckluZm8uZ2VuZGVyXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHVzZXJSZWdpc3RlcihwYXJhbSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5zZXRHbG9iYWxEYXRhKCd1c2VySW5mbycsIHJlcylcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnL3BhZ2VzL2luZGV4J1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0sIHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn57uR5a6a5aSx6LSlJ1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpbml0KCkge1xuXG4gICAgICAgIH1cblxuICAgICAgICBvbkxvYWQob3B0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5pZCA9IG9wdGlvbi5vcGVuaWRcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nZXRVc2VySW5mbygpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJJbmZvID0gcmVzXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cbiJdfQ==