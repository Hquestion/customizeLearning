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

var StarRemark = function (_wepy$component) {
    _inherits(StarRemark, _wepy$component);

    function StarRemark() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, StarRemark);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = StarRemark.__proto__ || Object.getPrototypeOf(StarRemark)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
            max: {
                default: 5
            },
            current: {
                default: 0
            }
        }, _this.computed = {
            dest: function dest() {
                return this.max - this.current;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return StarRemark;
}(_wepy2.default.component);

exports.default = StarRemark;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXItcmVtYXJrLmpzIl0sIm5hbWVzIjpbIlN0YXJSZW1hcmsiLCJwcm9wcyIsIm1heCIsImRlZmF1bHQiLCJjdXJyZW50IiwiY29tcHV0ZWQiLCJkZXN0IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0k7Ozs7Ozs7Ozs7OztJQUVxQkEsVTs7Ozs7Ozs7Ozs7Ozs7a01BQ2pCQyxLLEdBQVE7QUFDSkMsaUJBQUs7QUFDREMseUJBQVM7QUFEUixhQUREO0FBSUpDLHFCQUFTO0FBQ0xELHlCQUFTO0FBREo7QUFKTCxTLFFBU1JFLFEsR0FBVztBQUNQQyxnQkFETyxrQkFDQTtBQUNILHVCQUFPLEtBQUtKLEdBQUwsR0FBVyxLQUFLRSxPQUF2QjtBQUNIO0FBSE0sUzs7OztFQVZ5QixlQUFLRyxTOztrQkFBeEJQLFUiLCJmaWxlIjoic3Rhci1yZW1hcmsuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICAgIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcblxyXG4gICAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhclJlbWFyayBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICAgICAgICBwcm9wcyA9IHtcclxuICAgICAgICAgICAgbWF4OiB7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiA1XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGN1cnJlbnQ6IHtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29tcHV0ZWQgPSB7XHJcbiAgICAgICAgICAgIGRlc3QoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXggLSB0aGlzLmN1cnJlbnRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuIl19