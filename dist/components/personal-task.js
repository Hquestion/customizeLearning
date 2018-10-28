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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBlcnNvbmFsLXRhc2suanMiXSwibmFtZXMiOlsiUGVyc29uYWxUYXNrIiwiZGF0YSIsImJUaGVtZSIsInByb3BzIiwidGFza0luZm8iLCJ0aGVtZSIsImRlZmF1bHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJtZXRob2RzIiwib25UYXBTdGFydCIsIiRlbWl0Iiwib25UYXBDb3V0aW51ZSIsInJldmlld1Rhc2siLCJTdGF0dXMiLCJ3YXRjaCIsInZhbCIsIiRhcHBseSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0k7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxZOzs7Ozs7Ozs7Ozs7OztzTUFDakJDLEksR0FBTztBQUNIQyxvQkFBUTtBQURMLFMsUUFJUEMsSyxHQUFRO0FBQ0pDLHNCQUFVLEVBRE47QUFFSkMsbUJBQU87QUFDSEMseUJBQVM7QUFETjtBQUZILFMsUUFPVEMsTyxHQUFVLEUsUUFDakJDLE0sR0FBUyxFQUFDLGdCQUFlLEVBQUMsUUFBTyxRQUFSLEVBQWlCLFFBQU8sTUFBeEIsRUFBK0IsZ0JBQWUsRUFBOUMsRUFBaUQscUJBQW9CLFFBQXJFLEVBQThFLGNBQWEsRUFBM0YsRUFBaEIsRUFBK0csZ0JBQWUsRUFBQyxRQUFPLFFBQVIsRUFBaUIsUUFBTyxVQUF4QixFQUFtQyxTQUFRLE1BQTNDLEVBQTlILEUsUUFDVEMsTyxHQUFVLEVBQUMsZ0JBQWUsRUFBQyxZQUFXLGVBQVosRUFBaEIsRUFBNkMsZ0JBQWUsRUFBQyxZQUFXLFlBQVosRUFBNUQsRSxRQUNUQyxVLEdBQWE7QUFDRixnREFERTtBQUVGO0FBRkUsUyxRQUlOQyxPLEdBQVU7QUFDTkMsc0JBRE0sd0JBQ087QUFDVCxxQkFBS0MsS0FBTCxDQUFXLFNBQVgsRUFBc0IsS0FBS1QsUUFBM0I7QUFDSCxhQUhLO0FBSU5VLHlCQUpNLDJCQUlVO0FBQ1oscUJBQUtELEtBQUwsQ0FBVyxVQUFYLEVBQXVCLEtBQUtULFFBQTVCO0FBQ0gsYUFOSztBQU9OVyxzQkFQTSx3QkFPTztBQUNULG9CQUFJLEtBQUtYLFFBQUwsQ0FBY1ksTUFBZCxLQUF5QixDQUE3QixFQUFnQztBQUM1Qix5QkFBS0gsS0FBTCxDQUFXLFFBQVgsRUFBcUIsS0FBS1QsUUFBMUI7QUFDSDtBQUNKO0FBWEssUyxRQWNWYSxLLEdBQVE7QUFDSlosbUJBQU8sZUFBU2EsR0FBVCxFQUFjO0FBQ2pCLHFCQUFLaEIsTUFBTCxHQUFlZ0IsUUFBUSxNQUFSLEdBQWlCLE1BQWpCLEdBQTBCLEtBQXpDO0FBQ0EscUJBQUtDLE1BQUw7QUFDSDtBQUpHLFM7Ozs7O2lDQU9DLENBRVI7Ozs7RUExQ3FDLGVBQUtDLFM7O2tCQUExQnBCLFkiLCJmaWxlIjoicGVyc29uYWwtdGFzay5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gICAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICAgIGltcG9ydCByaWNoQnV0b29uIGZyb20gJy4uL2NvbXBvbmVudHMvcmljaC1idXR0b24nXHJcblxyXG4gICAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGVyc29uYWxUYXNrIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gICAgICAgIGRhdGEgPSB7XHJcbiAgICAgICAgICAgIGJUaGVtZTogJ2JsdWUnXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm9wcyA9IHtcclxuICAgICAgICAgICAgdGFza0luZm86IHt9LFxyXG4gICAgICAgICAgICB0aGVtZToge1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogJ21hbGUnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJyaWNoLWJ1dHRvbjFcIjp7XCJzaXplXCI6XCJtaWRkbGVcIixcInRleHRcIjpcIue7p+e7reivvueoi1wiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDp0aGVtZS5zeW5jXCI6XCJiVGhlbWVcIixcInhtbG5zOnYtb25cIjpcIlwifSxcInJpY2gtYnV0dG9uMlwiOntcInNpemVcIjpcIm1pZGRsZVwiLFwidGV4dFwiOlwi5bey5pqC5YGc77yM54K55Ye75ZCv5YqoXCIsXCJ0aGVtZVwiOlwiZ3JleVwifX07XHJcbiRldmVudHMgPSB7XCJyaWNoLWJ1dHRvbjFcIjp7XCJ2LW9uOnRhcFwiOlwib25UYXBDb3V0aW51ZVwifSxcInJpY2gtYnV0dG9uMlwiOntcInYtb246dGFwXCI6XCJvblRhcFN0YXJ0XCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgICAgICAgICdyaWNoLWJ1dHRvbjEnOiByaWNoQnV0b29uLFxyXG4gICAgICAgICAgICAncmljaC1idXR0b24yJzogcmljaEJ1dG9vblxyXG4gICAgICAgIH1cclxuICAgICAgICBtZXRob2RzID0ge1xyXG4gICAgICAgICAgICBvblRhcFN0YXJ0KCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgncmVzdGFydCcsIHRoaXMudGFza0luZm8pXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uVGFwQ291dGludWUoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdjb250aW51ZScsIHRoaXMudGFza0luZm8pXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJldmlld1Rhc2soKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50YXNrSW5mby5TdGF0dXMgIT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdyZXZpZXcnLCB0aGlzLnRhc2tJbmZvKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3YXRjaCA9IHtcclxuICAgICAgICAgICAgdGhlbWU6IGZ1bmN0aW9uKHZhbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iVGhlbWUgPSAodmFsID09PSAnbWFsZScgPyAnYmx1ZScgOiAncmVkJylcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25Mb2FkKCkge1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiJdfQ==