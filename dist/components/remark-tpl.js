'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _starRemark = require('./star-remark.js');

var _starRemark2 = _interopRequireDefault(_starRemark);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RemarkTpl = function (_wepy$component) {
    _inherits(RemarkTpl, _wepy$component);

    function RemarkTpl() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, RemarkTpl);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RemarkTpl.__proto__ || Object.getPrototypeOf(RemarkTpl)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
            remarkInfo: {}
        }, _this.$repeat = { "remarkInfo": { "com": "star", "props": "" } }, _this.$props = { "star": { "xmlns:v-bind": { "value": "", "for": "remarkInfo.modelList", "item": "item", "index": "index", "key": "key" }, "v-bind:max.sync": { "value": "item.StarValue", "for": "remarkInfo.modelList", "item": "item", "index": "index", "key": "key" }, "v-bind:current.sync": { "value": "item.stuStarValue || 0", "for": "remarkInfo.modelList", "item": "item", "index": "index", "key": "key" } } }, _this.$events = {}, _this.components = {
            star: _starRemark2.default
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return RemarkTpl;
}(_wepy2.default.component);

exports.default = RemarkTpl;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlbWFyay10cGwuanMiXSwibmFtZXMiOlsiUmVtYXJrVHBsIiwicHJvcHMiLCJyZW1hcmtJbmZvIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwic3RhciIsInN0YXJSZW1hcmsiLCJ3ZXB5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0k7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxTOzs7Ozs7Ozs7Ozs7OztnTUFDakJDLEssR0FBUTtBQUNKQyx3QkFBWTtBQURSLFMsUUFJVEMsTyxHQUFVLEVBQUMsY0FBYSxFQUFDLE9BQU0sTUFBUCxFQUFjLFNBQVEsRUFBdEIsRUFBZCxFLFFBQ2pCQyxNLEdBQVMsRUFBQyxRQUFPLEVBQUMsZ0JBQWUsRUFBQyxTQUFRLEVBQVQsRUFBWSxPQUFNLHNCQUFsQixFQUF5QyxRQUFPLE1BQWhELEVBQXVELFNBQVEsT0FBL0QsRUFBdUUsT0FBTSxLQUE3RSxFQUFoQixFQUFvRyxtQkFBa0IsRUFBQyxTQUFRLGdCQUFULEVBQTBCLE9BQU0sc0JBQWhDLEVBQXVELFFBQU8sTUFBOUQsRUFBcUUsU0FBUSxPQUE3RSxFQUFxRixPQUFNLEtBQTNGLEVBQXRILEVBQXdOLHVCQUFzQixFQUFDLFNBQVEsd0JBQVQsRUFBa0MsT0FBTSxzQkFBeEMsRUFBK0QsUUFBTyxNQUF0RSxFQUE2RSxTQUFRLE9BQXJGLEVBQTZGLE9BQU0sS0FBbkcsRUFBOU8sRUFBUixFLFFBQ1RDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNGQyxrQkFBTUM7QUFESixTOzs7O0VBUjZCQyxlQUFLQyxTOztrQkFBdkJWLFMiLCJmaWxlIjoicmVtYXJrLXRwbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gICAgaW1wb3J0IHN0YXJSZW1hcmsgZnJvbSAnLi9zdGFyLXJlbWFyaydcblxuICAgIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbWFya1RwbCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICAgICAgcHJvcHMgPSB7XG4gICAgICAgICAgICByZW1hcmtJbmZvOiB7fVxuICAgICAgICB9XG5cbiAgICAgICAkcmVwZWF0ID0ge1wicmVtYXJrSW5mb1wiOntcImNvbVwiOlwic3RhclwiLFwicHJvcHNcIjpcIlwifX07XHJcbiRwcm9wcyA9IHtcInN0YXJcIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcInJlbWFya0luZm8ubW9kZWxMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOm1heC5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW0uU3RhclZhbHVlXCIsXCJmb3JcIjpcInJlbWFya0luZm8ubW9kZWxMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOmN1cnJlbnQuc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLnN0dVN0YXJWYWx1ZSB8fCAwXCIsXCJmb3JcIjpcInJlbWFya0luZm8ubW9kZWxMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9fX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICAgICAgICBzdGFyOiBzdGFyUmVtYXJrXG4gICAgICAgIH1cbiAgICB9XG4iXX0=