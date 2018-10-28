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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlbWFyay10cGwuanMiXSwibmFtZXMiOlsiUmVtYXJrVHBsIiwicHJvcHMiLCJyZW1hcmtJbmZvIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwic3RhciIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNJOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsUzs7Ozs7Ozs7Ozs7Ozs7Z01BQ2pCQyxLLEdBQVE7QUFDSkMsd0JBQVk7QUFEUixTLFFBSVRDLE8sR0FBVSxFQUFDLGNBQWEsRUFBQyxPQUFNLE1BQVAsRUFBYyxTQUFRLEVBQXRCLEVBQWQsRSxRQUNqQkMsTSxHQUFTLEVBQUMsUUFBTyxFQUFDLGdCQUFlLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxzQkFBbEIsRUFBeUMsUUFBTyxNQUFoRCxFQUF1RCxTQUFRLE9BQS9ELEVBQXVFLE9BQU0sS0FBN0UsRUFBaEIsRUFBb0csbUJBQWtCLEVBQUMsU0FBUSxnQkFBVCxFQUEwQixPQUFNLHNCQUFoQyxFQUF1RCxRQUFPLE1BQTlELEVBQXFFLFNBQVEsT0FBN0UsRUFBcUYsT0FBTSxLQUEzRixFQUF0SCxFQUF3Tix1QkFBc0IsRUFBQyxTQUFRLHdCQUFULEVBQWtDLE9BQU0sc0JBQXhDLEVBQStELFFBQU8sTUFBdEUsRUFBNkUsU0FBUSxPQUFyRixFQUE2RixPQUFNLEtBQW5HLEVBQTlPLEVBQVIsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDRkM7QUFERSxTOzs7O0VBUjZCLGVBQUtDLFM7O2tCQUF2QlIsUyIsImZpbGUiOiJyZW1hcmstdHBsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gICAgaW1wb3J0IHN0YXJSZW1hcmsgZnJvbSAnLi9zdGFyLXJlbWFyaydcclxuXHJcbiAgICBleHBvcnQgZGVmYXVsdCBjbGFzcyBSZW1hcmtUcGwgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgICAgICAgcHJvcHMgPSB7XHJcbiAgICAgICAgICAgIHJlbWFya0luZm86IHt9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICRyZXBlYXQgPSB7XCJyZW1hcmtJbmZvXCI6e1wiY29tXCI6XCJzdGFyXCIsXCJwcm9wc1wiOlwiXCJ9fTtcclxuJHByb3BzID0ge1wic3RhclwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwicmVtYXJrSW5mby5tb2RlbExpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6bWF4LnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5TdGFyVmFsdWVcIixcImZvclwiOlwicmVtYXJrSW5mby5tb2RlbExpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6Y3VycmVudC5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW0uc3R1U3RhclZhbHVlIHx8IDBcIixcImZvclwiOlwicmVtYXJrSW5mby5tb2RlbExpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn19fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgICAgICAgICAgc3Rhcjogc3RhclJlbWFya1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuIl19