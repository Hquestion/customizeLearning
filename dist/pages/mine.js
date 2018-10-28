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

var _PersonPausedTasks = require('./../components/PersonPausedTasks.js');

var _PersonPausedTasks2 = _interopRequireDefault(_PersonPausedTasks);

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
        }, _this.$repeat = { "tRunningTasks": { "com": "t-course-task1", "props": "taskInfo.sync" }, "tCompleteTasks": { "com": "t-course-task2", "props": "taskInfo.sync" } }, _this.$props = { "t-course-task1": { "class": { "value": "t-task-comp", "for": "tRunningTasks", "item": "item", "index": "index", "key": "key" }, "v-bind:taskInfo.sync": { "value": "item", "type": "item", "for": "tRunningTasks", "item": "item", "index": "index", "key": "key" } }, "t-course-task2": { "class": { "value": "t-task-comp", "for": "tCompleteTasks", "item": "item", "index": "index", "key": "key" }, "v-bind:taskInfo.sync": { "value": "item", "type": "item", "for": "tCompleteTasks", "item": "item", "index": "index", "key": "key" } }, "personal-task1": { "class": "task-comp", "xmlns:v-bind": "", "v-bind:theme.sync": "userTheme", "v-bind:taskInfo.sync": "runningTask", "xmlns:v-on": "" }, "rich-button": { "theme": "grey", "text": "解除绑定" }, "person-paused-tasks": { "v-bind:commonTasks.sync": "commonTasks", "v-bind:theme.sync": "userTheme" } }, _this.$events = { "personal-task1": { "v-on:continue": "continueTask", "v-on:restart": "restartTask", "v-on:review": "reviewTask" }, "rich-button": { "v-on:tap": "onCancelRegister" } }, _this.components = {
            'personal-task1': _personalTask2.default,
            'personal-task2': _personalTask2.default,
            't-course-task1': _teacherCourseTask2.default,
            't-course-task2': _teacherCourseTask2.default,
            panel: _panel2.default,
            'rich-button': _richButton2.default,
            'person-paused-tasks': _PersonPausedTasks2.default
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
                    _wepy2.default.switchTab({
                        url: '/pages/practice'
                    });
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1pbmUuanMiXSwibmFtZXMiOlsiTWluZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwiZGF0YSIsInd4VXNlckluZm8iLCJ1c2VyTmFtZSIsInVzZXJDbGFzcyIsImlzVGVhY2hlciIsInVzZXJUaGVtZSIsIm15VGFza0xpc3QiLCJ0UnVubmluZ1Rhc2tzIiwidENvbXBsZXRlVGFza3MiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJwYW5lbCIsIndhdGNoIiwidmFsIiwib2xkdmFsIiwiZ2VuZGVyIiwiJGFwcGx5IiwiY29tcHV0ZWQiLCJydW5uaW5nVGFzayIsImZpbmQiLCJpdGVtIiwiU3RhdHVzIiwiSXNBY3RpdmF0aW9uR3JvdXAiLCJjb21tb25UYXNrcyIsImZpbHRlciIsIm1ldGhvZHMiLCJjb250aW51ZVRhc2siLCJ0YXNrIiwiYWN0aXZlVGFza0luZm8iLCJDb3Vyc2VGSUQiLCJHcm91cEZJRCIsIkZsbmtJRCIsInNldFN0b3JhZ2VTeW5jIiwic3dpdGNoVGFiIiwidXJsIiwicmVzdGFydFRhc2siLCJncm91cFRhc2tJZCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJ0aGVuIiwiZm9yRWFjaCIsImNoZWNrQ291cnNlIiwicmV2aWV3Q291cnNlR3JvdXAiLCJuYXZpZ2F0ZVRvIiwicmV2aWV3VGFzayIsIm9uQ2FuY2VsUmVnaXN0ZXIiLCJ0aGF0Iiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJyZWRpcmVjdFRvIiwiaWQiLCJYTSIsIlJvbGVOdW0iLCJpbml0VGVhY2hlclRhc2tzIiwiTkoiLCJCSkJIIiwiU2Nob29sRklEIiwibGFzdERheXMiLCJDcmVhdGVUaW1lIiwiYWxsVGFza3MiLCJzZXROYXZpZ2F0aW9uQmFyQ29sb3IiLCJiYWNrZ3JvdW5kQ29sb3Ii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TTtBQUV2QkMsZ0NBQVk7QUFGVyxpQkFBM0I7QUFJSDtBQUNELGlCQUFLQyxJQUFMO0FBQ0g7Ozs7RUFyTDZCLGVBQUtDLEk7O2tCQUFsQjNFLEkiLCJmaWxlIjoibWluZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gICAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICAgIGltcG9ydCBQZXJzb25hbFRhc2sgZnJvbSAnLi4vY29tcG9uZW50cy9wZXJzb25hbC10YXNrJ1xyXG4gICAgaW1wb3J0IFRlYWNoZXJDb3Vyc2VUYXNrIGZyb20gJy4uL2NvbXBvbmVudHMvdGVhY2hlci1jb3Vyc2UtdGFzaydcclxuICAgIGltcG9ydCBwYW5lbCBmcm9tICcuLi9jb21wb25lbnRzL3BhbmVsJ1xyXG4gICAgaW1wb3J0IHJpY2hCdXR0b24gZnJvbSAnLi4vY29tcG9uZW50cy9yaWNoLWJ1dHRvbidcclxuICAgIGltcG9ydCBQZXJzb25QYXVzZWRUYXNrcyBmcm9tICcuLi9jb21wb25lbnRzL1BlcnNvblBhdXNlZFRhc2tzJ1xyXG5cclxuICAgIGltcG9ydCB7Z2V0U3R1RGV0YWlsSW5mbywgZ2V0TXlDb3Vyc2VUYXNrcywgYWN0aXZhdGVHcm91cFRhc2ssIGNhbmNlbEJpbmR9IGZyb20gJy4uL2FwaSdcclxuICAgIGltcG9ydCB7Z2V0TGFzdERheXN9IGZyb20gJy4uL3V0aWwnXHJcblxyXG4gICAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWluZSBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICAgICAgY29uZmlnID0ge1xyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Liq5oCn5YyW5a2m5Lmg5Lit5b+DJyxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyMwMkNERjknXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkYXRhID0ge1xyXG4gICAgICAgICAgICB3eFVzZXJJbmZvOiBudWxsLFxyXG4gICAgICAgICAgICB1c2VyTmFtZTogJycsXHJcbiAgICAgICAgICAgIHVzZXJDbGFzczogJycsXHJcbiAgICAgICAgICAgIGlzVGVhY2hlcjogZmFsc2UsXHJcbiAgICAgICAgICAgIHVzZXJUaGVtZTogJ21hbGUnLFxyXG4gICAgICAgICAgICBteVRhc2tMaXN0OiBbXSxcclxuICAgICAgICAgICAgdFJ1bm5pbmdUYXNrczogW10sXHJcbiAgICAgICAgICAgIHRDb21wbGV0ZVRhc2tzOiBbXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAkcmVwZWF0ID0ge1widFJ1bm5pbmdUYXNrc1wiOntcImNvbVwiOlwidC1jb3Vyc2UtdGFzazFcIixcInByb3BzXCI6XCJ0YXNrSW5mby5zeW5jXCJ9LFwidENvbXBsZXRlVGFza3NcIjp7XCJjb21cIjpcInQtY291cnNlLXRhc2syXCIsXCJwcm9wc1wiOlwidGFza0luZm8uc3luY1wifX07XHJcbiRwcm9wcyA9IHtcInQtY291cnNlLXRhc2sxXCI6e1wiY2xhc3NcIjp7XCJ2YWx1ZVwiOlwidC10YXNrLWNvbXBcIixcImZvclwiOlwidFJ1bm5pbmdUYXNrc1wiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDp0YXNrSW5mby5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW1cIixcInR5cGVcIjpcIml0ZW1cIixcImZvclwiOlwidFJ1bm5pbmdUYXNrc1wiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifX0sXCJ0LWNvdXJzZS10YXNrMlwiOntcImNsYXNzXCI6e1widmFsdWVcIjpcInQtdGFzay1jb21wXCIsXCJmb3JcIjpcInRDb21wbGV0ZVRhc2tzXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOnRhc2tJbmZvLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJ0Q29tcGxldGVUYXNrc1wiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifX0sXCJwZXJzb25hbC10YXNrMVwiOntcImNsYXNzXCI6XCJ0YXNrLWNvbXBcIixcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6dGhlbWUuc3luY1wiOlwidXNlclRoZW1lXCIsXCJ2LWJpbmQ6dGFza0luZm8uc3luY1wiOlwicnVubmluZ1Rhc2tcIixcInhtbG5zOnYtb25cIjpcIlwifSxcInJpY2gtYnV0dG9uXCI6e1widGhlbWVcIjpcImdyZXlcIixcInRleHRcIjpcIuino+mZpOe7keWumlwifSxcInBlcnNvbi1wYXVzZWQtdGFza3NcIjp7XCJ2LWJpbmQ6Y29tbW9uVGFza3Muc3luY1wiOlwiY29tbW9uVGFza3NcIixcInYtYmluZDp0aGVtZS5zeW5jXCI6XCJ1c2VyVGhlbWVcIn19O1xyXG4kZXZlbnRzID0ge1wicGVyc29uYWwtdGFzazFcIjp7XCJ2LW9uOmNvbnRpbnVlXCI6XCJjb250aW51ZVRhc2tcIixcInYtb246cmVzdGFydFwiOlwicmVzdGFydFRhc2tcIixcInYtb246cmV2aWV3XCI6XCJyZXZpZXdUYXNrXCJ9LFwicmljaC1idXR0b25cIjp7XCJ2LW9uOnRhcFwiOlwib25DYW5jZWxSZWdpc3RlclwifX07XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICAgICAgICAncGVyc29uYWwtdGFzazEnOiBQZXJzb25hbFRhc2ssXHJcbiAgICAgICAgICAgICdwZXJzb25hbC10YXNrMic6IFBlcnNvbmFsVGFzayxcclxuICAgICAgICAgICAgJ3QtY291cnNlLXRhc2sxJzogVGVhY2hlckNvdXJzZVRhc2ssXHJcbiAgICAgICAgICAgICd0LWNvdXJzZS10YXNrMic6IFRlYWNoZXJDb3Vyc2VUYXNrLFxyXG4gICAgICAgICAgICBwYW5lbDogcGFuZWwsXHJcbiAgICAgICAgICAgICdyaWNoLWJ1dHRvbic6IHJpY2hCdXR0b24sXHJcbiAgICAgICAgICAgICdwZXJzb24tcGF1c2VkLXRhc2tzJzogUGVyc29uUGF1c2VkVGFza3NcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdhdGNoID0ge1xyXG4gICAgICAgICAgICB3eFVzZXJJbmZvOiBmdW5jdGlvbih2YWwsIG9sZHZhbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwuZ2VuZGVyID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXNlclRoZW1lID0gJ21hbGUnXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VyVGhlbWUgPSAnZmVtYWxlJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VyVGhlbWUgPSAnbWFsZSdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29tcHV0ZWQgPSB7XHJcbiAgICAgICAgICAgIHJ1bm5pbmdUYXNrKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubXlUYXNrTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm15VGFza0xpc3QuZmluZChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uU3RhdHVzID09PSAwICYmIGl0ZW0uSXNBY3RpdmF0aW9uR3JvdXBcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjb21tb25UYXNrcygpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm15VGFza0xpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5teVRhc2tMaXN0LmZpbHRlcihpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uU3RhdHVzICE9PSAwIHx8ICFpdGVtLklzQWN0aXZhdGlvbkdyb3VwXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlVGFzayh0YXNrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWN0aXZlVGFza0luZm8gPSB7Q291cnNlRklEOiB0YXNrLkNvdXJzZUZJRCwgR3JvdXBGSUQ6IHRhc2suRmxua0lEfVxyXG4gICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygnYWN0aXZlVGFza0luZm8nLCBhY3RpdmVUYXNrSW5mbylcclxuICAgICAgICAgICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvcGFnZXMvcHJhY3RpY2UnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXN0YXJ0VGFzayh0YXNrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZ3JvdXBUYXNrSWQgPSB0YXNrLkZsbmtJRFxyXG4gICAgICAgICAgICAgICAgbGV0IGFjdGl2ZVRhc2tJbmZvID0ge0NvdXJzZUZJRDogdGFzay5Db3Vyc2VGSUQsIEdyb3VwRklEOiBncm91cFRhc2tJZH1cclxuICAgICAgICAgICAgICAgIGFjdGl2YXRlR3JvdXBUYXNrKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvLkZsbmtJRCwgdGFzay5GbG5rSUQsIHRhc2suQ291cnNlRklEKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygnYWN0aXZlVGFza0luZm8nLCBhY3RpdmVUYXNrSW5mbylcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm15VGFza0xpc3QuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5Jc0FjdGl2YXRpb25Hcm91cCA9IGl0ZW0uRmxua0lEID09PSBncm91cFRhc2tJZFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnL3BhZ2VzL3ByYWN0aWNlJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjaGVja0NvdXJzZSh0YXNrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZ3JvdXBUYXNrSWQgPSB0YXNrLkZsbmtJRFxyXG4gICAgICAgICAgICAgICAgbGV0IGFjdGl2ZVRhc2tJbmZvID0ge0NvdXJzZUZJRDogdGFzay5Db3Vyc2VGSUQsIEdyb3VwRklEOiBncm91cFRhc2tJZH1cclxuICAgICAgICAgICAgICAgIGFjdGl2YXRlR3JvdXBUYXNrKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvLkZsbmtJRCwgdGFzay5GbG5rSUQsIHRhc2suQ291cnNlRklEKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygnYWN0aXZlVGFza0luZm8nLCBhY3RpdmVUYXNrSW5mbylcclxuICAgICAgICAgICAgICAgICAgICB3ZXB5LnN3aXRjaFRhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy9wYWdlcy9wcmFjdGljZSdcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmV2aWV3Q291cnNlR3JvdXAodGFzaykge1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvcHJhY3RpY2UvcGFnZXMvcmV2aWV3RmluaXNoVGFzaz9jb3Vyc2VJZD0nICsgdGFzay5Db3Vyc2VGSUQgKyAnJmdyb3VwSWQ9JyArIHRhc2suRmxua0lEXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXZpZXdUYXNrKHRhc2spIHtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL3ByYWN0aWNlL3BhZ2VzL3Jldmlld0ZpbmlzaFRhc2s/Y291cnNlSWQ9JyArIHRhc2suQ291cnNlRklEICsgJyZncm91cElkPScgKyB0YXNrLkZsbmtJRFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25DYW5jZWxSZWdpc3RlcigpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpc1xyXG4gICAgICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAn56Gu5a6a6KaB6Kej6Zmk57uR5a6a5ZCX77yf6Kej6Zmk57uR5a6a5ZCO77yM5oKo6ZyA6KaB6YeN5paw57uR5a6a5omN6IO957un57ut5a2m5Lmg5ZOmficsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxCaW5kKHRoYXQuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvLkZsbmtJRCkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy9wYWdlcy9yZWdpc3RlcidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKSB7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvLkZsbmtJRFxyXG4gICAgICAgICAgICB0aGlzLnVzZXJOYW1lID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8uWE1cclxuICAgICAgICAgICAgdGhpcy5pc1RlYWNoZXIgPSAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8uUm9sZU51bSArICcnKSA9PT0gJzInXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzVGVhY2hlcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0VGVhY2hlclRhc2tzKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZ2V0U3R1RGV0YWlsSW5mbyhpZCkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXNlckNsYXNzID0gcmVzLk5KICsgJ+W5tOe6p++8iCcgKyByZXMuQkpCSCArICfvvInnj60nXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGdldE15Q291cnNlVGFza3ModGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8uU2Nob29sRklELCBpZCkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXlUYXNrTGlzdCA9IHJlcyB8fCBbXVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXlUYXNrTGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5TdGF0dXMgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ubGFzdERheXMgPSBnZXRMYXN0RGF5cyhpdGVtLkNyZWF0ZVRpbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXRUZWFjaGVyVGFza3ModXNlckluZm8pIHtcclxuICAgICAgICAgICAgZ2V0TXlDb3Vyc2VUYXNrcyh1c2VySW5mby5TY2hvb2xGSUQsIHVzZXJJbmZvLkZsbmtJRCkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFsbFRhc2tzID0gcmVzIHx8IFtdXHJcbiAgICAgICAgICAgICAgICBhbGxUYXNrcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLlN0YXR1cyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmxhc3REYXlzID0gZ2V0TGFzdERheXMoaXRlbS5DcmVhdGVUaW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRDb21wbGV0ZVRhc2tzID0gYWxsVGFza3MuZmlsdGVyKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLlN0YXR1cyAhPT0gMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHRoaXMudFJ1bm5pbmdUYXNrcyA9IGFsbFRhc2tzLmZpbHRlcihpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5TdGF0dXMgPT09IDBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvblNob3coKSB7XHJcbiAgICAgICAgICAgIHRoaXMud3hVc2VySW5mbyA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnd4VXNlckluZm9cclxuICAgICAgICAgICAgaWYgKHRoaXMud3hVc2VySW5mby5nZW5kZXIgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHdlcHkuc2V0TmF2aWdhdGlvbkJhckNvbG9yKHtcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjMDJDREY5JyxcclxuICAgICAgICAgICAgICAgICAgICBmcm9udENvbG9yOiAnI2ZmZmZmZidcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5LnNldE5hdmlnYXRpb25CYXJDb2xvcih7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI0ZGN0Q3RCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZnJvbnRDb2xvcjogJyNmZmZmZmYnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4iXX0=