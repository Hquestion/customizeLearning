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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZ2lzdGVyLmpzIl0sIm5hbWVzIjpbIkhvbWUiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiZGF0YSIsIm9wZW5pZCIsInVzZXJJbmZvIiwibmFtZSIsImlkQ2FyZCIsIm1ldGhvZHMiLCJpZENhcmRJbnB1dCIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsInVzZXJOYW1lSW5wdXQiLCJkb1JlZ2lzdGVyIiwicGFyYW0iLCJTRlpIIiwiWE0iLCJuaWNrTmFtZSIsImF2YXRhclVybCIsImdlbmRlciIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwicmVzIiwiJHBhcmVudCIsInNldEdsb2JhbERhdGEiLCJzd2l0Y2hUYWIiLCJ1cmwiLCJzaG93VG9hc3QiLCJ0aXRsZSIsIm9wdGlvbiIsImdldFVzZXJJbmZvIiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0k7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztzTEFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUlWQyxPLEdBQVUsRSxRQUNqQkMsTSxHQUFTLEVBQUMsZUFBYyxFQUFDLFFBQU8sS0FBUixFQUFjLFNBQVEsT0FBdEIsRUFBOEIsUUFBTyxNQUFyQyxFQUE0QyxjQUFhLEVBQXpELEVBQWYsRSxRQUNUQyxPLEdBQVUsRUFBQyxlQUFjLEVBQUMsWUFBVyxZQUFaLEVBQWYsRSxRQUNUQyxVLEdBQWE7QUFDRjtBQURFLFMsUUFJTkMsSSxHQUFPO0FBQ0hDLG9CQUFRLElBREw7QUFFSEMsc0JBQVUsSUFGUDtBQUdIQyxrQkFBTSxFQUhIO0FBSUhDLG9CQUFRO0FBSkwsUyxRQU9QQyxPLEdBQVU7QUFDTkMsdUJBRE0sdUJBQ01DLENBRE4sRUFDUztBQUNYLHFCQUFLSCxNQUFMLEdBQWNHLEVBQUVDLE1BQUYsQ0FBU0MsS0FBdkI7QUFDSCxhQUhLO0FBSU5DLHlCQUpNLHlCQUlRSCxDQUpSLEVBSVc7QUFDYixxQkFBS0osSUFBTCxHQUFZSSxFQUFFQyxNQUFGLENBQVNDLEtBQXJCO0FBQ0gsYUFOSztBQU9ORSxzQkFQTSx3QkFPTztBQUFBOztBQUNULG9CQUFJQyxRQUFRO0FBQ1JYLDRCQUFRLEtBQUtBLE1BREw7QUFFUlksMEJBQU0sS0FBS1QsTUFGSDtBQUdSVSx3QkFBSSxLQUFLWCxJQUhEO0FBSVJZLDhCQUFVLEtBQUtiLFFBQUwsSUFBaUIsS0FBS0EsUUFBTCxDQUFjYSxRQUpqQztBQUtSQywrQkFBVyxLQUFLZCxRQUFMLElBQWlCLEtBQUtBLFFBQUwsQ0FBY2MsU0FMbEM7QUFNUkMsNEJBQVEsS0FBS2YsUUFBTCxJQUFpQixLQUFLQSxRQUFMLENBQWNlO0FBTi9CLGlCQUFaO0FBUUEsdUNBQWFMLEtBQWIsRUFBb0JNLElBQXBCLENBQXlCLGVBQU87QUFDNUJDLDRCQUFRQyxHQUFSLENBQVlDLEdBQVo7QUFDQSwyQkFBS0MsT0FBTCxDQUFhQyxhQUFiLENBQTJCLFVBQTNCLEVBQXVDRixHQUF2QztBQUNBLG1DQUFLRyxTQUFMLENBQWU7QUFDWEMsNkJBQUs7QUFETSxxQkFBZjtBQUdILGlCQU5ELEVBTUcsZUFBTztBQUNOLG1DQUFLQyxTQUFMLENBQWU7QUFDWEMsK0JBQU87QUFESSxxQkFBZjtBQUdILGlCQVZEO0FBV0g7QUEzQkssUzs7Ozs7K0JBOEJILENBRU47OzsrQkFFTUMsTSxFQUFRO0FBQUE7O0FBQ1gsaUJBQUszQixNQUFMLEdBQWMyQixPQUFPM0IsTUFBckI7QUFDQSxpQkFBS3FCLE9BQUwsQ0FBYU8sV0FBYixHQUEyQlgsSUFBM0IsQ0FBZ0MsZUFBTztBQUNuQyx1QkFBS2hCLFFBQUwsR0FBZ0JtQixHQUFoQjtBQUNBLHVCQUFLUyxNQUFMO0FBQ0gsYUFIRDtBQUlIOzs7O0VBM0Q2QixlQUFLQyxJOztrQkFBbEJ0QyxJIiwiZmlsZSI6InJlZ2lzdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gICAgaW1wb3J0IHJpY2hCdXR0b24gZnJvbSAnLi4vY29tcG9uZW50cy9yaWNoLWJ1dHRvbidcclxuXHJcbiAgICBpbXBvcnQge3VzZXJSZWdpc3Rlcn0gZnJvbSAnLi4vYXBpJ1xyXG5cclxuICAgIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgICAgIGNvbmZpZyA9IHtcclxuICAgICAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+S4quaAp+WMluWtpuS5oOS4reW/gydcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJyaWNoLWJ1dHRvblwiOntcInNpemVcIjpcImJpZ1wiLFwidGhlbWVcIjpcImdyZWVuXCIsXCJ0ZXh0XCI6XCLnq4vljbPnu5HlrppcIixcInhtbG5zOnYtb25cIjpcIlwifX07XHJcbiRldmVudHMgPSB7XCJyaWNoLWJ1dHRvblwiOntcInYtb246dGFwXCI6XCJkb1JlZ2lzdGVyXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgICAgICAgICdyaWNoLWJ1dHRvbic6IHJpY2hCdXR0b25cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRhdGEgPSB7XHJcbiAgICAgICAgICAgIG9wZW5pZDogbnVsbCxcclxuICAgICAgICAgICAgdXNlckluZm86IG51bGwsXHJcbiAgICAgICAgICAgIG5hbWU6ICcnLFxyXG4gICAgICAgICAgICBpZENhcmQ6ICcnXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtZXRob2RzID0ge1xyXG4gICAgICAgICAgICBpZENhcmRJbnB1dChlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlkQ2FyZCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVzZXJOYW1lSW5wdXQoZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZG9SZWdpc3RlcigpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwYXJhbSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuaWQ6IHRoaXMub3BlbmlkLFxyXG4gICAgICAgICAgICAgICAgICAgIFNGWkg6IHRoaXMuaWRDYXJkLFxyXG4gICAgICAgICAgICAgICAgICAgIFhNOiB0aGlzLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbmlja05hbWU6IHRoaXMudXNlckluZm8gJiYgdGhpcy51c2VySW5mby5uaWNrTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBhdmF0YXJVcmw6IHRoaXMudXNlckluZm8gJiYgdGhpcy51c2VySW5mby5hdmF0YXJVcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgZ2VuZGVyOiB0aGlzLnVzZXJJbmZvICYmIHRoaXMudXNlckluZm8uZ2VuZGVyXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB1c2VyUmVnaXN0ZXIocGFyYW0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnNldEdsb2JhbERhdGEoJ3VzZXJJbmZvJywgcmVzKVxyXG4gICAgICAgICAgICAgICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnL3BhZ2VzL2luZGV4J1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9LCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfnu5HlrprlpLHotKUnXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25Mb2FkKG9wdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLm9wZW5pZCA9IG9wdGlvbi5vcGVuaWRcclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50LmdldFVzZXJJbmZvKCkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VySW5mbyA9IHJlc1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuIl19