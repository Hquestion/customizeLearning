'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _courseTask = require('./../components/course-task.js');

var _courseTask2 = _interopRequireDefault(_courseTask);

var _course = require('./../components/course.js');

var _course2 = _interopRequireDefault(_course);

var _emptyContent = require('./../components/empty-content.js');

var _emptyContent2 = _interopRequireDefault(_emptyContent);

var _dialog = require('./../components/dialog.js');

var _dialog2 = _interopRequireDefault(_dialog);

var _richButton = require('./../components/rich-button.js');

var _richButton2 = _interopRequireDefault(_richButton);

var _api = require('./../api/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_wepy$page) {
    _inherits(Home, _wepy$page);

    function Home() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Home);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Home.__proto__ || Object.getPrototypeOf(Home)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '个性化学习中心'
        }, _this.$repeat = { "schoolCourseTasks": { "com": "course-task", "props": "taskInfo.sync" }, "classCourseTasks": { "com": "course-task", "props": "taskInfo.sync" }, "cateCourseList": { "com": "course", "props": "course" } }, _this.$props = { "course-task": { "class": { "value": "course-task-item", "for": "classCourseTasks", "item": "item", "index": "index", "key": "key" }, "xmlns:v-bind": { "value": "", "for": "schoolCourseTasks", "item": "item", "index": "index", "key": "key" }, "v-bind:taskInfo.sync": { "value": "item", "type": "item", "for": "classCourseTasks", "item": "item", "index": "index", "key": "key" }, "xmlns:v-on": { "value": "", "for": "schoolCourseTasks", "item": "item", "index": "index", "key": "key" } }, "course": { "class": { "value": "course-item", "for": "cateCourseList", "item": "item", "index": "index", "key": "key" }, "v-bind:course.once": { "value": "item", "type": "item", "for": "cateCourseList", "item": "item", "index": "index", "key": "key" } }, "dialog": { "class": "auth-dialog", "v-bind:visible.sync": "authVisible", "v-bind:closable.once": "false" } }, _this.$events = { "course-task": { "v-on:toggle-praise": "onTogglePraise" } }, _this.components = {
            'course-task': _courseTask2.default,
            'course': _course2.default,
            'empty-content': _emptyContent2.default,
            dialog: _dialog2.default,
            'rich-button': _richButton2.default
        }, _this.data = {
            userInfo: null,
            userLocalInfo: null,
            classCourseTaskLoaded: false,
            currentTabIndex: 0,
            schoolCourseTasks: [],
            classCourseTasks: [],
            courseCategories: [],
            activeCateId: '',
            cateCourseList: [],
            userInfoDetail: null,
            authVisible: false
        }, _this.computed = {
            schoolId: function schoolId() {
                return this.$parent.globalData.userInfo && this.$parent.globalData.userInfo.SchoolFID;
            }
        }, _this.methods = {
            setCurrentTab: function setCurrentTab(index) {
                this.currentTabIndex = index;
            },
            onSwiperChange: function onSwiperChange(e) {
                this.currentTabIndex = e.detail.current;
                this.handleSwiperChange(e.detail.current);
            },
            navigateToDetail: function navigateToDetail(item) {
                var courseId = item.FlnkID;
                _wepy2.default.navigateTo({
                    url: '/course/pages/course-detail?courseId=' + courseId
                });
            },
            navigateToTaskDetail: function navigateToTaskDetail(item) {
                _wepy2.default.navigateTo({
                    url: '/practice/pages/reviewFinishTask?courseId=' + item.CourseFID + '&groupId=' + item.FlnkID
                });
            },
            changeCategory: function changeCategory(cate) {
                this.activeCateId = cate.cateid;
                this.$apply();
                this.getCoursesByCategory(cate.cateid);
            },
            onTogglePraise: function onTogglePraise(item) {
                var _this2 = this;

                var dataSource = '';
                if (this.currentTabIndex === 0) {
                    dataSource = 'schoolCourseTasks';
                } else {
                    dataSource = 'classCourseTasks';
                }
                var groupFID = item.FlnkID;
                if (item.IsPraise) {
                    (0, _api.userCancelPraise)(this.userLocalInfo.FlnkID, groupFID, item.CourseFID).then(function (res) {
                        var data = _this2[dataSource].find(function (oitem) {
                            return groupFID === oitem.FlnkID;
                        });
                        if (data) {
                            data.IsPraise = false;
                            data.PraiseNum--;
                            _this2.$apply();
                        }
                    });
                } else {
                    (0, _api.userPraise)(this.userLocalInfo.FlnkID, groupFID, item.CourseFID).then(function (res) {
                        var data = _this2[dataSource].find(function (oitem) {
                            return groupFID === oitem.FlnkID;
                        });
                        if (data) {
                            data.IsPraise = true;
                            data.PraiseNum++;
                            _this2.$apply();
                        }
                    });
                }
            },
            bindGetUserInfo: function bindGetUserInfo(e) {
                this.$parent.setGlobalData('wxUserInfo', e.detail.userInfo);
                this.authVisible = false;
                this.$apply();
                this.init();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Home, [{
        key: 'handleSwiperChange',
        value: function handleSwiperChange(index) {
            var _this3 = this;

            if (index === 1) {
                // 切换到第二个tab，加载数据
                if (!this.classCourseTaskLoaded) {
                    // 加载数据
                    (0, _api.getStuDetailInfo)(this.userLocalInfo.FlnkID).then(function (detail) {
                        _this3.getCourseTaskOrder(_this3.userLocalInfo.SchoolFID, _this3.userLocalInfo.FlnkID, {
                            LevelNum: detail.LevelNum,
                            GradeNum: detail.GradeNum,
                            ClassNum: detail.ClassNum
                        }).then(function (res) {
                            _this3.classCourseTasks = res.DataSource || [];
                            _this3.classCourseTasks.forEach(function (item) {
                                item.order = item.ClassSortCode || item.SchoolSortCode;
                            });
                            _this3.$apply();
                            _this3.classCourseTaskLoaded = true;
                        }, function () {
                            _this3.classCourseTasks = [];
                            _this3.$apply();
                            _this3.classCourseTaskLoaded = true;
                        });
                    });
                }
            } else if (index === 2) {
                if (!this.courseCateLoaded) {
                    // 加载课程分类列表，同时加载当前分类的课程
                    this.getCourseCategory();
                }
            }
        }
    }, {
        key: 'getCourseCategory',
        value: function getCourseCategory() {
            var _this4 = this;

            (0, _api.getCourseCateBySchool)(this.userLocalInfo.SchoolFID).then(function (res) {
                _this4.courseCategories = res.ResultObj.map(function (item) {
                    return {
                        cateid: item.CourseCategoryFID,
                        cateName: item.CourseCategoryName
                    };
                });
                _this4.activeCateId = _this4.courseCategories[0].cateid;
                _this4.$apply();
                _this4.getCoursesByCategory(_this4.activeCateId);
                _this4.courseCateLoaded = true;
            });
        }
    }, {
        key: 'getCoursesByCategory',
        value: function getCoursesByCategory(cateid) {
            var _this5 = this;

            (0, _api.getCoursesByCategory)(cateid, this.userLocalInfo.SchoolFID).then(function (res) {
                _this5.cateCourseList = res;
                _this5.$apply();
            });
        }
    }, {
        key: 'getCourseTaskOrder',
        value: function getCourseTaskOrder(schoolId, userId) {
            var userInfo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            return new Promise(function (resolve, reject) {
                (0, _api.getCourseTaskOrderList)(schoolId, userId, userInfo.LevelNum, userInfo.GradeNum, userInfo.ClassNum).then(function (res) {
                    resolve(res.ResultObj);
                }, reject);
            });
        }
    }, {
        key: 'init',
        value: function init() {
            var _this6 = this;

            (0, _api.login)().then(function (res) {
                // 登陆接口判断用户是否绑定，未绑定则跳转绑定页面
                if (res.FlnkID) {
                    // 获取到用户信息，说明用户已绑定,缓存用户信息
                    _this6.$parent.globalData.userInfo = res;
                    _this6.loadPageData();
                } else {
                    // 跳转到注册绑定页面
                    _wepy2.default.redirectTo({
                        url: '/pages/register?openid=' + res.WechatAccount
                    });
                }
            }, function (res) {
                _wepy2.default.showToast({
                    title: '登陆失败',
                    icon: 'none'
                });
            });
        }
    }, {
        key: 'loadPageData',
        value: function loadPageData() {
            var _this7 = this;

            this.userLocalInfo = this.$parent.globalData.userInfo;
            this.getCourseTaskOrder(this.userLocalInfo.SchoolFID, this.userLocalInfo.FlnkID).then(function (res) {
                _this7.schoolCourseTasks = res.DataSource || [];
                _this7.schoolCourseTasks.forEach(function (item) {
                    item.order = item.SchoolSortCode;
                });
                _this7.$apply();
            }, function () {
                _this7.schoolCourseTasks = [];
                _this7.$apply();
            });
            (0, _api.getCurrentActivateTask)(this.userLocalInfo.FlnkID).then(function (res) {
                var activeTaskInfo = { CourseFID: res.CourseFID, GroupFID: res.GroupFID };
                _wepy2.default.setStorageSync('activeTaskInfo', activeTaskInfo);
            }, function () {
                _wepy2.default.removeStorageSync('activeTaskInfo');
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad() {
            var self = this;
            _wepy2.default.getSetting({
                success: function success(res) {
                    if (res.authSetting['scope.userInfo']) {
                        // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                        self.$parent.getUserInfo(function (res) {
                            self.userInfo = res;
                            self.$apply();
                        });
                        self.init();
                    } else {
                        self.authVisible = true;
                        self.$apply();
                        console.log(self.authVisible);
                    }
                }
            });
        }
    }]);

    return Home;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Home , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkhvbWUiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiZGlhbG9nIiwiZGF0YSIsInVzZXJJbmZvIiwidXNlckxvY2FsSW5mbyIsImNsYXNzQ291cnNlVGFza0xvYWRlZCIsImN1cnJlbnRUYWJJbmRleCIsInNjaG9vbENvdXJzZVRhc2tzIiwiY2xhc3NDb3Vyc2VUYXNrcyIsImNvdXJzZUNhdGVnb3JpZXMiLCJhY3RpdmVDYXRlSWQiLCJjYXRlQ291cnNlTGlzdCIsInVzZXJJbmZvRGV0YWlsIiwiYXV0aFZpc2libGUiLCJjb21wdXRlZCIsInNjaG9vbElkIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJTY2hvb2xGSUQiLCJtZXRob2RzIiwic2V0Q3VycmVudFRhYiIsImluZGV4Iiwib25Td2lwZXJDaGFuZ2UiLCJlIiwiZGV0YWlsIiwiY3VycmVudCIsImhhbmRsZVN3aXBlckNoYW5nZSIsIm5hdmlnYXRlVG9EZXRhaWwiLCJpdGVtIiwiY291cnNlSWQiLCJGbG5rSUQiLCJuYXZpZ2F0ZVRvIiwidXJsIiwibmF2aWdhdGVUb1Rhc2tEZXRhaWwiLCJDb3Vyc2VGSUQiLCJjaGFuZ2VDYXRlZ29yeSIsImNhdGUiLCJjYXRlaWQiLCIkYXBwbHkiLCJnZXRDb3Vyc2VzQnlDYXRlZ29yeSIsIm9uVG9nZ2xlUHJhaXNlIiwiZGF0YVNvdXJjZSIsImdyb3VwRklEIiwiSXNQcmFpc2UiLCJ0aGVuIiwiZmluZCIsIm9pdGVtIiwiUHJhaXNlTnVtIiwiYmluZEdldFVzZXJJbmZvIiwic2V0R2xvYmFsRGF0YSIsImluaXQiLCJnZXRDb3Vyc2VUYXNrT3JkZXIiLCJMZXZlbE51bSIsIkdyYWRlTnVtIiwiQ2xhc3NOdW0iLCJyZXMiLCJEYXRhU291cmNlIiwiZm9yRWFjaCIsIm9yZGVyIiwiQ2xhc3NTb3J0Q29kZSIsIlNjaG9vbFNvcnRDb2RlIiwiY291cnNlQ2F0ZUxvYWRlZCIsImdldENvdXJzZUNhdGVnb3J5IiwiUmVzdWx0T2JqIiwibWFwIiwiQ291cnNlQ2F0ZWdvcnlGSUQiLCJjYXRlTmFtZSIsIkNvdXJzZUNhdGVnb3J5TmFtZSIsInVzZXJJZCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwibG9hZFBhZ2VEYXRhIiwicmVkaXJlY3RUbyIsIldlY2hhdEFjY291bnQiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJhY3RpdmVUYXNrSW5mbyIsIkdyb3VwRklEIiwic2V0U3RvcmFnZVN5bmMiLCJyZW1vdmVTdG9yYWdlU3luYyIsInNlbGYiLCJnZXRTZXR0aW5nIiwic3VjY2VzcyIsImF1dGhTZXR0aW5nIiwiZ2V0VXNlckluZm8iLCJjb25zb2xlIiwibG9nIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0k7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7Ozs7O3NMQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBSVZDLE8sR0FBVSxFQUFDLHFCQUFvQixFQUFDLE9BQU0sYUFBUCxFQUFxQixTQUFRLGVBQTdCLEVBQXJCLEVBQW1FLG9CQUFtQixFQUFDLE9BQU0sYUFBUCxFQUFxQixTQUFRLGVBQTdCLEVBQXRGLEVBQW9JLGtCQUFpQixFQUFDLE9BQU0sUUFBUCxFQUFnQixTQUFRLFFBQXhCLEVBQXJKLEUsUUFDakJDLE0sR0FBUyxFQUFDLGVBQWMsRUFBQyxTQUFRLEVBQUMsU0FBUSxrQkFBVCxFQUE0QixPQUFNLGtCQUFsQyxFQUFxRCxRQUFPLE1BQTVELEVBQW1FLFNBQVEsT0FBM0UsRUFBbUYsT0FBTSxLQUF6RixFQUFULEVBQXlHLGdCQUFlLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxtQkFBbEIsRUFBc0MsUUFBTyxNQUE3QyxFQUFvRCxTQUFRLE9BQTVELEVBQW9FLE9BQU0sS0FBMUUsRUFBeEgs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WDtBQUNBLDJCQUFLQyxVQUFMLENBQWdCO0FBQ1pDLHVCQURZLG1CQUNIN0IsR0FERyxFQUNFO0FBQ1Ysd0JBQUlBLElBQUk4QixXQUFKLENBQWdCLGdCQUFoQixDQUFKLEVBQXVDO0FBQ25DO0FBQ0FILDZCQUFLbEUsT0FBTCxDQUFhc0UsV0FBYixDQUF5QixVQUFVL0IsR0FBVixFQUFlO0FBQ3BDMkIsaUNBQUsvRSxRQUFMLEdBQWdCb0QsR0FBaEI7QUFDQTJCLGlDQUFLNUMsTUFBTDtBQUNILHlCQUhEO0FBSUE0Qyw2QkFBS2hDLElBQUw7QUFDSCxxQkFQRCxNQU9PO0FBQ0hnQyw2QkFBS3JFLFdBQUwsR0FBbUIsSUFBbkI7QUFDQXFFLDZCQUFLNUMsTUFBTDtBQUNBaUQsZ0NBQVFDLEdBQVIsQ0FBWU4sS0FBS3JFLFdBQWpCO0FBQ0g7QUFDSjtBQWRXLGFBQWhCO0FBZ0JIOzs7O0VBek42QixlQUFLNEUsSTs7a0JBQWxCL0YsSSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gICAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICAgIGltcG9ydCBjb3Vyc2VUYXNrIGZyb20gJy4uL2NvbXBvbmVudHMvY291cnNlLXRhc2snXHJcbiAgICBpbXBvcnQgY291cnNlIGZyb20gJy4uL2NvbXBvbmVudHMvY291cnNlJ1xyXG4gICAgaW1wb3J0IGVtcHR5Q29udGVudCBmcm9tICcuLi9jb21wb25lbnRzL2VtcHR5LWNvbnRlbnQnXHJcbiAgICBpbXBvcnQgZGlhbG9nIGZyb20gJy4uL2NvbXBvbmVudHMvZGlhbG9nJ1xyXG4gICAgaW1wb3J0IHJpY2hCdXR0b24gZnJvbSAnLi4vY29tcG9uZW50cy9yaWNoLWJ1dHRvbidcclxuXHJcbiAgICBpbXBvcnQge2xvZ2luLCBnZXRDb3Vyc2VDYXRlQnlTY2hvb2wsIGdldENvdXJzZXNCeUNhdGVnb3J5LCBnZXRDb3Vyc2VUYXNrT3JkZXJMaXN0LCBnZXRTdHVEZXRhaWxJbmZvLCB1c2VyUHJhaXNlLCB1c2VyQ2FuY2VsUHJhaXNlLCBnZXRDdXJyZW50QWN0aXZhdGVUYXNrfSBmcm9tICcuLi9hcGknXHJcblxyXG4gICAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSG9tZSBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICAgICAgY29uZmlnID0ge1xyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Liq5oCn5YyW5a2m5Lmg5Lit5b+DJ1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAkcmVwZWF0ID0ge1wic2Nob29sQ291cnNlVGFza3NcIjp7XCJjb21cIjpcImNvdXJzZS10YXNrXCIsXCJwcm9wc1wiOlwidGFza0luZm8uc3luY1wifSxcImNsYXNzQ291cnNlVGFza3NcIjp7XCJjb21cIjpcImNvdXJzZS10YXNrXCIsXCJwcm9wc1wiOlwidGFza0luZm8uc3luY1wifSxcImNhdGVDb3Vyc2VMaXN0XCI6e1wiY29tXCI6XCJjb3Vyc2VcIixcInByb3BzXCI6XCJjb3Vyc2VcIn19O1xyXG4kcHJvcHMgPSB7XCJjb3Vyc2UtdGFza1wiOntcImNsYXNzXCI6e1widmFsdWVcIjpcImNvdXJzZS10YXNrLWl0ZW1cIixcImZvclwiOlwiY2xhc3NDb3Vyc2VUYXNrc1wiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwic2Nob29sQ291cnNlVGFza3NcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6dGFza0luZm8uc3luY1wiOntcInZhbHVlXCI6XCJpdGVtXCIsXCJ0eXBlXCI6XCJpdGVtXCIsXCJmb3JcIjpcImNsYXNzQ291cnNlVGFza3NcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ4bWxuczp2LW9uXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJzY2hvb2xDb3Vyc2VUYXNrc1wiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifX0sXCJjb3Vyc2VcIjp7XCJjbGFzc1wiOntcInZhbHVlXCI6XCJjb3Vyc2UtaXRlbVwiLFwiZm9yXCI6XCJjYXRlQ291cnNlTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDpjb3Vyc2Uub25jZVwiOntcInZhbHVlXCI6XCJpdGVtXCIsXCJ0eXBlXCI6XCJpdGVtXCIsXCJmb3JcIjpcImNhdGVDb3Vyc2VMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9fSxcImRpYWxvZ1wiOntcImNsYXNzXCI6XCJhdXRoLWRpYWxvZ1wiLFwidi1iaW5kOnZpc2libGUuc3luY1wiOlwiYXV0aFZpc2libGVcIixcInYtYmluZDpjbG9zYWJsZS5vbmNlXCI6XCJmYWxzZVwifX07XHJcbiRldmVudHMgPSB7XCJjb3Vyc2UtdGFza1wiOntcInYtb246dG9nZ2xlLXByYWlzZVwiOlwib25Ub2dnbGVQcmFpc2VcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgICAgICAgICAgJ2NvdXJzZS10YXNrJzogY291cnNlVGFzayxcclxuICAgICAgICAgICAgJ2NvdXJzZSc6IGNvdXJzZSxcclxuICAgICAgICAgICAgJ2VtcHR5LWNvbnRlbnQnOiBlbXB0eUNvbnRlbnQsXHJcbiAgICAgICAgICAgIGRpYWxvZzogZGlhbG9nLFxyXG4gICAgICAgICAgICAncmljaC1idXR0b24nOiByaWNoQnV0dG9uXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkYXRhID0ge1xyXG4gICAgICAgICAgICB1c2VySW5mbzogbnVsbCxcclxuICAgICAgICAgICAgdXNlckxvY2FsSW5mbzogbnVsbCxcclxuICAgICAgICAgICAgY2xhc3NDb3Vyc2VUYXNrTG9hZGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgY3VycmVudFRhYkluZGV4OiAwLFxyXG4gICAgICAgICAgICBzY2hvb2xDb3Vyc2VUYXNrczogW10sXHJcbiAgICAgICAgICAgIGNsYXNzQ291cnNlVGFza3M6IFtdLFxyXG4gICAgICAgICAgICBjb3Vyc2VDYXRlZ29yaWVzOiBbXSxcclxuICAgICAgICAgICAgYWN0aXZlQ2F0ZUlkOiAnJyxcclxuICAgICAgICAgICAgY2F0ZUNvdXJzZUxpc3Q6IFtdLFxyXG4gICAgICAgICAgICB1c2VySW5mb0RldGFpbDogbnVsbCxcclxuICAgICAgICAgICAgYXV0aFZpc2libGU6IGZhbHNlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb21wdXRlZCA9IHtcclxuICAgICAgICAgICAgc2Nob29sSWQoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8gJiYgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8uU2Nob29sRklEXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgICAgIHNldEN1cnJlbnRUYWIoaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFRhYkluZGV4ID0gaW5kZXhcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25Td2lwZXJDaGFuZ2UoZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFiSW5kZXggPSBlLmRldGFpbC5jdXJyZW50XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVN3aXBlckNoYW5nZShlLmRldGFpbC5jdXJyZW50KVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuYXZpZ2F0ZVRvRGV0YWlsKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb3Vyc2VJZCA9IGl0ZW0uRmxua0lEXHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9jb3Vyc2UvcGFnZXMvY291cnNlLWRldGFpbD9jb3Vyc2VJZD0nICsgY291cnNlSWRcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5hdmlnYXRlVG9UYXNrRGV0YWlsKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL3ByYWN0aWNlL3BhZ2VzL3Jldmlld0ZpbmlzaFRhc2s/Y291cnNlSWQ9JyArIGl0ZW0uQ291cnNlRklEICsgJyZncm91cElkPScgKyBpdGVtLkZsbmtJRFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2hhbmdlQ2F0ZWdvcnkoY2F0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVDYXRlSWQgPSBjYXRlLmNhdGVpZFxyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDb3Vyc2VzQnlDYXRlZ29yeShjYXRlLmNhdGVpZClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25Ub2dnbGVQcmFpc2UoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGFTb3VyY2UgPSAnJ1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFRhYkluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVNvdXJjZSA9ICdzY2hvb2xDb3Vyc2VUYXNrcydcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVNvdXJjZSA9ICdjbGFzc0NvdXJzZVRhc2tzJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGdyb3VwRklEID0gaXRlbS5GbG5rSURcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLklzUHJhaXNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlckNhbmNlbFByYWlzZSh0aGlzLnVzZXJMb2NhbEluZm8uRmxua0lELCBncm91cEZJRCwgaXRlbS5Db3Vyc2VGSUQpLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzW2RhdGFTb3VyY2VdLmZpbmQob2l0ZW0gPT4gZ3JvdXBGSUQgPT09IG9pdGVtLkZsbmtJRClcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuSXNQcmFpc2UgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5QcmFpc2VOdW0tLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlclByYWlzZSh0aGlzLnVzZXJMb2NhbEluZm8uRmxua0lELCBncm91cEZJRCwgaXRlbS5Db3Vyc2VGSUQpLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzW2RhdGFTb3VyY2VdLmZpbmQob2l0ZW0gPT4gZ3JvdXBGSUQgPT09IG9pdGVtLkZsbmtJRClcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuSXNQcmFpc2UgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLlByYWlzZU51bSsrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBiaW5kR2V0VXNlckluZm8oZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnNldEdsb2JhbERhdGEoJ3d4VXNlckluZm8nLCBlLmRldGFpbC51c2VySW5mbylcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0aFZpc2libGUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0KClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaGFuZGxlU3dpcGVyQ2hhbmdlKGluZGV4KSB7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgLy8g5YiH5o2i5Yiw56ys5LqM5LiqdGFi77yM5Yqg6L295pWw5o2uXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY2xhc3NDb3Vyc2VUYXNrTG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5Yqg6L295pWw5o2uXHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0U3R1RGV0YWlsSW5mbyh0aGlzLnVzZXJMb2NhbEluZm8uRmxua0lEKS50aGVuKGRldGFpbCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q291cnNlVGFza09yZGVyKHRoaXMudXNlckxvY2FsSW5mby5TY2hvb2xGSUQsIHRoaXMudXNlckxvY2FsSW5mby5GbG5rSUQsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExldmVsTnVtOiBkZXRhaWwuTGV2ZWxOdW0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHcmFkZU51bTogZGV0YWlsLkdyYWRlTnVtLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2xhc3NOdW06IGRldGFpbC5DbGFzc051bVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsYXNzQ291cnNlVGFza3MgPSByZXMuRGF0YVNvdXJjZSB8fCBbXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGFzc0NvdXJzZVRhc2tzLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5vcmRlciA9IGl0ZW0uQ2xhc3NTb3J0Q29kZSB8fCBpdGVtLlNjaG9vbFNvcnRDb2RlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGFzc0NvdXJzZVRhc2tMb2FkZWQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NDb3Vyc2VUYXNrcyA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsYXNzQ291cnNlVGFza0xvYWRlZCA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4ID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY291cnNlQ2F0ZUxvYWRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWKoOi9veivvueoi+WIhuexu+WIl+ihqO+8jOWQjOaXtuWKoOi9veW9k+WJjeWIhuexu+eahOivvueoi1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q291cnNlQ2F0ZWdvcnkoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRDb3Vyc2VDYXRlZ29yeSgpIHtcclxuICAgICAgICAgICAgZ2V0Q291cnNlQ2F0ZUJ5U2Nob29sKHRoaXMudXNlckxvY2FsSW5mby5TY2hvb2xGSUQpLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY291cnNlQ2F0ZWdvcmllcyA9IHJlcy5SZXN1bHRPYmoubWFwKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGVpZDogaXRlbS5Db3Vyc2VDYXRlZ29yeUZJRCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZU5hbWU6IGl0ZW0uQ291cnNlQ2F0ZWdvcnlOYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlQ2F0ZUlkID0gdGhpcy5jb3Vyc2VDYXRlZ29yaWVzWzBdLmNhdGVpZFxyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDb3Vyc2VzQnlDYXRlZ29yeSh0aGlzLmFjdGl2ZUNhdGVJZClcclxuICAgICAgICAgICAgICAgIHRoaXMuY291cnNlQ2F0ZUxvYWRlZCA9IHRydWVcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldENvdXJzZXNCeUNhdGVnb3J5KGNhdGVpZCkge1xyXG4gICAgICAgICAgICBnZXRDb3Vyc2VzQnlDYXRlZ29yeShjYXRlaWQsIHRoaXMudXNlckxvY2FsSW5mby5TY2hvb2xGSUQpLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2F0ZUNvdXJzZUxpc3QgPSByZXNcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldENvdXJzZVRhc2tPcmRlcihzY2hvb2xJZCwgdXNlcklkLCB1c2VySW5mbyA9IHt9KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBnZXRDb3Vyc2VUYXNrT3JkZXJMaXN0KHNjaG9vbElkLCB1c2VySWQsIHVzZXJJbmZvLkxldmVsTnVtLCB1c2VySW5mby5HcmFkZU51bSwgdXNlckluZm8uQ2xhc3NOdW0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcy5SZXN1bHRPYmopXHJcbiAgICAgICAgICAgICAgICB9LCByZWplY3QpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCkge1xyXG4gICAgICAgICAgICBsb2dpbigpLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIOeZu+mZhuaOpeWPo+WIpOaWreeUqOaIt+aYr+WQpue7keWumu+8jOacque7keWumuWImei3s+i9rOe7keWumumhtemdolxyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5GbG5rSUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDojrflj5bliLDnlKjmiLfkv6Hmga/vvIzor7TmmI7nlKjmiLflt7Lnu5Hlrpos57yT5a2Y55So5oi35L+h5oGvXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8gPSByZXNcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRQYWdlRGF0YSgpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOi3s+i9rOWIsOazqOWGjOe7keWumumhtemdolxyXG4gICAgICAgICAgICAgICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy9wYWdlcy9yZWdpc3Rlcj9vcGVuaWQ9JyArIHJlcy5XZWNoYXRBY2NvdW50XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+eZu+mZhuWksei0pScsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbG9hZFBhZ2VEYXRhKCkge1xyXG4gICAgICAgICAgICB0aGlzLnVzZXJMb2NhbEluZm8gPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mb1xyXG4gICAgICAgICAgICB0aGlzLmdldENvdXJzZVRhc2tPcmRlcih0aGlzLnVzZXJMb2NhbEluZm8uU2Nob29sRklELCB0aGlzLnVzZXJMb2NhbEluZm8uRmxua0lEKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaG9vbENvdXJzZVRhc2tzID0gcmVzLkRhdGFTb3VyY2UgfHwgW11cclxuICAgICAgICAgICAgICAgIHRoaXMuc2Nob29sQ291cnNlVGFza3MuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLm9yZGVyID0gaXRlbS5TY2hvb2xTb3J0Q29kZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hvb2xDb3Vyc2VUYXNrcyA9IFtdXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGdldEN1cnJlbnRBY3RpdmF0ZVRhc2sodGhpcy51c2VyTG9jYWxJbmZvLkZsbmtJRCkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFjdGl2ZVRhc2tJbmZvID0ge0NvdXJzZUZJRDogcmVzLkNvdXJzZUZJRCwgR3JvdXBGSUQ6IHJlcy5Hcm91cEZJRH1cclxuICAgICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ2FjdGl2ZVRhc2tJbmZvJywgYWN0aXZlVGFza0luZm8pXHJcbiAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHdlcHkucmVtb3ZlU3RvcmFnZVN5bmMoJ2FjdGl2ZVRhc2tJbmZvJylcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uTG9hZCgpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHdlcHkuZ2V0U2V0dGluZyh7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOW3sue7j+aOiOadg++8jOWPr+S7peebtOaOpeiwg+eUqCBnZXRVc2VySW5mbyDojrflj5blpLTlg4/mmLXnp7BcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kcGFyZW50LmdldFVzZXJJbmZvKGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudXNlckluZm8gPSByZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pbml0KClcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmF1dGhWaXNpYmxlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlbGYuYXV0aFZpc2libGUpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuIl19