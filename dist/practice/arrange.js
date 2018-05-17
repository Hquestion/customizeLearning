'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Practice = function (_wepy$page) {
    _inherits(Practice, _wepy$page);

    function Practice() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Practice);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Practice.__proto__ || Object.getPrototypeOf(Practice)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '会安排',
            navigationBarBackgroundColor: '#0b9'
        }, _this.data = {
            userInfo: null
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Practice, [{
        key: 'onLoad',
        value: function onLoad() {
            var self = this;
            this.$parent.getUserInfo(function (res) {
                self.userInfo = res;
                self.$apply();
            });
        }
    }]);

    return Practice;
}(_wepy2.default.page);

exports.default = Practice;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFycmFuZ2UuanMiXSwibmFtZXMiOlsiUHJhY3RpY2UiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsImRhdGEiLCJ1c2VySW5mbyIsInNlbGYiLCIkcGFyZW50IiwiZ2V0VXNlckluZm8iLCJyZXMiLCIkYXBwbHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDSTs7Ozs7Ozs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7Ozs7Ozs4TEFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0IsS0FEbkI7QUFFTEMsMENBQThCO0FBRnpCLFMsUUFLVEMsSSxHQUFPO0FBQ0hDLHNCQUFVO0FBRFAsUzs7Ozs7aUNBSUU7QUFDTCxnQkFBSUMsT0FBTyxJQUFYO0FBQ0EsaUJBQUtDLE9BQUwsQ0FBYUMsV0FBYixDQUF5QixVQUFTQyxHQUFULEVBQWM7QUFDbkNILHFCQUFLRCxRQUFMLEdBQWdCSSxHQUFoQjtBQUNBSCxxQkFBS0ksTUFBTDtBQUNILGFBSEQ7QUFJSDs7OztFQWhCaUMsZUFBS0MsSTs7a0JBQXRCWCxRIiwiZmlsZSI6ImFycmFuZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gICAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJhY3RpY2UgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgICAgICBjb25maWcgPSB7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Lya5a6J5o6SJyxcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjMGI5J1xuICAgICAgICB9XG5cbiAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgIHVzZXJJbmZvOiBudWxsXG4gICAgICAgIH1cblxuICAgICAgICBvbkxvYWQoKSB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nZXRVc2VySW5mbyhmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnVzZXJJbmZvID0gcmVzXG4gICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cbiJdfQ==