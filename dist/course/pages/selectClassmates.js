'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _richButton = require('./../../components/rich-button.js');

var _richButton2 = _interopRequireDefault(_richButton);

var _emptyContent = require('./../../components/empty-content.js');

var _emptyContent2 = _interopRequireDefault(_emptyContent);

var _api = require('./../../api/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectClassmates = function (_wepy$page) {
    _inherits(SelectClassmates, _wepy$page);

    function SelectClassmates() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, SelectClassmates);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SelectClassmates.__proto__ || Object.getPrototypeOf(SelectClassmates)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '选择小组成员'
        }, _this.$repeat = {}, _this.$props = { "rich-button": { "text": "创建完成", "iconSrc": "../../images/wancheng-xiao.png", "xmlns:v-on": "" } }, _this.$events = { "rich-button": { "v-on:tap": "finishCreate" } }, _this.components = {
            'rich-button': _richButton2.default,
            'empty-content': _emptyContent2.default
        }, _this.data = {
            userInfo: null,
            key: '',
            classmatesList: []
        }, _this.computed = {
            selectedClassmates: function selectedClassmates() {
                return this.classmatesList.filter(function (item) {
                    return !!item.isSelected;
                });
            },
            showStuList: function showStuList() {
                var _this2 = this;

                return this.classmatesList.filter(function (item) {
                    return item.XM && item.XM.indexOf(_this2.key) >= 0;
                });
            }
        }, _this.methods = {
            onInput: function onInput(e) {
                this.key = e.detail.value;
                this.$apply();
            },
            onSearch: function onSearch(e) {
                this.key = e.detail.value;
                this.$apply();
            },
            finishCreate: function finishCreate() {
                var _this3 = this;

                // 校验该学生是否在该课程的某一个任务中，如果在任务中则无法创建
                var modelList = this.selectedClassmates.map(function (item) {
                    return {
                        CourseFID: _this3.courseId,
                        MemberFID: item.StudentFID,
                        Creater: _this3.$parent.globalData.userInfo.FlnkID,
                        MemberName: item.XM
                    };
                });
                var param = {
                    StudentFID: this.$parent.globalData.userInfo.FlnkID,
                    CourseFID: this.courseId,
                    AttendMembers: this.selectedClassmates.map(function (item) {
                        return item.XM;
                    }).join(','),
                    modelList: modelList
                };
                (0, _api.createCourseGroup)(param).then(function (res) {
                    if (res.Flag) {
                        _wepy2.default.setStorageSync('groupMembers', modelList);
                        _wepy2.default.navigateTo({
                            url: '/course/pages/createGroupSuccess?courseId=' + _this3.courseId + '&groupId=' + res.ResultObj
                        });
                    } else {
                        _wepy2.default.showToast({
                            title: '操作失败',
                            icon: 'none'
                        });
                    }
                }, function () {
                    _wepy2.default.showToast({
                        title: '操作失败',
                        icon: 'none'
                    });
                });
            },
            selectClassMate: function selectClassMate(stu) {
                var toggleStu = this.classmatesList.find(function (item) {
                    return item.StudentFID === stu.StudentFID;
                });
                toggleStu.isSelected = !toggleStu.isSelected;
                this.$apply();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SelectClassmates, [{
        key: 'init',
        value: function init() {
            var _this4 = this;

            (0, _api.getClassmateList)(this.$parent.globalData.userInfo.FlnkID, this.courseId).then(function (res) {
                _this4.classmatesList = (res || []).filter(function (item) {
                    return item.StudentFID !== _this4.$parent.globalData.userInfo.FlnkID;
                });
                _this4.classmatesList.forEach(function (item) {
                    item.isSelected = false;
                });
                _this4.$apply();
            }, function (res) {
                _this4.classmatesList = [];
                _this4.$apply();
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad(option) {
            this.courseId = option.courseId;
            this.init();
        }
    }]);

    return SelectClassmates;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(SelectClassmates , 'course/pages/selectClassmates'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbGVjdENsYXNzbWF0ZXMuanMiXSwibmFtZXMiOlsiU2VsZWN0Q2xhc3NtYXRlcyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJyaWNoQnV0dG9uIiwiZW1wdHlDb250ZW50IiwiZGF0YSIsInVzZXJJbmZvIiwia2V5IiwiY2xhc3NtYXRlc0xpc3QiLCJjb21wdXRlZCIsInNlbGVjdGVkQ2xhc3NtYXRlcyIsImZpbHRlciIsIml0ZW0iLCJpc1NlbGVjdGVkIiwic2hvd1N0dUxpc3QiLCJYTSIsImluZGV4T2YiLCJtZXRob2RzIiwib25JbnB1dCIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsIiRhcHBseSIsIm9uU2VhcmNoIiwiZmluaXNoQ3JlYXRlIiwibW9kZWxMaXN0IiwibWFwIiwiQ291cnNlRklEIiwiY291cnNlSWQiLCJNZW1iZXJGSUQiLCJTdHVkZW50RklEIiwiQ3JlYXRlciIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiRmxua0lEIiwiTWVtYmVyTmFtZSIsInBhcmFtIiwiQXR0ZW5kTWVtYmVycyIsImpvaW4iLCJ0aGVuIiwicmVzIiwiRmxhZyIsIndlcHkiLCJzZXRTdG9yYWdlU3luYyIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJSZXN1bHRPYmoiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJzZWxlY3RDbGFzc01hdGUiLCJzdHUiLCJ0b2dnbGVTdHUiLCJmaW5kIiwiZm9yRWFjaCIsIm9wdGlvbiIsImluaXQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDSTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7OztJQUVxQkEsZ0I7Ozs7Ozs7Ozs7Ozs7OzhNQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBSVZDLE8sR0FBVSxFLFFBQ2pCQyxNLEdBQVMsRUFBQyxlQUFjLEVBQUMsUUFBTyxNQUFSLEVBQWUsV0FBVSxn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LFVBQVV2QyxVQUFsQztBQUNBLHFCQUFLUyxNQUFMO0FBQ0g7QUFoREssUzs7Ozs7K0JBbURIO0FBQUE7O0FBQ0gsdUNBQWlCLEtBQUtVLE9BQUwsQ0FBYUMsVUFBYixDQUF3QjNCLFFBQXhCLENBQWlDNEIsTUFBbEQsRUFBMEQsS0FBS04sUUFBL0QsRUFBeUVXLElBQXpFLENBQThFLGVBQU87QUFDakYsdUJBQUsvQixjQUFMLEdBQXNCLENBQUNnQyxPQUFPLEVBQVIsRUFBWTdCLE1BQVosQ0FBbUI7QUFBQSwyQkFBUUMsS0FBS2tCLFVBQUwsS0FBb0IsT0FBS0UsT0FBTCxDQUFhQyxVQUFiLENBQXdCM0IsUUFBeEIsQ0FBaUM0QixNQUE3RDtBQUFBLGlCQUFuQixDQUF0QjtBQUNBLHVCQUFLMUIsY0FBTCxDQUFvQjhDLE9BQXBCLENBQTRCLGdCQUFRO0FBQ2hDMUMseUJBQUtDLFVBQUwsR0FBa0IsS0FBbEI7QUFDSCxpQkFGRDtBQUdBLHVCQUFLUyxNQUFMO0FBQ0gsYUFORCxFQU1HLGVBQU87QUFDTix1QkFBS2QsY0FBTCxHQUFzQixFQUF0QjtBQUNBLHVCQUFLYyxNQUFMO0FBQ0gsYUFURDtBQVVIOzs7K0JBRU1pQyxNLEVBQVE7QUFDWCxpQkFBSzNCLFFBQUwsR0FBZ0IyQixPQUFPM0IsUUFBdkI7QUFDQSxpQkFBSzRCLElBQUw7QUFDSDs7OztFQWpHeUNkLGVBQUtlLEk7O2tCQUE5QjdELGdCIiwiZmlsZSI6InNlbGVjdENsYXNzbWF0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICAgIGltcG9ydCByaWNoQnV0dG9uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcmljaC1idXR0b24nXG4gICAgaW1wb3J0IGVtcHR5Q29udGVudCBmcm9tICcuLi8uLi9jb21wb25lbnRzL2VtcHR5LWNvbnRlbnQnXG5cbiAgICBpbXBvcnQge2dldENsYXNzbWF0ZUxpc3QsIGNyZWF0ZUNvdXJzZUdyb3VwfSBmcm9tICcuLi8uLi9hcGknXG5cbiAgICBleHBvcnQgZGVmYXVsdCBjbGFzcyBTZWxlY3RDbGFzc21hdGVzIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICAgICAgY29uZmlnID0ge1xuICAgICAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+mAieaLqeWwj+e7hOaIkOWRmCdcbiAgICAgICAgfVxuXG4gICAgICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJyaWNoLWJ1dHRvblwiOntcInRleHRcIjpcIuWIm+W7uuWujOaIkFwiLFwiaWNvblNyY1wiOlwiLi4vLi4vaW1hZ2VzL3dhbmNoZW5nLXhpYW8ucG5nXCIsXCJ4bWxuczp2LW9uXCI6XCJcIn19O1xyXG4kZXZlbnRzID0ge1wicmljaC1idXR0b25cIjp7XCJ2LW9uOnRhcFwiOlwiZmluaXNoQ3JlYXRlXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICAgICAgICAncmljaC1idXR0b24nOiByaWNoQnV0dG9uLFxuICAgICAgICAgICAgJ2VtcHR5LWNvbnRlbnQnOiBlbXB0eUNvbnRlbnRcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICB1c2VySW5mbzogbnVsbCxcbiAgICAgICAgICAgIGtleTogJycsXG4gICAgICAgICAgICBjbGFzc21hdGVzTGlzdDogW11cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbXB1dGVkID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRDbGFzc21hdGVzKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNsYXNzbWF0ZXNMaXN0LmZpbHRlcihpdGVtID0+ICEhaXRlbS5pc1NlbGVjdGVkKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNob3dTdHVMaXN0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNsYXNzbWF0ZXNMaXN0LmZpbHRlcihpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uWE0gJiYgaXRlbS5YTS5pbmRleE9mKHRoaXMua2V5KSA+PSAwXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG1ldGhvZHMgPSB7XG4gICAgICAgICAgICBvbklucHV0KGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmtleSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uU2VhcmNoKGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmtleSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpbmlzaENyZWF0ZSgpIHtcbiAgICAgICAgICAgICAgICAvLyDmoKHpqozor6XlrabnlJ/mmK/lkKblnKjor6Xor77nqIvnmoTmn5DkuIDkuKrku7vliqHkuK3vvIzlpoLmnpzlnKjku7vliqHkuK3liJnml6Dms5XliJvlu7pcbiAgICAgICAgICAgICAgICBsZXQgbW9kZWxMaXN0ID0gdGhpcy5zZWxlY3RlZENsYXNzbWF0ZXMubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgQ291cnNlRklEOiB0aGlzLmNvdXJzZUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgTWVtYmVyRklEOiBpdGVtLlN0dWRlbnRGSUQsXG4gICAgICAgICAgICAgICAgICAgICAgICBDcmVhdGVyOiB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mby5GbG5rSUQsXG4gICAgICAgICAgICAgICAgICAgICAgICBNZW1iZXJOYW1lOiBpdGVtLlhNXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGxldCBwYXJhbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgU3R1ZGVudEZJRDogdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8uRmxua0lELFxuICAgICAgICAgICAgICAgICAgICBDb3Vyc2VGSUQ6IHRoaXMuY291cnNlSWQsXG4gICAgICAgICAgICAgICAgICAgIEF0dGVuZE1lbWJlcnM6IHRoaXMuc2VsZWN0ZWRDbGFzc21hdGVzLm1hcChpdGVtID0+IGl0ZW0uWE0pLmpvaW4oJywnKSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxMaXN0OiBtb2RlbExpc3RcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY3JlYXRlQ291cnNlR3JvdXAocGFyYW0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5GbGFnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCdncm91cE1lbWJlcnMnLCBtb2RlbExpc3QpXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy9jb3Vyc2UvcGFnZXMvY3JlYXRlR3JvdXBTdWNjZXNzP2NvdXJzZUlkPScgKyB0aGlzLmNvdXJzZUlkICsgJyZncm91cElkPScgKyByZXMuUmVzdWx0T2JqXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5pON5L2c5aSx6LSlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnbm9uZSdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5pON5L2c5aSx6LSlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdub25lJ1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VsZWN0Q2xhc3NNYXRlKHN0dSkge1xuICAgICAgICAgICAgICAgIGxldCB0b2dnbGVTdHUgPSB0aGlzLmNsYXNzbWF0ZXNMaXN0LmZpbmQoaXRlbSA9PiBpdGVtLlN0dWRlbnRGSUQgPT09IHN0dS5TdHVkZW50RklEKVxuICAgICAgICAgICAgICAgIHRvZ2dsZVN0dS5pc1NlbGVjdGVkID0gIXRvZ2dsZVN0dS5pc1NlbGVjdGVkXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaW5pdCgpIHtcbiAgICAgICAgICAgIGdldENsYXNzbWF0ZUxpc3QodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8uRmxua0lELCB0aGlzLmNvdXJzZUlkKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc21hdGVzTGlzdCA9IChyZXMgfHwgW10pLmZpbHRlcihpdGVtID0+IGl0ZW0uU3R1ZGVudEZJRCAhPT0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8uRmxua0lEKVxuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NtYXRlc0xpc3QuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5pc1NlbGVjdGVkID0gZmFsc2VcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIH0sIHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc21hdGVzTGlzdCA9IFtdXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIG9uTG9hZChvcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuY291cnNlSWQgPSBvcHRpb24uY291cnNlSWRcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpXG4gICAgICAgIH1cbiAgICB9XG4iXX0=