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

var CourseTask = function (_wepy$component) {
    _inherits(CourseTask, _wepy$component);

    function CourseTask() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, CourseTask);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CourseTask.__proto__ || Object.getPrototypeOf(CourseTask)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
            taskInfo: {
                twoWay: true
            },
            showStatus: {
                type: Boolean,
                default: false
            },
            statusCode: {}
        }, _this.components = {}, _this.methods = {
            toggleFav: function toggleFav(data) {
                this.$emit('toggle-praise', data);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(CourseTask, [{
        key: 'onLoad',
        value: function onLoad() {}
    }]);

    return CourseTask;
}(_wepy2.default.component);

exports.default = CourseTask;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdXJzZS10YXNrLmpzIl0sIm5hbWVzIjpbIkNvdXJzZVRhc2siLCJwcm9wcyIsInRhc2tJbmZvIiwidHdvV2F5Iiwic2hvd1N0YXR1cyIsInR5cGUiLCJCb29sZWFuIiwiZGVmYXVsdCIsInN0YXR1c0NvZGUiLCJjb21wb25lbnRzIiwibWV0aG9kcyIsInRvZ2dsZUZhdiIsImRhdGEiLCIkZW1pdCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0k7Ozs7Ozs7Ozs7OztJQUVxQkEsVTs7Ozs7Ozs7Ozs7Ozs7a01BQ2pCQyxLLEdBQVE7QUFDSkMsc0JBQVU7QUFDTkMsd0JBQVE7QUFERixhQUROO0FBSUpDLHdCQUFZO0FBQ1JDLHNCQUFNQyxPQURFO0FBRVJDLHlCQUFTO0FBRkQsYUFKUjtBQVFKQyx3QkFBWTtBQVJSLFMsUUFXUkMsVSxHQUFhLEUsUUFHYkMsTyxHQUFVO0FBQ05DLHFCQURNLHFCQUNJQyxJQURKLEVBQ1U7QUFDWixxQkFBS0MsS0FBTCxDQUFXLGVBQVgsRUFBNEJELElBQTVCO0FBQ0g7QUFISyxTOzs7OztpQ0FNRCxDQUVSOzs7O0VBdkJtQyxlQUFLRSxTOztrQkFBeEJkLFUiLCJmaWxlIjoiY291cnNlLXRhc2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICAgIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcblxyXG4gICAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ291cnNlVGFzayBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICAgICAgICBwcm9wcyA9IHtcclxuICAgICAgICAgICAgdGFza0luZm86IHtcclxuICAgICAgICAgICAgICAgIHR3b1dheTogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzaG93U3RhdHVzOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3RhdHVzQ29kZToge31cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbXBvbmVudHMgPSB7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBtZXRob2RzID0ge1xyXG4gICAgICAgICAgICB0b2dnbGVGYXYoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgndG9nZ2xlLXByYWlzZScsIGRhdGEpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uTG9hZCgpIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4iXX0=