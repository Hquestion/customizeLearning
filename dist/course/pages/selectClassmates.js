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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbGVjdENsYXNzbWF0ZXMuanMiXSwibmFtZXMiOlsiU2VsZWN0Q2xhc3NtYXRlcyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJkYXRhIiwidXNlckluZm8iLCJrZXkiLCJjbGFzc21hdGVzTGlzdCIsImNvbXB1dGVkIiwic2VsZWN0ZWRDbGFzc21hdGVzIiwiZmlsdGVyIiwiaXRlbSIsImlzU2VsZWN0ZWQiLCJzaG93U3R1TGlzdCIsIlhNIiwiaW5kZXhPZiIsIm1ldGhvZHMiLCJvbklucHV0IiwiZSIsImRldGFpbCIsInZhbHVlIiwiJGFwcGx5Iiwib25TZWFyY2giLCJmaW5pc2hDcmVhdGUiLCJtb2RlbExpc3QiLCJtYXAiLCJDb3Vyc2VGSUQiLCJjb3Vyc2VJZCIsIk1lbWJlckZJRCIsIlN0dWRlbnRGSUQiLCJDcmVhdGVyIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJGbG5rSUQiLCJNZW1iZXJOYW1lIiwicGFyYW0iLCJBdHRlbmRNZW1iZXJzIiwiam9pbiIsInRoZW4iLCJyZXMiLCJGbGFnIiwic2V0U3RvcmFnZVN5bmMiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiUmVzdWx0T2JqIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwic2VsZWN0Q2xhc3NNYXRlIiwic3R1IiwidG9nZ2xlU3R1IiwiZmluZCIsImZvckVhY2giLCJvcHRpb24iLCJpbml0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0k7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7SUFFcUJBLGdCOzs7Ozs7Ozs7Ozs7Ozs4TUFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUlWQyxPLEdBQVUsRSxRQUNqQkMsTSxHQUFTLEVBQUMsZUFBYyxFQUFDLFFBQU8sTUFBUixFQUFlLFdBQVUsZ0NBQXpCLEVBQTBELGNBQWEsRUFBdkUsRUFBZixFLFFBQ1RD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O0FBQUE7O0FBQ0gsdUNBQWlCLEtBQUtVLE9BQUwsQ0FBYUMsVUFBYixDQUF3QjNCLFFBQXhCLENBQWlDNEIsTUFBbEQsRUFBMEQsS0FBS04sUUFBL0QsRUFBeUVXLElBQXpFLENBQThFLGVBQU87QUFDakYsdUJBQUsvQixjQUFMLEdBQXNCLENBQUNnQyxPQUFPLEVBQVIsRUFBWTdCLE1BQVosQ0FBbUI7QUFBQSwyQkFBUUMsS0FBS2tCLFVBQUwsS0FBb0IsT0FBS0UsT0FBTCxDQUFhQyxVQUFiLENBQXdCM0IsUUFBeEIsQ0FBaUM0QixNQUE3RDtBQUFBLGlCQUFuQixDQUF0QjtBQUNBLHVCQUFLMUIsY0FBTCxDQUFvQjZDLE9BQXBCLENBQTRCLGdCQUFRO0FBQ2hDekMseUJBQUtDLFVBQUwsR0FBa0IsS0FBbEI7QUFDSCxpQkFGRDtBQUdBLHVCQUFLUyxNQUFMO0FBQ0gsYUFORCxFQU1HLGVBQU87QUFDTix1QkFBS2QsY0FBTCxHQUFzQixFQUF0QjtBQUNBLHVCQUFLYyxNQUFMO0FBQ0gsYUFURDtBQVVIOzs7K0JBRU1nQyxNLEVBQVE7QUFDWCxpQkFBSzFCLFFBQUwsR0FBZ0IwQixPQUFPMUIsUUFBdkI7QUFDQSxpQkFBSzJCLElBQUw7QUFDSDs7OztFQWpHeUMsZUFBS0MsSTs7a0JBQTlCMUQsZ0IiLCJmaWxlIjoic2VsZWN0Q2xhc3NtYXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gICAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICAgIGltcG9ydCByaWNoQnV0dG9uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcmljaC1idXR0b24nXHJcbiAgICBpbXBvcnQgZW1wdHlDb250ZW50IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZW1wdHktY29udGVudCdcclxuXHJcbiAgICBpbXBvcnQge2dldENsYXNzbWF0ZUxpc3QsIGNyZWF0ZUNvdXJzZUdyb3VwfSBmcm9tICcuLi8uLi9hcGknXHJcblxyXG4gICAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VsZWN0Q2xhc3NtYXRlcyBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICAgICAgY29uZmlnID0ge1xyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6YCJ5oup5bCP57uE5oiQ5ZGYJ1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInJpY2gtYnV0dG9uXCI6e1widGV4dFwiOlwi5Yib5bu65a6M5oiQXCIsXCJpY29uU3JjXCI6XCIuLi8uLi9pbWFnZXMvd2FuY2hlbmcteGlhby5wbmdcIixcInhtbG5zOnYtb25cIjpcIlwifX07XHJcbiRldmVudHMgPSB7XCJyaWNoLWJ1dHRvblwiOntcInYtb246dGFwXCI6XCJmaW5pc2hDcmVhdGVcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgICAgICAgICAgJ3JpY2gtYnV0dG9uJzogcmljaEJ1dHRvbixcclxuICAgICAgICAgICAgJ2VtcHR5LWNvbnRlbnQnOiBlbXB0eUNvbnRlbnRcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRhdGEgPSB7XHJcbiAgICAgICAgICAgIHVzZXJJbmZvOiBudWxsLFxyXG4gICAgICAgICAgICBrZXk6ICcnLFxyXG4gICAgICAgICAgICBjbGFzc21hdGVzTGlzdDogW11cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbXB1dGVkID0ge1xyXG4gICAgICAgICAgICBzZWxlY3RlZENsYXNzbWF0ZXMoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbGFzc21hdGVzTGlzdC5maWx0ZXIoaXRlbSA9PiAhIWl0ZW0uaXNTZWxlY3RlZClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2hvd1N0dUxpc3QoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbGFzc21hdGVzTGlzdC5maWx0ZXIoaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uWE0gJiYgaXRlbS5YTS5pbmRleE9mKHRoaXMua2V5KSA+PSAwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtZXRob2RzID0ge1xyXG4gICAgICAgICAgICBvbklucHV0KGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMua2V5ID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25TZWFyY2goZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rZXkgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmaW5pc2hDcmVhdGUoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDmoKHpqozor6XlrabnlJ/mmK/lkKblnKjor6Xor77nqIvnmoTmn5DkuIDkuKrku7vliqHkuK3vvIzlpoLmnpzlnKjku7vliqHkuK3liJnml6Dms5XliJvlu7pcclxuICAgICAgICAgICAgICAgIGxldCBtb2RlbExpc3QgPSB0aGlzLnNlbGVjdGVkQ2xhc3NtYXRlcy5tYXAoaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ291cnNlRklEOiB0aGlzLmNvdXJzZUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBNZW1iZXJGSUQ6IGl0ZW0uU3R1ZGVudEZJRCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ3JlYXRlcjogdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8uRmxua0lELFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBNZW1iZXJOYW1lOiBpdGVtLlhNXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGxldCBwYXJhbSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBTdHVkZW50RklEOiB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mby5GbG5rSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgQ291cnNlRklEOiB0aGlzLmNvdXJzZUlkLFxyXG4gICAgICAgICAgICAgICAgICAgIEF0dGVuZE1lbWJlcnM6IHRoaXMuc2VsZWN0ZWRDbGFzc21hdGVzLm1hcChpdGVtID0+IGl0ZW0uWE0pLmpvaW4oJywnKSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbExpc3Q6IG1vZGVsTGlzdFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY3JlYXRlQ291cnNlR3JvdXAocGFyYW0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLkZsYWcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygnZ3JvdXBNZW1iZXJzJywgbW9kZWxMaXN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnL2NvdXJzZS9wYWdlcy9jcmVhdGVHcm91cFN1Y2Nlc3M/Y291cnNlSWQ9JyArIHRoaXMuY291cnNlSWQgKyAnJmdyb3VwSWQ9JyArIHJlcy5SZXN1bHRPYmpcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aTjeS9nOWksei0pScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aTjeS9nOWksei0pScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZWxlY3RDbGFzc01hdGUoc3R1KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG9nZ2xlU3R1ID0gdGhpcy5jbGFzc21hdGVzTGlzdC5maW5kKGl0ZW0gPT4gaXRlbS5TdHVkZW50RklEID09PSBzdHUuU3R1ZGVudEZJRClcclxuICAgICAgICAgICAgICAgIHRvZ2dsZVN0dS5pc1NlbGVjdGVkID0gIXRvZ2dsZVN0dS5pc1NlbGVjdGVkXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKSB7XHJcbiAgICAgICAgICAgIGdldENsYXNzbWF0ZUxpc3QodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8uRmxua0lELCB0aGlzLmNvdXJzZUlkKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzbWF0ZXNMaXN0ID0gKHJlcyB8fCBbXSkuZmlsdGVyKGl0ZW0gPT4gaXRlbS5TdHVkZW50RklEICE9PSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mby5GbG5rSUQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzbWF0ZXNMaXN0LmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5pc1NlbGVjdGVkID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH0sIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzbWF0ZXNMaXN0ID0gW11cclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uTG9hZChvcHRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5jb3Vyc2VJZCA9IG9wdGlvbi5jb3Vyc2VJZFxyXG4gICAgICAgICAgICB0aGlzLmluaXQoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuIl19