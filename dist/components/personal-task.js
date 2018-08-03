'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _richButton = require('./rich-button.js');

var _richButton2 = _interopRequireDefault(_richButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PersonalTask = function (_wepy$component) {
    _inherits(PersonalTask, _wepy$component);

    function PersonalTask() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, PersonalTask);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PersonalTask.__proto__ || Object.getPrototypeOf(PersonalTask)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            bTheme: 'blue'
        }, _this.props = {
            taskInfo: {},
            theme: {
                default: 'male'
            }
        }, _this.$repeat = {}, _this.$props = { "rich-button1": { "size": "middle", "text": "继续课程", "xmlns:v-bind": "", "v-bind:theme.sync": "bTheme", "xmlns:v-on": "" }, "rich-button2": { "size": "middle", "text": "已暂停，点击启动", "theme": "grey" } }, _this.$events = { "rich-button1": { "v-on:tap": "onTapCoutinue" }, "rich-button2": { "v-on:tap": "onTapStart" } }, _this.components = {
            'rich-button1': _richButton2.default,
            'rich-button2': _richButton2.default
        }, _this.methods = {
            onTapStart: function onTapStart() {
                this.$emit('restart', this.taskInfo);
            },
            onTapCoutinue: function onTapCoutinue() {
                this.$emit('continue', this.taskInfo);
            },
            reviewTask: function reviewTask() {
                if (this.taskInfo.Status !== 0) {
                    this.$emit('review', this.taskInfo);
                }
            }
        }, _this.watch = {
            theme: function theme(val) {
                this.bTheme = val === 'male' ? 'blue' : 'red';
                this.$apply();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(PersonalTask, [{
        key: 'onLoad',
        value: function onLoad() {}
    }]);

    return PersonalTask;
}(_wepy2.default.component);

exports.default = PersonalTask;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBlcnNvbmFsLXRhc2suanMiXSwibmFtZXMiOlsiUGVyc29uYWxUYXNrIiwiZGF0YSIsImJUaGVtZSIsInByb3BzIiwidGFza0luZm8iLCJ0aGVtZSIsImRlZmF1bHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJyaWNoQnV0b29uIiwibWV0aG9kcyIsIm9uVGFwU3RhcnQiLCIkZW1pdCIsIm9uVGFwQ291dGludWUiLCJyZXZpZXdUYXNrIiwiU3RhdHVzIiwid2F0Y2giLCJ2YWwiLCIkYXBwbHkiLCJ3ZXB5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDSTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFk7Ozs7Ozs7Ozs7Ozs7O3NNQUNqQkMsSSxHQUFPO0FBQ0hDLG9CQUFRO0FBREwsUyxRQUlQQyxLLEdBQVE7QUFDSkMsc0JBQVUsRUFETjtBQUVKQyxtQkFBTztBQUNIQyx5QkFBUztBQUROO0FBRkgsUyxRQU9UQyxPLEdBQVUsRSxRQUNqQkMsTSxHQUFTLEVBQUMsZ0JBQWUsRUFBQyxRQUFPLFFBQVIsRUFBaUIsUUFBTyxNQUF4QixFQUErQixnQkFBZSxFQUE5QyxFQUFpRCxxQkFBb0IsUUFBckUsRUFBOEUsY0FBYSxFQUEzRixFQUFoQixFQUErRyxnQkFBZSxFQUFDLFFBQU8sUUFBUixFQUFpQixRQUFPLFVBQXhCLEVBQW1DLFNBQVEsTUFBM0MsRUFBOUgsRSxRQUNUQyxPLEdBQVUsRUFBQyxnQkFBZSxFQUFDLFlBQVcsZUFBWixFQUFoQixFQUE2QyxnQkFBZSxFQUFDLFlBQVcsWUFBWixFQUE1RCxFLFFBQ1RDLFUsR0FBYTtBQUNGLDRCQUFnQkMsb0JBRGQ7QUFFRiw0QkFBZ0JBO0FBRmQsUyxRQUlOQyxPLEdBQVU7QUFDTkMsc0JBRE0sd0JBQ087QUFDVCxxQkFBS0MsS0FBTCxDQUFXLFNBQVgsRUFBc0IsS0FBS1YsUUFBM0I7QUFDSCxhQUhLO0FBSU5XLHlCQUpNLDJCQUlVO0FBQ1oscUJBQUtELEtBQUwsQ0FBVyxVQUFYLEVBQXVCLEtBQUtWLFFBQTVCO0FBQ0gsYUFOSztBQU9OWSxzQkFQTSx3QkFPTztBQUNULG9CQUFJLEtBQUtaLFFBQUwsQ0FBY2EsTUFBZCxLQUF5QixDQUE3QixFQUFnQztBQUM1Qix5QkFBS0gsS0FBTCxDQUFXLFFBQVgsRUFBcUIsS0FBS1YsUUFBMUI7QUFDSDtBQUNKO0FBWEssUyxRQWNWYyxLLEdBQVE7QUFDSmIsbUJBQU8sZUFBU2MsR0FBVCxFQUFjO0FBQ2pCLHFCQUFLakIsTUFBTCxHQUFlaUIsUUFBUSxNQUFSLEdBQWlCLE1BQWpCLEdBQTBCLEtBQXpDO0FBQ0EscUJBQUtDLE1BQUw7QUFDSDtBQUpHLFM7Ozs7O2lDQU9DLENBRVI7Ozs7RUExQ3FDQyxlQUFLQyxTOztrQkFBMUJ0QixZIiwiZmlsZSI6InBlcnNvbmFsLXRhc2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICAgIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgICBpbXBvcnQgcmljaEJ1dG9vbiBmcm9tICcuLi9jb21wb25lbnRzL3JpY2gtYnV0dG9uJ1xyXG5cclxuICAgIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFBlcnNvbmFsVGFzayBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICAgICAgICBkYXRhID0ge1xyXG4gICAgICAgICAgICBiVGhlbWU6ICdibHVlJ1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvcHMgPSB7XHJcbiAgICAgICAgICAgIHRhc2tJbmZvOiB7fSxcclxuICAgICAgICAgICAgdGhlbWU6IHtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6ICdtYWxlJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wicmljaC1idXR0b24xXCI6e1wic2l6ZVwiOlwibWlkZGxlXCIsXCJ0ZXh0XCI6XCLnu6fnu63or77nqItcIixcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6dGhlbWUuc3luY1wiOlwiYlRoZW1lXCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJyaWNoLWJ1dHRvbjJcIjp7XCJzaXplXCI6XCJtaWRkbGVcIixcInRleHRcIjpcIuW3suaaguWBnO+8jOeCueWHu+WQr+WKqFwiLFwidGhlbWVcIjpcImdyZXlcIn19O1xyXG4kZXZlbnRzID0ge1wicmljaC1idXR0b24xXCI6e1widi1vbjp0YXBcIjpcIm9uVGFwQ291dGludWVcIn0sXCJyaWNoLWJ1dHRvbjJcIjp7XCJ2LW9uOnRhcFwiOlwib25UYXBTdGFydFwifX07XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICAgICAgICAncmljaC1idXR0b24xJzogcmljaEJ1dG9vbixcclxuICAgICAgICAgICAgJ3JpY2gtYnV0dG9uMic6IHJpY2hCdXRvb25cclxuICAgICAgICB9XHJcbiAgICAgICAgbWV0aG9kcyA9IHtcclxuICAgICAgICAgICAgb25UYXBTdGFydCgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ3Jlc3RhcnQnLCB0aGlzLnRhc2tJbmZvKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvblRhcENvdXRpbnVlKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnY29udGludWUnLCB0aGlzLnRhc2tJbmZvKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXZpZXdUYXNrKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGFza0luZm8uU3RhdHVzICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgncmV2aWV3JywgdGhpcy50YXNrSW5mbylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd2F0Y2ggPSB7XHJcbiAgICAgICAgICAgIHRoZW1lOiBmdW5jdGlvbih2YWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYlRoZW1lID0gKHZhbCA9PT0gJ21hbGUnID8gJ2JsdWUnIDogJ3JlZCcpXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uTG9hZCgpIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4iXX0=