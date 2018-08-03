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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1pbmUuanMiXSwibmFtZXMiOlsiTWluZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwiZGF0YSIsInd4VXNlckluZm8iLCJ1c2VyTmFtZSIsInVzZXJDbGFzcyIsImlzVGVhY2hlciIsInVzZXJUaGVtZSIsIm15VGFza0xpc3QiLCJ0UnVubmluZ1Rhc2tzIiwidENvbXBsZXRlVGFza3MiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJQZXJzb25hbFRhc2siLCJUZWFjaGVyQ291cnNlVGFzayIsInBhbmVsIiwicmljaEJ1dHRvbiIsIlBlcnNvblBhdXNlZFRhc2tzIiwid2F0Y2giLCJ2YWwiLCJvbGR2YWwiLCJnZW5kZXIiLCIkYXBwbHkiLCJjb21wdXRlZCIsInJ1bm5pbmdUYXNrIiwiZmluZCIsIml0ZW0iLCJTdGF0dXMiLCJJc0FjdGl2YXRpb25Hcm91cCIsImNvbW1vblRhc2tzIiwiZmlsdGVyIiwibWV0aG9kcyIsImNvbnRpbnVlVGFzayIsInRhc2siLCJhY3RpdmVUYXNrSW5mbyIsIkNvdXJzZUZJRCIsIkdyb3VwRklEIiwiRmxua0lEIiwid2VweSIsInNldFN0b3JhZ2VTeW5jIiwic3dpdGNoVGFiIiwidXJsIiwicmVzdGFydFRhc2siLCJncm91cFRhc2tJZCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJ0aGVuIiwiZm9yRWFjaCIsImNoZWNrQ291cnNlIiwicmV2aWV3Q291cnNlR3JvdXAiLCJuYXZpZ2F0ZVRvIiwicmV2aWV3VGFzayIsIm9uQ2FuY2VsUmVnaXN0ZXIiLCJ0aGF0Iiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJyZWRpcmVjdFRvIiwiaWQiLCJYTSIsIlJvbGVOdW0iLCJpbml0VGVhY2hlclRhc2tzIiwiTkoiLCJCSkJIIiwiU2Nob29sRklEIiwibGFzdERheXMiLCJDcmVhdGVUaW1lIiwiYWxsVGFza3MiLCJzZXROYXZpZ2F0aW9uQmFyQ29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJmcm9udENvbG9yIiwiaW5pdCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNJOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztzTEFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0IsU0FEbkI7QUFFTEMsMENBQThCO0FBRnpCLFMsUUFLVEMsSSxHQUFPO0FBQ0hDLHdCQUFZLElBRFQ7QUFFSEMsc0JBQVUsRUFGUDtBQUdIQyx1QkFBVyxFQUhSO0FBSUhDLHVCQUFXLEtBSlI7QUFLSEMsdUJBQVcsTUFMUjtBQU1IQyx3QkFBWSxFQU5UO0FBT0hDLDJCQUFlLEVBUFo7QUFRSEMsNEJBQWdCO0FBUmIsUyxRQVdSQyxPLEdBQVUsRUFBQyxpQkFBZ0IsRUFBQyxPQUFNLGdCQUFQLEVBQXdCLFNBQVEsZUFBaEMsRUFBakIsRUFBa0Usa0JBQWlCLEVBQUMsT0FBTSxnQkFBUCxFQUF3QixTQUFRLGVBQWhDLEVBQW5GLEUsUUFDakJDLE0sR0FBUyxFQUFDLGtCQUFpQixFQUFDLFNBQVEsRUFBQyxTQUFRLGFBQVQsRUFBdUIsT0FBTSxlQUE3QixFQUE2QyxRQUFPLE1BQXBELEVBQTJELFNBQVEsT0FBbkUsRUFBMkUsT0FBTSxLQUFqRixFQUFULEVBQWlHLHdCQUF1QixFQUFDLFNBQVEsTUFBVCxFQUFnQixRQUFPLE1BQXZCLEVBQThCLE9BQU0sZUFBcEMsRUFBb0QsUUFBTyxNQUEzRCxFQUFrRSxTQUFRLE9BQTFFLEVBQWtGLE9BQU0sS0FBeEYsRUFBeEgsRUFBbEIsRUFBME8sa0JBQWlCLEVBQUMsU0FBUSxFQUFDLFNBQVEsYUFBVCxFQUF1QixPQUFNLGdCQUE3QixFQUE4QyxRQUFPLE1BQXJELEVBQTRELFNBQVEsT0FBcEUsRUFBNEUsT0FBTSxLQUFsRixFQUFULEVBQWtHLHdCQUF1QixFQUFDLFNBQVEsTUFBVCxFQUFnQixRQUFPLE1BQXZCLEVBQThCLE9BQU0sZ0JBQXBDLEVBQXFELFFBQU8sTUFBNUQsRUFBbUUsU0FBUSxPQUEzRSxFQUFtRixPQUFNLEtBQXpGLEVBQXpILEVBQTNQLEVBQXFkLGtCQUFpQixFQUFDLFNBQVEsV0FBVCxFQUFxQixnQkFBZSxFQUFwQyxFQUF1QyxxQkFBb0IsV0FBM0QsRUFBdUUsd0JBQXVCLGFBQTlGLEVBQTRHLGNBQWEsRUFBekgsRUFBdGUsRUFBbW1CLGVBQWMsRUFBQyxTQUFRLE1BQVQsRUFBZ0IsUUFBTyxNQUF2QixFQUFqbkIsRUFBZ3BCLHVCQUFzQixFQUFDLDJCQUEwQixhQUEzQixFQUF5QyxxQkFBb0IsV0FBN0QsRUFBdHFCLEUsUUFDVEMsTyxHQUFVLEVBQUMsa0JBQWlCLEVBQUMsaUJBQWdCLGNBQWpCLEVBQWdDLGdCQUFlLGFBQS9DLEVBQTZELGVBQWMsWUFBM0UsRUFBbEIsRUFBMkcsZUFBYyxFQUFDLFlBQVcsa0JBQVosRUFBekgsRSxRQUNUQyxVLEdBQWE7QUFDRiw4QkFBa0JDLHNCQURoQjtBQUVGLDhCQUFrQkEsc0JBRmhCO0FBR0YsOEJBQWtCQywyQkFIaEI7QUFJRiw4QkFBa0JBLDJCQUpoQjtBQUtGQyxtQkFBT0EsZUFMTDtBQU1GLDJCQUFlQyxvQkFOYjtBQU9GLG1DQUF1QkM7QUFQckIsUyxRQVVOQyxLLEdBQVE7QUFDSmpCLHdCQUFZLG9CQUFTa0IsR0FBVCxFQUFjQyxNQUFkLEVBQXNCO0FBQzlCLG9CQUFJRCxHQUFKLEVBQVM7QUFDTCx3QkFBSUEsSUFBSUUsTUFBSixLQUFlLENBQW5CLEVBQXNCO0FBQ2xCLDZCQUFLaEIsU0FBTCxHQUFpQixNQUFqQjtBQUNILHFCQUZELE1BRU87QUFDSCw2QkFBS0EsU0FBTCxHQUFpQixRQUFqQjtBQUNIO0FBQ0osaUJBTkQsTUFNTztBQUNILHlCQUFLQSxTQUFMLEdBQWlCLE1BQWpCO0FBQ0g7QUFDRCxxQkFBS2lCLE1BQUw7QUFDSDtBQVpHLFMsUUFlUkMsUSxHQUFXO0FBQ1BDLHVCQURPLHlCQUNPO0FBQ1Ysb0JBQUksS0FBS2xCLFVBQVQsRUFBcUI7QUFDakIsMkJBQU8sS0FBS0EsVUFBTCxDQUFnQm1CLElBQWhCLENBQXFCLGdCQUFRO0FBQ2hDLCtCQUFPQyxLQUFLQyxNQUFMLEtBQWdCLENBQWhCLElBQXFCRCxLQUFLRSxpQkFBakM7QUFDSCxxQkFGTSxDQUFQO0FBR0gsaUJBSkQsTUFJTztBQUNILDJCQUFPLElBQVA7QUFDSDtBQUNKLGFBVE07QUFVUEMsdUJBVk8seUJBVU87QUFDVixvQkFBSSxLQUFLdkIsVUFBVCxFQUFxQjtBQUNqQiwyQkFBTyxLQUFLQSxVQUFMLENBQWdCd0IsTUFBaEIsQ0FBdUIsZ0JBQVE7QUFDbEMsK0JBQU9KLEtBQUtDLE1BQUwsS0FBZ0IsQ0FBaEIsSUFBcUIsQ0FBQ0QsS0FBS0UsaUJBQWxDO0FBQ0gscUJBRk0sQ0FBUDtBQUdILGlCQUpELE1BSU87QUFDSCwyQkFBTyxFQUFQO0FBQ0g7QUFDSjtBQWxCTSxTLFFBcUJYRyxPLEdBQVU7QUFDTkMsd0JBRE0sd0JBQ09DLElBRFAsRUFDYTtBQUNmLG9CQUFJQyxpQkFBaUIsRUFBQ0MsV0FBV0YsS0FBS0UsU0FBakIsRUFBNEJDLFVBQVVILEtBQUtJLE1BQTNDLEVBQXJCO0FBQ0FDLCtCQUFLQyxjQUFMLENBQW9CLGdCQUFwQixFQUFzQ0wsY0FBdEM7QUFDQUksK0JBQUtFLFNBQUwsQ0FBZTtBQUNYQyx5QkFBSztBQURNLGlCQUFmO0FBR0gsYUFQSztBQVFOQyx1QkFSTSx1QkFRTVQsSUFSTixFQVFZO0FBQUE7O0FBQ2Qsb0JBQUlVLGNBQWNWLEtBQUtJLE1BQXZCO0FBQ0Esb0JBQUlILGlCQUFpQixFQUFDQyxXQUFXRixLQUFLRSxTQUFqQixFQUE0QkMsVUFBVU8sV0FBdEMsRUFBckI7QUFDQSw0Q0FBa0IsS0FBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCQyxRQUF4QixDQUFpQ1QsTUFBbkQsRUFBMkRKLEtBQUtJLE1BQWhFLEVBQXdFSixLQUFLRSxTQUE3RSxFQUF3RlksSUFBeEYsQ0FBNkYsZUFBTztBQUNoR1QsbUNBQUtDLGNBQUwsQ0FBb0IsZ0JBQXBCLEVBQXNDTCxjQUF0QztBQUNBLDJCQUFLNUIsVUFBTCxDQUFnQjBDLE9BQWhCLENBQXdCLGdCQUFRO0FBQzVCdEIsNkJBQUtFLGlCQUFMLEdBQXlCRixLQUFLVyxNQUFMLEtBQWdCTSxXQUF6QztBQUNILHFCQUZEO0FBR0EsMkJBQUtyQixNQUFMO0FBQ0FnQixtQ0FBS0UsU0FBTCxDQUFlO0FBQ1hDLDZCQUFLO0FBRE0scUJBQWY7QUFHSCxpQkFURDtBQVVILGFBckJLO0FBc0JOUSx1QkF0Qk0sdUJBc0JNaEIsSUF0Qk4sRUFzQlk7QUFDZCxvQkFBSVUsY0FBY1YsS0FBS0ksTUFBdkI7QUFDQSxvQkFBSUgsaUJBQWlCLEVBQUNDLFdBQVdGLEtBQUtFLFNBQWpCLEVBQTRCQyxVQUFVTyxXQUF0QyxFQUFyQjtBQUNBLDRDQUFrQixLQUFLQyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JDLFFBQXhCLENBQWlDVCxNQUFuRCxFQUEyREosS0FBS0ksTUFBaEUsRUFBd0VKLEtBQUtFLFNBQTdFLEVBQXdGWSxJQUF4RixDQUE2RixlQUFPO0FBQ2hHVCxtQ0FBS0MsY0FBTCxDQUFvQixnQkFBcEIsRUFBc0NMLGNBQXRDO0FBQ0FJLG1DQUFLRSxTQUFMLENBQWU7QUFDWEMsNkJBQUs7QUFETSxxQkFBZjtBQUdILGlCQUxEO0FBTUgsYUEvQks7QUFnQ05TLDZCQWhDTSw2QkFnQ1lqQixJQWhDWixFQWdDa0I7QUFDcEJLLCtCQUFLYSxVQUFMLENBQWdCO0FBQ1pWLHlCQUFLLCtDQUErQ1IsS0FBS0UsU0FBcEQsR0FBZ0UsV0FBaEUsR0FBOEVGLEtBQUtJO0FBRDVFLGlCQUFoQjtBQUdILGFBcENLO0FBcUNOZSxzQkFyQ00sc0JBcUNLbkIsSUFyQ0wsRUFxQ1c7QUFDYkssK0JBQUthLFVBQUwsQ0FBZ0I7QUFDWlYseUJBQUssK0NBQStDUixLQUFLRSxTQUFwRCxHQUFnRSxXQUFoRSxHQUE4RUYsS0FBS0k7QUFENUUsaUJBQWhCO0FBR0gsYUF6Q0s7QUEwQ05nQiw0QkExQ00sOEJBMENhO0FBQ2Ysb0JBQUlDLE9BQU8sSUFBWDtBQUNBaEIsK0JBQUtpQixTQUFMLENBQWU7QUFDWEMsMkJBQU8sSUFESTtBQUVYQyw2QkFBUyxnQ0FGRTtBQUdYQywyQkFIVyxtQkFHSEMsR0FIRyxFQUdFO0FBQ1QsNEJBQUlBLElBQUlDLE9BQVIsRUFBaUI7QUFDYixpREFBV04sS0FBS1YsT0FBTCxDQUFhQyxVQUFiLENBQXdCQyxRQUF4QixDQUFpQ1QsTUFBNUMsRUFBb0RVLElBQXBELENBQXlELGVBQU87QUFDNURULCtDQUFLdUIsVUFBTCxDQUFnQjtBQUNacEIseUNBQUs7QUFETyxpQ0FBaEI7QUFHSCw2QkFKRDtBQUtIO0FBQ0o7QUFYVSxpQkFBZjtBQWFIO0FBekRLLFM7Ozs7OytCQTRESDtBQUFBOztBQUNILGdCQUFJcUIsS0FBSyxLQUFLbEIsT0FBTCxDQUFhQyxVQUFiLENBQXdCQyxRQUF4QixDQUFpQ1QsTUFBMUM7QUFDQSxpQkFBS25DLFFBQUwsR0FBZ0IsS0FBSzBDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkMsUUFBeEIsQ0FBaUNpQixFQUFqRDtBQUNBLGlCQUFLM0QsU0FBTCxHQUFrQixLQUFLd0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCQyxRQUF4QixDQUFpQ2tCLE9BQWpDLEdBQTJDLEVBQTVDLEtBQW9ELEdBQXJFO0FBQ0EsZ0JBQUksS0FBSzVELFNBQVQsRUFBb0I7QUFDaEIscUJBQUs2RCxnQkFBTCxDQUFzQixLQUFLckIsT0FBTCxDQUFhQyxVQUFiLENBQXdCQyxRQUE5QztBQUNILGFBRkQsTUFFTztBQUNILDJDQUFpQmdCLEVBQWpCLEVBQXFCZixJQUFyQixDQUEwQixlQUFPO0FBQzdCLDJCQUFLNUMsU0FBTCxHQUFpQndELElBQUlPLEVBQUosR0FBUyxLQUFULEdBQWlCUCxJQUFJUSxJQUFyQixHQUE0QixJQUE3QztBQUNBLDJCQUFLN0MsTUFBTDtBQUNILGlCQUhEO0FBSUEsMkNBQWlCLEtBQUtzQixPQUFMLENBQWFDLFVBQWIsQ0FBd0JDLFFBQXhCLENBQWlDc0IsU0FBbEQsRUFBNkROLEVBQTdELEVBQWlFZixJQUFqRSxDQUFzRSxlQUFPO0FBQ3pFLDJCQUFLekMsVUFBTCxHQUFrQnFELE9BQU8sRUFBekI7QUFDQSwyQkFBS3JELFVBQUwsQ0FBZ0IwQyxPQUFoQixDQUF3QixnQkFBUTtBQUM1Qiw0QkFBSXRCLEtBQUtDLE1BQUwsS0FBZ0IsQ0FBcEIsRUFBdUI7QUFDbkJELGlDQUFLMkMsUUFBTCxHQUFnQix1QkFBWTNDLEtBQUs0QyxVQUFqQixDQUFoQjtBQUNIO0FBQ0oscUJBSkQ7QUFLQSwyQkFBS2hELE1BQUw7QUFDSCxpQkFSRDtBQVNIO0FBQ0o7Ozt5Q0FFZ0J3QixRLEVBQVU7QUFBQTs7QUFDdkIsdUNBQWlCQSxTQUFTc0IsU0FBMUIsRUFBcUN0QixTQUFTVCxNQUE5QyxFQUFzRFUsSUFBdEQsQ0FBMkQsZUFBTztBQUM5RCxvQkFBSXdCLFdBQVdaLE9BQU8sRUFBdEI7QUFDQVkseUJBQVN2QixPQUFULENBQWlCLGdCQUFRO0FBQ3JCLHdCQUFJdEIsS0FBS0MsTUFBTCxLQUFnQixDQUFwQixFQUF1QjtBQUNuQkQsNkJBQUsyQyxRQUFMLEdBQWdCLHVCQUFZM0MsS0FBSzRDLFVBQWpCLENBQWhCO0FBQ0g7QUFDSixpQkFKRDtBQUtBLHVCQUFLOUQsY0FBTCxHQUFzQitELFNBQVN6QyxNQUFULENBQWdCLGdCQUFRO0FBQzFDLDJCQUFPSixLQUFLQyxNQUFMLEtBQWdCLENBQXZCO0FBQ0gsaUJBRnFCLENBQXRCO0FBR0EsdUJBQUtwQixhQUFMLEdBQXFCZ0UsU0FBU3pDLE1BQVQsQ0FBZ0IsZ0JBQVE7QUFDekMsMkJBQU9KLEtBQUtDLE1BQUwsS0FBZ0IsQ0FBdkI7QUFDSCxpQkFGb0IsQ0FBckI7QUFHQSx1QkFBS0wsTUFBTDtBQUNILGFBZEQ7QUFlSDs7O2lDQUVRO0FBQ0wsaUJBQUtyQixVQUFMLEdBQWtCLEtBQUsyQyxPQUFMLENBQWFDLFVBQWIsQ0FBd0I1QyxVQUExQztBQUNBLGdCQUFJLEtBQUtBLFVBQUwsQ0FBZ0JvQixNQUFoQixLQUEyQixDQUEvQixFQUFrQztBQUM5QmlCLCtCQUFLa0MscUJBQUwsQ0FBMkI7QUFDdkJDLHFDQUFpQixTQURNO0FBRXZCQyxnQ0FBWTtBQUZXLGlCQUEzQjtBQUlILGFBTEQsTUFLTztBQUNIcEMsK0JBQUtrQyxxQkFBTCxDQUEyQjtBQUN2QkMscUNBQWlCLFNBRE07QUFFdkJDLGdDQUFZO0FBRlcsaUJBQTNCO0FBSUg7QUFDRCxpQkFBS0MsSUFBTDtBQUNIOzs7O0VBckw2QnJDLGVBQUtzQyxJOztrQkFBbEJoRixJIiwiZmlsZSI6Im1pbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICAgIGltcG9ydCBQZXJzb25hbFRhc2sgZnJvbSAnLi4vY29tcG9uZW50cy9wZXJzb25hbC10YXNrJ1xuICAgIGltcG9ydCBUZWFjaGVyQ291cnNlVGFzayBmcm9tICcuLi9jb21wb25lbnRzL3RlYWNoZXItY291cnNlLXRhc2snXG4gICAgaW1wb3J0IHBhbmVsIGZyb20gJy4uL2NvbXBvbmVudHMvcGFuZWwnXG4gICAgaW1wb3J0IHJpY2hCdXR0b24gZnJvbSAnLi4vY29tcG9uZW50cy9yaWNoLWJ1dHRvbidcbiAgICBpbXBvcnQgUGVyc29uUGF1c2VkVGFza3MgZnJvbSAnLi4vY29tcG9uZW50cy9QZXJzb25QYXVzZWRUYXNrcydcblxuICAgIGltcG9ydCB7Z2V0U3R1RGV0YWlsSW5mbywgZ2V0TXlDb3Vyc2VUYXNrcywgYWN0aXZhdGVHcm91cFRhc2ssIGNhbmNlbEJpbmR9IGZyb20gJy4uL2FwaSdcbiAgICBpbXBvcnQge2dldExhc3REYXlzfSBmcm9tICcuLi91dGlsJ1xuXG4gICAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWluZSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgICAgIGNvbmZpZyA9IHtcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkuKrmgKfljJblrabkuaDkuK3lv4MnLFxuICAgICAgICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyMwMkNERjknXG4gICAgICAgIH1cblxuICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgd3hVc2VySW5mbzogbnVsbCxcbiAgICAgICAgICAgIHVzZXJOYW1lOiAnJyxcbiAgICAgICAgICAgIHVzZXJDbGFzczogJycsXG4gICAgICAgICAgICBpc1RlYWNoZXI6IGZhbHNlLFxuICAgICAgICAgICAgdXNlclRoZW1lOiAnbWFsZScsXG4gICAgICAgICAgICBteVRhc2tMaXN0OiBbXSxcbiAgICAgICAgICAgIHRSdW5uaW5nVGFza3M6IFtdLFxuICAgICAgICAgICAgdENvbXBsZXRlVGFza3M6IFtdXG4gICAgICAgIH1cblxuICAgICAgICRyZXBlYXQgPSB7XCJ0UnVubmluZ1Rhc2tzXCI6e1wiY29tXCI6XCJ0LWNvdXJzZS10YXNrMVwiLFwicHJvcHNcIjpcInRhc2tJbmZvLnN5bmNcIn0sXCJ0Q29tcGxldGVUYXNrc1wiOntcImNvbVwiOlwidC1jb3Vyc2UtdGFzazJcIixcInByb3BzXCI6XCJ0YXNrSW5mby5zeW5jXCJ9fTtcclxuJHByb3BzID0ge1widC1jb3Vyc2UtdGFzazFcIjp7XCJjbGFzc1wiOntcInZhbHVlXCI6XCJ0LXRhc2stY29tcFwiLFwiZm9yXCI6XCJ0UnVubmluZ1Rhc2tzXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOnRhc2tJbmZvLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJ0UnVubmluZ1Rhc2tzXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9fSxcInQtY291cnNlLXRhc2syXCI6e1wiY2xhc3NcIjp7XCJ2YWx1ZVwiOlwidC10YXNrLWNvbXBcIixcImZvclwiOlwidENvbXBsZXRlVGFza3NcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6dGFza0luZm8uc3luY1wiOntcInZhbHVlXCI6XCJpdGVtXCIsXCJ0eXBlXCI6XCJpdGVtXCIsXCJmb3JcIjpcInRDb21wbGV0ZVRhc2tzXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9fSxcInBlcnNvbmFsLXRhc2sxXCI6e1wiY2xhc3NcIjpcInRhc2stY29tcFwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDp0aGVtZS5zeW5jXCI6XCJ1c2VyVGhlbWVcIixcInYtYmluZDp0YXNrSW5mby5zeW5jXCI6XCJydW5uaW5nVGFza1wiLFwieG1sbnM6di1vblwiOlwiXCJ9LFwicmljaC1idXR0b25cIjp7XCJ0aGVtZVwiOlwiZ3JleVwiLFwidGV4dFwiOlwi6Kej6Zmk57uR5a6aXCJ9LFwicGVyc29uLXBhdXNlZC10YXNrc1wiOntcInYtYmluZDpjb21tb25UYXNrcy5zeW5jXCI6XCJjb21tb25UYXNrc1wiLFwidi1iaW5kOnRoZW1lLnN5bmNcIjpcInVzZXJUaGVtZVwifX07XHJcbiRldmVudHMgPSB7XCJwZXJzb25hbC10YXNrMVwiOntcInYtb246Y29udGludWVcIjpcImNvbnRpbnVlVGFza1wiLFwidi1vbjpyZXN0YXJ0XCI6XCJyZXN0YXJ0VGFza1wiLFwidi1vbjpyZXZpZXdcIjpcInJldmlld1Rhc2tcIn0sXCJyaWNoLWJ1dHRvblwiOntcInYtb246dGFwXCI6XCJvbkNhbmNlbFJlZ2lzdGVyXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICAgICAgICAncGVyc29uYWwtdGFzazEnOiBQZXJzb25hbFRhc2ssXG4gICAgICAgICAgICAncGVyc29uYWwtdGFzazInOiBQZXJzb25hbFRhc2ssXG4gICAgICAgICAgICAndC1jb3Vyc2UtdGFzazEnOiBUZWFjaGVyQ291cnNlVGFzayxcbiAgICAgICAgICAgICd0LWNvdXJzZS10YXNrMic6IFRlYWNoZXJDb3Vyc2VUYXNrLFxuICAgICAgICAgICAgcGFuZWw6IHBhbmVsLFxuICAgICAgICAgICAgJ3JpY2gtYnV0dG9uJzogcmljaEJ1dHRvbixcbiAgICAgICAgICAgICdwZXJzb24tcGF1c2VkLXRhc2tzJzogUGVyc29uUGF1c2VkVGFza3NcbiAgICAgICAgfVxuXG4gICAgICAgIHdhdGNoID0ge1xuICAgICAgICAgICAgd3hVc2VySW5mbzogZnVuY3Rpb24odmFsLCBvbGR2YWwpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwuZ2VuZGVyID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJUaGVtZSA9ICdtYWxlJ1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VyVGhlbWUgPSAnZmVtYWxlJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VyVGhlbWUgPSAnbWFsZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29tcHV0ZWQgPSB7XG4gICAgICAgICAgICBydW5uaW5nVGFzaygpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5teVRhc2tMaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm15VGFza0xpc3QuZmluZChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLlN0YXR1cyA9PT0gMCAmJiBpdGVtLklzQWN0aXZhdGlvbkdyb3VwXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29tbW9uVGFza3MoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubXlUYXNrTGlzdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5teVRhc2tMaXN0LmZpbHRlcihpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLlN0YXR1cyAhPT0gMCB8fCAhaXRlbS5Jc0FjdGl2YXRpb25Hcm91cFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG1ldGhvZHMgPSB7XG4gICAgICAgICAgICBjb250aW51ZVRhc2sodGFzaykge1xuICAgICAgICAgICAgICAgIGxldCBhY3RpdmVUYXNrSW5mbyA9IHtDb3Vyc2VGSUQ6IHRhc2suQ291cnNlRklELCBHcm91cEZJRDogdGFzay5GbG5rSUR9XG4gICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygnYWN0aXZlVGFza0luZm8nLCBhY3RpdmVUYXNrSW5mbylcbiAgICAgICAgICAgICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9wYWdlcy9wcmFjdGljZSdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlc3RhcnRUYXNrKHRhc2spIHtcbiAgICAgICAgICAgICAgICBsZXQgZ3JvdXBUYXNrSWQgPSB0YXNrLkZsbmtJRFxuICAgICAgICAgICAgICAgIGxldCBhY3RpdmVUYXNrSW5mbyA9IHtDb3Vyc2VGSUQ6IHRhc2suQ291cnNlRklELCBHcm91cEZJRDogZ3JvdXBUYXNrSWR9XG4gICAgICAgICAgICAgICAgYWN0aXZhdGVHcm91cFRhc2sodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8uRmxua0lELCB0YXNrLkZsbmtJRCwgdGFzay5Db3Vyc2VGSUQpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygnYWN0aXZlVGFza0luZm8nLCBhY3RpdmVUYXNrSW5mbylcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5teVRhc2tMaXN0LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLklzQWN0aXZhdGlvbkdyb3VwID0gaXRlbS5GbG5rSUQgPT09IGdyb3VwVGFza0lkXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnL3BhZ2VzL3ByYWN0aWNlJ1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hlY2tDb3Vyc2UodGFzaykge1xuICAgICAgICAgICAgICAgIGxldCBncm91cFRhc2tJZCA9IHRhc2suRmxua0lEXG4gICAgICAgICAgICAgICAgbGV0IGFjdGl2ZVRhc2tJbmZvID0ge0NvdXJzZUZJRDogdGFzay5Db3Vyc2VGSUQsIEdyb3VwRklEOiBncm91cFRhc2tJZH1cbiAgICAgICAgICAgICAgICBhY3RpdmF0ZUdyb3VwVGFzayh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mby5GbG5rSUQsIHRhc2suRmxua0lELCB0YXNrLkNvdXJzZUZJRCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCdhY3RpdmVUYXNrSW5mbycsIGFjdGl2ZVRhc2tJbmZvKVxuICAgICAgICAgICAgICAgICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcvcGFnZXMvcHJhY3RpY2UnXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXZpZXdDb3Vyc2VHcm91cCh0YXNrKSB7XG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL3ByYWN0aWNlL3BhZ2VzL3Jldmlld0ZpbmlzaFRhc2s/Y291cnNlSWQ9JyArIHRhc2suQ291cnNlRklEICsgJyZncm91cElkPScgKyB0YXNrLkZsbmtJRFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmV2aWV3VGFzayh0YXNrKSB7XG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL3ByYWN0aWNlL3BhZ2VzL3Jldmlld0ZpbmlzaFRhc2s/Y291cnNlSWQ9JyArIHRhc2suQ291cnNlRklEICsgJyZncm91cElkPScgKyB0YXNrLkZsbmtJRFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25DYW5jZWxSZWdpc3RlcigpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXNcbiAgICAgICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogJ+ehruWumuimgeino+mZpOe7keWumuWQl++8n+ino+mZpOe7keWumuWQju+8jOaCqOmcgOimgemHjeaWsOe7keWumuaJjeiDvee7p+e7reWtpuS5oOWTpn4nLFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsQmluZCh0aGF0LiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mby5GbG5rSUQpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5yZWRpcmVjdFRvKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy9wYWdlcy9yZWdpc3RlcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGluaXQoKSB7XG4gICAgICAgICAgICBsZXQgaWQgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mby5GbG5rSURcbiAgICAgICAgICAgIHRoaXMudXNlck5hbWUgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mby5YTVxuICAgICAgICAgICAgdGhpcy5pc1RlYWNoZXIgPSAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8uUm9sZU51bSArICcnKSA9PT0gJzInXG4gICAgICAgICAgICBpZiAodGhpcy5pc1RlYWNoZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRUZWFjaGVyVGFza3ModGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGdldFN0dURldGFpbEluZm8oaWQpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VyQ2xhc3MgPSByZXMuTkogKyAn5bm057qn77yIJyArIHJlcy5CSkJIICsgJ++8ieePrSdcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgZ2V0TXlDb3Vyc2VUYXNrcyh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mby5TY2hvb2xGSUQsIGlkKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXlUYXNrTGlzdCA9IHJlcyB8fCBbXVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm15VGFza0xpc3QuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLlN0YXR1cyA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ubGFzdERheXMgPSBnZXRMYXN0RGF5cyhpdGVtLkNyZWF0ZVRpbWUpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaW5pdFRlYWNoZXJUYXNrcyh1c2VySW5mbykge1xuICAgICAgICAgICAgZ2V0TXlDb3Vyc2VUYXNrcyh1c2VySW5mby5TY2hvb2xGSUQsIHVzZXJJbmZvLkZsbmtJRCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBhbGxUYXNrcyA9IHJlcyB8fCBbXVxuICAgICAgICAgICAgICAgIGFsbFRhc2tzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLlN0YXR1cyA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5sYXN0RGF5cyA9IGdldExhc3REYXlzKGl0ZW0uQ3JlYXRlVGltZSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgdGhpcy50Q29tcGxldGVUYXNrcyA9IGFsbFRhc2tzLmZpbHRlcihpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uU3RhdHVzICE9PSAwXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB0aGlzLnRSdW5uaW5nVGFza3MgPSBhbGxUYXNrcy5maWx0ZXIoaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLlN0YXR1cyA9PT0gMFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIG9uU2hvdygpIHtcbiAgICAgICAgICAgIHRoaXMud3hVc2VySW5mbyA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnd4VXNlckluZm9cbiAgICAgICAgICAgIGlmICh0aGlzLnd4VXNlckluZm8uZ2VuZGVyID09PSAxKSB7XG4gICAgICAgICAgICAgICAgd2VweS5zZXROYXZpZ2F0aW9uQmFyQ29sb3Ioe1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjMDJDREY5JyxcbiAgICAgICAgICAgICAgICAgICAgZnJvbnRDb2xvcjogJyNmZmZmZmYnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2VweS5zZXROYXZpZ2F0aW9uQmFyQ29sb3Ioe1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjRkY3RDdEJyxcbiAgICAgICAgICAgICAgICAgICAgZnJvbnRDb2xvcjogJyNmZmZmZmYnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaW5pdCgpXG4gICAgICAgIH1cbiAgICB9XG4iXX0=