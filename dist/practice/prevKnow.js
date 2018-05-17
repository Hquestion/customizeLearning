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
            navigationBarTitleText: '早知道',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZLbm93LmpzIl0sIm5hbWVzIjpbIlByYWN0aWNlIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJkYXRhIiwidXNlckluZm8iLCJzZWxmIiwiJHBhcmVudCIsImdldFVzZXJJbmZvIiwicmVzIiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0k7Ozs7Ozs7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7Ozs7Ozs7OExBQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCLEtBRG5CO0FBRUxDLDBDQUE4QjtBQUZ6QixTLFFBS1RDLEksR0FBTztBQUNIQyxzQkFBVTtBQURQLFM7Ozs7O2lDQUlFO0FBQ0wsZ0JBQUlDLE9BQU8sSUFBWDtBQUNBLGlCQUFLQyxPQUFMLENBQWFDLFdBQWIsQ0FBeUIsVUFBU0MsR0FBVCxFQUFjO0FBQ25DSCxxQkFBS0QsUUFBTCxHQUFnQkksR0FBaEI7QUFDQUgscUJBQUtJLE1BQUw7QUFDSCxhQUhEO0FBSUg7Ozs7RUFoQmlDLGVBQUtDLEk7O2tCQUF0QlgsUSIsImZpbGUiOiJwcmV2S25vdy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgICBleHBvcnQgZGVmYXVsdCBjbGFzcyBQcmFjdGljZSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgICAgIGNvbmZpZyA9IHtcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfml6nnn6XpgZMnLFxuICAgICAgICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyMwYjknXG4gICAgICAgIH1cblxuICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgdXNlckluZm86IG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIG9uTG9hZCgpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgdGhpcy4kcGFyZW50LmdldFVzZXJJbmZvKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgIHNlbGYudXNlckluZm8gPSByZXNcbiAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuIl19