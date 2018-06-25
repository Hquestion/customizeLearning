'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _remarkTpl = require('./remark-tpl.js');

var _remarkTpl2 = _interopRequireDefault(_remarkTpl);

var _panel = require('./panel.js');

var _panel2 = _interopRequireDefault(_panel);

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
            groupMember: {}
        }, _this.$repeat = { "groupMember": { "com": "remark-tpl", "props": "remarkInfo.sync" } }, _this.$props = { "remark-tpl": { "xmlns:v-bind": { "value": "", "for": "groupMember.modelList", "item": "item", "index": "index", "key": "key" }, "v-bind:remarkInfo.sync": { "value": "item", "type": "item", "for": "groupMember.modelList", "item": "item", "index": "index", "key": "key" } }, "panel": { "class": "remark-panel" } }, _this.$events = {}, _this.components = {
            'remark-tpl': _remarkTpl2.default,
            panel: _panel2.default
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return RemarkTpl;
}(_wepy2.default.component);

exports.default = RemarkTpl;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlbWFyay1yZWNvcmQuanMiXSwibmFtZXMiOlsiUmVtYXJrVHBsIiwicHJvcHMiLCJncm91cE1lbWJlciIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInJlbWFya1RwbCIsInBhbmVsIiwid2VweSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNJOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxTOzs7Ozs7Ozs7Ozs7OztnTUFDakJDLEssR0FBUTtBQUNKQyx5QkFBYTtBQURULFMsUUFJVEMsTyxHQUFVLEVBQUMsZUFBYyxFQUFDLE9BQU0sWUFBUCxFQUFvQixTQUFRLGlCQUE1QixFQUFmLEUsUUFDakJDLE0sR0FBUyxFQUFDLGNBQWEsRUFBQyxnQkFBZSxFQUFDLFNBQVEsRUFBVCxFQUFZLE9BQU0sdUJBQWxCLEVBQTBDLFFBQU8sTUFBakQsRUFBd0QsU0FBUSxPQUFoRSxFQUF3RSxPQUFNLEtBQTlFLEVBQWhCLEVBQXFHLDBCQUF5QixFQUFDLFNBQVEsTUFBVCxFQUFnQixRQUFPLE1BQXZCLEVBQThCLE9BQU0sdUJBQXBDLEVBQTRELFFBQU8sTUFBbkUsRUFBMEUsU0FBUSxPQUFsRixFQUEwRixPQUFNLEtBQWhHLEVBQTlILEVBQWQsRUFBb1AsU0FBUSxFQUFDLFNBQVEsY0FBVCxFQUE1UCxFLFFBQ1RDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNGLDBCQUFjQyxtQkFEWjtBQUVGQyxtQkFBT0E7QUFGTCxTOzs7O0VBUjZCQyxlQUFLQyxTOztrQkFBdkJWLFMiLCJmaWxlIjoicmVtYXJrLXJlY29yZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gICAgaW1wb3J0IHJlbWFya1RwbCBmcm9tICcuL3JlbWFyay10cGwnXG4gICAgaW1wb3J0IHBhbmVsIGZyb20gJy4vcGFuZWwnXG5cbiAgICBleHBvcnQgZGVmYXVsdCBjbGFzcyBSZW1hcmtUcGwgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gICAgICAgIHByb3BzID0ge1xuICAgICAgICAgICAgZ3JvdXBNZW1iZXI6IHt9XG4gICAgICAgIH1cblxuICAgICAgICRyZXBlYXQgPSB7XCJncm91cE1lbWJlclwiOntcImNvbVwiOlwicmVtYXJrLXRwbFwiLFwicHJvcHNcIjpcInJlbWFya0luZm8uc3luY1wifX07XHJcbiRwcm9wcyA9IHtcInJlbWFyay10cGxcIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcImdyb3VwTWVtYmVyLm1vZGVsTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDpyZW1hcmtJbmZvLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJncm91cE1lbWJlci5tb2RlbExpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn19LFwicGFuZWxcIjp7XCJjbGFzc1wiOlwicmVtYXJrLXBhbmVsXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgICAgICAgICdyZW1hcmstdHBsJzogcmVtYXJrVHBsLFxuICAgICAgICAgICAgcGFuZWw6IHBhbmVsXG4gICAgICAgIH1cbiAgICB9XG4iXX0=