'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _chatMessage = require('./../../components/chatMessage.js');

var _chatMessage2 = _interopRequireDefault(_chatMessage);

var _panel = require('./../../components/panel.js');

var _panel2 = _interopRequireDefault(_panel);

var _remarkTpl = require('./../../components/remark-tpl.js');

var _remarkTpl2 = _interopRequireDefault(_remarkTpl);

var _remarkRecord = require('./../../components/remark-record.js');

var _remarkRecord2 = _interopRequireDefault(_remarkRecord);

var _api = require('./../../api/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReviewPractice = function (_wepy$page) {
    _inherits(ReviewPractice, _wepy$page);

    function ReviewPractice() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ReviewPractice);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ReviewPractice.__proto__ || Object.getPrototypeOf(ReviewPractice)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '个性化学习中心'
        }, _this.data = {
            isTeacher: false,
            userInfo: null,
            chatHistoryHeight: 'calc(100vh - 88rpx)',
            moreActionShown: false,
            messageId: '',
            userInfoForMsg: {},
            messages: [],
            currentMsgsPageIndex: 1,
            haveMoreChatMsgs: true,
            CourseFID: '',
            GroupFID: '',
            isTeacherRemarked: false,
            remarkList: null,
            isStuInGroup: false
        }, _this.$repeat = { "messages": { "com": "chat-message", "props": "msgData.sync" }, "remarkList": { "com": "remark-record", "props": "groupMember.sync" } }, _this.$props = { "chat-message": { "xmlns:v-bind": { "value": "", "for": "messages", "item": "item", "index": "index", "key": "index" }, "v-bind:id.once": { "value": "'message_' + item.MessageID", "for": "messages", "item": "item", "index": "index", "key": "index" }, "v-bind:msgData.sync": { "value": "item", "type": "item", "for": "messages", "item": "item", "index": "index", "key": "index" }, "v-bind:isSelf.once": { "value": "item.isSelf", "for": "messages", "item": "item", "index": "index", "key": "index" }, "v-bind:isShowMore.once": { "value": "item.isShowMore", "for": "messages", "item": "item", "index": "index", "key": "index" }, "editable": { "value": "{{false}}", "for": "messages", "item": "item", "index": "index", "key": "index" } }, "remark-record": { "v-bind:groupMember.sync": { "value": "item", "type": "item", "for": "remarkList", "item": "item", "index": "index", "key": "key" } } }, _this.$events = {}, _this.components = {
            'chat-message': _chatMessage2.default,
            panel: _panel2.default,
            'remark-tpl': _remarkTpl2.default,
            'remark-record': _remarkRecord2.default
        }, _this.computed = {}, _this.methods = {
            onScrollUpper: function onScrollUpper(e) {
                var _this2 = this;

                // 向上滚动，加载更多数据
                if (this.haveMoreChatMsgs) {
                    this.currentMsgsPageIndex++;
                    this.loadChatMsgByPage(this.currentMsgsPageIndex).then(function (res) {
                        var lastMessageId = _this2.messages[0].MessageID;
                        _this2.messages = res.concat(_this2.messages);
                        _this2.messageId = 'message_' + lastMessageId;
                        _this2.$apply();
                    });
                }
            }
        }, _this.events = {
            'hide-other-actions': function hideOtherActions(e) {},
            'delete-msg': function deleteMsg(e) {}
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ReviewPractice, [{
        key: 'scrollToCurrentMsg',
        value: function scrollToCurrentMsg() {
            this.messageId = 'message_' + this.messages[this.messages.length - 1].MessageID;
            this.$apply();
        }
    }, {
        key: 'init',
        value: function init() {
            var _this3 = this;

            this.initChatHistory();
            this.initTeacherRemark();
            (0, _api.isStuInCourseGroup)(this.$parent.globalData.userInfo.FlnkID, this.CourseFID, this.GroupFID).then(function (res) {
                _this3.isStuInGroup = res;
                _this3.$apply();
            }, function () {
                _this3.isStuInGroup = false;
                _this3.$apply();
            });
        }
    }, {
        key: 'initChatHistory',
        value: function initChatHistory() {
            var _this4 = this;

            this.loadChatMsgByPage(1).then(function (res) {
                _this4.messages = [].concat(res);
                _this4.$apply();
                _this4.scrollToCurrentMsg();
            });
        }
    }, {
        key: 'loadChatMsgByPage',
        value: function loadChatMsgByPage() {
            var _this5 = this;

            var pageIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            return new Promise(function (resolve, reject) {
                var userId = '';
                var RoleNum = null;
                (0, _api.getChatMsgByPage)(_this5.GroupFID, userId, RoleNum, pageIndex).then(function (res) {
                    if (res.PageCount <= _this5.currentMsgsPageIndex) {
                        _this5.haveMoreChatMsgs = false;
                    } else {
                        _this5.haveMoreChatMsgs = true;
                    }
                    var list = res.DataSource;
                    var data = [];
                    list.forEach(function (item) {
                        var msgBody = JSON.parse(item.MessageBody);
                        msgBody.isSelf = msgBody.FromUser === _this5.$parent.globalData.userInfo.FlnkID;
                        data.unshift(msgBody);
                    });
                    resolve(data);
                }, function (res) {
                    _this5.haveMoreChatMsgs = true;
                    reject(res);
                });
            });
        }
    }, {
        key: 'initTeacherRemark',
        value: function initTeacherRemark() {
            var _this6 = this;

            (0, _api.getTeacherRemarkByGroup)(this.GroupFID).then(function (res) {
                res = res || [];
                res.forEach(function (item) {
                    item.modelList.forEach(function (cateitem) {
                        cateitem.ReflectName = cateitem.ReflectCategoryName;
                        cateitem.modelList.forEach(function (subCateItem) {
                            subCateItem.ReflectItemName = subCateItem.ReflectContent;
                            subCateItem.stuStarValue = subCateItem.StarValue || 0;
                            subCateItem.StarValue = subCateItem.TotalStarValue - subCateItem.stuStarValue;
                        });
                    });
                });
                _this6.remarkList = res || [];
                _this6.$apply();
            }, function (res) {
                _this6.remarkList = [];
                _this6.$apply();
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad(option) {
            this.isTeacher = this.$parent.globalData.userInfo.RoleNum + '' === '2';
            this.CourseFID = option.courseId;
            this.GroupFID = option.groupId;
            this.init();
        }
    }, {
        key: 'onUnload',
        value: function onUnload() {}
    }]);

    return ReviewPractice;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(ReviewPractice , 'practice/pages/reviewFinishTask'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJldmlld0ZpbmlzaFRhc2suanMiXSwibmFtZXMiOlsiUmV2aWV3UHJhY3RpY2UiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImlzVGVhY2hlciIsInVzZXJJbmZvIiwiY2hhdEhpc3RvcnlIZWlnaHQiLCJtb3JlQWN0aW9uU2hvd24iLCJtZXNzYWdlSWQiLCJ1c2VySW5mb0Zvck1zZyIsIm1lc3NhZ2VzIiwiY3VycmVudE1zZ3NQYWdlSW5kZXgiLCJoYXZlTW9yZUNoYXRNc2dzIiwiQ291cnNlRklEIiwiR3JvdXBGSUQiLCJpc1RlYWNoZXJSZW1hcmtlZCIsInJlbWFya0xpc3QiLCJpc1N0dUluR3JvdXAiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjaGF0TWVzc2FnZSIsInBhbmVsIiwicmVtYXJrVHBsIiwicmVtYXJrUmVjb3JkIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwib25TY3JvbGxVcHBlciIsImUiLCJsb2FkQ2hhdE1zZ0J5UGFnZSIsInRoZW4iLCJsYXN0TWVzc2FnZUlkIiwiTWVzc2FnZUlEIiwicmVzIiwiY29uY2F0IiwiJGFwcGx5IiwiZXZlbnRzIiwibGVuZ3RoIiwiaW5pdENoYXRIaXN0b3J5IiwiaW5pdFRlYWNoZXJSZW1hcmsiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsIkZsbmtJRCIsInNjcm9sbFRvQ3VycmVudE1zZyIsInBhZ2VJbmRleCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwidXNlcklkIiwiUm9sZU51bSIsIlBhZ2VDb3VudCIsImxpc3QiLCJEYXRhU291cmNlIiwiZm9yRWFjaCIsIm1zZ0JvZHkiLCJKU09OIiwicGFyc2UiLCJpdGVtIiwiTWVzc2FnZUJvZHkiLCJpc1NlbGYiLCJGcm9tVXNlciIsInVuc2hpZnQiLCJtb2RlbExpc3QiLCJjYXRlaXRlbSIsIlJlZmxlY3ROYW1lIiwiUmVmbGVjdENhdGVnb3J5TmFtZSIsInN1YkNhdGVJdGVtIiwiUmVmbGVjdEl0ZW1OYW1lIiwiUmVmbGVjdENvbnRlbnQiLCJzdHVTdGFyVmFsdWUiLCJTdGFyVmFsdWUiLCJUb3RhbFN0YXJWYWx1ZSIsIm9wdGlvbiIsImNvdXJzZUlkIiwiZ3JvdXBJZCIsImluaXQiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0k7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7O0lBRXFCQSxjOzs7Ozs7Ozs7Ozs7OzswTUFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUlUQyxJLEdBQU87QUFDSEMsdUJBQVcsS0FEUjtBQUVIQyxzQkFBVSxJQUZQO0FBR0hDLCtCQUFtQixxQkFIaEI7QUFJSEMsNkJBQWlCLEtBSmQ7QUFLSEMsdUJBQVcsRUFMUjtBQU1IQyw0QkFBZ0IsRUFOYjtBQU9IQyxzQkFBVSxFQVBQO0FBUUhDLGtDQUFzQixDQVJuQjtBQVNIQyw4QkFBa0IsSUFUZjtBQVVIQyx1QkFBVyxFQVZSO0FBV0hDLHNCQUFVLEVBWFA7QUFZSEMsK0JBQW1CLEtBWmhCO0FBYUhDLHdCQUFZLElBYlQ7QUFjSEMsMEJBQWM7QUFkWCxTLFFBaUJSQyxPLEdBQVUsRUFBQyxZQUFXLEVBQUMsT0FBTSxjQUFQLEVBQXNCLFNBQVEsY0FBOUIsRUFBWixFQUEwRCxjQUFhLEVBQUMsT0FBTSxlQUFQLEVBQXVCLFNBQVEsa0JBQS9CLEVBQXZFLEUsUUFDakJDLE0sR0FBUyxFQUFDLGdCQUFlLEVBQUMsZ0JBQWUsRUFBQyxTQUFRLEVBQVQsRUFBWSxPQUFNLFVBQWxCLEVBQTZCLFFBQU8sTUFBcEMsRUFBMkMsU0FBUSxPQUFuRCxFQUEyRCxPQUFNLE9BQWpFLEVBQWhCLEVBQTBGLGtCQUFpQixFQUFDLFNBQVEsNkJBQVQsRUFBdUMsT0FBTSxVQUE3QyxFQUF3RCxRQUFPLE1BQS9ELEVBQXNFLFNBQVEsT0FBOUUsRUFBc0YsT0FBTSxPQUE1RixFQUEzRyxFQUFnTix1QkFBc0IsRUFBQyxTQUFRLE1BQVQsRUFBZ0Is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RixpQ0FBU0QsU0FBVCxDQUFtQlQsT0FBbkIsQ0FBMkIsdUJBQWU7QUFDdENhLHdDQUFZQyxlQUFaLEdBQThCRCxZQUFZRSxjQUExQztBQUNBRix3Q0FBWUcsWUFBWixHQUEyQkgsWUFBWUksU0FBWixJQUF5QixDQUFwRDtBQUNBSix3Q0FBWUksU0FBWixHQUF3QkosWUFBWUssY0FBWixHQUE2QkwsWUFBWUcsWUFBakU7QUFDSCx5QkFKRDtBQUtILHFCQVBEO0FBUUgsaUJBVEQ7QUFVQSx1QkFBS3RELFVBQUwsR0FBa0JrQixPQUFPLEVBQXpCO0FBQ0EsdUJBQUtFLE1BQUw7QUFDSCxhQWRELEVBY0csZUFBTztBQUNOLHVCQUFLcEIsVUFBTCxHQUFrQixFQUFsQjtBQUNBLHVCQUFLb0IsTUFBTDtBQUNILGFBakJEO0FBa0JIOzs7K0JBRU1xQyxNLEVBQVE7QUFDWCxpQkFBS3JFLFNBQUwsR0FBa0IsS0FBS3FDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QnJDLFFBQXhCLENBQWlDNkMsT0FBakMsR0FBMkMsRUFBNUMsS0FBb0QsR0FBckU7QUFDQSxpQkFBS3JDLFNBQUwsR0FBaUI0RCxPQUFPQyxRQUF4QjtBQUNBLGlCQUFLNUQsUUFBTCxHQUFnQjJELE9BQU9FLE9BQXZCO0FBQ0EsaUJBQUtDLElBQUw7QUFDSDs7O21DQUVVLENBQUU7Ozs7RUF0STJCQyxlQUFLQyxJOztrQkFBNUI5RSxjIiwiZmlsZSI6InJldmlld0ZpbmlzaFRhc2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICAgIGltcG9ydCBjaGF0TWVzc2FnZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NoYXRNZXNzYWdlJ1xuICAgIGltcG9ydCBwYW5lbCBmcm9tICcuLi8uLi9jb21wb25lbnRzL3BhbmVsJ1xuICAgIGltcG9ydCByZW1hcmtUcGwgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9yZW1hcmstdHBsJ1xuICAgIGltcG9ydCByZW1hcmtSZWNvcmQgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9yZW1hcmstcmVjb3JkJ1xuXG4gICAgaW1wb3J0IHtnZXRDaGF0TXNnQnlQYWdlLCBnZXRUZWFjaGVyUmVtYXJrQnlHcm91cCwgaXNTdHVJbkNvdXJzZUdyb3VwfSBmcm9tICcuLi8uLi9hcGknXG5cbiAgICBleHBvcnQgZGVmYXVsdCBjbGFzcyBSZXZpZXdQcmFjdGljZSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgICAgIGNvbmZpZyA9IHtcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkuKrmgKfljJblrabkuaDkuK3lv4MnXG4gICAgICAgIH1cblxuICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgaXNUZWFjaGVyOiBmYWxzZSxcbiAgICAgICAgICAgIHVzZXJJbmZvOiBudWxsLFxuICAgICAgICAgICAgY2hhdEhpc3RvcnlIZWlnaHQ6ICdjYWxjKDEwMHZoIC0gODhycHgpJyxcbiAgICAgICAgICAgIG1vcmVBY3Rpb25TaG93bjogZmFsc2UsXG4gICAgICAgICAgICBtZXNzYWdlSWQ6ICcnLFxuICAgICAgICAgICAgdXNlckluZm9Gb3JNc2c6IHt9LFxuICAgICAgICAgICAgbWVzc2FnZXM6IFtdLFxuICAgICAgICAgICAgY3VycmVudE1zZ3NQYWdlSW5kZXg6IDEsXG4gICAgICAgICAgICBoYXZlTW9yZUNoYXRNc2dzOiB0cnVlLFxuICAgICAgICAgICAgQ291cnNlRklEOiAnJyxcbiAgICAgICAgICAgIEdyb3VwRklEOiAnJyxcbiAgICAgICAgICAgIGlzVGVhY2hlclJlbWFya2VkOiBmYWxzZSxcbiAgICAgICAgICAgIHJlbWFya0xpc3Q6IG51bGwsXG4gICAgICAgICAgICBpc1N0dUluR3JvdXA6IGZhbHNlXG4gICAgICAgIH1cblxuICAgICAgICRyZXBlYXQgPSB7XCJtZXNzYWdlc1wiOntcImNvbVwiOlwiY2hhdC1tZXNzYWdlXCIsXCJwcm9wc1wiOlwibXNnRGF0YS5zeW5jXCJ9LFwicmVtYXJrTGlzdFwiOntcImNvbVwiOlwicmVtYXJrLXJlY29yZFwiLFwicHJvcHNcIjpcImdyb3VwTWVtYmVyLnN5bmNcIn19O1xyXG4kcHJvcHMgPSB7XCJjaGF0LW1lc3NhZ2VcIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcIm1lc3NhZ2VzXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6aWQub25jZVwiOntcInZhbHVlXCI6XCInbWVzc2FnZV8nICsgaXRlbS5NZXNzYWdlSURcIixcImZvclwiOlwibWVzc2FnZXNcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDptc2dEYXRhLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJtZXNzYWdlc1wiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOmlzU2VsZi5vbmNlXCI6e1widmFsdWVcIjpcIml0ZW0uaXNTZWxmXCIsXCJmb3JcIjpcIm1lc3NhZ2VzXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6aXNTaG93TW9yZS5vbmNlXCI6e1widmFsdWVcIjpcIml0ZW0uaXNTaG93TW9yZVwiLFwiZm9yXCI6XCJtZXNzYWdlc1wiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwiZWRpdGFibGVcIjp7XCJ2YWx1ZVwiOlwie3tmYWxzZX19XCIsXCJmb3JcIjpcIm1lc3NhZ2VzXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19LFwicmVtYXJrLXJlY29yZFwiOntcInYtYmluZDpncm91cE1lbWJlci5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW1cIixcInR5cGVcIjpcIml0ZW1cIixcImZvclwiOlwicmVtYXJrTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifX19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgICAgICAgJ2NoYXQtbWVzc2FnZSc6IGNoYXRNZXNzYWdlLFxuICAgICAgICAgICAgcGFuZWw6IHBhbmVsLFxuICAgICAgICAgICAgJ3JlbWFyay10cGwnOiByZW1hcmtUcGwsXG4gICAgICAgICAgICAncmVtYXJrLXJlY29yZCc6IHJlbWFya1JlY29yZFxuICAgICAgICB9XG5cbiAgICAgICAgY29tcHV0ZWQgPSB7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIG1ldGhvZHMgPSB7XG4gICAgICAgICAgICBvblNjcm9sbFVwcGVyKGUpIHtcbiAgICAgICAgICAgICAgICAvLyDlkJHkuIrmu5rliqjvvIzliqDovb3mm7TlpJrmlbDmja5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXZlTW9yZUNoYXRNc2dzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE1zZ3NQYWdlSW5kZXgrK1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRDaGF0TXNnQnlQYWdlKHRoaXMuY3VycmVudE1zZ3NQYWdlSW5kZXgpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsYXN0TWVzc2FnZUlkID0gdGhpcy5tZXNzYWdlc1swXS5NZXNzYWdlSURcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZXMgPSByZXMuY29uY2F0KHRoaXMubWVzc2FnZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VJZCA9ICdtZXNzYWdlXycgKyBsYXN0TWVzc2FnZUlkXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnRzID0ge1xuICAgICAgICAgICAgJ2hpZGUtb3RoZXItYWN0aW9ucyc6IGZ1bmN0aW9uKGUpIHt9LFxuICAgICAgICAgICAgJ2RlbGV0ZS1tc2cnOiBmdW5jdGlvbihlKSB7fVxuICAgICAgICB9XG5cbiAgICAgICAgc2Nyb2xsVG9DdXJyZW50TXNnKCkge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlSWQgPSAnbWVzc2FnZV8nICsgdGhpcy5tZXNzYWdlc1sodGhpcy5tZXNzYWdlcy5sZW5ndGggLSAxKV0uTWVzc2FnZUlEXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cblxuICAgICAgICBpbml0KCkge1xuICAgICAgICAgICAgdGhpcy5pbml0Q2hhdEhpc3RvcnkoKVxuICAgICAgICAgICAgdGhpcy5pbml0VGVhY2hlclJlbWFyaygpXG4gICAgICAgICAgICBpc1N0dUluQ291cnNlR3JvdXAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8uRmxua0lELCB0aGlzLkNvdXJzZUZJRCwgdGhpcy5Hcm91cEZJRCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1N0dUluR3JvdXAgPSByZXNcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1N0dUluR3JvdXAgPSBmYWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBpbml0Q2hhdEhpc3RvcnkoKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRDaGF0TXNnQnlQYWdlKDEpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VzID0gW10uY29uY2F0KHJlcylcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxUb0N1cnJlbnRNc2coKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGxvYWRDaGF0TXNnQnlQYWdlKHBhZ2VJbmRleCA9IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHVzZXJJZCA9ICcnXG4gICAgICAgICAgICAgICAgbGV0IFJvbGVOdW0gPSBudWxsXG4gICAgICAgICAgICAgICAgZ2V0Q2hhdE1zZ0J5UGFnZSh0aGlzLkdyb3VwRklELCB1c2VySWQsIFJvbGVOdW0sIHBhZ2VJbmRleCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLlBhZ2VDb3VudCA8PSB0aGlzLmN1cnJlbnRNc2dzUGFnZUluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhdmVNb3JlQ2hhdE1zZ3MgPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXZlTW9yZUNoYXRNc2dzID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCBsaXN0ID0gcmVzLkRhdGFTb3VyY2VcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBbXVxuICAgICAgICAgICAgICAgICAgICBsaXN0LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbXNnQm9keSA9IEpTT04ucGFyc2UoaXRlbS5NZXNzYWdlQm9keSlcbiAgICAgICAgICAgICAgICAgICAgICAgIG1zZ0JvZHkuaXNTZWxmID0gbXNnQm9keS5Gcm9tVXNlciA9PT0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8uRmxua0lEXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnVuc2hpZnQobXNnQm9keSlcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKVxuICAgICAgICAgICAgICAgIH0sIHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGF2ZU1vcmVDaGF0TXNncyA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlcylcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGluaXRUZWFjaGVyUmVtYXJrKCkge1xuICAgICAgICAgICAgZ2V0VGVhY2hlclJlbWFya0J5R3JvdXAodGhpcy5Hcm91cEZJRCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgIHJlcyA9IHJlcyB8fCBbXVxuICAgICAgICAgICAgICAgIHJlcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLm1vZGVsTGlzdC5mb3JFYWNoKGNhdGVpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGVpdGVtLlJlZmxlY3ROYW1lID0gY2F0ZWl0ZW0uUmVmbGVjdENhdGVnb3J5TmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWl0ZW0ubW9kZWxMaXN0LmZvckVhY2goc3ViQ2F0ZUl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YkNhdGVJdGVtLlJlZmxlY3RJdGVtTmFtZSA9IHN1YkNhdGVJdGVtLlJlZmxlY3RDb250ZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViQ2F0ZUl0ZW0uc3R1U3RhclZhbHVlID0gc3ViQ2F0ZUl0ZW0uU3RhclZhbHVlIHx8IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJDYXRlSXRlbS5TdGFyVmFsdWUgPSBzdWJDYXRlSXRlbS5Ub3RhbFN0YXJWYWx1ZSAtIHN1YkNhdGVJdGVtLnN0dVN0YXJWYWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHRoaXMucmVtYXJrTGlzdCA9IHJlcyB8fCBbXVxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIH0sIHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1hcmtMaXN0ID0gW11cbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgb25Mb2FkKG9wdGlvbikge1xuICAgICAgICAgICAgdGhpcy5pc1RlYWNoZXIgPSAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8uUm9sZU51bSArICcnKSA9PT0gJzInXG4gICAgICAgICAgICB0aGlzLkNvdXJzZUZJRCA9IG9wdGlvbi5jb3Vyc2VJZFxuICAgICAgICAgICAgdGhpcy5Hcm91cEZJRCA9IG9wdGlvbi5ncm91cElkXG4gICAgICAgICAgICB0aGlzLmluaXQoKVxuICAgICAgICB9XG5cbiAgICAgICAgb25VbmxvYWQoKSB7fVxuICAgIH1cbiJdfQ==