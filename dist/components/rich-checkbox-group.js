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

var RichCheckBoxGroup = function (_wepy$component) {
    _inherits(RichCheckBoxGroup, _wepy$component);

    function RichCheckBoxGroup() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, RichCheckBoxGroup);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RichCheckBoxGroup.__proto__ || Object.getPrototypeOf(RichCheckBoxGroup)).call.apply(_ref, [this].concat(args))), _this), _this.props = {}, _this.components = {}, _this.data = {}, _this.events = {}, _this.watch = {}, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(RichCheckBoxGroup, [{
        key: 'onLoad',
        value: function onLoad() {
            var _this2 = this;

            this.$nextTick(function () {
                console.log(_this2.$slots);
            });
        }
    }]);

    return RichCheckBoxGroup;
}(_wepy2.default.component);

exports.default = RichCheckBoxGroup;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJpY2gtY2hlY2tib3gtZ3JvdXAuanMiXSwibmFtZXMiOlsiUmljaENoZWNrQm94R3JvdXAiLCJwcm9wcyIsImNvbXBvbmVudHMiLCJkYXRhIiwiZXZlbnRzIiwid2F0Y2giLCJtZXRob2RzIiwiJG5leHRUaWNrIiwiY29uc29sZSIsImxvZyIsIiRzbG90cyIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0k7Ozs7Ozs7Ozs7OztJQUVxQkEsaUI7Ozs7Ozs7Ozs7Ozs7O2dOQUNqQkMsSyxHQUFRLEUsUUFJUkMsVSxHQUFhLEUsUUFJYkMsSSxHQUFPLEUsUUFDUEMsTSxHQUFTLEUsUUFJVEMsSyxHQUFRLEUsUUFJUkMsTyxHQUFVLEU7Ozs7O2lDQUlEO0FBQUE7O0FBQ0wsaUJBQUtDLFNBQUwsQ0FBZSxZQUFNO0FBQ2pCQyx3QkFBUUMsR0FBUixDQUFZLE9BQUtDLE1BQWpCO0FBQ0gsYUFGRDtBQUdIOzs7O0VBMUIwQyxlQUFLQyxTOztrQkFBL0JYLGlCIiwiZmlsZSI6InJpY2gtY2hlY2tib3gtZ3JvdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gICAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmljaENoZWNrQm94R3JvdXAgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gICAgICAgIHByb3BzID0ge1xuXG4gICAgICAgIH1cblxuICAgICAgICBjb21wb25lbnRzID0ge1xuXG4gICAgICAgIH1cblxuICAgICAgICBkYXRhID0ge31cbiAgICAgICAgZXZlbnRzID0ge1xuXG4gICAgICAgIH1cblxuICAgICAgICB3YXRjaCA9IHtcblxuICAgICAgICB9XG5cbiAgICAgICAgbWV0aG9kcyA9IHtcblxuICAgICAgICB9XG5cbiAgICAgICAgb25Mb2FkKCkge1xuICAgICAgICAgICAgdGhpcy4kbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuJHNsb3RzKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cbiJdfQ==