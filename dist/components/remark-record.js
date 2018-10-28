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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlbWFyay1yZWNvcmQuanMiXSwibmFtZXMiOlsiUmVtYXJrVHBsIiwicHJvcHMiLCJncm91cE1lbWJlciIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInBhbmVsIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0k7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFM7Ozs7Ozs7Ozs7Ozs7O2dNQUNqQkMsSyxHQUFRO0FBQ0pDLHlCQUFhO0FBRFQsUyxRQUlUQyxPLEdBQVUsRUFBQyxlQUFjLEVBQUMsT0FBTSxZQUFQLEVBQW9CLFNBQVEsaUJBQTVCLEVBQWYsRSxRQUNqQkMsTSxHQUFTLEVBQUMsY0FBYSxFQUFDLGdCQUFlLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSx1QkFBbEIsRUFBMEMsUUFBTyxNQUFqRCxFQUF3RCxTQUFRLE9BQWhFLEVBQXdFLE9BQU0sS0FBOUUsRUFBaEIsRUFBcUcsMEJBQXlCLEVBQUMsU0FBUSxNQUFULEVBQWdCLFFBQU8sTUFBdkIsRUFBOEIsT0FBTSx1QkFBcEMsRUFBNEQsUUFBTyxNQUFuRSxFQUEwRSxTQUFRLE9BQWxGLEVBQTBGLE9BQU0sS0FBaEcsRUFBOUgsRUFBZCxFQUFvUCxTQUFRLEVBQUMsU0FBUSxjQUFULEVBQTVQLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ0YsNkNBREU7QUFFRkM7QUFGRSxTOzs7O0VBUjZCLGVBQUtDLFM7O2tCQUF2QlIsUyIsImZpbGUiOiJyZW1hcmstcmVjb3JkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gICAgaW1wb3J0IHJlbWFya1RwbCBmcm9tICcuL3JlbWFyay10cGwnXHJcbiAgICBpbXBvcnQgcGFuZWwgZnJvbSAnLi9wYW5lbCdcclxuXHJcbiAgICBleHBvcnQgZGVmYXVsdCBjbGFzcyBSZW1hcmtUcGwgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgICAgICAgcHJvcHMgPSB7XHJcbiAgICAgICAgICAgIGdyb3VwTWVtYmVyOiB7fVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAkcmVwZWF0ID0ge1wiZ3JvdXBNZW1iZXJcIjp7XCJjb21cIjpcInJlbWFyay10cGxcIixcInByb3BzXCI6XCJyZW1hcmtJbmZvLnN5bmNcIn19O1xyXG4kcHJvcHMgPSB7XCJyZW1hcmstdHBsXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJncm91cE1lbWJlci5tb2RlbExpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6cmVtYXJrSW5mby5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW1cIixcInR5cGVcIjpcIml0ZW1cIixcImZvclwiOlwiZ3JvdXBNZW1iZXIubW9kZWxMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9fSxcInBhbmVsXCI6e1wiY2xhc3NcIjpcInJlbWFyay1wYW5lbFwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgICAgICAgICdyZW1hcmstdHBsJzogcmVtYXJrVHBsLFxyXG4gICAgICAgICAgICBwYW5lbDogcGFuZWxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiJdfQ==