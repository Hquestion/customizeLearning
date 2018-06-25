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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBlcnNvbmFsLXRhc2suanMiXSwibmFtZXMiOlsiUGVyc29uYWxUYXNrIiwiZGF0YSIsImJUaGVtZSIsInByb3BzIiwidGFza0luZm8iLCJ0aGVtZSIsImRlZmF1bHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJyaWNoQnV0b29uIiwibWV0aG9kcyIsIm9uVGFwU3RhcnQiLCIkZW1pdCIsIm9uVGFwQ291dGludWUiLCJyZXZpZXdUYXNrIiwiU3RhdHVzIiwid2F0Y2giLCJ2YWwiLCIkYXBwbHkiLCJ3ZXB5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDSTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFk7Ozs7Ozs7Ozs7Ozs7O3NNQUNqQkMsSSxHQUFPO0FBQ0hDLG9CQUFRO0FBREwsUyxRQUlQQyxLLEdBQVE7QUFDSkMsc0JBQVUsRUFETjtBQUVKQyxtQkFBTztBQUNIQyx5QkFBUztBQUROO0FBRkgsUyxRQU9UQyxPLEdBQVUsRSxRQUNqQkMsTSxHQUFTLEVBQUMsZ0JBQWUsRUFBQyxRQUFPLFFBQVIsRUFBaUIsUUFBTyxNQUF4QixFQUErQixnQkFBZSxFQUE5QyxFQUFpRCxxQkFBb0IsUUFBckUsRUFBOEUsY0FBYSxFQUEzRixFQUFoQixFQUErRyxnQkFBZSxFQUFDLFFBQU8sUUFBUixFQUFpQixRQUFPLFVBQXhCLEVBQW1DLFNBQVEsTUFBM0MsRUFBOUgsRSxRQUNUQyxPLEdBQVUsRUFBQyxnQkFBZSxFQUFDLFlBQVcsZUFBWixFQUFoQixFQUE2QyxnQkFBZSxFQUFDLFlBQVcsWUFBWixFQUE1RCxFLFFBQ1RDLFUsR0FBYTtBQUNGLDRCQUFnQkMsb0JBRGQ7QUFFRiw0QkFBZ0JBO0FBRmQsUyxRQUlOQyxPLEdBQVU7QUFDTkMsc0JBRE0sd0JBQ087QUFDVCxxQkFBS0MsS0FBTCxDQUFXLFNBQVgsRUFBc0IsS0FBS1YsUUFBM0I7QUFDSCxhQUhLO0FBSU5XLHlCQUpNLDJCQUlVO0FBQ1oscUJBQUtELEtBQUwsQ0FBVyxVQUFYLEVBQXVCLEtBQUtWLFFBQTVCO0FBQ0gsYUFOSztBQU9OWSxzQkFQTSx3QkFPTztBQUNULG9CQUFJLEtBQUtaLFFBQUwsQ0FBY2EsTUFBZCxLQUF5QixDQUE3QixFQUFnQztBQUM1Qix5QkFBS0gsS0FBTCxDQUFXLFFBQVgsRUFBcUIsS0FBS1YsUUFBMUI7QUFDSDtBQUNKO0FBWEssUyxRQWNWYyxLLEdBQVE7QUFDSmIsbUJBQU8sZUFBU2MsR0FBVCxFQUFjO0FBQ2pCLHFCQUFLakIsTUFBTCxHQUFlaUIsUUFBUSxNQUFSLEdBQWlCLE1BQWpCLEdBQTBCLEtBQXpDO0FBQ0EscUJBQUtDLE1BQUw7QUFDSDtBQUpHLFM7Ozs7O2lDQU9DLENBRVI7Ozs7RUExQ3FDQyxlQUFLQyxTOztrQkFBMUJ0QixZIiwiZmlsZSI6InBlcnNvbmFsLXRhc2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICAgIGltcG9ydCByaWNoQnV0b29uIGZyb20gJy4uL2NvbXBvbmVudHMvcmljaC1idXR0b24nXG5cbiAgICBleHBvcnQgZGVmYXVsdCBjbGFzcyBQZXJzb25hbFRhc2sgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICBiVGhlbWU6ICdibHVlJ1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvcHMgPSB7XG4gICAgICAgICAgICB0YXNrSW5mbzoge30sXG4gICAgICAgICAgICB0aGVtZToge1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6ICdtYWxlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInJpY2gtYnV0dG9uMVwiOntcInNpemVcIjpcIm1pZGRsZVwiLFwidGV4dFwiOlwi57un57ut6K++56iLXCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnRoZW1lLnN5bmNcIjpcImJUaGVtZVwiLFwieG1sbnM6di1vblwiOlwiXCJ9LFwicmljaC1idXR0b24yXCI6e1wic2l6ZVwiOlwibWlkZGxlXCIsXCJ0ZXh0XCI6XCLlt7LmmoLlgZzvvIzngrnlh7vlkK/liqhcIixcInRoZW1lXCI6XCJncmV5XCJ9fTtcclxuJGV2ZW50cyA9IHtcInJpY2gtYnV0dG9uMVwiOntcInYtb246dGFwXCI6XCJvblRhcENvdXRpbnVlXCJ9LFwicmljaC1idXR0b24yXCI6e1widi1vbjp0YXBcIjpcIm9uVGFwU3RhcnRcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgICAgICAgICdyaWNoLWJ1dHRvbjEnOiByaWNoQnV0b29uLFxuICAgICAgICAgICAgJ3JpY2gtYnV0dG9uMic6IHJpY2hCdXRvb25cbiAgICAgICAgfVxuICAgICAgICBtZXRob2RzID0ge1xuICAgICAgICAgICAgb25UYXBTdGFydCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdyZXN0YXJ0JywgdGhpcy50YXNrSW5mbylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvblRhcENvdXRpbnVlKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2NvbnRpbnVlJywgdGhpcy50YXNrSW5mbylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXZpZXdUYXNrKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRhc2tJbmZvLlN0YXR1cyAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdyZXZpZXcnLCB0aGlzLnRhc2tJbmZvKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHdhdGNoID0ge1xuICAgICAgICAgICAgdGhlbWU6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYlRoZW1lID0gKHZhbCA9PT0gJ21hbGUnID8gJ2JsdWUnIDogJ3JlZCcpXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgb25Mb2FkKCkge1xuXG4gICAgICAgIH1cbiAgICB9XG4iXX0=