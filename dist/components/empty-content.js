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

var EmptyContent = function (_wepy$component) {
    _inherits(EmptyContent, _wepy$component);

    function EmptyContent() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, EmptyContent);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EmptyContent.__proto__ || Object.getPrototypeOf(EmptyContent)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
            text: {
                default: '暂无数据'
            }
        }, _this.components = {}, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(EmptyContent, [{
        key: 'onLoad',
        value: function onLoad() {}
    }]);

    return EmptyContent;
}(_wepy2.default.component);

exports.default = EmptyContent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVtcHR5LWNvbnRlbnQuanMiXSwibmFtZXMiOlsiRW1wdHlDb250ZW50IiwicHJvcHMiLCJ0ZXh0IiwiZGVmYXVsdCIsImNvbXBvbmVudHMiLCJtZXRob2RzIiwid2VweSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0k7Ozs7Ozs7Ozs7OztJQUVxQkEsWTs7Ozs7Ozs7Ozs7Ozs7c01BQ2pCQyxLLEdBQVE7QUFDSkMsa0JBQU07QUFDRkMseUJBQVM7QUFEUDtBQURGLFMsUUFNUkMsVSxHQUFhLEUsUUFHYkMsTyxHQUFVLEU7Ozs7O2lDQUlELENBRVI7Ozs7RUFoQnFDQyxlQUFLQyxTOztrQkFBMUJQLFkiLCJmaWxlIjoiZW1wdHktY29udGVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgICBleHBvcnQgZGVmYXVsdCBjbGFzcyBFbXB0eUNvbnRlbnQgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gICAgICAgIHByb3BzID0ge1xuICAgICAgICAgICAgdGV4dDoge1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6ICfmmoLml6DmlbDmja4nXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb21wb25lbnRzID0ge1xuXG4gICAgICAgIH1cbiAgICAgICAgbWV0aG9kcyA9IHtcblxuICAgICAgICB9XG5cbiAgICAgICAgb25Mb2FkKCkge1xuXG4gICAgICAgIH1cbiAgICB9XG4iXX0=