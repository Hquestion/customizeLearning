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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJpY2gtYnV0dG9uLmpzIl0sIm5hbWVzIjpbIkNvdW50ZXIiLCJwcm9wcyIsInRleHQiLCJzaXplIiwidHlwZSIsIlN0cmluZyIsImRlZmF1bHQiLCJpY29uU3JjIiwidGhlbWUiLCJ3aWR0aCIsImRhdGEiLCJldmVudHMiLCJ3YXRjaCIsIm1ldGhvZHMiLCJvblRhcCIsImUiLCIkZW1pdCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNJOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7OzRMQUNqQkMsSyxHQUFRO0FBQ0pDLGtCQUFNLEVBREY7QUFFSkMsa0JBQU07QUFDRkMsc0JBQU1DLE1BREo7QUFFRkMseUJBQVMsS0FGUCxDQUVpQjtBQUZqQixhQUZGO0FBTUpDLHFCQUFTLEVBTkw7QUFPSkMsbUJBQU87QUFDSEYseUJBQVMsT0FETixDQUNpQjtBQURqQixhQVBIO0FBVUpHLG1CQUFPO0FBVkgsUyxRQWFSQyxJLEdBQU8sRSxRQUNQQyxNLEdBQVMsRSxRQUlUQyxLLEdBQVEsRSxRQUlSQyxPLEdBQVU7QUFDTkMsaUJBRE0saUJBQ0FDLENBREEsRUFDRztBQUNMLHFCQUFLQyxLQUFMLENBQVcsS0FBWCxFQUFrQkQsQ0FBbEI7QUFDSDtBQUhLLFM7Ozs7RUF2QnVCLGVBQUtFLFM7O2tCQUFyQmpCLE8iLCJmaWxlIjoicmljaC1idXR0b24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICAgIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcblxyXG4gICAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ291bnRlciBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICAgICAgICBwcm9wcyA9IHtcclxuICAgICAgICAgICAgdGV4dDoge30sXHJcbiAgICAgICAgICAgIHNpemU6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6ICdiaWcnICAgICAvLyBzbWFsbCAgIG1pZGRsZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpY29uU3JjOiB7fSxcclxuICAgICAgICAgICAgdGhlbWU6IHtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6ICdncmVlbicgICAgLy8gYmx1ZSAgcGlua1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB3aWR0aDoge31cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRhdGEgPSB7fVxyXG4gICAgICAgIGV2ZW50cyA9IHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3YXRjaCA9IHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtZXRob2RzID0ge1xyXG4gICAgICAgICAgICBvblRhcChlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCd0YXAnLCBlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4iXX0=