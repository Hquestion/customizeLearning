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
        }, _this.$repeat = { "schoolCourseTasks": { "com": "course-task", "props": "taskInfo.sync" }, "classCourseTasks": { "com": "course-task", "props": "taskInfo.sync" }, "cateCourseList": { "com": "course", "props": "course" } }, _this.$props = { "course-task": { "class": { "value": "course-task-item", "for": "classCourseTasks", "item": "item", "index": "index", "key": "key" }, "xmlns:v-bind": { "value": "", "for": "schoolCourseTasks", "item": "item", "index": "index", "key": "key" }, "v-bind:taskInfo.sync": { "value": "item", "type": "item", "for": "classCourseTasks", "item": "item", "index": "index", "key": "key" }, "xmlns:v-on": { "value": "", "for": "schoolCourseTasks", "item": "item", "index": "index", "key": "key" } }, "course": { "class": { "value": "course-item", "for": "cateCourseList", "item": "item", "index": "index", "key": "key" }, "v-bind:course.once": { "value": "item", "type": "item", "for": "cateCourseList", "item": "item", "index": "index", "key": "key" } } }, _this.$events = { "course-task": { "v-on:toggle-praise": "onTogglePraise" } }, _this.components = {
            'course-task': _courseTask2.default,
            'course': _course2.default,
            'empty-content': _emptyContent2.default
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
            userInfoDetail: null
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
            this.$parent.getUserInfo(function (res) {
                self.userInfo = res;
                self.$apply();
            });
            self.init();
        }
    }]);

    return Home;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Home , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkhvbWUiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiY291cnNlVGFzayIsImNvdXJzZSIsImVtcHR5Q29udGVudCIsImRhdGEiLCJ1c2VySW5mbyIsInVzZXJMb2NhbEluZm8iLCJjbGFzc0NvdXJzZVRhc2tMb2FkZWQiLCJjdXJyZW50VGFiSW5kZXgiLCJzY2hvb2xDb3Vyc2VUYXNrcyIsImNsYXNzQ291cnNlVGFza3MiLCJjb3Vyc2VDYXRlZ29yaWVzIiwiYWN0aXZlQ2F0ZUlkIiwiY2F0ZUNvdXJzZUxpc3QiLCJ1c2VySW5mb0RldGFpbCIsImNvbXB1dGVkIiwic2Nob29sSWQiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsIlNjaG9vbEZJRCIsIm1ldGhvZHMiLCJzZXRDdXJyZW50VGFiIiwiaW5kZXgiLCJvblN3aXBlckNoYW5nZSIsImUiLCJkZXRhaWwiLCJjdXJyZW50IiwiaGFuZGxlU3dpcGVyQ2hhbmdlIiwibmF2aWdhdGVUb0RldGFpbCIsIml0ZW0iLCJjb3Vyc2VJZCIsIkZsbmtJRCIsIndlcHkiLCJuYXZpZ2F0ZVRvIiwidXJsIiwibmF2aWdhdGVUb1Rhc2tEZXRhaWwiLCJDb3Vyc2VGSUQiLCJjaGFuZ2VDYXRlZ29yeSIsImNhdGUiLCJjYXRlaWQiLCIkYXBwbHkiLCJnZXRDb3Vyc2VzQnlDYXRlZ29yeSIsIm9uVG9nZ2xlUHJhaXNlIiwiZGF0YVNvdXJjZSIsImdyb3VwRklEIiwiSXNQcmFpc2UiLCJ0aGVuIiwiZmluZCIsIm9pdGVtIiwiUHJhaXNlTnVtIiwiZ2V0Q291cnNlVGFza09yZGVyIiwiTGV2ZWxOdW0iLCJHcmFkZU51bSIsIkNsYXNzTnVtIiwicmVzIiwiRGF0YVNvdXJjZSIsImZvckVhY2giLCJvcmRlciIsIkNsYXNzU29ydENvZGUiLCJTY2hvb2xTb3J0Q29kZSIsImNvdXJzZUNhdGVMb2FkZWQiLCJnZXRDb3Vyc2VDYXRlZ29yeSIsIlJlc3VsdE9iaiIsIm1hcCIsIkNvdXJzZUNhdGVnb3J5RklEIiwiY2F0ZU5hbWUiLCJDb3Vyc2VDYXRlZ29yeU5hbWUiLCJ1c2VySWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImxvYWRQYWdlRGF0YSIsInJlZGlyZWN0VG8iLCJXZWNoYXRBY2NvdW50Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiYWN0aXZlVGFza0luZm8iLCJHcm91cEZJRCIsInNldFN0b3JhZ2VTeW5jIiwicmVtb3ZlU3RvcmFnZVN5bmMiLCJzZWxmIiwiZ2V0VXNlckluZm8iLCJpbml0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0k7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7Ozs7c0xBQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFJVkMsTyxHQUFVLEVBQUMscUJBQW9CLEVBQUMsT0FBTSxhQUFQLEVBQXFCLFNBQVEsZUFBN0IsRUFBckIsRUFBbUUsb0JBQW1CLEVBQUMsT0FBTSxhQUFQLEVBQXFCLFNBQVEsZUFBN0IsRUFBdEYsRUFBb0ksa0JBQWlCLEVBQUMsT0FBTSxRQUFQLEVBQWdCLFNBQVEsUUFBeEIsRUFBckosRSxRQUNqQkMsTSxHQUFTLEVBQUMsZUFBYyxFQUFDLFNBQVEsRUFBQyxTQUFRLGtCQUFULEVBQTRCLE9BQU0sa0JBQWxDLEVBQXFELFFBQU8sTUFBNUQsRUFBbUUsU0FBUSxPQUEzRSxFQUFtRixPQUFNLEtBQXpGLEVBQVQsRUFBeUcsZ0JBQWUsRUFBQyxTQUFRLEVBQVQsRUFBWSxPQUFNLG1CQUFsQixFQUFzQyxRQUFPLE1BQTdDLEVBQW9ELFNBQVEsT0FBNUQsRUFBb0UsT0FBTSxLQUExRSxFQUF4SCxFQUF5TSx3QkFBdUIsRUFBQyxTQUFRLE1BQVQsRUFBZ0IsUUFBTyxNQUF2QixFQUE4QixPQUFNLGtCQUFwQyxFQUF1RCxRQUFPLE1BQTlELEVB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LEVBQWlGZSxJQUFqRixDQUFzRixlQUFPO0FBQ3pGLHVCQUFLckMsaUJBQUwsR0FBeUI2QyxJQUFJQyxVQUFKLElBQWtCLEVBQTNDO0FBQ0EsdUJBQUs5QyxpQkFBTCxDQUF1QitDLE9BQXZCLENBQStCLGdCQUFRO0FBQ25DM0IseUJBQUs0QixLQUFMLEdBQWE1QixLQUFLOEIsY0FBbEI7QUFDSCxpQkFGRDtBQUdBLHVCQUFLbkIsTUFBTDtBQUNILGFBTkQsRUFNRyxZQUFNO0FBQ0wsdUJBQUsvQixpQkFBTCxHQUF5QixFQUF6QjtBQUNBLHVCQUFLK0IsTUFBTDtBQUNILGFBVEQ7QUFVQSw2Q0FBdUIsS0FBS2xDLGFBQUwsQ0FBbUJ5QixNQUExQyxFQUFrRGUsSUFBbEQsQ0FBdUQsZUFBTztBQUMxRCxvQkFBSStCLGlCQUFpQixFQUFDekMsV0FBV2tCLElBQUlsQixTQUFoQixFQUEyQjBDLFVBQVV4QixJQUFJd0IsUUFBekMsRUFBckI7QUFDQTlDLCtCQUFLK0MsY0FBTCxDQUFvQixnQkFBcEIsRUFBc0NGLGNBQXRDO0FBQ0gsYUFIRCxFQUdHLFlBQU07QUFDTDdDLCtCQUFLZ0QsaUJBQUwsQ0FBdUIsZ0JBQXZCO0FBQ0gsYUFMRDtBQU1IOzs7aUNBRVE7QUFDTCxnQkFBSUMsT0FBTyxJQUFYO0FBQ0EsaUJBQUtoRSxPQUFMLENBQWFpRSxXQUFiLENBQXlCLFVBQVU1QixHQUFWLEVBQWU7QUFDcEMyQixxQkFBSzVFLFFBQUwsR0FBZ0JpRCxHQUFoQjtBQUNBMkIscUJBQUt6QyxNQUFMO0FBQ0gsYUFIRDtBQUlBeUMsaUJBQUtFLElBQUw7QUFDSDs7OztFQXJNNkJuRCxlQUFLb0QsSTs7a0JBQWxCMUYsSSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gICAgaW1wb3J0IGNvdXJzZVRhc2sgZnJvbSAnLi4vY29tcG9uZW50cy9jb3Vyc2UtdGFzaydcbiAgICBpbXBvcnQgY291cnNlIGZyb20gJy4uL2NvbXBvbmVudHMvY291cnNlJ1xuICAgIGltcG9ydCBlbXB0eUNvbnRlbnQgZnJvbSAnLi4vY29tcG9uZW50cy9lbXB0eS1jb250ZW50J1xuXG4gICAgaW1wb3J0IHtsb2dpbiwgZ2V0Q291cnNlQ2F0ZUJ5U2Nob29sLCBnZXRDb3Vyc2VzQnlDYXRlZ29yeSwgZ2V0Q291cnNlVGFza09yZGVyTGlzdCwgZ2V0U3R1RGV0YWlsSW5mbywgdXNlclByYWlzZSwgdXNlckNhbmNlbFByYWlzZSwgZ2V0Q3VycmVudEFjdGl2YXRlVGFza30gZnJvbSAnLi4vYXBpJ1xuXG4gICAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSG9tZSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgICAgIGNvbmZpZyA9IHtcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkuKrmgKfljJblrabkuaDkuK3lv4MnXG4gICAgICAgIH1cblxuICAgICAgICRyZXBlYXQgPSB7XCJzY2hvb2xDb3Vyc2VUYXNrc1wiOntcImNvbVwiOlwiY291cnNlLXRhc2tcIixcInByb3BzXCI6XCJ0YXNrSW5mby5zeW5jXCJ9LFwiY2xhc3NDb3Vyc2VUYXNrc1wiOntcImNvbVwiOlwiY291cnNlLXRhc2tcIixcInByb3BzXCI6XCJ0YXNrSW5mby5zeW5jXCJ9LFwiY2F0ZUNvdXJzZUxpc3RcIjp7XCJjb21cIjpcImNvdXJzZVwiLFwicHJvcHNcIjpcImNvdXJzZVwifX07XHJcbiRwcm9wcyA9IHtcImNvdXJzZS10YXNrXCI6e1wiY2xhc3NcIjp7XCJ2YWx1ZVwiOlwiY291cnNlLXRhc2staXRlbVwiLFwiZm9yXCI6XCJjbGFzc0NvdXJzZVRhc2tzXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJzY2hvb2xDb3Vyc2VUYXNrc1wiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDp0YXNrSW5mby5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW1cIixcInR5cGVcIjpcIml0ZW1cIixcImZvclwiOlwiY2xhc3NDb3Vyc2VUYXNrc1wiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInhtbG5zOnYtb25cIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcInNjaG9vbENvdXJzZVRhc2tzXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9fSxcImNvdXJzZVwiOntcImNsYXNzXCI6e1widmFsdWVcIjpcImNvdXJzZS1pdGVtXCIsXCJmb3JcIjpcImNhdGVDb3Vyc2VMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOmNvdXJzZS5vbmNlXCI6e1widmFsdWVcIjpcIml0ZW1cIixcInR5cGVcIjpcIml0ZW1cIixcImZvclwiOlwiY2F0ZUNvdXJzZUxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn19fTtcclxuJGV2ZW50cyA9IHtcImNvdXJzZS10YXNrXCI6e1widi1vbjp0b2dnbGUtcHJhaXNlXCI6XCJvblRvZ2dsZVByYWlzZVwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgICAgICAgJ2NvdXJzZS10YXNrJzogY291cnNlVGFzayxcbiAgICAgICAgICAgICdjb3Vyc2UnOiBjb3Vyc2UsXG4gICAgICAgICAgICAnZW1wdHktY29udGVudCc6IGVtcHR5Q29udGVudFxuICAgICAgICB9XG5cbiAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgIHVzZXJJbmZvOiBudWxsLFxuICAgICAgICAgICAgdXNlckxvY2FsSW5mbzogbnVsbCxcbiAgICAgICAgICAgIGNsYXNzQ291cnNlVGFza0xvYWRlZDogZmFsc2UsXG4gICAgICAgICAgICBjdXJyZW50VGFiSW5kZXg6IDAsXG4gICAgICAgICAgICBzY2hvb2xDb3Vyc2VUYXNrczogW10sXG4gICAgICAgICAgICBjbGFzc0NvdXJzZVRhc2tzOiBbXSxcbiAgICAgICAgICAgIGNvdXJzZUNhdGVnb3JpZXM6IFtdLFxuICAgICAgICAgICAgYWN0aXZlQ2F0ZUlkOiAnJyxcbiAgICAgICAgICAgIGNhdGVDb3Vyc2VMaXN0OiBbXSxcbiAgICAgICAgICAgIHVzZXJJbmZvRGV0YWlsOiBudWxsXG4gICAgICAgIH1cblxuICAgICAgICBjb21wdXRlZCA9IHtcbiAgICAgICAgICAgIHNjaG9vbElkKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mbyAmJiB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mby5TY2hvb2xGSURcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG1ldGhvZHMgPSB7XG4gICAgICAgICAgICBzZXRDdXJyZW50VGFiKGluZGV4KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFiSW5kZXggPSBpbmRleFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uU3dpcGVyQ2hhbmdlKGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRUYWJJbmRleCA9IGUuZGV0YWlsLmN1cnJlbnRcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVN3aXBlckNoYW5nZShlLmRldGFpbC5jdXJyZW50KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5hdmlnYXRlVG9EZXRhaWwoaXRlbSkge1xuICAgICAgICAgICAgICAgIGxldCBjb3Vyc2VJZCA9IGl0ZW0uRmxua0lEXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL2NvdXJzZS9wYWdlcy9jb3Vyc2UtZGV0YWlsP2NvdXJzZUlkPScgKyBjb3Vyc2VJZFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmF2aWdhdGVUb1Rhc2tEZXRhaWwoaXRlbSkge1xuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9wcmFjdGljZS9wYWdlcy9yZXZpZXdGaW5pc2hUYXNrP2NvdXJzZUlkPScgKyBpdGVtLkNvdXJzZUZJRCArICcmZ3JvdXBJZD0nICsgaXRlbS5GbG5rSURcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYW5nZUNhdGVnb3J5KGNhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUNhdGVJZCA9IGNhdGUuY2F0ZWlkXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q291cnNlc0J5Q2F0ZWdvcnkoY2F0ZS5jYXRlaWQpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25Ub2dnbGVQcmFpc2UoaXRlbSkge1xuICAgICAgICAgICAgICAgIGxldCBkYXRhU291cmNlID0gJydcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50VGFiSW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YVNvdXJjZSA9ICdzY2hvb2xDb3Vyc2VUYXNrcydcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkYXRhU291cmNlID0gJ2NsYXNzQ291cnNlVGFza3MnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBncm91cEZJRCA9IGl0ZW0uRmxua0lEXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uSXNQcmFpc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlckNhbmNlbFByYWlzZSh0aGlzLnVzZXJMb2NhbEluZm8uRmxua0lELCBncm91cEZJRCwgaXRlbS5Db3Vyc2VGSUQpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gdGhpc1tkYXRhU291cmNlXS5maW5kKG9pdGVtID0+IGdyb3VwRklEID09PSBvaXRlbS5GbG5rSUQpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuSXNQcmFpc2UgPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuUHJhaXNlTnVtLS1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlclByYWlzZSh0aGlzLnVzZXJMb2NhbEluZm8uRmxua0lELCBncm91cEZJRCwgaXRlbS5Db3Vyc2VGSUQpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gdGhpc1tkYXRhU291cmNlXS5maW5kKG9pdGVtID0+IGdyb3VwRklEID09PSBvaXRlbS5GbG5rSUQpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuSXNQcmFpc2UgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5QcmFpc2VOdW0rK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBoYW5kbGVTd2lwZXJDaGFuZ2UoaW5kZXgpIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIC8vIOWIh+aNouWIsOesrOS6jOS4qnRhYu+8jOWKoOi9veaVsOaNrlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5jbGFzc0NvdXJzZVRhc2tMb2FkZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g5Yqg6L295pWw5o2uXG4gICAgICAgICAgICAgICAgICAgIGdldFN0dURldGFpbEluZm8odGhpcy51c2VyTG9jYWxJbmZvLkZsbmtJRCkudGhlbihkZXRhaWwgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRDb3Vyc2VUYXNrT3JkZXIodGhpcy51c2VyTG9jYWxJbmZvLlNjaG9vbEZJRCwgdGhpcy51c2VyTG9jYWxJbmZvLkZsbmtJRCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExldmVsTnVtOiBkZXRhaWwuTGV2ZWxOdW0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR3JhZGVOdW06IGRldGFpbC5HcmFkZU51bSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDbGFzc051bTogZGV0YWlsLkNsYXNzTnVtXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGFzc0NvdXJzZVRhc2tzID0gcmVzLkRhdGFTb3VyY2UgfHwgW11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsYXNzQ291cnNlVGFza3MuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5vcmRlciA9IGl0ZW0uQ2xhc3NTb3J0Q29kZSB8fCBpdGVtLlNjaG9vbFNvcnRDb2RlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGFzc0NvdXJzZVRhc2tMb2FkZWQgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGFzc0NvdXJzZVRhc2tzID0gW11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGFzc0NvdXJzZVRhc2tMb2FkZWQgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPT09IDIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY291cnNlQ2F0ZUxvYWRlZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyDliqDovb3or77nqIvliIbnsbvliJfooajvvIzlkIzml7bliqDovb3lvZPliY3liIbnsbvnmoTor77nqItcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRDb3Vyc2VDYXRlZ29yeSgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZ2V0Q291cnNlQ2F0ZWdvcnkoKSB7XG4gICAgICAgICAgICBnZXRDb3Vyc2VDYXRlQnlTY2hvb2wodGhpcy51c2VyTG9jYWxJbmZvLlNjaG9vbEZJRCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY291cnNlQ2F0ZWdvcmllcyA9IHJlcy5SZXN1bHRPYmoubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWlkOiBpdGVtLkNvdXJzZUNhdGVnb3J5RklELFxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZU5hbWU6IGl0ZW0uQ291cnNlQ2F0ZWdvcnlOYW1lXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlQ2F0ZUlkID0gdGhpcy5jb3Vyc2VDYXRlZ29yaWVzWzBdLmNhdGVpZFxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgICAgICB0aGlzLmdldENvdXJzZXNCeUNhdGVnb3J5KHRoaXMuYWN0aXZlQ2F0ZUlkKVxuICAgICAgICAgICAgICAgIHRoaXMuY291cnNlQ2F0ZUxvYWRlZCA9IHRydWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBnZXRDb3Vyc2VzQnlDYXRlZ29yeShjYXRlaWQpIHtcbiAgICAgICAgICAgIGdldENvdXJzZXNCeUNhdGVnb3J5KGNhdGVpZCwgdGhpcy51c2VyTG9jYWxJbmZvLlNjaG9vbEZJRCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2F0ZUNvdXJzZUxpc3QgPSByZXNcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgZ2V0Q291cnNlVGFza09yZGVyKHNjaG9vbElkLCB1c2VySWQsIHVzZXJJbmZvID0ge30pIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgZ2V0Q291cnNlVGFza09yZGVyTGlzdChzY2hvb2xJZCwgdXNlcklkLCB1c2VySW5mby5MZXZlbE51bSwgdXNlckluZm8uR3JhZGVOdW0sIHVzZXJJbmZvLkNsYXNzTnVtKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzLlJlc3VsdE9iailcbiAgICAgICAgICAgICAgICB9LCByZWplY3QpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgaW5pdCgpIHtcbiAgICAgICAgICAgIGxvZ2luKCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgIC8vIOeZu+mZhuaOpeWPo+WIpOaWreeUqOaIt+aYr+WQpue7keWumu+8jOacque7keWumuWImei3s+i9rOe7keWumumhtemdolxuICAgICAgICAgICAgICAgIGlmIChyZXMuRmxua0lEKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOiOt+WPluWIsOeUqOaIt+S/oeaBr++8jOivtOaYjueUqOaIt+W3sue7keWumiznvJPlrZjnlKjmiLfkv6Hmga9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8gPSByZXNcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkUGFnZURhdGEoKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOi3s+i9rOWIsOazqOWGjOe7keWumumhtemdolxuICAgICAgICAgICAgICAgICAgICB3ZXB5LnJlZGlyZWN0VG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnL3BhZ2VzL3JlZ2lzdGVyP29wZW5pZD0nICsgcmVzLldlY2hhdEFjY291bnRcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCByZXMgPT4ge1xuICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfnmbvpmYblpLHotKUnLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnbm9uZSdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGxvYWRQYWdlRGF0YSgpIHtcbiAgICAgICAgICAgIHRoaXMudXNlckxvY2FsSW5mbyA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvXG4gICAgICAgICAgICB0aGlzLmdldENvdXJzZVRhc2tPcmRlcih0aGlzLnVzZXJMb2NhbEluZm8uU2Nob29sRklELCB0aGlzLnVzZXJMb2NhbEluZm8uRmxua0lEKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2hvb2xDb3Vyc2VUYXNrcyA9IHJlcy5EYXRhU291cmNlIHx8IFtdXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hvb2xDb3Vyc2VUYXNrcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLm9yZGVyID0gaXRlbS5TY2hvb2xTb3J0Q29kZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nob29sQ291cnNlVGFza3MgPSBbXVxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBnZXRDdXJyZW50QWN0aXZhdGVUYXNrKHRoaXMudXNlckxvY2FsSW5mby5GbG5rSUQpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYWN0aXZlVGFza0luZm8gPSB7Q291cnNlRklEOiByZXMuQ291cnNlRklELCBHcm91cEZJRDogcmVzLkdyb3VwRklEfVxuICAgICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ2FjdGl2ZVRhc2tJbmZvJywgYWN0aXZlVGFza0luZm8pXG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgd2VweS5yZW1vdmVTdG9yYWdlU3luYygnYWN0aXZlVGFza0luZm8nKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIG9uTG9hZCgpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgdGhpcy4kcGFyZW50LmdldFVzZXJJbmZvKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnVzZXJJbmZvID0gcmVzXG4gICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHNlbGYuaW5pdCgpXG4gICAgICAgIH1cbiAgICB9XG4iXX0=