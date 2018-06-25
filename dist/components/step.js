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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0ZXAuanMiXSwibmFtZXMiOlsiU3RlcCIsInByb3BzIiwiaW5kZXgiLCJzdGVwRGF0YSIsImVkaXRhYmxlIiwiZGV0YWlsVmlzaWJsZSIsImRlZmF1bHQiLCJjb21wb25lbnRzIiwiZGF0YSIsImV2ZW50cyIsIndhdGNoIiwibWV0aG9kcyIsInRvZ2dsZSIsImUiLCJ0b2dnbGVJbmRleCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0Iiwib3B0SW5kZXgiLCJtb2RlbExpc3QiLCJmaW5kSW5kZXgiLCJpdGVtIiwiSXNTaW5nbGUiLCJmb3JFYWNoIiwiaW5kZXgyIiwiSXNDaGVjayIsIiRlbWl0IiwiZWRpdFN0ZXAiLCJkZWxldGVTdGVwIiwid2VweSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0k7Ozs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7Ozs7c0xBQ2pCQyxLLEdBQVE7QUFDSkMsbUJBQU8sRUFESDtBQUVKQyxzQkFBVSxFQUZOO0FBR0pDLHNCQUFVLEVBSE47QUFJSkMsMkJBQWU7QUFDWEMseUJBQVM7QUFERTtBQUpYLFMsUUFTUkMsVSxHQUFhLEUsUUFJYkMsSSxHQUFPLEUsUUFDUEMsTSxHQUFTLEUsUUFJVEMsSyxHQUFRLEUsUUFJUkMsTyxHQUFVO0FBQ05DLGtCQURNLGtCQUNDQyxDQURELEVBQ0k7QUFDTixvQkFBSSxDQUFDLEtBQUtULFFBQVYsRUFBb0I7QUFDaEI7QUFDSDtBQUNELG9CQUFJVSxjQUFjRCxFQUFFRSxhQUFGLENBQWdCQyxPQUFoQixDQUF3QkMsUUFBMUM7QUFDQSxvQkFBSWYsUUFBUSxLQUFLQyxRQUFMLENBQWNlLFNBQWQsQ0FBd0JDLFNBQXhCLENBQWtDLFVBQUNDLElBQUQsRUFBT2xCLEtBQVAsRUFBaUI7QUFDM0QsMkJBQU9ZLGdCQUFnQlosS0FBdkI7QUFDSCxpQkFGVyxDQUFaO0FBR0Esb0JBQUlNLE9BQU8sS0FBS0wsUUFBTCxDQUFjZSxTQUFkLENBQXdCaEIsS0FBeEIsQ0FBWDtBQUNBLG9CQUFJTSxLQUFLYSxRQUFULEVBQW1CO0FBQ2YseUJBQUtsQixRQUFMLENBQWNlLFNBQWQsQ0FBd0JJLE9BQXhCLENBQWdDLFVBQUNGLElBQUQsRUFBT0csTUFBUCxFQUFrQjtBQUM5Qyw0QkFBSXJCLFVBQVVxQixNQUFkLEVBQXNCO0FBQ2xCSCxpQ0FBS0ksT0FBTCxHQUFlLEtBQWY7QUFDSDtBQUNKLHFCQUpEO0FBS0EseUJBQUtyQixRQUFMLENBQWNlLFNBQWQsQ0FBd0JoQixLQUF4QixFQUErQnNCLE9BQS9CLEdBQXlDLENBQUMsS0FBS3JCLFFBQUwsQ0FBY2UsU0FBZCxDQUF3QmhCLEtBQXhCLEVBQStCc0IsT0FBekU7QUFDSCxpQkFQRCxNQU9PO0FBQ0gseUJBQUtyQixRQUFMLENBQWNlLFNBQWQsQ0FBd0JoQixLQUF4QixFQUErQnNCLE9BQS9CLEdBQXlDLENBQUMsS0FBS3JCLFFBQUwsQ0FBY2UsU0FBZCxDQUF3QmhCLEtBQXhCLEVBQStCc0IsT0FBekU7QUFDSDtBQUNELHFCQUFLQyxLQUFMLENBQVcsY0FBWDtBQUNILGFBckJLO0FBc0JOQyxvQkF0Qk0sc0JBc0JLO0FBQ1AscUJBQUtELEtBQUwsQ0FBVyxXQUFYLEVBQXdCLEtBQUt0QixRQUE3QjtBQUNILGFBeEJLO0FBeUJOd0Isc0JBekJNLHdCQXlCTztBQUNULHFCQUFLRixLQUFMLENBQVcsYUFBWCxFQUEwQixLQUFLdEIsUUFBL0I7QUFDSDtBQTNCSyxTOzs7OztpQ0E4QkQsQ0FBRTs7OztFQXJEbUJ5QixlQUFLQyxTOztrQkFBbEI3QixJIiwiZmlsZSI6InN0ZXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gICAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RlcCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICAgICAgcHJvcHMgPSB7XG4gICAgICAgICAgICBpbmRleDoge30sXG4gICAgICAgICAgICBzdGVwRGF0YToge30sXG4gICAgICAgICAgICBlZGl0YWJsZToge30sXG4gICAgICAgICAgICBkZXRhaWxWaXNpYmxlOiB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29tcG9uZW50cyA9IHtcblxuICAgICAgICB9XG5cbiAgICAgICAgZGF0YSA9IHt9XG4gICAgICAgIGV2ZW50cyA9IHtcblxuICAgICAgICB9XG5cbiAgICAgICAgd2F0Y2ggPSB7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIG1ldGhvZHMgPSB7XG4gICAgICAgICAgICB0b2dnbGUoZSkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5lZGl0YWJsZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IHRvZ2dsZUluZGV4ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQub3B0SW5kZXhcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLnN0ZXBEYXRhLm1vZGVsTGlzdC5maW5kSW5kZXgoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0b2dnbGVJbmRleCA9PT0gaW5kZXhcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gdGhpcy5zdGVwRGF0YS5tb2RlbExpc3RbaW5kZXhdXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuSXNTaW5nbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGVwRGF0YS5tb2RlbExpc3QuZm9yRWFjaCgoaXRlbSwgaW5kZXgyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggIT09IGluZGV4Mikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uSXNDaGVjayA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RlcERhdGEubW9kZWxMaXN0W2luZGV4XS5Jc0NoZWNrID0gIXRoaXMuc3RlcERhdGEubW9kZWxMaXN0W2luZGV4XS5Jc0NoZWNrXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGVwRGF0YS5tb2RlbExpc3RbaW5kZXhdLklzQ2hlY2sgPSAhdGhpcy5zdGVwRGF0YS5tb2RlbExpc3RbaW5kZXhdLklzQ2hlY2tcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnY2hlY2stY2hhbmdlJylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlZGl0U3RlcCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdlZGl0LXN0ZXAnLCB0aGlzLnN0ZXBEYXRhKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlbGV0ZVN0ZXAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnZGVsZXRlLXN0ZXAnLCB0aGlzLnN0ZXBEYXRhKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgb25Mb2FkKCkge31cbiAgICB9XG4iXX0=