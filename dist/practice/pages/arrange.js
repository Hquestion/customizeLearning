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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFycmFuZ2UuanMiXSwibmFtZXMiOlsiQXJyYW5nZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwicGFyZW50U2Nyb2xsVG9wIiwiaXNUZWFjaGVyIiwidXNlckluZm8iLCJpc1VzZXJMZWFkZXIiLCJpc0NoYW5nZWQiLCJzY3JvbGxhYmxlIiwiYWRkU3RlcERpYWxvZ1Zpc2libGUiLCJzdGVwTmFtZSIsInN0ZXBEZXNjIiwiYWRkU3RlcFRpdGxlIiwidG9FZGl0U3RlcCIsImRhdGFsaXN0IiwiY3VycmVudEdyb3VwSW5mbyIsInF1ZXJ5UGFyYW0iLCJuYXZpZ2F0ZVVybE1hcCIsInByZXZLbm93IiwicHJhY3RpY2UiLCJwcmFjdGljZU9wZW5UeXBlIiwidGhpbmsiLCJzdGVwRWRpdGFibGUiLCJpc1N0dUluR3JvdXAiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb21wdXRlZCIsInNhdmVCdG5UaGVtZSIsIm1ldGhvZHMiLCJhZGRTdGVwIiwiJGFwcGx5Iiwib25TdWJtaXRBZGRTdGVwIiwiQXJyYW5nZU5hbWUiLCJtb2RlbExpc3QiLCJBcnJhbmdlQ29udGVudCIsInN0ZXBJdGVtIiwiQ291cnNlRklEIiwiR3JvdXBGSUQiLCJDcmVhdGVyIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJGbG5rSUQiLCJTb3J0Q29kZSIsImxlbmd0aCIsInB1c2giLCJzYXZlQ2hhbmdlIiwiZm9yRWFjaCIsIml0ZW0iLCJpbmRleCIsInRoZW4iLCJyZXMiLCJBcnJhbmdlVHlwZSIsInNsaWNlIiwic2hvd1RvYXN0IiwidGl0bGUiLCJvbk5hbWVJbnB1dCIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsIm9uRGVzY0lucHV0Iiwib25TY3JvbGwiLCJzY3JvbGxUb3AiLCJldmVudHMiLCJzZWxmIiwic2hvd01vZGFsIiwiY29udGVudCIsInN1Y2Nlc3MiLCJjb25maXJtIiwiZmluZEluZGV4Iiwic3BsaWNlIiwiJGNvbSIsIndhdGNoIiwidmFsIiwiYWN0aXZlR3JvdXBJbmZvIiwiZ2V0U3RvcmFnZVN5bmMiLCJsZWFkZXJJZCIsIkdyb3VwTGVhZGVyIiwib3B0aW9uIiwiY291cnNlSWQiLCJncm91cElkIiwiUm9sZU51bSIsImluaXQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDSTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7Ozs0TEFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUlUQyxJLEdBQU87QUFDSEMsNkJBQWlCLENBRGQ7QUFFSEMsdUJBQVcsS0FGUjtBQUdIQyxzQkFBVSxJQUhQO0FBSUhDLDBCQUFjLEtBSlg7QUFLSEMsdUJBQVcsS0FMUjtBQU1IQyx3QkFBWSxJQU5UO0FBT0hDLGtDQUFzQixLQVBuQjtBQVFIQyxzQkFBVSxFQVJQO0FBU0hDLHNCQUFVLEVBVFA7QUFVSEMsMEJBQWMsTUFWWDtBQVdIQyx3QkFBWSxJQVhUO0FBWUhDLHNCQUFVLEVBWlA7QUFhSEMsOEJBQWtCLElBYmY7QUFjSEMsd0JBQVksSUFkVDtBQWVIQyw0QkFBZ0I7QUFDWkMsMEJBQVUsMEJBREU7QUFFWkMsMEJBQVUsaUJBRkU7QUFHWkMsa0NBQWtCLFdBSE47QUFJWkMsdUJBQU87QUFKSyxhQWZiO0FBcUJIQywwQkFBYyxLQXJCWDtBQXNCSEMsMEJBQWM7QUF0QlgsUyxRQXlCUkMsTyxHQUFVLEUsUUFDakJDLE0sR0FBUyxFQUFDLGFBQVksRUFBQyxnQkFBZSxFQUFoQixFQUFtQixvQkFBbUIsVUFBdEMsRUFBaUQsd0JBQXVCLGNBQXhFLEVBQXVGLDRCQUEyQixpQkFBbEgsRUFBYixFQUFrSixnQkFBZSxFQUFDLFFBQU8sTUFBUixFQUFlLFNBQVEsTUFBdkIsRUFBOEIsY0FBYSxFQUEzQyxFQUE4QyxTQUFRLEtBQXRELEVBQWpLLEVBQThOLGdCQUFlLEVBQUMsUUFBTyxJQUFSLEVBQWEscUJBQW9CLGNBQWpDLEVBQWdE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QUE0RGdDLGdCQUFnQnJDLFNBQTVFLEVBQXVGcUMsZ0JBQWdCcEMsUUFBdkcsRUFBaUhZLElBQWpILENBQXNILFVBQUNDLEdBQUQsRUFBUztBQUMzSCx1QkFBSzdCLFlBQUwsR0FBb0I2QixHQUFwQjtBQUNBLHVCQUFLcEIsTUFBTDtBQUNILGFBSEQsRUFHRyxZQUFNO0FBQ0wsdUJBQUtULFlBQUwsR0FBb0IsS0FBcEI7QUFDQSx1QkFBS1MsTUFBTDtBQUNILGFBTkQ7QUFPSDs7OytCQUVNK0MsTSxFQUFRO0FBQ1gsZ0JBQUlBLFVBQVVBLE9BQU9DLFFBQXJCLEVBQStCO0FBQzNCLHFCQUFLaEUsVUFBTCxHQUFrQjtBQUNkc0IsK0JBQVd5QyxPQUFPQyxRQURKO0FBRWR6Qyw4QkFBVXdDLE9BQU9FO0FBRkgsaUJBQWxCO0FBSUEscUJBQUtoRSxjQUFMLEdBQXNCO0FBQ2xCQyw4QkFBVSx1Q0FBdUM2RCxPQUFPQyxRQUE5QyxHQUF5RCxXQUF6RCxHQUF1RUQsT0FBT0UsT0FEdEU7QUFFbEI5RCw4QkFBVSwrQ0FBK0M0RCxPQUFPQyxRQUF0RCxHQUFpRSxXQUFqRSxHQUErRUQsT0FBT0UsT0FGOUU7QUFHbEI3RCxzQ0FBa0IsVUFIQTtBQUlsQkMsMkJBQU8sb0NBQW9DMEQsT0FBT0MsUUFBM0MsR0FBc0QsV0FBdEQsR0FBb0VELE9BQU9FO0FBSmhFLGlCQUF0QjtBQU1BLHFCQUFLakQsTUFBTDtBQUNIO0FBQ0QsaUJBQUs1QixTQUFMLEdBQWtCLEtBQUtxQyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JyQyxRQUF4QixDQUFpQzZFLE9BQWpDLEdBQTJDLEVBQTVDLEtBQW9ELEdBQXJFO0FBQ0EsaUJBQUtDLElBQUw7QUFDSDs7OztFQTFOZ0MsZUFBS0MsSTs7a0JBQXJCckYsTyIsImZpbGUiOiJhcnJhbmdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gICAgaW1wb3J0IHN0ZXBMaXN0IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvc3RlcC1saXN0J1xyXG4gICAgaW1wb3J0IHJpY2hCdXR0b24gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9yaWNoLWJ1dHRvbidcclxuICAgIGltcG9ydCBkaWFsb2cgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9kaWFsb2cnXHJcblxyXG4gICAgaW1wb3J0IHtnZXRHcm91cERldGFpbCwgZ2V0Q291cnNlQXJyYW5nZUxpc3QsIHNhdmVHcm91cEFycmFuZ2VMaXN0LCBkZWxldGVBcnJhbmdlLCBpc1N0dUluQ291cnNlR3JvdXB9IGZyb20gJy4uLy4uL2FwaSdcclxuICAgIGltcG9ydCB7U3RlcH0gZnJvbSAnLi4vLi4vbW9kZWwvU3RlcCdcclxuXHJcbiAgICBleHBvcnQgZGVmYXVsdCBjbGFzcyBBcnJhbmdlIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgICAgICBjb25maWcgPSB7XHJcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkvJrlronmjpInXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkYXRhID0ge1xyXG4gICAgICAgICAgICBwYXJlbnRTY3JvbGxUb3A6IDAsXHJcbiAgICAgICAgICAgIGlzVGVhY2hlcjogZmFsc2UsXHJcbiAgICAgICAgICAgIHVzZXJJbmZvOiBudWxsLFxyXG4gICAgICAgICAgICBpc1VzZXJMZWFkZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICBpc0NoYW5nZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBzY3JvbGxhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBhZGRTdGVwRGlhbG9nVmlzaWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHN0ZXBOYW1lOiAnJyxcclxuICAgICAgICAgICAgc3RlcERlc2M6ICcnLFxyXG4gICAgICAgICAgICBhZGRTdGVwVGl0bGU6ICfmt7vliqDmraXpqqQnLFxyXG4gICAgICAgICAgICB0b0VkaXRTdGVwOiBudWxsLFxyXG4gICAgICAgICAgICBkYXRhbGlzdDogW10sXHJcbiAgICAgICAgICAgIGN1cnJlbnRHcm91cEluZm86IG51bGwsXHJcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW06IG51bGwsXHJcbiAgICAgICAgICAgIG5hdmlnYXRlVXJsTWFwOiB7XHJcbiAgICAgICAgICAgICAgICBwcmV2S25vdzogJy9wcmFjdGljZS9wYWdlcy9wcmV2S25vdycsXHJcbiAgICAgICAgICAgICAgICBwcmFjdGljZTogJy9wYWdlcy9wcmFjdGljZScsXHJcbiAgICAgICAgICAgICAgICBwcmFjdGljZU9wZW5UeXBlOiAnc3dpdGNoVGFiJyxcclxuICAgICAgICAgICAgICAgIHRoaW5rOiAnL3ByYWN0aWNlL3BhZ2VzL3RoaW5rJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdGVwRWRpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBpc1N0dUluR3JvdXA6IGZhbHNlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wic3RlcC1saXN0XCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpsaXN0LnN5bmNcIjpcImRhdGFsaXN0XCIsXCJ2LWJpbmQ6ZWRpdGFibGUuc3luY1wiOlwic3RlcEVkaXRhYmxlXCIsXCJ2LWJpbmQ6cGFyZW50T2Zmc2V0LnN5bmNcIjpcInBhcmVudFNjcm9sbFRvcFwifSxcInJpY2gtYnV0dG9uMVwiOntcInRleHRcIjpcIua3u+WKoOatpemqpFwiLFwidGhlbWVcIjpcImdyZXlcIixcInhtbG5zOnYtb25cIjpcIlwiLFwid2lkdGhcIjpcIjkwJVwifSxcInJpY2gtYnV0dG9uMlwiOntcInRleHRcIjpcIuS/neWtmFwiLFwidi1iaW5kOnRoZW1lLnN5bmNcIjpcInNhdmVCdG5UaGVtZVwiLFwid2lkdGhcIjpcIjkwJVwifSxcInJpY2gtYnV0dG9uM1wiOntcInRleHRcIjpcIuaPkOS6pFwiLFwidGhlbWVcIjpcImdyZWVuXCIsXCJ3aWR0aFwiOlwiMTAwJTtcIn0sXCJkaWFsb2dcIjp7XCJjbGFzc1wiOlwiYWRkLXN0ZXAtZGlhbG9nXCIsXCJ2LWJpbmQ6dmlzaWJsZS5zeW5jXCI6XCJhZGRTdGVwRGlhbG9nVmlzaWJsZVwifX07XHJcbiRldmVudHMgPSB7XCJyaWNoLWJ1dHRvbjFcIjp7XCJ2LW9uOnRhcFwiOlwiYWRkU3RlcFwifSxcInJpY2gtYnV0dG9uMlwiOntcInYtb246dGFwXCI6XCJzYXZlQ2hhbmdlXCJ9LFwicmljaC1idXR0b24zXCI6e1widi1vbjp0YXBcIjpcIm9uU3VibWl0QWRkU3RlcFwifX07XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICAgICAgICAnc3RlcC1saXN0Jzogc3RlcExpc3QsXHJcbiAgICAgICAgICAgICdyaWNoLWJ1dHRvbjEnOiByaWNoQnV0dG9uLFxyXG4gICAgICAgICAgICAncmljaC1idXR0b24yJzogcmljaEJ1dHRvbixcclxuICAgICAgICAgICAgJ3JpY2gtYnV0dG9uMyc6IHJpY2hCdXR0b24sXHJcbiAgICAgICAgICAgICdkaWFsb2cnOiBkaWFsb2dcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbXB1dGVkID0ge1xyXG4gICAgICAgICAgICBzYXZlQnRuVGhlbWUoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc0NoYW5nZWQgPyAnZ3JlZW4nIDogJ2dyZXknXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgICAgIGFkZFN0ZXAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFN0ZXBUaXRsZSA9ICfmt7vliqDmraXpqqQnXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvRWRpdFN0ZXAgPSBudWxsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFN0ZXBEaWFsb2dWaXNpYmxlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvblN1Ym1pdEFkZFN0ZXAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50b0VkaXRTdGVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g57yW6L6R5q2l6aqk5aSE55CGXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b0VkaXRTdGVwLkFycmFuZ2VOYW1lID0gdGhpcy5zdGVwTmFtZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9FZGl0U3RlcC5tb2RlbExpc3RbMF0uQXJyYW5nZUNvbnRlbnQgPSB0aGlzLnN0ZXBEZXNjXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDmt7vliqDmraXpqqTlpITnkIZcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RlcEl0ZW0gPSBuZXcgU3RlcCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFycmFuZ2VOYW1lOiB0aGlzLnN0ZXBOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBDb3Vyc2VGSUQ6IHRoaXMuY3VycmVudEdyb3VwSW5mby5Db3Vyc2VGSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdyb3VwRklEOiB0aGlzLmN1cnJlbnRHcm91cEluZm8uR3JvdXBGSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENyZWF0ZXI6IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvLkZsbmtJRCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgU29ydENvZGU6IHRoaXMuZGF0YWxpc3QubGVuZ3RoICsgMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgQXJyYW5nZUNvbnRlbnQ6IHRoaXMuc3RlcERlc2NcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YWxpc3QucHVzaChzdGVwSXRlbSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0ZXBOYW1lID0gJydcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RlcERlc2MgPSAnJ1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0NoYW5nZWQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFN0ZXBEaWFsb2dWaXNpYmxlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2F2ZUNoYW5nZSgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YWxpc3QuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLlNvcnRDb2RlID0gaW5kZXggKyAxXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgc2F2ZUdyb3VwQXJyYW5nZUxpc3QodGhpcy5kYXRhbGlzdCkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGdldENvdXJzZUFycmFuZ2VMaXN0KHRoaXMuY3VycmVudEdyb3VwSW5mby5Db3Vyc2VGSUQsIHRoaXMuY3VycmVudEdyb3VwSW5mby5Hcm91cEZJRCkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gaXRlbS5tb2RlbExpc3QgJiYgaXRlbS5tb2RlbExpc3RbMF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEuQXJyYW5nZVR5cGUgIT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLm1vZGVsTGlzdCA9IGl0ZW0ubW9kZWxMaXN0LnNsaWNlKDAsIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YWxpc3QgPSByZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0NoYW5nZWQgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5L+d5a2Y5oiQ5YqfJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbk5hbWVJbnB1dChlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0ZXBOYW1lID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25EZXNjSW5wdXQoZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGVwRGVzYyA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uU2Nyb2xsKGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50U2Nyb2xsVG9wID0gZS5kZXRhaWwuc2Nyb2xsVG9wXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV2ZW50cyA9IHtcclxuICAgICAgICAgICAgJ2Rpc2FibGUtc2Nyb2xsJzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxhYmxlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJ2VuYWJsZS1zY3JvbGwnOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsYWJsZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNDaGFuZ2VkID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAnZWRpdC1zdGVwJzogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRTdGVwVGl0bGUgPSAn57yW6L6R5q2l6aqkJ1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b0VkaXRTdGVwID0gZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGVwTmFtZSA9IGUuQXJyYW5nZU5hbWVcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RlcERlc2MgPSAoZS5tb2RlbExpc3RbMF0gJiYgZS5tb2RlbExpc3RbMF0uQXJyYW5nZUNvbnRlbnQpIHx8ICcnXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFN0ZXBEaWFsb2dWaXNpYmxlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAnZGVsZXRlLXN0ZXAnOiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogJ+WIoOmZpOatpemqpOS5i+WQjuWwhuaXoOazleaBouWkje+8jOehruWumuWIoOmZpOivpeatpemqpO+8nycsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlQXJyYW5nZShlLkZsbmtJRCkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHNlbGYuZGF0YWxpc3QuZmluZEluZGV4KGl0ZW0gPT4gaXRlbS5GbG5rSUQgPT09IGUuRmxua0lEKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZGF0YWxpc3Quc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNDaGFuZ2VkID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRjb21bJ3N0ZXAtbGlzdCddLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJ2NoZWNrLWNoYW5nZSc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0NoYW5nZWQgPSB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdhdGNoID0ge1xyXG4gICAgICAgICAgICAnaXNVc2VyTGVhZGVyJzogZnVuY3Rpb24odmFsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsICYmICF0aGlzLnF1ZXJ5UGFyYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0ZXBFZGl0YWJsZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGVwRWRpdGFibGUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAncXVlcnlQYXJhbSc6IGZ1bmN0aW9uKHZhbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF2YWwgJiYgdGhpcy5pc1VzZXJMZWFkZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0ZXBFZGl0YWJsZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGVwRWRpdGFibGUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCkge1xyXG4gICAgICAgICAgICBsZXQgYWN0aXZlR3JvdXBJbmZvXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnF1ZXJ5UGFyYW0pIHtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZUdyb3VwSW5mbyA9IHRoaXMucXVlcnlQYXJhbVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlR3JvdXBJbmZvID0gd2VweS5nZXRTdG9yYWdlU3luYygnYWN0aXZlVGFza0luZm8nKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEdyb3VwSW5mbyA9IGFjdGl2ZUdyb3VwSW5mb1xyXG4gICAgICAgICAgICBnZXRHcm91cERldGFpbChhY3RpdmVHcm91cEluZm8uR3JvdXBGSUQpLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBsZWFkZXJJZCA9IHJlcy5Hcm91cExlYWRlclxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1VzZXJMZWFkZXIgPSBsZWFkZXJJZCA9PT0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8uRmxua0lEXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGdldENvdXJzZUFycmFuZ2VMaXN0KGFjdGl2ZUdyb3VwSW5mby5Db3Vyc2VGSUQsIGFjdGl2ZUdyb3VwSW5mby5Hcm91cEZJRCkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVzLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBpdGVtLm1vZGVsTGlzdCAmJiBpdGVtLm1vZGVsTGlzdFswXVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEuQXJyYW5nZVR5cGUgIT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5tb2RlbExpc3QgPSBpdGVtLm1vZGVsTGlzdC5zbGljZSgwLCAxKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFsaXN0ID0gcmVzXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGlzU3R1SW5Db3Vyc2VHcm91cCh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mby5GbG5rSUQsIGFjdGl2ZUdyb3VwSW5mby5Db3Vyc2VGSUQsIGFjdGl2ZUdyb3VwSW5mby5Hcm91cEZJRCkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzU3R1SW5Hcm91cCA9IHJlc1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzU3R1SW5Hcm91cCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkxvYWQob3B0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb24gJiYgb3B0aW9uLmNvdXJzZUlkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnF1ZXJ5UGFyYW0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ291cnNlRklEOiBvcHRpb24uY291cnNlSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgR3JvdXBGSUQ6IG9wdGlvbi5ncm91cElkXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlVXJsTWFwID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXZLbm93OiAnL3ByYWN0aWNlL3BhZ2VzL3ByZXZLbm93P2NvdXJzZUlkPScgKyBvcHRpb24uY291cnNlSWQgKyAnJmdyb3VwSWQ9JyArIG9wdGlvbi5ncm91cElkLFxyXG4gICAgICAgICAgICAgICAgICAgIHByYWN0aWNlOiAnL3ByYWN0aWNlL3BhZ2VzL3Jldmlld0ZpbmlzaFRhc2s/Y291cnNlSWQ9JyArIG9wdGlvbi5jb3Vyc2VJZCArICcmZ3JvdXBJZD0nICsgb3B0aW9uLmdyb3VwSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJhY3RpY2VPcGVuVHlwZTogJ3JlZGlyZWN0JyxcclxuICAgICAgICAgICAgICAgICAgICB0aGluazogJy9wcmFjdGljZS9wYWdlcy90aGluaz9jb3Vyc2VJZD0nICsgb3B0aW9uLmNvdXJzZUlkICsgJyZncm91cElkPScgKyBvcHRpb24uZ3JvdXBJZFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNUZWFjaGVyID0gKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvLlJvbGVOdW0gKyAnJykgPT09ICcyJ1xyXG4gICAgICAgICAgICB0aGlzLmluaXQoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuIl19