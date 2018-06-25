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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRoaW5rLmpzIl0sIm5hbWVzIjpbIlRoaW5rIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInBhbmVsIiwicmljaEJ1dHRvbiIsImRpYWxvZyIsInN0ZXAiLCJlbXB0eUNvbnRlbnQiLCJkYXRhIiwiY3VycmVudFVzZXIiLCJlZGl0VGhpbmtEaWFsb2dWaXNpYmxlIiwibXlUaGlua0NvbnRlbnQiLCJteVRoaW5rSUQiLCJjdXJyZW50R3JvdXBJbmZvIiwiaW5wdXRUaGlua0NvbnRlbnQiLCJzdWJtaXRlZFN0ZXBMaXN0IiwicXVlcnlQYXJhbSIsIm5hdmlnYXRlVXJsTWFwIiwicHJldktub3ciLCJwcmFjdGljZSIsInByYWN0aWNlT3BlblR5cGUiLCJhcnJhbmdlIiwiZ3JvdXBNZW1iZXJzIiwiY3VycmVudE1lbWJlciIsImNvbXB1dGVkIiwiY2FuRWRpdFRoaW5rIiwiTWVtYmVyRklEIiwiRmxua0lEIiwibWV0aG9kcyIsIm9uRWRpdFRoaW5rIiwib25TdWJtaXRUaGluayIsIlN0dWRlbnRGSUQiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwiU3R1ZGVudE5hbWUiLCJYTSIsIlJlZmxlY3RDb250ZW50IiwiR3JvdXBGSUQiLCJDb3Vyc2VGSUQiLCJ0aGVuIiwicmVzIiwiJGFwcGx5Iiwib25UaGlua0lucHV0IiwiZSIsImRldGFpbCIsInZhbHVlIiwicHJldmlld0ltZyIsInNyYyIsIndlcHkiLCJwcmV2aWV3SW1hZ2UiLCJ1cmxzIiwicGxheVZvaWNlIiwiaW5uZXJBdWRpb0NvbnRleHQiLCJjcmVhdGVJbm5lckF1ZGlvQ29udGV4dCIsImF1dG9wbGF5Iiwib25FbmRlZCIsInN0b3AiLCJvbkVycm9yIiwicGxheSIsInNldEN1cnJlbnRNZW1iZXIiLCJtZW1iZXIiLCJsb2FkTWVtYmVyRGF0YSIsIkNvZGUiLCJSZXN1bHRPYmoiLCJmb3JFYWNoIiwiaXRlbSIsIm1vZGVsTGlzdCIsIm1vZGVsIiwiV29ya0FycmFuZ2VMaXN0IiwibXNnRGF0YSIsIkpTT04iLCJwYXJzZSIsIk1lc3NhZ2VCb2R5IiwiZ2V0U3RvcmFnZVN5bmMiLCJyZXNwIiwiZmlsdGVyIiwiTWVtYmVySWRlbnRpdHkiLCJpbmRleCIsImZpbmRJbmRleCIsInNwbGljZSIsInVuc2hpZnQiLCJvcHRpb24iLCJjb3Vyc2VJZCIsImdyb3VwSWQiLCJpbml0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0k7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBSVZDLE8sR0FBVSxFQUFDLG9CQUFtQixFQUFDLE9BQU0sTUFBUCxFQUFjLFNBQVEsZUFBdEIsRUFBcEIsRSxRQUNqQkMsTSxHQUFTLEVBQUMsUUFBTyxFQUFDLGdCQUFlLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxrQkFBbEIsRUFBcUMsUUFBTyxNQUE1QyxFQUFtRCxTQUFRLE9BQTNELEVBQW1FLE9BQU0sS0FBekUsRUFBaEIsRUFBZ0csd0JBQXVCLEVBQUMsU0FBUSxNQUFULEVBQWdCLFFBQU8sTUFBdkIsRUFBOEIsT0FBTSxrQkFBcEMsRUFBdUQsUUFBTyxNQUE5RCxFQUFxRSxTQUFRLE9BQTdFLEVBQXFGLE9BQU0sS0FBM0YsRUFBdkgsRUFBeU4scUJBQW9CLEVBQUMsU0FBUSxlQUFULEVBQXlCLE9BQU0sa0JBQS9CLEVBQWtELFFBQU8sTUFBekQsRUFBZ0UsU0FBUSxPQUF4RSxFQUFnRixPQUFNLEtBQXRGLEVBQTdPLEVBQTBVLHdCQUF1QixFQUFDLFNBQVEsT0FBVCxFQUFpQixPQUFNLGtCQUF2QixFQUEwQyxRQUFPLE1BQWpELEVBQXdELFNBQVEsT0FBaEUsRUFBd0UsT0FBTSxLQUE5RSxFQUFqVyxFQUFzYiw2QkFBNEIsRUFBQyxTQUFRLE9B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eSdcbiAgICBpbXBvcnQgcGFuZWwgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9wYW5lbCdcbiAgICBpbXBvcnQgcmljaEJ1dHRvbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL3JpY2gtYnV0dG9uJ1xuICAgIGltcG9ydCBkaWFsb2cgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9kaWFsb2cnXG4gICAgaW1wb3J0IHN0ZXAgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9zdGVwJ1xuICAgIGltcG9ydCBlbXB0eUNvbnRlbnQgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9lbXB0eS1jb250ZW50J1xuXG4gICAgaW1wb3J0IHtnZXRUaGlua0NvbnRlbnQsIHNhdmVUaGlua0NvbnRlbnQsIGdldFVzZXJTdWJtaXRTdGVwcywgZ2V0R3JvdXBNZW1iZXJzfSBmcm9tICcuLi8uLi9hcGknXG5cbiAgICBleHBvcnQgZGVmYXVsdCBjbGFzcyBUaGluayBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgICAgIGNvbmZpZyA9IHtcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmnInlj43mgJ0nXG4gICAgICAgIH1cblxuICAgICAgICRyZXBlYXQgPSB7XCJzdWJtaXRlZFN0ZXBMaXN0XCI6e1wiY29tXCI6XCJzdGVwXCIsXCJwcm9wc1wiOlwic3RlcERhdGEuc3luY1wifX07XHJcbiRwcm9wcyA9IHtcInN0ZXBcIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcInN1Ym1pdGVkU3RlcExpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6c3RlcERhdGEuc3luY1wiOntcInZhbHVlXCI6XCJpdGVtXCIsXCJ0eXBlXCI6XCJpdGVtXCIsXCJmb3JcIjpcInN1Ym1pdGVkU3RlcExpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6aW5kZXguc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLlNvcnRDb2RlXCIsXCJmb3JcIjpcInN1Ym1pdGVkU3RlcExpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6ZWRpdGFibGUub25jZVwiOntcInZhbHVlXCI6XCJmYWxzZVwiLFwiZm9yXCI6XCJzdWJtaXRlZFN0ZXBMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOmRldGFpbFZpc2libGUub25jZVwiOntcInZhbHVlXCI6XCJmYWxzZVwiLFwiZm9yXCI6XCJzdWJtaXRlZFN0ZXBMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9fSxcInJpY2gtYnV0dG9uXCI6e1widGhlbWVcIjpcImdyZWVuXCIsXCJ0ZXh0XCI6XCLloavlhpnlj43mgJ1cIixcInNpemVcIjpcImJpZ1wiLFwiaWNvblNyY1wiOlwiLi4vLi4vaW1hZ2VzL3lmcy5wbmdcIixcInhtbG5zOnYtb25cIjpcIlwifSxcInJpY2gtYnV0dG9uMlwiOntcInRleHRcIjpcIuaPkOS6pFwiLFwidGhlbWVcIjpcImdyZWVuXCIsXCJ3aWR0aFwiOlwiMTAwJTtcIn0sXCJkaWFsb2dcIjp7XCJjbGFzc1wiOlwiZWRpdC10aGluay1kaWFsb2dcIixcInYtYmluZDp2aXNpYmxlLnN5bmNcIjpcImVkaXRUaGlua0RpYWxvZ1Zpc2libGVcIn0sXCJlbXB0eS1jb250ZW50XCI6e1widGV4dFwiOlwiVEHov5jmsqHmnInmj5DkuqTku7vkvZXmraXpqqRcIn19O1xyXG4kZXZlbnRzID0ge1wicmljaC1idXR0b25cIjp7XCJ2LW9uOnRhcFwiOlwib25FZGl0VGhpbmtcIn0sXCJyaWNoLWJ1dHRvbjJcIjp7XCJ2LW9uOnRhcFwiOlwib25TdWJtaXRUaGlua1wifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgICAgICAgcGFuZWw6IHBhbmVsLFxuICAgICAgICAgICAgJ3JpY2gtYnV0dG9uJzogcmljaEJ1dHRvbixcbiAgICAgICAgICAgICdyaWNoLWJ1dHRvbjInOiByaWNoQnV0dG9uLFxuICAgICAgICAgICAgZGlhbG9nOiBkaWFsb2csXG4gICAgICAgICAgICAnc3RlcCc6IHN0ZXAsXG4gICAgICAgICAgICAnZW1wdHktY29udGVudCc6IGVtcHR5Q29udGVudFxuICAgICAgICB9XG5cbiAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgIGN1cnJlbnRVc2VyOiB7fSxcbiAgICAgICAgICAgIGVkaXRUaGlua0RpYWxvZ1Zpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAgbXlUaGlua0NvbnRlbnQ6ICcnLFxuICAgICAgICAgICAgbXlUaGlua0lEOiAnJyxcbiAgICAgICAgICAgIGN1cnJlbnRHcm91cEluZm86IG51bGwsXG4gICAgICAgICAgICBpbnB1dFRoaW5rQ29udGVudDogJycsXG4gICAgICAgICAgICBzdWJtaXRlZFN0ZXBMaXN0OiBbXSxcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW06IG51bGwsXG4gICAgICAgICAgICBuYXZpZ2F0ZVVybE1hcDoge1xuICAgICAgICAgICAgICAgIHByZXZLbm93OiAnL3ByYWN0aWNlL3BhZ2VzL3ByZXZLbm93JyxcbiAgICAgICAgICAgICAgICBwcmFjdGljZTogJy9wYWdlcy9wcmFjdGljZScsXG4gICAgICAgICAgICAgICAgcHJhY3RpY2VPcGVuVHlwZTogJ3N3aXRjaFRhYicsXG4gICAgICAgICAgICAgICAgYXJyYW5nZTogJy9wcmFjdGljZS9wYWdlcy9hcnJhbmdlJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdyb3VwTWVtYmVyczogW10sXG4gICAgICAgICAgICBjdXJyZW50TWVtYmVyOiBudWxsXG4gICAgICAgIH1cblxuICAgICAgICBjb21wdXRlZCA9IHtcbiAgICAgICAgICAgIGNhbkVkaXRUaGluaygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIXRoaXMucXVlcnlQYXJhbSAmJiB0aGlzLmN1cnJlbnRNZW1iZXIgJiYgdGhpcy5jdXJyZW50TWVtYmVyLk1lbWJlckZJRCA9PT0gdGhpcy5jdXJyZW50VXNlci5GbG5rSURcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG1ldGhvZHMgPSB7XG4gICAgICAgICAgICBvbkVkaXRUaGluaygpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0VGhpbmtDb250ZW50ID0gdGhpcy5teVRoaW5rQ29udGVudFxuICAgICAgICAgICAgICAgIHRoaXMuZWRpdFRoaW5rRGlhbG9nVmlzaWJsZSA9IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvblN1Ym1pdFRoaW5rKCkge1xuICAgICAgICAgICAgICAgIHNhdmVUaGlua0NvbnRlbnQoe1xuICAgICAgICAgICAgICAgICAgICBGbG5rSUQ6IHRoaXMubXlUaGlua0lEIHx8ICcnLFxuICAgICAgICAgICAgICAgICAgICBTdHVkZW50RklEOiB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mby5GbG5rSUQsXG4gICAgICAgICAgICAgICAgICAgIFN0dWRlbnROYW1lOiB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mby5YTSxcbiAgICAgICAgICAgICAgICAgICAgUmVmbGVjdENvbnRlbnQ6IHRoaXMuaW5wdXRUaGlua0NvbnRlbnQsXG4gICAgICAgICAgICAgICAgICAgIEdyb3VwRklEOiB0aGlzLmN1cnJlbnRHcm91cEluZm8uR3JvdXBGSUQsXG4gICAgICAgICAgICAgICAgICAgIENvdXJzZUZJRDogdGhpcy5jdXJyZW50R3JvdXBJbmZvLkNvdXJzZUZJRFxuICAgICAgICAgICAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5teVRoaW5rQ29udGVudCA9IHRoaXMuaW5wdXRUaGlua0NvbnRlbnRcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5teVRoaW5rSUQgPSByZXNcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0VGhpbmtEaWFsb2dWaXNpYmxlID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0VGhpbmtEaWFsb2dWaXNpYmxlID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25UaGlua0lucHV0KGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0VGhpbmtDb250ZW50ID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcmV2aWV3SW1nKHNyYykge1xuICAgICAgICAgICAgICAgIHdlcHkucHJldmlld0ltYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsczogW3NyY11cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBsYXlWb2ljZShzcmMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbm5lckF1ZGlvQ29udGV4dCA9IHdlcHkuY3JlYXRlSW5uZXJBdWRpb0NvbnRleHQoKVxuICAgICAgICAgICAgICAgIGlubmVyQXVkaW9Db250ZXh0LmF1dG9wbGF5ID0gZmFsc2VcbiAgICAgICAgICAgICAgICBpbm5lckF1ZGlvQ29udGV4dC5zcmMgPSBzcmNcbiAgICAgICAgICAgICAgICBpbm5lckF1ZGlvQ29udGV4dC5vbkVuZGVkKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaW5uZXJBdWRpb0NvbnRleHQuc3RvcCgpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBpbm5lckF1ZGlvQ29udGV4dC5vbkVycm9yKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaW5uZXJBdWRpb0NvbnRleHQuc3RvcCgpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBpbm5lckF1ZGlvQ29udGV4dC5wbGF5KClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRDdXJyZW50TWVtYmVyKG1lbWJlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE1lbWJlciA9IG1lbWJlclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRNZW1iZXJEYXRhKG1lbWJlcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxvYWRNZW1iZXJEYXRhKG1lbWJlcikge1xuICAgICAgICAgICAgZ2V0VGhpbmtDb250ZW50KG1lbWJlci5NZW1iZXJGSUQsIHRoaXMuY3VycmVudEdyb3VwSW5mby5Hcm91cEZJRCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXMuQ29kZSA9PT0gJzQwMDAnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXlUaGlua0NvbnRlbnQgPSByZXMuUmVzdWx0T2JqLlJlZmxlY3RDb250ZW50XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXlUaGlua0lEID0gcmVzLlJlc3VsdE9iai5GbG5rSURcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm15VGhpbmtDb250ZW50ID0gJydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubXlUaGlua0NvbnRlbnQgPSAnJ1xuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBnZXRVc2VyU3VibWl0U3RlcHMobWVtYmVyLk1lbWJlckZJRCwgdGhpcy5jdXJyZW50R3JvdXBJbmZvLkdyb3VwRklEKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJtaXRlZFN0ZXBMaXN0ID0gcmVzXG4gICAgICAgICAgICAgICAgdGhpcy5zdWJtaXRlZFN0ZXBMaXN0LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ubW9kZWxMaXN0LmZvckVhY2gobW9kZWwgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuV29ya0FycmFuZ2VMaXN0LmZvckVhY2goZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5tc2dEYXRhID0gSlNPTi5wYXJzZShkYXRhLk1lc3NhZ2VCb2R5KVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1Ym1pdGVkU3RlcExpc3QgPSBbXVxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBpbml0KCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucXVlcnlQYXJhbSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEdyb3VwSW5mbyA9IHRoaXMucXVlcnlQYXJhbVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRHcm91cEluZm8gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdhY3RpdmVUYXNrSW5mbycpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRVc2VyID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm9cbiAgICAgICAgICAgIGdldEdyb3VwTWVtYmVycyh0aGlzLmN1cnJlbnRHcm91cEluZm8uR3JvdXBGSUQpLnRoZW4ocmVzcCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHJlcyA9IHJlc3AuZmlsdGVyKGl0ZW0gPT4gaXRlbS5NZW1iZXJJZGVudGl0eSA9PT0gMylcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSByZXMuZmluZEluZGV4KGl0ZW0gPT4gaXRlbS5NZW1iZXJGSUQgPT09IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvLkZsbmtJRClcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gcmVzW2luZGV4XVxuICAgICAgICAgICAgICAgICAgICByZXMuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgICAgICAgICAgICAgICByZXMudW5zaGlmdChkYXRhKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VwTWVtYmVycyA9IHJlc1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE1lbWJlciA9IHJlc1swXVxuICAgICAgICAgICAgICAgIHRoaXMubG9hZE1lbWJlckRhdGEodGhpcy5jdXJyZW50TWVtYmVyKVxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIH0sIChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VwTWVtYmVycyA9IFtdXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIG9uTG9hZChvcHRpb24pIHtcbiAgICAgICAgICAgIGlmIChvcHRpb24gJiYgb3B0aW9uLmNvdXJzZUlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5xdWVyeVBhcmFtID0ge1xuICAgICAgICAgICAgICAgICAgICBDb3Vyc2VGSUQ6IG9wdGlvbi5jb3Vyc2VJZCxcbiAgICAgICAgICAgICAgICAgICAgR3JvdXBGSUQ6IG9wdGlvbi5ncm91cElkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVVcmxNYXAgPSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZLbm93OiAnL3ByYWN0aWNlL3BhZ2VzL3ByZXZLbm93P2NvdXJzZUlkPScgKyBvcHRpb24uY291cnNlSWQgKyAnJmdyb3VwSWQ9JyArIG9wdGlvbi5ncm91cElkLFxuICAgICAgICAgICAgICAgICAgICBwcmFjdGljZTogJy9wcmFjdGljZS9wYWdlcy9yZXZpZXdGaW5pc2hUYXNrP2NvdXJzZUlkPScgKyBvcHRpb24uY291cnNlSWQgKyAnJmdyb3VwSWQ9JyArIG9wdGlvbi5ncm91cElkLFxuICAgICAgICAgICAgICAgICAgICBwcmFjdGljZU9wZW5UeXBlOiAncmVkaXJlY3QnLFxuICAgICAgICAgICAgICAgICAgICBhcnJhbmdlOiAnL3ByYWN0aWNlL3BhZ2VzL2FycmFuZ2U/Y291cnNlSWQ9JyArIG9wdGlvbi5jb3Vyc2VJZCArICcmZ3JvdXBJZD0nICsgb3B0aW9uLmdyb3VwSWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pbml0KClcbiAgICAgICAgfVxuICAgIH1cbiJdfQ==