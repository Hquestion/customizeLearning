'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _panel = require('./../../components/panel.js');

var _panel2 = _interopRequireDefault(_panel);

var _richButton = require('./../../components/rich-button.js');

var _richButton2 = _interopRequireDefault(_richButton);

var _dialog = require('./../../components/dialog.js');

var _dialog2 = _interopRequireDefault(_dialog);

var _step = require('./../../components/step.js');

var _step2 = _interopRequireDefault(_step);

var _emptyContent = require('./../../components/empty-content.js');

var _emptyContent2 = _interopRequireDefault(_emptyContent);

var _api = require('./../../api/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Think = function (_wepy$page) {
    _inherits(Think, _wepy$page);

    function Think() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Think);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Think.__proto__ || Object.getPrototypeOf(Think)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '有反思'
        }, _this.$repeat = { "submitedStepList": { "com": "step", "props": "stepData.sync" } }, _this.$props = { "step": { "xmlns:v-bind": { "value": "", "for": "submitedStepList", "item": "item", "index": "index", "key": "key" }, "v-bind:stepData.sync": { "value": "item", "type": "item", "for": "submitedStepList", "item": "item", "index": "index", "key": "key" }, "v-bind:index.sync": { "value": "item.SortCode", "for": "submitedStepList", "item": "item", "index": "index", "key": "key" }, "v-bind:editable.once": { "value": "false", "for": "submitedStepList", "item": "item", "index": "index", "key": "key" }, "v-bind:detailVisible.once": { "value": "false", "for": "submitedStepList", "item": "item", "index": "index", "key": "key" } }, "rich-button": { "theme": "green", "text": "填写反思", "size": "big", "iconSrc": "../../images/yfs.png", "xmlns:v-on": "" }, "rich-button2": { "text": "提交", "theme": "green", "width": "100%;" }, "dialog": { "class": "edit-think-dialog", "v-bind:visible.sync": "editThinkDialogVisible" }, "empty-content": { "text": "TA还没有提交任何步骤" } }, _this.$events = { "rich-button": { "v-on:tap": "onEditThink" }, "rich-button2": { "v-on:tap": "onSubmitThink" } }, _this.components = {
            panel: _panel2.default,
            'rich-button': _richButton2.default,
            'rich-button2': _richButton2.default,
            dialog: _dialog2.default,
            'step': _step2.default,
            'empty-content': _emptyContent2.default
        }, _this.data = {
            currentUser: {},
            editThinkDialogVisible: false,
            myThinkContent: '',
            myThinkID: '',
            currentGroupInfo: null,
            inputThinkContent: '',
            submitedStepList: [],
            queryParam: null,
            navigateUrlMap: {
                prevKnow: '/practice/pages/prevKnow',
                practice: '/pages/practice',
                practiceOpenType: 'switchTab',
                arrange: '/practice/pages/arrange'
            },
            groupMembers: [],
            currentMember: null
        }, _this.computed = {
            canEditThink: function canEditThink() {
                return !this.queryParam && this.currentMember && this.currentMember.MemberFID === this.currentUser.FlnkID;
            }
        }, _this.methods = {
            onEditThink: function onEditThink() {
                this.inputThinkContent = this.myThinkContent;
                this.editThinkDialogVisible = true;
            },
            onSubmitThink: function onSubmitThink() {
                var _this2 = this;

                (0, _api.saveThinkContent)({
                    FlnkID: this.myThinkID || '',
                    StudentFID: this.$parent.globalData.userInfo.FlnkID,
                    StudentName: this.$parent.globalData.userInfo.XM,
                    ReflectContent: this.inputThinkContent,
                    GroupFID: this.currentGroupInfo.GroupFID,
                    CourseFID: this.currentGroupInfo.CourseFID
                }).then(function (res) {
                    _this2.myThinkContent = _this2.inputThinkContent;
                    _this2.myThinkID = res;
                    _this2.editThinkDialogVisible = false;
                    _this2.$apply();
                }, function () {
                    _this2.editThinkDialogVisible = false;
                    _this2.$apply();
                });
            },
            onThinkInput: function onThinkInput(e) {
                this.inputThinkContent = e.detail.value;
            },
            previewImg: function previewImg(src) {
                _wepy2.default.previewImage({
                    urls: [src]
                });
            },
            playVoice: function playVoice(src) {
                var innerAudioContext = _wepy2.default.createInnerAudioContext();
                innerAudioContext.autoplay = false;
                innerAudioContext.src = src;
                innerAudioContext.onEnded(function () {
                    innerAudioContext.stop();
                });
                innerAudioContext.onError(function (res) {
                    innerAudioContext.stop();
                });
                innerAudioContext.play();
            },
            setCurrentMember: function setCurrentMember(member) {
                this.currentMember = member;
                this.$apply();
                this.loadMemberData(member);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Think, [{
        key: 'loadMemberData',
        value: function loadMemberData(member) {
            var _this3 = this;

            (0, _api.getThinkContent)(member.MemberFID, this.currentGroupInfo.GroupFID).then(function (res) {
                if (res.Code === '4000') {
                    _this3.myThinkContent = res.ResultObj.ReflectContent;
                    _this3.myThinkID = res.ResultObj.FlnkID;
                } else {
                    _this3.myThinkContent = '';
                }
                _this3.$apply();
            }, function () {
                _this3.myThinkContent = '';
                _this3.$apply();
            });
            (0, _api.getUserSubmitSteps)(member.MemberFID, this.currentGroupInfo.GroupFID).then(function (res) {
                _this3.submitedStepList = res;
                _this3.submitedStepList.forEach(function (item) {
                    item.modelList.forEach(function (model) {
                        model.WorkArrangeList.forEach(function (data) {
                            data.msgData = JSON.parse(data.MessageBody);
                        });
                    });
                });
                _this3.$apply();
            }, function () {
                _this3.submitedStepList = [];
                _this3.$apply();
            });
        }
    }, {
        key: 'init',
        value: function init() {
            var _this4 = this;

            if (this.queryParam) {
                this.currentGroupInfo = this.queryParam;
            } else {
                this.currentGroupInfo = _wepy2.default.getStorageSync('activeTaskInfo');
            }
            this.currentUser = this.$parent.globalData.userInfo;
            (0, _api.getGroupMembers)(this.currentGroupInfo.GroupFID).then(function (resp) {
                var res = resp.filter(function (item) {
                    return item.MemberIdentity === 3;
                });
                var index = res.findIndex(function (item) {
                    return item.MemberFID === _this4.$parent.globalData.userInfo.FlnkID;
                });
                if (index > 0) {
                    var data = res[index];
                    res.splice(index, 1);
                    res.unshift(data);
                }
                _this4.groupMembers = res;
                _this4.currentMember = res[0];
                _this4.loadMemberData(_this4.currentMember);
                _this4.$apply();
            }, function (res) {
                _this4.groupMembers = [];
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
                    arrange: '/practice/pages/arrange?courseId=' + option.courseId + '&groupId=' + option.groupId
                };
                this.$apply();
            }
            this.init();
        }
    }]);

    return Think;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Think , 'practice/pages/think'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRoaW5rLmpzIl0sIm5hbWVzIjpbIlRoaW5rIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInBhbmVsIiwiZGlhbG9nIiwiZGF0YSIsImN1cnJlbnRVc2VyIiwiZWRpdFRoaW5rRGlhbG9nVmlzaWJsZSIsIm15VGhpbmtDb250ZW50IiwibXlUaGlua0lEIiwiY3VycmVudEdyb3VwSW5mbyIsImlucHV0VGhpbmtDb250ZW50Iiwic3VibWl0ZWRTdGVwTGlzdCIsInF1ZXJ5UGFyYW0iLCJuYXZpZ2F0ZVVybE1hcCIsInByZXZLbm93IiwicHJhY3RpY2UiLCJwcmFjdGljZU9wZW5UeXBlIiwiYXJyYW5nZSIsImdyb3VwTWVtYmVycyIsImN1cnJlbnRNZW1iZXIiLCJjb21wdXRlZCIsImNhbkVkaXRUaGluayIsIk1lbWJlckZJRCIsIkZsbmtJRCIsIm1ldGhvZHMiLCJvbkVkaXRUaGluayIsIm9uU3VibWl0VGhpbmsiLCJTdHVkZW50RklEIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJ1c2VySW5mbyIsIlN0dWRlbnROYW1lIiwiWE0iLCJSZWZsZWN0Q29udGVudCIsIkdyb3VwRklEIiwiQ291cnNlRklEIiwidGhlbiIsInJlcyIsIiRhcHBseSIsIm9uVGhpbmtJbnB1dCIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsInByZXZpZXdJbWciLCJzcmMiLCJwcmV2aWV3SW1hZ2UiLCJ1cmxzIiwicGxheVZvaWNlIiwiaW5uZXJBdWRpb0NvbnRleHQiLCJjcmVhdGVJbm5lckF1ZGlvQ29udGV4dCIsImF1dG9wbGF5Iiwib25FbmRlZCIsInN0b3AiLCJvbkVycm9yIiwicGxheSIsInNldEN1cnJlbnRNZW1iZXIiLCJtZW1iZXIiLCJsb2FkTWVtYmVyRGF0YSIsIkNvZGUiLCJSZXN1bHRPYmoiLCJmb3JFYWNoIiwiaXRlbSIsIm1vZGVsTGlzdCIsIm1vZGVsIiwiV29ya0FycmFuZ2VMaXN0IiwibXNnRGF0YSIsIkpTT04iLCJwYXJzZSIsIk1lc3NhZ2VCb2R5IiwiZ2V0U3RvcmFnZVN5bmMiLCJyZXNwIiwiZmlsdGVyIiwiTWVtYmVySWRlbnRpdHkiLCJpbmRleCIsImZpbmRJbmRleCIsInNwbGljZSIsInVuc2hpZnQiLCJvcHRpb24iLCJjb3Vyc2VJZCIsImdyb3VwSWQiLCJpbml0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0k7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBSVZDLE8sR0FBVSxFQUFDLG9CQUFtQixFQUFDLE9BQU0sTUFBUCxFQUFjLFNBQVEsZUFBdEIsRUFBcEIsRSxRQUNqQkMsTSxHQUFTLEVBQUMsUUFBTyxFQUFDLGdCQUFlLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxrQkFBbEIsRUFBcUMsUUFBTyxNQUE1QyxFQUFtRCxTQUFRLE9BQTNELEVBQW1FLE9BQU0sS0FBekUsRUFBaEIsRUFBZ0csd0JBQXVCLEVBQUMsU0FBUSxNQUFULEVBQWdCLFFBQU8sTUFBdkIsRUFBOEIsT0FBTSxrQkFBcEMsRUFBdUQsUUFBTyxNQUE5RCxFQUFxRSxTQUFRLE9BQTdFLEVBQXFGLE9BQU0sS0FBM0YsRUFBdkgsRUFBeU4scUJBQW9CLEVBQUMsU0FBUSxlQUFULEVBQXlCLE9BQU0sa0JBQS9CLEVBQWtELFFBQU8sTUFBekQsRUFBZ0UsU0FBUSxPQUF4RSxFQUFnRixPQUFNLEtBQXRGLEVBQTdPLEVBQTBVLHdCQUF1QixFQUFDLFNBQVEsT0FBVCxFQUFpQixPQUFNLGtCQUF2QixFQUEwQyxRQUFPLE1BQWpELEVBQXdELFNBQVEsT0FBaEUsRUFBd0UsT0FBTSxLQUE5RSxFQUFqVyxFQUFzYiw2QkFBNEIsRUFBQyxTQUFRLE9BQVQsRUFBaUIsT0FBTSxrQkFBdkIsRUFBMEMsUUFBTyxNQUFqRCxFQUF3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LENBQVdGLEtBQVgsRUFBa0IsQ0FBbEI7QUFDQXBDLHdCQUFJdUMsT0FBSixDQUFZeEUsSUFBWjtBQUNIO0FBQ0QsdUJBQUtjLFlBQUwsR0FBb0JtQixHQUFwQjtBQUNBLHVCQUFLbEIsYUFBTCxHQUFxQmtCLElBQUksQ0FBSixDQUFyQjtBQUNBLHVCQUFLb0IsY0FBTCxDQUFvQixPQUFLdEMsYUFBekI7QUFDQSx1QkFBS21CLE1BQUw7QUFDSCxhQVpELEVBWUcsVUFBQ0QsR0FBRCxFQUFTO0FBQ1IsdUJBQUtuQixZQUFMLEdBQW9CLEVBQXBCO0FBQ0EsdUJBQUtvQixNQUFMO0FBQ0gsYUFmRDtBQWdCSDs7OytCQUVNdUMsTSxFQUFRO0FBQ1gsZ0JBQUlBLFVBQVVBLE9BQU9DLFFBQXJCLEVBQStCO0FBQzNCLHFCQUFLbEUsVUFBTCxHQUFrQjtBQUNkdUIsK0JBQVcwQyxPQUFPQyxRQURKO0FBRWQ1Qyw4QkFBVTJDLE9BQU9FO0FBRkgsaUJBQWxCO0FBSUEscUJBQUtsRSxjQUFMLEdBQXNCO0FBQ2xCQyw4QkFBVSx1Q0FBdUMrRCxPQUFPQyxRQUE5QyxHQUF5RCxXQUF6RCxHQUF1RUQsT0FBT0UsT0FEdEU7QUFFbEJoRSw4QkFBVSwrQ0FBK0M4RCxPQUFPQyxRQUF0RCxHQUFpRSxXQUFqRSxHQUErRUQsT0FBT0UsT0FGOUU7QUFHbEIvRCxzQ0FBa0IsVUFIQTtBQUlsQkMsNkJBQVMsc0NBQXNDNEQsT0FBT0MsUUFBN0MsR0FBd0QsV0FBeEQsR0FBc0VELE9BQU9FO0FBSnBFLGlCQUF0QjtBQU1BLHFCQUFLekMsTUFBTDtBQUNIO0FBQ0QsaUJBQUswQyxJQUFMO0FBQ0g7Ozs7RUFqSzhCLGVBQUtDLEk7O2tCQUFuQnRGLEsiLCJmaWxlIjoidGhpbmsuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICAgIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgICBpbXBvcnQgcGFuZWwgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9wYW5lbCdcclxuICAgIGltcG9ydCByaWNoQnV0dG9uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcmljaC1idXR0b24nXHJcbiAgICBpbXBvcnQgZGlhbG9nIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZGlhbG9nJ1xyXG4gICAgaW1wb3J0IHN0ZXAgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9zdGVwJ1xyXG4gICAgaW1wb3J0IGVtcHR5Q29udGVudCBmcm9tICcuLi8uLi9jb21wb25lbnRzL2VtcHR5LWNvbnRlbnQnXHJcblxyXG4gICAgaW1wb3J0IHtnZXRUaGlua0NvbnRlbnQsIHNhdmVUaGlua0NvbnRlbnQsIGdldFVzZXJTdWJtaXRTdGVwcywgZ2V0R3JvdXBNZW1iZXJzfSBmcm9tICcuLi8uLi9hcGknXHJcblxyXG4gICAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGhpbmsgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgICAgIGNvbmZpZyA9IHtcclxuICAgICAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+acieWPjeaAnSdcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgJHJlcGVhdCA9IHtcInN1Ym1pdGVkU3RlcExpc3RcIjp7XCJjb21cIjpcInN0ZXBcIixcInByb3BzXCI6XCJzdGVwRGF0YS5zeW5jXCJ9fTtcclxuJHByb3BzID0ge1wic3RlcFwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwic3VibWl0ZWRTdGVwTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDpzdGVwRGF0YS5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW1cIixcInR5cGVcIjpcIml0ZW1cIixcImZvclwiOlwic3VibWl0ZWRTdGVwTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDppbmRleC5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW0uU29ydENvZGVcIixcImZvclwiOlwic3VibWl0ZWRTdGVwTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDplZGl0YWJsZS5vbmNlXCI6e1widmFsdWVcIjpcImZhbHNlXCIsXCJmb3JcIjpcInN1Ym1pdGVkU3RlcExpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6ZGV0YWlsVmlzaWJsZS5vbmNlXCI6e1widmFsdWVcIjpcImZhbHNlXCIsXCJmb3JcIjpcInN1Ym1pdGVkU3RlcExpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn19LFwicmljaC1idXR0b25cIjp7XCJ0aGVtZVwiOlwiZ3JlZW5cIixcInRleHRcIjpcIuWhq+WGmeWPjeaAnVwiLFwic2l6ZVwiOlwiYmlnXCIsXCJpY29uU3JjXCI6XCIuLi8uLi9pbWFnZXMveWZzLnBuZ1wiLFwieG1sbnM6di1vblwiOlwiXCJ9LFwicmljaC1idXR0b24yXCI6e1widGV4dFwiOlwi5o+Q5LqkXCIsXCJ0aGVtZVwiOlwiZ3JlZW5cIixcIndpZHRoXCI6XCIxMDAlO1wifSxcImRpYWxvZ1wiOntcImNsYXNzXCI6XCJlZGl0LXRoaW5rLWRpYWxvZ1wiLFwidi1iaW5kOnZpc2libGUuc3luY1wiOlwiZWRpdFRoaW5rRGlhbG9nVmlzaWJsZVwifSxcImVtcHR5LWNvbnRlbnRcIjp7XCJ0ZXh0XCI6XCJUQei/mOayoeacieaPkOS6pOS7u+S9leatpemqpFwifX07XHJcbiRldmVudHMgPSB7XCJyaWNoLWJ1dHRvblwiOntcInYtb246dGFwXCI6XCJvbkVkaXRUaGlua1wifSxcInJpY2gtYnV0dG9uMlwiOntcInYtb246dGFwXCI6XCJvblN1Ym1pdFRoaW5rXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgICAgICAgIHBhbmVsOiBwYW5lbCxcclxuICAgICAgICAgICAgJ3JpY2gtYnV0dG9uJzogcmljaEJ1dHRvbixcclxuICAgICAgICAgICAgJ3JpY2gtYnV0dG9uMic6IHJpY2hCdXR0b24sXHJcbiAgICAgICAgICAgIGRpYWxvZzogZGlhbG9nLFxyXG4gICAgICAgICAgICAnc3RlcCc6IHN0ZXAsXHJcbiAgICAgICAgICAgICdlbXB0eS1jb250ZW50JzogZW1wdHlDb250ZW50XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkYXRhID0ge1xyXG4gICAgICAgICAgICBjdXJyZW50VXNlcjoge30sXHJcbiAgICAgICAgICAgIGVkaXRUaGlua0RpYWxvZ1Zpc2libGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBteVRoaW5rQ29udGVudDogJycsXHJcbiAgICAgICAgICAgIG15VGhpbmtJRDogJycsXHJcbiAgICAgICAgICAgIGN1cnJlbnRHcm91cEluZm86IG51bGwsXHJcbiAgICAgICAgICAgIGlucHV0VGhpbmtDb250ZW50OiAnJyxcclxuICAgICAgICAgICAgc3VibWl0ZWRTdGVwTGlzdDogW10sXHJcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW06IG51bGwsXHJcbiAgICAgICAgICAgIG5hdmlnYXRlVXJsTWFwOiB7XHJcbiAgICAgICAgICAgICAgICBwcmV2S25vdzogJy9wcmFjdGljZS9wYWdlcy9wcmV2S25vdycsXHJcbiAgICAgICAgICAgICAgICBwcmFjdGljZTogJy9wYWdlcy9wcmFjdGljZScsXHJcbiAgICAgICAgICAgICAgICBwcmFjdGljZU9wZW5UeXBlOiAnc3dpdGNoVGFiJyxcclxuICAgICAgICAgICAgICAgIGFycmFuZ2U6ICcvcHJhY3RpY2UvcGFnZXMvYXJyYW5nZSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ3JvdXBNZW1iZXJzOiBbXSxcclxuICAgICAgICAgICAgY3VycmVudE1lbWJlcjogbnVsbFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29tcHV0ZWQgPSB7XHJcbiAgICAgICAgICAgIGNhbkVkaXRUaGluaygpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAhdGhpcy5xdWVyeVBhcmFtICYmIHRoaXMuY3VycmVudE1lbWJlciAmJiB0aGlzLmN1cnJlbnRNZW1iZXIuTWVtYmVyRklEID09PSB0aGlzLmN1cnJlbnRVc2VyLkZsbmtJRFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtZXRob2RzID0ge1xyXG4gICAgICAgICAgICBvbkVkaXRUaGluaygpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRUaGlua0NvbnRlbnQgPSB0aGlzLm15VGhpbmtDb250ZW50XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRUaGlua0RpYWxvZ1Zpc2libGUgPSB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uU3VibWl0VGhpbmsoKSB7XHJcbiAgICAgICAgICAgICAgICBzYXZlVGhpbmtDb250ZW50KHtcclxuICAgICAgICAgICAgICAgICAgICBGbG5rSUQ6IHRoaXMubXlUaGlua0lEIHx8ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgIFN0dWRlbnRGSUQ6IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvLkZsbmtJRCxcclxuICAgICAgICAgICAgICAgICAgICBTdHVkZW50TmFtZTogdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8uWE0sXHJcbiAgICAgICAgICAgICAgICAgICAgUmVmbGVjdENvbnRlbnQ6IHRoaXMuaW5wdXRUaGlua0NvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgR3JvdXBGSUQ6IHRoaXMuY3VycmVudEdyb3VwSW5mby5Hcm91cEZJRCxcclxuICAgICAgICAgICAgICAgICAgICBDb3Vyc2VGSUQ6IHRoaXMuY3VycmVudEdyb3VwSW5mby5Db3Vyc2VGSURcclxuICAgICAgICAgICAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm15VGhpbmtDb250ZW50ID0gdGhpcy5pbnB1dFRoaW5rQ29udGVudFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXlUaGlua0lEID0gcmVzXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0VGhpbmtEaWFsb2dWaXNpYmxlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0VGhpbmtEaWFsb2dWaXNpYmxlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvblRoaW5rSW5wdXQoZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dFRoaW5rQ29udGVudCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHByZXZpZXdJbWcoc3JjKSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5LnByZXZpZXdJbWFnZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsczogW3NyY11cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBsYXlWb2ljZShzcmMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlubmVyQXVkaW9Db250ZXh0ID0gd2VweS5jcmVhdGVJbm5lckF1ZGlvQ29udGV4dCgpXHJcbiAgICAgICAgICAgICAgICBpbm5lckF1ZGlvQ29udGV4dC5hdXRvcGxheSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICBpbm5lckF1ZGlvQ29udGV4dC5zcmMgPSBzcmNcclxuICAgICAgICAgICAgICAgIGlubmVyQXVkaW9Db250ZXh0Lm9uRW5kZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlubmVyQXVkaW9Db250ZXh0LnN0b3AoKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGlubmVyQXVkaW9Db250ZXh0Lm9uRXJyb3IoKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlubmVyQXVkaW9Db250ZXh0LnN0b3AoKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGlubmVyQXVkaW9Db250ZXh0LnBsYXkoKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXRDdXJyZW50TWVtYmVyKG1lbWJlcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TWVtYmVyID0gbWVtYmVyXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRNZW1iZXJEYXRhKG1lbWJlcilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbG9hZE1lbWJlckRhdGEobWVtYmVyKSB7XHJcbiAgICAgICAgICAgIGdldFRoaW5rQ29udGVudChtZW1iZXIuTWVtYmVyRklELCB0aGlzLmN1cnJlbnRHcm91cEluZm8uR3JvdXBGSUQpLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMuQ29kZSA9PT0gJzQwMDAnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5teVRoaW5rQ29udGVudCA9IHJlcy5SZXN1bHRPYmouUmVmbGVjdENvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm15VGhpbmtJRCA9IHJlcy5SZXN1bHRPYmouRmxua0lEXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXlUaGlua0NvbnRlbnQgPSAnJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm15VGhpbmtDb250ZW50ID0gJydcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgZ2V0VXNlclN1Ym1pdFN0ZXBzKG1lbWJlci5NZW1iZXJGSUQsIHRoaXMuY3VycmVudEdyb3VwSW5mby5Hcm91cEZJRCkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdWJtaXRlZFN0ZXBMaXN0ID0gcmVzXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN1Ym1pdGVkU3RlcExpc3QuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLm1vZGVsTGlzdC5mb3JFYWNoKG1vZGVsID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuV29ya0FycmFuZ2VMaXN0LmZvckVhY2goZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLm1zZ0RhdGEgPSBKU09OLnBhcnNlKGRhdGEuTWVzc2FnZUJvZHkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3VibWl0ZWRTdGVwTGlzdCA9IFtdXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5xdWVyeVBhcmFtKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRHcm91cEluZm8gPSB0aGlzLnF1ZXJ5UGFyYW1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEdyb3VwSW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ2FjdGl2ZVRhc2tJbmZvJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRVc2VyID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm9cclxuICAgICAgICAgICAgZ2V0R3JvdXBNZW1iZXJzKHRoaXMuY3VycmVudEdyb3VwSW5mby5Hcm91cEZJRCkudGhlbihyZXNwID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCByZXMgPSByZXNwLmZpbHRlcihpdGVtID0+IGl0ZW0uTWVtYmVySWRlbnRpdHkgPT09IDMpXHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSByZXMuZmluZEluZGV4KGl0ZW0gPT4gaXRlbS5NZW1iZXJGSUQgPT09IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvLkZsbmtJRClcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHJlc1tpbmRleF1cclxuICAgICAgICAgICAgICAgICAgICByZXMuc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlcy51bnNoaWZ0KGRhdGEpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VwTWVtYmVycyA9IHJlc1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TWVtYmVyID0gcmVzWzBdXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRNZW1iZXJEYXRhKHRoaXMuY3VycmVudE1lbWJlcilcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSwgKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncm91cE1lbWJlcnMgPSBbXVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25Mb2FkKG9wdGlvbikge1xyXG4gICAgICAgICAgICBpZiAob3B0aW9uICYmIG9wdGlvbi5jb3Vyc2VJZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5xdWVyeVBhcmFtID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIENvdXJzZUZJRDogb3B0aW9uLmNvdXJzZUlkLFxyXG4gICAgICAgICAgICAgICAgICAgIEdyb3VwRklEOiBvcHRpb24uZ3JvdXBJZFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZVVybE1hcCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBwcmV2S25vdzogJy9wcmFjdGljZS9wYWdlcy9wcmV2S25vdz9jb3Vyc2VJZD0nICsgb3B0aW9uLmNvdXJzZUlkICsgJyZncm91cElkPScgKyBvcHRpb24uZ3JvdXBJZCxcclxuICAgICAgICAgICAgICAgICAgICBwcmFjdGljZTogJy9wcmFjdGljZS9wYWdlcy9yZXZpZXdGaW5pc2hUYXNrP2NvdXJzZUlkPScgKyBvcHRpb24uY291cnNlSWQgKyAnJmdyb3VwSWQ9JyArIG9wdGlvbi5ncm91cElkLFxyXG4gICAgICAgICAgICAgICAgICAgIHByYWN0aWNlT3BlblR5cGU6ICdyZWRpcmVjdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgYXJyYW5nZTogJy9wcmFjdGljZS9wYWdlcy9hcnJhbmdlP2NvdXJzZUlkPScgKyBvcHRpb24uY291cnNlSWQgKyAnJmdyb3VwSWQ9JyArIG9wdGlvbi5ncm91cElkXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pbml0KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiJdfQ==