'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _stepList = require('./../../components/step-list.js');

var _stepList2 = _interopRequireDefault(_stepList);

var _richButton = require('./../../components/rich-button.js');

var _richButton2 = _interopRequireDefault(_richButton);

var _dialog = require('./../../components/dialog.js');

var _dialog2 = _interopRequireDefault(_dialog);

var _api = require('./../../api/index.js');

var _Step = require('./../../model/Step.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Arrange = function (_wepy$page) {
    _inherits(Arrange, _wepy$page);

    function Arrange() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Arrange);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Arrange.__proto__ || Object.getPrototypeOf(Arrange)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '会安排'
        }, _this.data = {
            parentScrollTop: 0,
            isTeacher: false,
            userInfo: null,
            isUserLeader: false,
            isChanged: false,
            scrollable: true,
            addStepDialogVisible: false,
            stepName: '',
            stepDesc: '',
            addStepTitle: '添加步骤',
            toEditStep: null,
            datalist: [],
            currentGroupInfo: null,
            queryParam: null,
            navigateUrlMap: {
                prevKnow: '/practice/pages/prevKnow',
                practice: '/pages/practice',
                practiceOpenType: 'switchTab',
                think: '/practice/pages/think'
            },
            stepEditable: false,
            isStuInGroup: false
        }, _this.$repeat = {}, _this.$props = { "step-list": { "xmlns:v-bind": "", "v-bind:list.sync": "datalist", "v-bind:editable.sync": "stepEditable", "v-bind:parentOffset.sync": "parentScrollTop" }, "rich-button1": { "text": "添加步骤", "theme": "grey", "xmlns:v-on": "", "width": "90%" }, "rich-button2": { "text": "保存", "v-bind:theme.sync": "saveBtnTheme", "width": "90%" }, "rich-button3": { "text": "提交", "theme": "green", "width": "100%;" }, "dialog": { "class": "add-step-dialog", "v-bind:visible.sync": "addStepDialogVisible" } }, _this.$events = { "rich-button1": { "v-on:tap": "addStep" }, "rich-button2": { "v-on:tap": "saveChange" }, "rich-button3": { "v-on:tap": "onSubmitAddStep" } }, _this.components = {
            'step-list': _stepList2.default,
            'rich-button1': _richButton2.default,
            'rich-button2': _richButton2.default,
            'rich-button3': _richButton2.default,
            'dialog': _dialog2.default
        }, _this.computed = {
            saveBtnTheme: function saveBtnTheme() {
                return this.isChanged ? 'green' : 'grey';
            }
        }, _this.methods = {
            addStep: function addStep() {
                this.addStepTitle = '添加步骤';
                this.toEditStep = null;
                this.addStepDialogVisible = true;
                this.$apply();
            },
            onSubmitAddStep: function onSubmitAddStep() {
                if (this.toEditStep) {
                    // 编辑步骤处理
                    this.toEditStep.ArrangeName = this.stepName;
                    this.toEditStep.modelList[0].ArrangeContent = this.stepDesc;
                    this.$apply();
                } else {
                    // 添加步骤处理
                    var stepItem = new _Step.Step({
                        ArrangeName: this.stepName,
                        CourseFID: this.currentGroupInfo.CourseFID,
                        GroupFID: this.currentGroupInfo.GroupFID,
                        Creater: this.$parent.globalData.userInfo.FlnkID,
                        SortCode: this.datalist.length + 1,
                        ArrangeContent: this.stepDesc
                    });
                    this.datalist.push(stepItem);
                    this.$apply();
                }
                this.stepName = '';
                this.stepDesc = '';
                this.isChanged = true;
                this.addStepDialogVisible = false;
                this.$apply();
            },
            saveChange: function saveChange() {
                var _this2 = this;

                this.datalist.forEach(function (item, index) {
                    item.SortCode = index + 1;
                });
                (0, _api.saveGroupArrangeList)(this.datalist).then(function (res) {
                    (0, _api.getCourseArrangeList)(_this2.currentGroupInfo.CourseFID, _this2.currentGroupInfo.GroupFID).then(function (res) {
                        res.forEach(function (item) {
                            var data = item.modelList && item.modelList[0];
                            if (data && data.ArrangeType !== 1) {
                                item.modelList = item.modelList.slice(0, 1);
                            }
                        });
                        _this2.datalist = res;
                        _this2.isChanged = false;
                        _this2.$apply();
                        _wepy2.default.showToast({
                            title: '保存成功'
                        });
                    });
                });
            },
            onNameInput: function onNameInput(e) {
                this.stepName = e.detail.value;
            },
            onDescInput: function onDescInput(e) {
                this.stepDesc = e.detail.value;
            },
            onScroll: function onScroll(e) {
                this.parentScrollTop = e.detail.scrollTop;
                this.$apply();
            }
        }, _this.events = {
            'disable-scroll': function disableScroll() {
                this.scrollable = false;
                this.$apply();
            },
            'enable-scroll': function enableScroll() {
                this.scrollable = true;
                this.isChanged = true;
                this.$apply();
            },
            'edit-step': function editStep(e) {
                this.addStepTitle = '编辑步骤';
                this.toEditStep = e;
                this.stepName = e.ArrangeName;
                this.stepDesc = e.modelList[0] && e.modelList[0].ArrangeContent || '';
                this.addStepDialogVisible = true;
                this.$apply();
            },
            'delete-step': function deleteStep(e) {
                var self = this;
                _wepy2.default.showModal({
                    title: '提示',
                    content: '删除步骤之后将无法恢复，确定删除该步骤？',
                    success: function success(res) {
                        var _this3 = this;

                        if (res.confirm) {
                            (0, _api.deleteArrange)(e.FlnkID).then(function (res) {
                                var index = self.datalist.findIndex(function (item) {
                                    return item.FlnkID === e.FlnkID;
                                });
                                self.datalist.splice(index, 1);
                                _this3.isChanged = true;
                                self.$apply();
                                self.$com['step-list'].$apply();
                            });
                        }
                    }
                });
            },
            'check-change': function checkChange() {
                this.isChanged = true;
            }
        }, _this.watch = {
            'isUserLeader': function isUserLeader(val) {
                if (val && !this.queryParam) {
                    this.stepEditable = true;
                } else {
                    this.stepEditable = false;
                }
            },
            'queryParam': function queryParam(val) {
                if (!val && this.isUserLeader) {
                    this.stepEditable = true;
                } else {
                    this.stepEditable = false;
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Arrange, [{
        key: 'init',
        value: function init() {
            var _this4 = this;

            var activeGroupInfo = void 0;
            if (this.queryParam) {
                activeGroupInfo = this.queryParam;
            } else {
                activeGroupInfo = _wepy2.default.getStorageSync('activeTaskInfo');
            }
            this.currentGroupInfo = activeGroupInfo;
            (0, _api.getGroupDetail)(activeGroupInfo.GroupFID).then(function (res) {
                var leaderId = res.GroupLeader;
                _this4.isUserLeader = leaderId === _this4.$parent.globalData.userInfo.FlnkID;
                _this4.$apply();
            });
            (0, _api.getCourseArrangeList)(activeGroupInfo.CourseFID, activeGroupInfo.GroupFID).then(function (res) {
                res.forEach(function (item) {
                    var data = item.modelList && item.modelList[0];
                    if (data && data.ArrangeType !== 1) {
                        item.modelList = item.modelList.slice(0, 1);
                    }
                });
                _this4.datalist = res;
                _this4.$apply();
            });
            (0, _api.isStuInCourseGroup)(this.$parent.globalData.userInfo.FlnkID, activeGroupInfo.CourseFID, activeGroupInfo.GroupFID).then(function (res) {
                _this4.isStuInGroup = res;
                _this4.$apply();
            }, function () {
                _this4.isStuInGroup = false;
                _this4.$apply();
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad(option) {
            if (option && option.courseId) {
                this.queryParam = {
                    CourseFID: option.courseId,
                    GroupFID: option.groupId
                };
                this.navigateUrlMap = {
                    prevKnow: '/practice/pages/prevKnow?courseId=' + option.courseId + '&groupId=' + option.groupId,
                    practice: '/practice/pages/reviewFinishTask?courseId=' + option.courseId + '&groupId=' + option.groupId,
                    practiceOpenType: 'redirect',
                    think: '/practice/pages/think?courseId=' + option.courseId + '&groupId=' + option.groupId
                };
                this.$apply();
            }
            this.isTeacher = this.$parent.globalData.userInfo.RoleNum + '' === '2';
            this.init();
        }
    }]);

    return Arrange;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Arrange , 'practice/pages/arrange'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFycmFuZ2UuanMiXSwibmFtZXMiOlsiQXJyYW5nZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwicGFyZW50U2Nyb2xsVG9wIiwiaXNUZWFjaGVyIiwidXNlckluZm8iLCJpc1VzZXJMZWFkZXIiLCJpc0NoYW5nZWQiLCJzY3JvbGxhYmxlIiwiYWRkU3RlcERpYWxvZ1Zpc2libGUiLCJzdGVwTmFtZSIsInN0ZXBEZXNjIiwiYWRkU3RlcFRpdGxlIiwidG9FZGl0U3RlcCIsImRhdGFsaXN0IiwiY3VycmVudEdyb3VwSW5mbyIsInF1ZXJ5UGFyYW0iLCJuYXZpZ2F0ZVVybE1hcCIsInByZXZLbm93IiwicHJhY3RpY2UiLCJwcmFjdGljZU9wZW5UeXBlIiwidGhpbmsiLCJzdGVwRWRpdGFibGUiLCJpc1N0dUluR3JvdXAiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJzdGVwTGlzdCIsInJpY2hCdXR0b24iLCJkaWFsb2ciLCJjb21wdXRlZCIsInNhdmVCdG5UaGVtZSIsIm1ldGhvZHMiLCJhZGRTdGVwIiwiJGFwcGx5Iiwib25TdWJtaXRBZGRTdGVwIiwiQXJyYW5nZU5hbWUiLCJtb2RlbExpc3QiLCJBcnJhbmdlQ29udGVudCIsInN0ZXBJdGVtIiwiU3RlcCIsIkNvdXJzZUZJRCIsIkdyb3VwRklEIiwiQ3JlYXRlciIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiRmxua0lEIiwiU29ydENvZGUiLCJsZW5ndGgiLCJwdXNoIiwic2F2ZUNoYW5nZSIsImZvckVhY2giLCJpdGVtIiwiaW5kZXgiLCJ0aGVuIiwicmVzIiwiQXJyYW5nZVR5cGUiLCJzbGljZSIsIndlcHkiLCJzaG93VG9hc3QiLCJ0aXRsZSIsIm9uTmFtZUlucHV0IiwiZSIsImRldGFpbCIsInZhbHVlIiwib25EZXNjSW5wdXQiLCJvblNjcm9sbCIsInNjcm9sbFRvcCIsImV2ZW50cyIsInNlbGYiLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic3VjY2VzcyIsImNvbmZpcm0iLCJmaW5kSW5kZXgiLCJzcGxpY2UiLCIkY29tIiwid2F0Y2giLCJ2YWwiLCJhY3RpdmVHcm91cEluZm8iLCJnZXRTdG9yYWdlU3luYyIsImxlYWRlcklkIiwiR3JvdXBMZWFkZXIiLCJvcHRpb24iLCJjb3Vyc2VJZCIsImdyb3VwSWQiLCJSb2xlTnVtIiwiaW5pdCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNJOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7OzRMQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBSVRDLEksR0FBTztBQUNIQyw2QkFBaUIsQ0FEZDtBQUVIQyx1QkFBVyxLQUZSO0FBR0hDLHNCQUFVLElBSFA7QUFJSEMsMEJBQWMsS0FKWDtBQUtIQyx1QkFBVyxLQUxSO0FBTUhDLHdCQUFZLElBTlQ7QUFPSEMsa0NBQXNCLEtBUG5CO0FBUUhDLHNCQUFVLEVBUlA7QUFTSEMsc0JBQVUsRUFUUDtBQVVIQywwQkFBYyxNQVZYO0FBV0hDLHdCQUFZLElBWFQ7QUFZSEMsc0JBQVUsRUFaUDtBQWFIQyw4QkFBa0IsSUFiZjtBQWNIQyx3QkFBWSxJQWRUO0FBZUhDLDRCQUFnQjtBQUNaQywwQkFBVSwwQkFERTtBQUVaQywwQkFBVSxpQkFGRTtBQUdaQyxrQ0FBa0IsV0FITjtBQUlaQyx1QkFBTztBQUpLLGFBZmI7QUFxQkhDLDBCQUFjLEtBckJYO0FBc0JIQywwQkFBYztBQXRCWCxTLFFBeUJSQyxPLEdBQVUsRSxRQUNqQkMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLG9CQUFtQixVQUF0QyxFQUFpRCx3QkFBdUIsY0FBeEUsRUFBdUYsNEJBQTJCLGlCQUFsSCxFQUFiLEVBQWtKLGdCQUFlLEVBQUMsUUFBTyxNQUFSLEVBQWUsU0FBUSxNQUF2QixFQUE4QixjQUFhLEVBQTNDLEVBQThDLFNBQVEsS0FBdEQsRUFBakssRUFB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InNvdXJjZXNDb250ZW50IjpbIlxuICAgIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gICAgaW1wb3J0IHN0ZXBMaXN0IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvc3RlcC1saXN0J1xuICAgIGltcG9ydCByaWNoQnV0dG9uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcmljaC1idXR0b24nXG4gICAgaW1wb3J0IGRpYWxvZyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2RpYWxvZydcblxuICAgIGltcG9ydCB7Z2V0R3JvdXBEZXRhaWwsIGdldENvdXJzZUFycmFuZ2VMaXN0LCBzYXZlR3JvdXBBcnJhbmdlTGlzdCwgZGVsZXRlQXJyYW5nZSwgaXNTdHVJbkNvdXJzZUdyb3VwfSBmcm9tICcuLi8uLi9hcGknXG4gICAgaW1wb3J0IHtTdGVwfSBmcm9tICcuLi8uLi9tb2RlbC9TdGVwJ1xuXG4gICAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXJyYW5nZSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgICAgIGNvbmZpZyA9IHtcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkvJrlronmjpInXG4gICAgICAgIH1cblxuICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgcGFyZW50U2Nyb2xsVG9wOiAwLFxuICAgICAgICAgICAgaXNUZWFjaGVyOiBmYWxzZSxcbiAgICAgICAgICAgIHVzZXJJbmZvOiBudWxsLFxuICAgICAgICAgICAgaXNVc2VyTGVhZGVyOiBmYWxzZSxcbiAgICAgICAgICAgIGlzQ2hhbmdlZDogZmFsc2UsXG4gICAgICAgICAgICBzY3JvbGxhYmxlOiB0cnVlLFxuICAgICAgICAgICAgYWRkU3RlcERpYWxvZ1Zpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAgc3RlcE5hbWU6ICcnLFxuICAgICAgICAgICAgc3RlcERlc2M6ICcnLFxuICAgICAgICAgICAgYWRkU3RlcFRpdGxlOiAn5re75Yqg5q2l6aqkJyxcbiAgICAgICAgICAgIHRvRWRpdFN0ZXA6IG51bGwsXG4gICAgICAgICAgICBkYXRhbGlzdDogW10sXG4gICAgICAgICAgICBjdXJyZW50R3JvdXBJbmZvOiBudWxsLFxuICAgICAgICAgICAgcXVlcnlQYXJhbTogbnVsbCxcbiAgICAgICAgICAgIG5hdmlnYXRlVXJsTWFwOiB7XG4gICAgICAgICAgICAgICAgcHJldktub3c6ICcvcHJhY3RpY2UvcGFnZXMvcHJldktub3cnLFxuICAgICAgICAgICAgICAgIHByYWN0aWNlOiAnL3BhZ2VzL3ByYWN0aWNlJyxcbiAgICAgICAgICAgICAgICBwcmFjdGljZU9wZW5UeXBlOiAnc3dpdGNoVGFiJyxcbiAgICAgICAgICAgICAgICB0aGluazogJy9wcmFjdGljZS9wYWdlcy90aGluaydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdGVwRWRpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgaXNTdHVJbkdyb3VwOiBmYWxzZVxuICAgICAgICB9XG5cbiAgICAgICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInN0ZXAtbGlzdFwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6bGlzdC5zeW5jXCI6XCJkYXRhbGlzdFwiLFwidi1iaW5kOmVkaXRhYmxlLnN5bmNcIjpcInN0ZXBFZGl0YWJsZVwiLFwidi1iaW5kOnBhcmVudE9mZnNldC5zeW5jXCI6XCJwYXJlbnRTY3JvbGxUb3BcIn0sXCJyaWNoLWJ1dHRvbjFcIjp7XCJ0ZXh0XCI6XCLmt7vliqDmraXpqqRcIixcInRoZW1lXCI6XCJncmV5XCIsXCJ4bWxuczp2LW9uXCI6XCJcIixcIndpZHRoXCI6XCI5MCVcIn0sXCJyaWNoLWJ1dHRvbjJcIjp7XCJ0ZXh0XCI6XCLkv53lrZhcIixcInYtYmluZDp0aGVtZS5zeW5jXCI6XCJzYXZlQnRuVGhlbWVcIixcIndpZHRoXCI6XCI5MCVcIn0sXCJyaWNoLWJ1dHRvbjNcIjp7XCJ0ZXh0XCI6XCLmj5DkuqRcIixcInRoZW1lXCI6XCJncmVlblwiLFwid2lkdGhcIjpcIjEwMCU7XCJ9LFwiZGlhbG9nXCI6e1wiY2xhc3NcIjpcImFkZC1zdGVwLWRpYWxvZ1wiLFwidi1iaW5kOnZpc2libGUuc3luY1wiOlwiYWRkU3RlcERpYWxvZ1Zpc2libGVcIn19O1xyXG4kZXZlbnRzID0ge1wicmljaC1idXR0b24xXCI6e1widi1vbjp0YXBcIjpcImFkZFN0ZXBcIn0sXCJyaWNoLWJ1dHRvbjJcIjp7XCJ2LW9uOnRhcFwiOlwic2F2ZUNoYW5nZVwifSxcInJpY2gtYnV0dG9uM1wiOntcInYtb246dGFwXCI6XCJvblN1Ym1pdEFkZFN0ZXBcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgICAgICAgICdzdGVwLWxpc3QnOiBzdGVwTGlzdCxcbiAgICAgICAgICAgICdyaWNoLWJ1dHRvbjEnOiByaWNoQnV0dG9uLFxuICAgICAgICAgICAgJ3JpY2gtYnV0dG9uMic6IHJpY2hCdXR0b24sXG4gICAgICAgICAgICAncmljaC1idXR0b24zJzogcmljaEJ1dHRvbixcbiAgICAgICAgICAgICdkaWFsb2cnOiBkaWFsb2dcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbXB1dGVkID0ge1xuICAgICAgICAgICAgc2F2ZUJ0blRoZW1lKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzQ2hhbmdlZCA/ICdncmVlbicgOiAnZ3JleSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG1ldGhvZHMgPSB7XG4gICAgICAgICAgICBhZGRTdGVwKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkU3RlcFRpdGxlID0gJ+a3u+WKoOatpemqpCdcbiAgICAgICAgICAgICAgICB0aGlzLnRvRWRpdFN0ZXAgPSBudWxsXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRTdGVwRGlhbG9nVmlzaWJsZSA9IHRydWVcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25TdWJtaXRBZGRTdGVwKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRvRWRpdFN0ZXApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g57yW6L6R5q2l6aqk5aSE55CGXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9FZGl0U3RlcC5BcnJhbmdlTmFtZSA9IHRoaXMuc3RlcE5hbWVcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b0VkaXRTdGVwLm1vZGVsTGlzdFswXS5BcnJhbmdlQ29udGVudCA9IHRoaXMuc3RlcERlc2NcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOa3u+WKoOatpemqpOWkhOeQhlxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RlcEl0ZW0gPSBuZXcgU3RlcCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBBcnJhbmdlTmFtZTogdGhpcy5zdGVwTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIENvdXJzZUZJRDogdGhpcy5jdXJyZW50R3JvdXBJbmZvLkNvdXJzZUZJRCxcbiAgICAgICAgICAgICAgICAgICAgICAgIEdyb3VwRklEOiB0aGlzLmN1cnJlbnRHcm91cEluZm8uR3JvdXBGSUQsXG4gICAgICAgICAgICAgICAgICAgICAgICBDcmVhdGVyOiB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mby5GbG5rSUQsXG4gICAgICAgICAgICAgICAgICAgICAgICBTb3J0Q29kZTogdGhpcy5kYXRhbGlzdC5sZW5ndGggKyAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgQXJyYW5nZUNvbnRlbnQ6IHRoaXMuc3RlcERlc2NcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhbGlzdC5wdXNoKHN0ZXBJdGVtKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc3RlcE5hbWUgPSAnJ1xuICAgICAgICAgICAgICAgIHRoaXMuc3RlcERlc2MgPSAnJ1xuICAgICAgICAgICAgICAgIHRoaXMuaXNDaGFuZ2VkID0gdHJ1ZVxuICAgICAgICAgICAgICAgIHRoaXMuYWRkU3RlcERpYWxvZ1Zpc2libGUgPSBmYWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzYXZlQ2hhbmdlKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YWxpc3QuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5Tb3J0Q29kZSA9IGluZGV4ICsgMVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgc2F2ZUdyb3VwQXJyYW5nZUxpc3QodGhpcy5kYXRhbGlzdCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBnZXRDb3Vyc2VBcnJhbmdlTGlzdCh0aGlzLmN1cnJlbnRHcm91cEluZm8uQ291cnNlRklELCB0aGlzLmN1cnJlbnRHcm91cEluZm8uR3JvdXBGSUQpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gaXRlbS5tb2RlbExpc3QgJiYgaXRlbS5tb2RlbExpc3RbMF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLkFycmFuZ2VUeXBlICE9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ubW9kZWxMaXN0ID0gaXRlbS5tb2RlbExpc3Quc2xpY2UoMCwgMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhbGlzdCA9IHJlc1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0NoYW5nZWQgPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5L+d5a2Y5oiQ5YqfJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uTmFtZUlucHV0KGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0ZXBOYW1lID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkRlc2NJbnB1dChlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGVwRGVzYyA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25TY3JvbGwoZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50U2Nyb2xsVG9wID0gZS5kZXRhaWwuc2Nyb2xsVG9wXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnRzID0ge1xuICAgICAgICAgICAgJ2Rpc2FibGUtc2Nyb2xsJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsYWJsZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdlbmFibGUtc2Nyb2xsJzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxhYmxlID0gdHJ1ZVxuICAgICAgICAgICAgICAgIHRoaXMuaXNDaGFuZ2VkID0gdHJ1ZVxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnZWRpdC1zdGVwJzogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkU3RlcFRpdGxlID0gJ+e8lui+keatpemqpCdcbiAgICAgICAgICAgICAgICB0aGlzLnRvRWRpdFN0ZXAgPSBlXG4gICAgICAgICAgICAgICAgdGhpcy5zdGVwTmFtZSA9IGUuQXJyYW5nZU5hbWVcbiAgICAgICAgICAgICAgICB0aGlzLnN0ZXBEZXNjID0gKGUubW9kZWxMaXN0WzBdICYmIGUubW9kZWxMaXN0WzBdLkFycmFuZ2VDb250ZW50KSB8fCAnJ1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkU3RlcERpYWxvZ1Zpc2libGUgPSB0cnVlXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdkZWxldGUtc3RlcCc6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogJ+WIoOmZpOatpemqpOS5i+WQjuWwhuaXoOazleaBouWkje+8jOehruWumuWIoOmZpOivpeatpemqpO+8nycsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlQXJyYW5nZShlLkZsbmtJRCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBzZWxmLmRhdGFsaXN0LmZpbmRJbmRleChpdGVtID0+IGl0ZW0uRmxua0lEID09PSBlLkZsbmtJRClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5kYXRhbGlzdC5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNDaGFuZ2VkID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGNvbVsnc3RlcC1saXN0J10uJGFwcGx5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnY2hlY2stY2hhbmdlJzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0NoYW5nZWQgPSB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB3YXRjaCA9IHtcbiAgICAgICAgICAgICdpc1VzZXJMZWFkZXInOiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsICYmICF0aGlzLnF1ZXJ5UGFyYW0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGVwRWRpdGFibGUgPSB0cnVlXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGVwRWRpdGFibGUgPSBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAncXVlcnlQYXJhbSc6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgICAgIGlmICghdmFsICYmIHRoaXMuaXNVc2VyTGVhZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RlcEVkaXRhYmxlID0gdHJ1ZVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RlcEVkaXRhYmxlID0gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpbml0KCkge1xuICAgICAgICAgICAgbGV0IGFjdGl2ZUdyb3VwSW5mb1xuICAgICAgICAgICAgaWYgKHRoaXMucXVlcnlQYXJhbSkge1xuICAgICAgICAgICAgICAgIGFjdGl2ZUdyb3VwSW5mbyA9IHRoaXMucXVlcnlQYXJhbVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhY3RpdmVHcm91cEluZm8gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdhY3RpdmVUYXNrSW5mbycpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRHcm91cEluZm8gPSBhY3RpdmVHcm91cEluZm9cbiAgICAgICAgICAgIGdldEdyb3VwRGV0YWlsKGFjdGl2ZUdyb3VwSW5mby5Hcm91cEZJRCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBsZWFkZXJJZCA9IHJlcy5Hcm91cExlYWRlclxuICAgICAgICAgICAgICAgIHRoaXMuaXNVc2VyTGVhZGVyID0gbGVhZGVySWQgPT09IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvLkZsbmtJRFxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBnZXRDb3Vyc2VBcnJhbmdlTGlzdChhY3RpdmVHcm91cEluZm8uQ291cnNlRklELCBhY3RpdmVHcm91cEluZm8uR3JvdXBGSUQpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICByZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBpdGVtLm1vZGVsTGlzdCAmJiBpdGVtLm1vZGVsTGlzdFswXVxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLkFycmFuZ2VUeXBlICE9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLm1vZGVsTGlzdCA9IGl0ZW0ubW9kZWxMaXN0LnNsaWNlKDAsIDEpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YWxpc3QgPSByZXNcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgaXNTdHVJbkNvdXJzZUdyb3VwKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvLkZsbmtJRCwgYWN0aXZlR3JvdXBJbmZvLkNvdXJzZUZJRCwgYWN0aXZlR3JvdXBJbmZvLkdyb3VwRklEKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzU3R1SW5Hcm91cCA9IHJlc1xuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzU3R1SW5Hcm91cCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIG9uTG9hZChvcHRpb24pIHtcbiAgICAgICAgICAgIGlmIChvcHRpb24gJiYgb3B0aW9uLmNvdXJzZUlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5xdWVyeVBhcmFtID0ge1xuICAgICAgICAgICAgICAgICAgICBDb3Vyc2VGSUQ6IG9wdGlvbi5jb3Vyc2VJZCxcbiAgICAgICAgICAgICAgICAgICAgR3JvdXBGSUQ6IG9wdGlvbi5ncm91cElkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVVcmxNYXAgPSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZLbm93OiAnL3ByYWN0aWNlL3BhZ2VzL3ByZXZLbm93P2NvdXJzZUlkPScgKyBvcHRpb24uY291cnNlSWQgKyAnJmdyb3VwSWQ9JyArIG9wdGlvbi5ncm91cElkLFxuICAgICAgICAgICAgICAgICAgICBwcmFjdGljZTogJy9wcmFjdGljZS9wYWdlcy9yZXZpZXdGaW5pc2hUYXNrP2NvdXJzZUlkPScgKyBvcHRpb24uY291cnNlSWQgKyAnJmdyb3VwSWQ9JyArIG9wdGlvbi5ncm91cElkLFxuICAgICAgICAgICAgICAgICAgICBwcmFjdGljZU9wZW5UeXBlOiAncmVkaXJlY3QnLFxuICAgICAgICAgICAgICAgICAgICB0aGluazogJy9wcmFjdGljZS9wYWdlcy90aGluaz9jb3Vyc2VJZD0nICsgb3B0aW9uLmNvdXJzZUlkICsgJyZncm91cElkPScgKyBvcHRpb24uZ3JvdXBJZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmlzVGVhY2hlciA9ICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mby5Sb2xlTnVtICsgJycpID09PSAnMidcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpXG4gICAgICAgIH1cbiAgICB9XG4iXX0=