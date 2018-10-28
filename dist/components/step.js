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
            index: {},
            stepData: {},
            editable: {},
            detailVisible: {
                default: true
            }
        }, _this.components = {}, _this.data = {}, _this.events = {}, _this.watch = {}, _this.methods = {
            toggle: function toggle(e) {
                if (!this.editable) {
                    return;
                }
                var toggleIndex = e.currentTarget.dataset.optIndex;
                var index = this.stepData.modelList.findIndex(function (item, index) {
                    return toggleIndex === index;
                });
                var data = this.stepData.modelList[index];
                if (data.IsSingle) {
                    this.stepData.modelList.forEach(function (item, index2) {
                        if (index !== index2) {
                            item.IsCheck = false;
                        }
                    });
                    this.stepData.modelList[index].IsCheck = !this.stepData.modelList[index].IsCheck;
                } else {
                    this.stepData.modelList[index].IsCheck = !this.stepData.modelList[index].IsCheck;
                }
                this.$emit('check-change');
            },
            editStep: function editStep() {
                this.$emit('edit-step', this.stepData);
            },
            deleteStep: function deleteStep() {
                this.$emit('delete-step', this.stepData);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0ZXAuanMiXSwibmFtZXMiOlsiU3RlcCIsInByb3BzIiwiaW5kZXgiLCJzdGVwRGF0YSIsImVkaXRhYmxlIiwiZGV0YWlsVmlzaWJsZSIsImRlZmF1bHQiLCJjb21wb25lbnRzIiwiZGF0YSIsImV2ZW50cyIsIndhdGNoIiwibWV0aG9kcyIsInRvZ2dsZSIsImUiLCJ0b2dnbGVJbmRleCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0Iiwib3B0SW5kZXgiLCJtb2RlbExpc3QiLCJmaW5kSW5kZXgiLCJpdGVtIiwiSXNTaW5nbGUiLCJmb3JFYWNoIiwiaW5kZXgyIiwiSXNDaGVjayIsIiRlbWl0IiwiZWRpdFN0ZXAiLCJkZWxldGVTdGVwIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDSTs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztzTEFDakJDLEssR0FBUTtBQUNKQyxtQkFBTyxFQURIO0FBRUpDLHNCQUFVLEVBRk47QUFHSkMsc0JBQVUsRUFITjtBQUlKQywyQkFBZTtBQUNYQyx5QkFBUztBQURFO0FBSlgsUyxRQVNSQyxVLEdBQWEsRSxRQUliQyxJLEdBQU8sRSxRQUNQQyxNLEdBQVMsRSxRQUlUQyxLLEdBQVEsRSxRQUlSQyxPLEdBQVU7QUFDTkMsa0JBRE0sa0JBQ0NDLENBREQsRUFDSTtBQUNOLG9CQUFJLENBQUMsS0FBS1QsUUFBVixFQUFvQjtBQUNoQjtBQUNIO0FBQ0Qsb0JBQUlVLGNBQWNELEVBQUVFLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCQyxRQUExQztBQUNBLG9CQUFJZixRQUFRLEtBQUtDLFFBQUwsQ0FBY2UsU0FBZCxDQUF3QkMsU0FBeEIsQ0FBa0MsVUFBQ0MsSUFBRCxFQUFPbEIsS0FBUCxFQUFpQjtBQUMzRCwyQkFBT1ksZ0JBQWdCWixLQUF2QjtBQUNILGlCQUZXLENBQVo7QUFHQSxvQkFBSU0sT0FBTyxLQUFLTCxRQUFMLENBQWNlLFNBQWQsQ0FBd0JoQixLQUF4QixDQUFYO0FBQ0Esb0JBQUlNLEtBQUthLFFBQVQsRUFBbUI7QUFDZix5QkFBS2xCLFFBQUwsQ0FBY2UsU0FBZCxDQUF3QkksT0FBeEIsQ0FBZ0MsVUFBQ0YsSUFBRCxFQUFPRyxNQUFQLEVBQWtCO0FBQzlDLDRCQUFJckIsVUFBVXFCLE1BQWQsRUFBc0I7QUFDbEJILGlDQUFLSSxPQUFMLEdBQWUsS0FBZjtBQUNIO0FBQ0oscUJBSkQ7QUFLQSx5QkFBS3JCLFFBQUwsQ0FBY2UsU0FBZCxDQUF3QmhCLEtBQXhCLEVBQStCc0IsT0FBL0IsR0FBeUMsQ0FBQyxLQUFLckIsUUFBTCxDQUFjZSxTQUFkLENBQXdCaEIsS0FBeEIsRUFBK0JzQixPQUF6RTtBQUNILGlCQVBELE1BT087QUFDSCx5QkFBS3JCLFFBQUwsQ0FBY2UsU0FBZCxDQUF3QmhCLEtBQXhCLEVBQStCc0IsT0FBL0IsR0FBeUMsQ0FBQyxLQUFLckIsUUFBTCxDQUFjZSxTQUFkLENBQXdCaEIsS0FBeEIsRUFBK0JzQixPQUF6RTtBQUNIO0FBQ0QscUJBQUtDLEtBQUwsQ0FBVyxjQUFYO0FBQ0gsYUFyQks7QUFzQk5DLG9CQXRCTSxzQkFzQks7QUFDUCxxQkFBS0QsS0FBTCxDQUFXLFdBQVgsRUFBd0IsS0FBS3RCLFFBQTdCO0FBQ0gsYUF4Qks7QUF5Qk53QixzQkF6Qk0sd0JBeUJPO0FBQ1QscUJBQUtGLEtBQUwsQ0FBVyxhQUFYLEVBQTBCLEtBQUt0QixRQUEvQjtBQUNIO0FBM0JLLFM7Ozs7O2lDQThCRCxDQUFFOzs7O0VBckRtQixlQUFLeUIsUzs7a0JBQWxCNUIsSSIsImZpbGUiOiJzdGVwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5cclxuICAgIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0ZXAgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgICAgICAgcHJvcHMgPSB7XHJcbiAgICAgICAgICAgIGluZGV4OiB7fSxcclxuICAgICAgICAgICAgc3RlcERhdGE6IHt9LFxyXG4gICAgICAgICAgICBlZGl0YWJsZToge30sXHJcbiAgICAgICAgICAgIGRldGFpbFZpc2libGU6IHtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29tcG9uZW50cyA9IHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkYXRhID0ge31cclxuICAgICAgICBldmVudHMgPSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd2F0Y2ggPSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbWV0aG9kcyA9IHtcclxuICAgICAgICAgICAgdG9nZ2xlKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5lZGl0YWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHRvZ2dsZUluZGV4ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQub3B0SW5kZXhcclxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuc3RlcERhdGEubW9kZWxMaXN0LmZpbmRJbmRleCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9nZ2xlSW5kZXggPT09IGluZGV4XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnN0ZXBEYXRhLm1vZGVsTGlzdFtpbmRleF1cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLklzU2luZ2xlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGVwRGF0YS5tb2RlbExpc3QuZm9yRWFjaCgoaXRlbSwgaW5kZXgyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gaW5kZXgyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLklzQ2hlY2sgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0ZXBEYXRhLm1vZGVsTGlzdFtpbmRleF0uSXNDaGVjayA9ICF0aGlzLnN0ZXBEYXRhLm1vZGVsTGlzdFtpbmRleF0uSXNDaGVja1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0ZXBEYXRhLm1vZGVsTGlzdFtpbmRleF0uSXNDaGVjayA9ICF0aGlzLnN0ZXBEYXRhLm1vZGVsTGlzdFtpbmRleF0uSXNDaGVja1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnY2hlY2stY2hhbmdlJylcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZWRpdFN0ZXAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdlZGl0LXN0ZXAnLCB0aGlzLnN0ZXBEYXRhKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkZWxldGVTdGVwKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnZGVsZXRlLXN0ZXAnLCB0aGlzLnN0ZXBEYXRhKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkxvYWQoKSB7fVxyXG4gICAgfVxyXG4iXX0=