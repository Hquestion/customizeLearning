'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _personalTask = require('./../components/personal-task.js');

var _personalTask2 = _interopRequireDefault(_personalTask);

var _teacherCourseTask = require('./../components/teacher-course-task.js');

var _teacherCourseTask2 = _interopRequireDefault(_teacherCourseTask);

var _panel = require('./../components/panel.js');

var _panel2 = _interopRequireDefault(_panel);

var _richButton = require('./../components/rich-button.js');

var _richButton2 = _interopRequireDefault(_richButton);

var _api = require('./../api/index.js');

var _util = require('./../util/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mine = function (_wepy$page) {
    _inherits(Mine, _wepy$page);

    function Mine() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Mine);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Mine.__proto__ || Object.getPrototypeOf(Mine)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '个性化学习中心',
            navigationBarBackgroundColor: '#02CDF9'
        }, _this.data = {
            wxUserInfo: null,
            userName: '',
            userClass: '',
            isTeacher: false,
            userTheme: 'male',
            myTaskList: [],
            tRunningTasks: [],
            tCompleteTasks: []
        }, _this.$repeat = { "commonTasks": { "com": "personal-task2", "props": "taskInfo.sync" }, "tRunningTasks": { "com": "t-course-task1", "props": "taskInfo.sync" }, "tCompleteTasks": { "com": "t-course-task2", "props": "taskInfo.sync" } }, _this.$props = { "personal-task2": { "class": { "value": "task-comp", "for": "commonTasks", "item": "item", "index": "index", "key": "key" }, "v-bind:theme.sync": { "value": "userTheme", "for": "commonTasks", "item": "item", "index": "index", "key": "key" }, "v-bind:taskInfo.sync": { "value": "item", "type": "item", "for": "commonTasks", "item": "item", "index": "index", "key": "key" } }, "t-course-task1": { "class": { "value": "t-task-comp", "for": "tRunningTasks", "item": "item", "index": "index", "key": "key" }, "v-bind:taskInfo.sync": { "value": "item", "type": "item", "for": "tRunningTasks", "item": "item", "index": "index", "key": "key" } }, "t-course-task2": { "class": { "value": "t-task-comp", "for": "tCompleteTasks", "item": "item", "index": "index", "key": "key" }, "v-bind:taskInfo.sync": { "value": "item", "type": "item", "for": "tCompleteTasks", "item": "item", "index": "index", "key": "key" } }, "personal-task1": { "class": "task-comp", "xmlns:v-bind": "", "v-bind:theme.sync": "userTheme", "v-bind:taskInfo.sync": "runningTask", "xmlns:v-on": "" }, "rich-button": { "theme": "grey", "text": "解除绑定" } }, _this.$events = { "personal-task2": { "v-on:continue": "continueTask", "v-on:restart": "restartTask", "v-on:review": "reviewTask" }, "t-course-task1": { "v-on:teacher-check-course": "checkCourse" }, "t-course-task2": { "v-on:teacher-check-course": "reviewCourseGroup" }, "personal-task1": { "v-on:continue": "continueTask", "v-on:restart": "restartTask", "v-on:review": "reviewTask" }, "rich-button": { "v-on:tap": "onCancelRegister" } }, _this.components = {
            'personal-task1': _personalTask2.default,
            'personal-task2': _personalTask2.default,
            't-course-task1': _teacherCourseTask2.default,
            't-course-task2': _teacherCourseTask2.default,
            panel: _panel2.default,
            'rich-button': _richButton2.default
        }, _this.watch = {
            wxUserInfo: function wxUserInfo(val, oldval) {
                if (val) {
                    if (val.gender === 1) {
                        this.userTheme = 'male';
                    } else {
                        this.userTheme = 'female';
                    }
                } else {
                    this.userTheme = 'male';
                }
                this.$apply();
            }
        }, _this.computed = {
            runningTask: function runningTask() {
                if (this.myTaskList) {
                    return this.myTaskList.find(function (item) {
                        return item.Status === 0 && item.IsActivationGroup;
                    });
                } else {
                    return null;
                }
            },
            commonTasks: function commonTasks() {
                if (this.myTaskList) {
                    return this.myTaskList.filter(function (item) {
                        return item.Status !== 0 || !item.IsActivationGroup;
                    });
                } else {
                    return [];
                }
            }
        }, _this.methods = {
            continueTask: function continueTask(task) {
                var activeTaskInfo = { CourseFID: task.CourseFID, GroupFID: task.FlnkID };
                _wepy2.default.setStorageSync('activeTaskInfo', activeTaskInfo);
                _wepy2.default.switchTab({
                    url: '/pages/practice'
                });
            },
            restartTask: function restartTask(task) {
                var _this2 = this;

                var groupTaskId = task.FlnkID;
                var activeTaskInfo = { CourseFID: task.CourseFID, GroupFID: groupTaskId };
                (0, _api.activateGroupTask)(this.$parent.globalData.userInfo.FlnkID, task.FlnkID, task.CourseFID).then(function (res) {
                    _wepy2.default.setStorageSync('activeTaskInfo', activeTaskInfo);
                    _this2.myTaskList.forEach(function (item) {
                        item.IsActivationGroup = item.FlnkID === groupTaskId;
                    });
                    _this2.$apply();
                });
            },
            checkCourse: function checkCourse(task) {
                var groupTaskId = task.FlnkID;
                var activeTaskInfo = { CourseFID: task.CourseFID, GroupFID: groupTaskId };
                (0, _api.activateGroupTask)(this.$parent.globalData.userInfo.FlnkID, task.FlnkID, task.CourseFID).then(function (res) {
                    _wepy2.default.setStorageSync('activeTaskInfo', activeTaskInfo);
                    _wepy2.default.switchTab({
                        url: '/pages/practice'
                    });
                });
            },
            reviewCourseGroup: function reviewCourseGroup(task) {
                _wepy2.default.navigateTo({
                    url: '/practice/pages/reviewFinishTask?courseId=' + task.CourseFID + '&groupId=' + task.FlnkID
                });
            },
            reviewTask: function reviewTask(task) {
                _wepy2.default.navigateTo({
                    url: '/practice/pages/reviewFinishTask?courseId=' + task.CourseFID + '&groupId=' + task.FlnkID
                });
            },
            onCancelRegister: function onCancelRegister() {
                var that = this;
                _wepy2.default.showModal({
                    title: '提示',
                    content: '确定要解除绑定吗？解除绑定后，您需要重新绑定才能继续学习哦~',
                    success: function success(res) {
                        if (res.confirm) {
                            (0, _api.cancelBind)(that.$parent.globalData.userInfo.FlnkID).then(function (res) {
                                _wepy2.default.redirectTo({
                                    url: '/pages/register'
                                });
                            });
                        }
                    }
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Mine, [{
        key: 'init',
        value: function init() {
            var _this3 = this;

            var id = this.$parent.globalData.userInfo.FlnkID;
            this.userName = this.$parent.globalData.userInfo.XM;
            this.isTeacher = this.$parent.globalData.userInfo.RoleNum + '' === '2';
            if (this.isTeacher) {
                this.initTeacherTasks(this.$parent.globalData.userInfo);
            } else {
                (0, _api.getStuDetailInfo)(id).then(function (res) {
                    _this3.userClass = res.NJ + '年级（' + res.BJBH + '）班';
                    _this3.$apply();
                });
                (0, _api.getMyCourseTasks)(this.$parent.globalData.userInfo.SchoolFID, id).then(function (res) {
                    _this3.myTaskList = res || [];
                    _this3.myTaskList.forEach(function (item) {
                        if (item.Status === 0) {
                            item.lastDays = (0, _util.getLastDays)(item.CreateTime);
                        }
                    });
                    _this3.$apply();
                });
            }
        }
    }, {
        key: 'initTeacherTasks',
        value: function initTeacherTasks(userInfo) {
            var _this4 = this;

            (0, _api.getMyCourseTasks)(userInfo.SchoolFID, userInfo.FlnkID).then(function (res) {
                var allTasks = res || [];
                allTasks.forEach(function (item) {
                    if (item.Status === 0) {
                        item.lastDays = (0, _util.getLastDays)(item.CreateTime);
                    }
                });
                _this4.tCompleteTasks = allTasks.filter(function (item) {
                    return item.Status !== 0;
                });
                _this4.tRunningTasks = allTasks.filter(function (item) {
                    return item.Status === 0;
                });
                _this4.$apply();
            });
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            this.wxUserInfo = this.$parent.globalData.wxUserInfo;
            if (this.wxUserInfo.gender === 1) {
                _wepy2.default.setNavigationBarColor({
                    backgroundColor: '#02CDF9',
                    frontColor: '#ffffff'
                });
            } else {
                _wepy2.default.setNavigationBarColor({
                    backgroundColor: '#FF7D7D',
                    frontColor: '#ffffff'
                });
            }
            this.init();
        }
    }]);

    return Mine;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Mine , 'pages/mine'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1pbmUuanMiXSwibmFtZXMiOlsiTWluZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwiZGF0YSIsInd4VXNlckluZm8iLCJ1c2VyTmFtZSIsInVzZXJDbGFzcyIsImlzVGVhY2hlciIsInVzZXJUaGVtZSIsIm15VGFza0xpc3QiLCJ0UnVubmluZ1Rhc2tzIiwidENvbXBsZXRlVGFza3MiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJQZXJzb25hbFRhc2siLCJUZWFjaGVyQ291cnNlVGFzayIsInBhbmVsIiwicmljaEJ1dHRvbiIsIndhdGNoIiwidmFsIiwib2xkdmFsIiwiZ2VuZGVyIiwiJGFwcGx5IiwiY29tcHV0ZWQiLCJydW5uaW5nVGFzayIsImZpbmQiLCJpdGVtIiwiU3RhdHVzIiwiSXNBY3RpdmF0aW9uR3JvdXAiLCJjb21tb25UYXNrcyIsImZpbHRlciIsIm1ldGhvZHMiLCJjb250aW51ZVRhc2siLCJ0YXNrIiwiYWN0aXZlVGFza0luZm8iLCJDb3Vyc2VGSUQiLCJHcm91cEZJRCIsIkZsbmtJRCIsIndlcHkiLCJzZXRTdG9yYWdlU3luYyIsInN3aXRjaFRhYiIsInVybCIsInJlc3RhcnRUYXNrIiwiZ3JvdXBUYXNrSWQiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwidGhlbiIsImZvckVhY2giLCJjaGVja0NvdXJzZSIsInJldmlld0NvdXJzZUdyb3VwIiwibmF2aWdhdGVUbyIsInJldmlld1Rhc2siLCJvbkNhbmNlbFJlZ2lzdGVyIiwidGhhdCIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwicmVkaXJlY3RUbyIsImlkIiwiWE0iLCJSb2xlTnVtIiwiaW5pdFRlYWNoZXJUYXNrcyIsIk5KIiwiQkpCSCIsIlNjaG9vbEZJRCIsImxhc3REYXlzIiwiQ3JlYXRlVGltZSIsImFsbFRhc2tzIiwic2V0TmF2aWdhdGlvbkJhckNvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwiZnJvbnRDb2xvciIsImluaXQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDSTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7Ozs7O3NMQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QixTQURuQjtBQUVMQywwQ0FBOEI7QUFGekIsUyxRQUtUQyxJLEdBQU87QUFDSEMsd0JBQVksSUFEVDtBQUVIQyxzQkFBVSxFQUZQO0FBR0hDLHVCQUFXLEVBSFI7QUFJSEMsdUJBQVcsS0FKUjtBQUtIQyx1QkFBVyxNQUxSO0FBTUhDLHdCQUFZLEVBTlQ7QUFPSEMsMkJBQWUsRUFQWjtBQVFIQyw0QkFBZ0I7QUFSYixTLFFBV1JDLE8sR0FBVSxFQUFDLGVBQWMsRUFBQyxPQUFNLGdCQUFQLEVBQXdCLFNBQVEsZUFBaEMsRUFBZixFQUFnRSxpQkFBZ0IsRUFBQyxPQUFNLGdCQUFQLEVBQXdCLFNBQVEsZUFBaEMsRUFBaEYsRUFBaUksa0JBQWlCLEVBQUMsT0FBTSxnQkFBUCxFQUF3QixTQUFRLGVBQWhDLEVBQWxKLEUsUUFDakJDLE0sR0FBUyxFQUFDLGtCQUFpQixFQUFDLFNBQVEsRUFBQyxTQUFRLFdBQVQsRUFBcUIsT0FBTSxhQUEzQixFQUF5QyxRQUFPLE1BQWhELEVBQXVELFNBQVEsT0FBL0QsRUFBdUUsT0FBTSxLQUE3RSxFQUFULEVBQTZGLHFCQUFvQixFQUFDLFNBQVEsV0FBVCxFQUFxQixPQUFNLGFBQTNCLEVBQXlDLFFBQU8sTUFBaEQsRUFBdUQsU0FBUSxPQUEvRCxFQUF1RSxPQUFNLEtBQTdFLEVBQWpILEVBQXFNLHdCQUF1QixFQUFDLFNBQVEsTUFBVCxFQUFnQixRQUFPLE1BQXZCLEVBQThCLE9BQU0sYUFBcEMsRUFBa0QsUUFBTyxNQUF6RCxFQUFnRSxTQUFRLE9BQXhFLEVBQWdGLE9BQU0sS0FBdEYs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QUFnQix1QkFBWTNDLEtBQUs0QyxVQUFqQixDQUFoQjtBQUNIO0FBQ0osaUJBSkQ7QUFLQSx1QkFBSzdELGNBQUwsR0FBc0I4RCxTQUFTekMsTUFBVCxDQUFnQixnQkFBUTtBQUMxQywyQkFBT0osS0FBS0MsTUFBTCxLQUFnQixDQUF2QjtBQUNILGlCQUZxQixDQUF0QjtBQUdBLHVCQUFLbkIsYUFBTCxHQUFxQitELFNBQVN6QyxNQUFULENBQWdCLGdCQUFRO0FBQ3pDLDJCQUFPSixLQUFLQyxNQUFMLEtBQWdCLENBQXZCO0FBQ0gsaUJBRm9CLENBQXJCO0FBR0EsdUJBQUtMLE1BQUw7QUFDSCxhQWREO0FBZUg7OztpQ0FFUTtBQUNMLGlCQUFLcEIsVUFBTCxHQUFrQixLQUFLMEMsT0FBTCxDQUFhQyxVQUFiLENBQXdCM0MsVUFBMUM7QUFDQSxnQkFBSSxLQUFLQSxVQUFMLENBQWdCbUIsTUFBaEIsS0FBMkIsQ0FBL0IsRUFBa0M7QUFDOUJpQiwrQkFBS2tDLHFCQUFMLENBQTJCO0FBQ3ZCQyxxQ0FBaUIsU0FETTtBQUV2QkMsZ0NBQVk7QUFGVyxpQkFBM0I7QUFJSCxhQUxELE1BS087QUFDSHBDLCtCQUFLa0MscUJBQUwsQ0FBMkI7QUFDdkJDLHFDQUFpQixTQURNO0FBRXZCQyxnQ0FBWTtBQUZXLGlCQUEzQjtBQUlIO0FBQ0QsaUJBQUtDLElBQUw7QUFDSDs7OztFQWpMNkJyQyxlQUFLc0MsSTs7a0JBQWxCL0UsSSIsImZpbGUiOiJtaW5lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgICBpbXBvcnQgUGVyc29uYWxUYXNrIGZyb20gJy4uL2NvbXBvbmVudHMvcGVyc29uYWwtdGFzaydcbiAgICBpbXBvcnQgVGVhY2hlckNvdXJzZVRhc2sgZnJvbSAnLi4vY29tcG9uZW50cy90ZWFjaGVyLWNvdXJzZS10YXNrJ1xuICAgIGltcG9ydCBwYW5lbCBmcm9tICcuLi9jb21wb25lbnRzL3BhbmVsJ1xuICAgIGltcG9ydCByaWNoQnV0dG9uIGZyb20gJy4uL2NvbXBvbmVudHMvcmljaC1idXR0b24nXG5cbiAgICBpbXBvcnQge2dldFN0dURldGFpbEluZm8sIGdldE15Q291cnNlVGFza3MsIGFjdGl2YXRlR3JvdXBUYXNrLCBjYW5jZWxCaW5kfSBmcm9tICcuLi9hcGknXG4gICAgaW1wb3J0IHtnZXRMYXN0RGF5c30gZnJvbSAnLi4vdXRpbCdcblxuICAgIGV4cG9ydCBkZWZhdWx0IGNsYXNzIE1pbmUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgICAgICBjb25maWcgPSB7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Liq5oCn5YyW5a2m5Lmg5Lit5b+DJyxcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjMDJDREY5J1xuICAgICAgICB9XG5cbiAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgIHd4VXNlckluZm86IG51bGwsXG4gICAgICAgICAgICB1c2VyTmFtZTogJycsXG4gICAgICAgICAgICB1c2VyQ2xhc3M6ICcnLFxuICAgICAgICAgICAgaXNUZWFjaGVyOiBmYWxzZSxcbiAgICAgICAgICAgIHVzZXJUaGVtZTogJ21hbGUnLFxuICAgICAgICAgICAgbXlUYXNrTGlzdDogW10sXG4gICAgICAgICAgICB0UnVubmluZ1Rhc2tzOiBbXSxcbiAgICAgICAgICAgIHRDb21wbGV0ZVRhc2tzOiBbXVxuICAgICAgICB9XG5cbiAgICAgICAkcmVwZWF0ID0ge1wiY29tbW9uVGFza3NcIjp7XCJjb21cIjpcInBlcnNvbmFsLXRhc2syXCIsXCJwcm9wc1wiOlwidGFza0luZm8uc3luY1wifSxcInRSdW5uaW5nVGFza3NcIjp7XCJjb21cIjpcInQtY291cnNlLXRhc2sxXCIsXCJwcm9wc1wiOlwidGFza0luZm8uc3luY1wifSxcInRDb21wbGV0ZVRhc2tzXCI6e1wiY29tXCI6XCJ0LWNvdXJzZS10YXNrMlwiLFwicHJvcHNcIjpcInRhc2tJbmZvLnN5bmNcIn19O1xyXG4kcHJvcHMgPSB7XCJwZXJzb25hbC10YXNrMlwiOntcImNsYXNzXCI6e1widmFsdWVcIjpcInRhc2stY29tcFwiLFwiZm9yXCI6XCJjb21tb25UYXNrc1wiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDp0aGVtZS5zeW5jXCI6e1widmFsdWVcIjpcInVzZXJUaGVtZVwiLFwiZm9yXCI6XCJjb21tb25UYXNrc1wiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDp0YXNrSW5mby5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW1cIixcInR5cGVcIjpcIml0ZW1cIixcImZvclwiOlwiY29tbW9uVGFza3NcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn19LFwidC1jb3Vyc2UtdGFzazFcIjp7XCJjbGFzc1wiOntcInZhbHVlXCI6XCJ0LXRhc2stY29tcFwiLFwiZm9yXCI6XCJ0UnVubmluZ1Rhc2tzXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOnRhc2tJbmZvLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJ0UnVubmluZ1Rhc2tzXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9fSxcInQtY291cnNlLXRhc2syXCI6e1wiY2xhc3NcIjp7XCJ2YWx1ZVwiOlwidC10YXNrLWNvbXBcIixcImZvclwiOlwidENvbXBsZXRlVGFza3NcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6dGFza0luZm8uc3luY1wiOntcInZhbHVlXCI6XCJpdGVtXCIsXCJ0eXBlXCI6XCJpdGVtXCIsXCJmb3JcIjpcInRDb21wbGV0ZVRhc2tzXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9fSxcInBlcnNvbmFsLXRhc2sxXCI6e1wiY2xhc3NcIjpcInRhc2stY29tcFwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDp0aGVtZS5zeW5jXCI6XCJ1c2VyVGhlbWVcIixcInYtYmluZDp0YXNrSW5mby5zeW5jXCI6XCJydW5uaW5nVGFza1wiLFwieG1sbnM6di1vblwiOlwiXCJ9LFwicmljaC1idXR0b25cIjp7XCJ0aGVtZVwiOlwiZ3JleVwiLFwidGV4dFwiOlwi6Kej6Zmk57uR5a6aXCJ9fTtcclxuJGV2ZW50cyA9IHtcInBlcnNvbmFsLXRhc2syXCI6e1widi1vbjpjb250aW51ZVwiOlwiY29udGludWVUYXNrXCIsXCJ2LW9uOnJlc3RhcnRcIjpcInJlc3RhcnRUYXNrXCIsXCJ2LW9uOnJldmlld1wiOlwicmV2aWV3VGFza1wifSxcInQtY291cnNlLXRhc2sxXCI6e1widi1vbjp0ZWFjaGVyLWNoZWNrLWNvdXJzZVwiOlwiY2hlY2tDb3Vyc2VcIn0sXCJ0LWNvdXJzZS10YXNrMlwiOntcInYtb246dGVhY2hlci1jaGVjay1jb3Vyc2VcIjpcInJldmlld0NvdXJzZUdyb3VwXCJ9LFwicGVyc29uYWwtdGFzazFcIjp7XCJ2LW9uOmNvbnRpbnVlXCI6XCJjb250aW51ZVRhc2tcIixcInYtb246cmVzdGFydFwiOlwicmVzdGFydFRhc2tcIixcInYtb246cmV2aWV3XCI6XCJyZXZpZXdUYXNrXCJ9LFwicmljaC1idXR0b25cIjp7XCJ2LW9uOnRhcFwiOlwib25DYW5jZWxSZWdpc3RlclwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgICAgICAgJ3BlcnNvbmFsLXRhc2sxJzogUGVyc29uYWxUYXNrLFxuICAgICAgICAgICAgJ3BlcnNvbmFsLXRhc2syJzogUGVyc29uYWxUYXNrLFxuICAgICAgICAgICAgJ3QtY291cnNlLXRhc2sxJzogVGVhY2hlckNvdXJzZVRhc2ssXG4gICAgICAgICAgICAndC1jb3Vyc2UtdGFzazInOiBUZWFjaGVyQ291cnNlVGFzayxcbiAgICAgICAgICAgIHBhbmVsOiBwYW5lbCxcbiAgICAgICAgICAgICdyaWNoLWJ1dHRvbic6IHJpY2hCdXR0b25cbiAgICAgICAgfVxuXG4gICAgICAgIHdhdGNoID0ge1xuICAgICAgICAgICAgd3hVc2VySW5mbzogZnVuY3Rpb24odmFsLCBvbGR2YWwpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwuZ2VuZGVyID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJUaGVtZSA9ICdtYWxlJ1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VyVGhlbWUgPSAnZmVtYWxlJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VyVGhlbWUgPSAnbWFsZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29tcHV0ZWQgPSB7XG4gICAgICAgICAgICBydW5uaW5nVGFzaygpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5teVRhc2tMaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm15VGFza0xpc3QuZmluZChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLlN0YXR1cyA9PT0gMCAmJiBpdGVtLklzQWN0aXZhdGlvbkdyb3VwXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29tbW9uVGFza3MoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubXlUYXNrTGlzdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5teVRhc2tMaXN0LmZpbHRlcihpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLlN0YXR1cyAhPT0gMCB8fCAhaXRlbS5Jc0FjdGl2YXRpb25Hcm91cFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG1ldGhvZHMgPSB7XG4gICAgICAgICAgICBjb250aW51ZVRhc2sodGFzaykge1xuICAgICAgICAgICAgICAgIGxldCBhY3RpdmVUYXNrSW5mbyA9IHtDb3Vyc2VGSUQ6IHRhc2suQ291cnNlRklELCBHcm91cEZJRDogdGFzay5GbG5rSUR9XG4gICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygnYWN0aXZlVGFza0luZm8nLCBhY3RpdmVUYXNrSW5mbylcbiAgICAgICAgICAgICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9wYWdlcy9wcmFjdGljZSdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlc3RhcnRUYXNrKHRhc2spIHtcbiAgICAgICAgICAgICAgICBsZXQgZ3JvdXBUYXNrSWQgPSB0YXNrLkZsbmtJRFxuICAgICAgICAgICAgICAgIGxldCBhY3RpdmVUYXNrSW5mbyA9IHtDb3Vyc2VGSUQ6IHRhc2suQ291cnNlRklELCBHcm91cEZJRDogZ3JvdXBUYXNrSWR9XG4gICAgICAgICAgICAgICAgYWN0aXZhdGVHcm91cFRhc2sodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8uRmxua0lELCB0YXNrLkZsbmtJRCwgdGFzay5Db3Vyc2VGSUQpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygnYWN0aXZlVGFza0luZm8nLCBhY3RpdmVUYXNrSW5mbylcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5teVRhc2tMaXN0LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLklzQWN0aXZhdGlvbkdyb3VwID0gaXRlbS5GbG5rSUQgPT09IGdyb3VwVGFza0lkXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoZWNrQ291cnNlKHRhc2spIHtcbiAgICAgICAgICAgICAgICBsZXQgZ3JvdXBUYXNrSWQgPSB0YXNrLkZsbmtJRFxuICAgICAgICAgICAgICAgIGxldCBhY3RpdmVUYXNrSW5mbyA9IHtDb3Vyc2VGSUQ6IHRhc2suQ291cnNlRklELCBHcm91cEZJRDogZ3JvdXBUYXNrSWR9XG4gICAgICAgICAgICAgICAgYWN0aXZhdGVHcm91cFRhc2sodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8uRmxua0lELCB0YXNrLkZsbmtJRCwgdGFzay5Db3Vyc2VGSUQpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygnYWN0aXZlVGFza0luZm8nLCBhY3RpdmVUYXNrSW5mbylcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnL3BhZ2VzL3ByYWN0aWNlJ1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmV2aWV3Q291cnNlR3JvdXAodGFzaykge1xuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9wcmFjdGljZS9wYWdlcy9yZXZpZXdGaW5pc2hUYXNrP2NvdXJzZUlkPScgKyB0YXNrLkNvdXJzZUZJRCArICcmZ3JvdXBJZD0nICsgdGFzay5GbG5rSURcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJldmlld1Rhc2sodGFzaykge1xuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9wcmFjdGljZS9wYWdlcy9yZXZpZXdGaW5pc2hUYXNrP2NvdXJzZUlkPScgKyB0YXNrLkNvdXJzZUZJRCArICcmZ3JvdXBJZD0nICsgdGFzay5GbG5rSURcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uQ2FuY2VsUmVnaXN0ZXIoKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzXG4gICAgICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfnoa7lrpropoHop6PpmaTnu5HlrprlkJfvvJ/op6PpmaTnu5HlrprlkI7vvIzmgqjpnIDopoHph43mlrDnu5HlrprmiY3og73nu6fnu63lrabkuaDlk6Z+JyxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbEJpbmQodGhhdC4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8uRmxua0lEKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcvcGFnZXMvcmVnaXN0ZXInXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpbml0KCkge1xuICAgICAgICAgICAgbGV0IGlkID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8uRmxua0lEXG4gICAgICAgICAgICB0aGlzLnVzZXJOYW1lID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8uWE1cbiAgICAgICAgICAgIHRoaXMuaXNUZWFjaGVyID0gKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvLlJvbGVOdW0gKyAnJykgPT09ICcyJ1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNUZWFjaGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0VGVhY2hlclRhc2tzKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBnZXRTdHVEZXRhaWxJbmZvKGlkKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXNlckNsYXNzID0gcmVzLk5KICsgJ+W5tOe6p++8iCcgKyByZXMuQkpCSCArICfvvInnj60nXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGdldE15Q291cnNlVGFza3ModGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8uU2Nob29sRklELCBpZCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm15VGFza0xpc3QgPSByZXMgfHwgW11cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5teVRhc2tMaXN0LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5TdGF0dXMgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmxhc3REYXlzID0gZ2V0TGFzdERheXMoaXRlbS5DcmVhdGVUaW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGluaXRUZWFjaGVyVGFza3ModXNlckluZm8pIHtcbiAgICAgICAgICAgIGdldE15Q291cnNlVGFza3ModXNlckluZm8uU2Nob29sRklELCB1c2VySW5mby5GbG5rSUQpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYWxsVGFza3MgPSByZXMgfHwgW11cbiAgICAgICAgICAgICAgICBhbGxUYXNrcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5TdGF0dXMgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ubGFzdERheXMgPSBnZXRMYXN0RGF5cyhpdGVtLkNyZWF0ZVRpbWUpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHRoaXMudENvbXBsZXRlVGFza3MgPSBhbGxUYXNrcy5maWx0ZXIoaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLlN0YXR1cyAhPT0gMFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgdGhpcy50UnVubmluZ1Rhc2tzID0gYWxsVGFza3MuZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5TdGF0dXMgPT09IDBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBvblNob3coKSB7XG4gICAgICAgICAgICB0aGlzLnd4VXNlckluZm8gPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS53eFVzZXJJbmZvXG4gICAgICAgICAgICBpZiAodGhpcy53eFVzZXJJbmZvLmdlbmRlciA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHdlcHkuc2V0TmF2aWdhdGlvbkJhckNvbG9yKHtcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzAyQ0RGOScsXG4gICAgICAgICAgICAgICAgICAgIGZyb250Q29sb3I6ICcjZmZmZmZmJ1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdlcHkuc2V0TmF2aWdhdGlvbkJhckNvbG9yKHtcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI0ZGN0Q3RCcsXG4gICAgICAgICAgICAgICAgICAgIGZyb250Q29sb3I6ICcjZmZmZmZmJ1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmluaXQoKVxuICAgICAgICB9XG4gICAgfVxuIl19