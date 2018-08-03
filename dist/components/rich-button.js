'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Counter = function (_wepy$component) {
    _inherits(Counter, _wepy$component);

    function Counter() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Counter);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Counter.__proto__ || Object.getPrototypeOf(Counter)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
            text: {},
            size: {
                type: String,
                default: 'big' // small   middle
            },
            iconSrc: {},
            theme: {
                default: 'green' // blue  pink
            },
            width: {}
        }, _this.data = {}, _this.events = {}, _this.watch = {}, _this.methods = {
            onTap: function onTap(e) {
                this.$emit('tap', e);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return Counter;
}(_wepy2.default.component);

exports.default = Counter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJpY2gtYnV0dG9uLmpzIl0sIm5hbWVzIjpbIkNvdW50ZXIiLCJwcm9wcyIsInRleHQiLCJzaXplIiwidHlwZSIsIlN0cmluZyIsImRlZmF1bHQiLCJpY29uU3JjIiwidGhlbWUiLCJ3aWR0aCIsImRhdGEiLCJldmVudHMiLCJ3YXRjaCIsIm1ldGhvZHMiLCJvblRhcCIsImUiLCIkZW1pdCIsIndlcHkiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDSTs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7Ozs0TEFDakJDLEssR0FBUTtBQUNKQyxrQkFBTSxFQURGO0FBRUpDLGtCQUFNO0FBQ0ZDLHNCQUFNQyxNQURKO0FBRUZDLHlCQUFTLEtBRlAsQ0FFaUI7QUFGakIsYUFGRjtBQU1KQyxxQkFBUyxFQU5MO0FBT0pDLG1CQUFPO0FBQ0hGLHlCQUFTLE9BRE4sQ0FDaUI7QUFEakIsYUFQSDtBQVVKRyxtQkFBTztBQVZILFMsUUFhUkMsSSxHQUFPLEUsUUFDUEMsTSxHQUFTLEUsUUFJVEMsSyxHQUFRLEUsUUFJUkMsTyxHQUFVO0FBQ05DLGlCQURNLGlCQUNBQyxDQURBLEVBQ0c7QUFDTCxxQkFBS0MsS0FBTCxDQUFXLEtBQVgsRUFBa0JELENBQWxCO0FBQ0g7QUFISyxTOzs7O0VBdkJ1QkUsZUFBS0MsUzs7a0JBQXJCbEIsTyIsImZpbGUiOiJyaWNoLWJ1dHRvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgICBleHBvcnQgZGVmYXVsdCBjbGFzcyBDb3VudGVyIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICAgICAgICBwcm9wcyA9IHtcbiAgICAgICAgICAgIHRleHQ6IHt9LFxuICAgICAgICAgICAgc2l6ZToge1xuICAgICAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiAnYmlnJyAgICAgLy8gc21hbGwgICBtaWRkbGVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpY29uU3JjOiB7fSxcbiAgICAgICAgICAgIHRoZW1lOiB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDogJ2dyZWVuJyAgICAvLyBibHVlICBwaW5rXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgd2lkdGg6IHt9XG4gICAgICAgIH1cblxuICAgICAgICBkYXRhID0ge31cbiAgICAgICAgZXZlbnRzID0ge1xuXG4gICAgICAgIH1cblxuICAgICAgICB3YXRjaCA9IHtcblxuICAgICAgICB9XG5cbiAgICAgICAgbWV0aG9kcyA9IHtcbiAgICAgICAgICAgIG9uVGFwKGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCd0YXAnLCBlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuIl19