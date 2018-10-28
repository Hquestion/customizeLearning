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

var Step = function (_wepy$component) {
    _inherits(Step, _wepy$component);

    function Step() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Step);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Step.__proto__ || Object.getPrototypeOf(Step)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
            visible: {
                default: false,
                twoWay: true
            },
            closable: {
                default: true
            }
        }, _this.data = {}, _this.events = {}, _this.methods = {
            closeDialog: function closeDialog(e) {
                this.visible = false;
                this.$apply();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Step, [{
        key: 'onLoad',
        value: function onLoad() {}
    }]);

    return Step;
}(_wepy2.default.component);

exports.default = Step;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpYWxvZy5qcyJdLCJuYW1lcyI6WyJTdGVwIiwicHJvcHMiLCJ2aXNpYmxlIiwiZGVmYXVsdCIsInR3b1dheSIsImNsb3NhYmxlIiwiZGF0YSIsImV2ZW50cyIsIm1ldGhvZHMiLCJjbG9zZURpYWxvZyIsImUiLCIkYXBwbHkiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNJOzs7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7Ozs7O3NMQUNqQkMsSyxHQUFRO0FBQ0pDLHFCQUFTO0FBQ0xDLHlCQUFTLEtBREo7QUFFTEMsd0JBQVE7QUFGSCxhQURMO0FBS0pDLHNCQUFVO0FBQ05GLHlCQUFTO0FBREg7QUFMTixTLFFBVVJHLEksR0FBTyxFLFFBQ1BDLE0sR0FBUyxFLFFBSVRDLE8sR0FBVTtBQUNOQyx1QkFETSx1QkFDTUMsQ0FETixFQUNTO0FBQ1gscUJBQUtSLE9BQUwsR0FBZSxLQUFmO0FBQ0EscUJBQUtTLE1BQUw7QUFDSDtBQUpLLFM7Ozs7O2lDQU9ELENBRVI7Ozs7RUF6QjZCLGVBQUtDLFM7O2tCQUFsQlosSSIsImZpbGUiOiJkaWFsb2cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICAgIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcblxyXG4gICAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RlcCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICAgICAgICBwcm9wcyA9IHtcclxuICAgICAgICAgICAgdmlzaWJsZToge1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB0d29XYXk6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2xvc2FibGU6IHtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGF0YSA9IHt9XHJcbiAgICAgICAgZXZlbnRzID0ge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgICAgIGNsb3NlRGlhbG9nKGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uTG9hZCgpIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4iXX0=