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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJldmlld0ZpbmlzaFRhc2suanMiXSwibmFtZXMiOlsiUmV2aWV3UHJhY3RpY2UiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImlzVGVhY2hlciIsInVzZXJJbmZvIiwiY2hhdEhpc3RvcnlIZWlnaHQiLCJtb3JlQWN0aW9uU2hvd24iLCJtZXNzYWdlSWQiLCJ1c2VySW5mb0Zvck1zZyIsIm1lc3NhZ2VzIiwiY3VycmVudE1zZ3NQYWdlSW5kZXgiLCJoYXZlTW9yZUNoYXRNc2dzIiwiQ291cnNlRklEIiwiR3JvdXBGSUQiLCJpc1RlYWNoZXJSZW1hcmtlZCIsInJlbWFya0xpc3QiLCJpc1N0dUluR3JvdXAiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJwYW5lbCIsImNvbXB1dGVkIiwibWV0aG9kcyIsIm9uU2Nyb2xsVXBwZXIiLCJlIiwibG9hZENoYXRNc2dCeVBhZ2UiLCJ0aGVuIiwibGFzdE1lc3NhZ2VJZCIsIk1lc3NhZ2VJRCIsInJlcyIsImNvbmNhdCIsIiRhcHBseSIsImV2ZW50cyIsImxlbmd0aCIsImluaXRDaGF0SGlzdG9yeSIsImluaXRUZWFjaGVyUmVtYXJrIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJGbG5rSUQiLCJzY3JvbGxUb0N1cnJlbnRNc2ciLCJwYWdlSW5kZXgiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInVzZXJJZCIsIlJvbGVOdW0iLCJQYWdlQ291bnQiLCJsaXN0IiwiRGF0YVNvdXJjZSIsImZvckVhY2giLCJtc2dCb2R5IiwiSlNPTiIsInBhcnNlIiwiaXRlbSIsIk1lc3NhZ2VCb2R5IiwiaXNTZWxmIiwiRnJvbVVzZXIiLCJ1bnNoaWZ0IiwibW9kZWxMaXN0IiwiY2F0ZWl0ZW0iLCJSZWZsZWN0TmFtZSIsIlJlZmxlY3RDYXRlZ29yeU5hbWUiLCJzdWJDYXRlSXRlbSIsIlJlZmxlY3RJdGVtTmFtZSIsIlJlZmxlY3RDb250ZW50Iiwic3R1U3RhclZhbHVlIiwiU3RhclZhbHVlIiwiVG90YWxTdGFyVmFsdWUiLCJvcHRpb24iLCJjb3Vyc2VJZCIsImdyb3VwSWQiLCJpbml0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0k7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7O0lBRXFCQSxjOzs7Ozs7Ozs7Ozs7OzswTUFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUlUQyxJLEdBQU87QUFDSEMsdUJBQVcsS0FEUjtBQUVIQyxzQkFBVSxJQUZQO0FBR0hDLCtCQUFtQixxQkFIaEI7QUFJSEMsNkJBQWlCLEtBSmQ7QUFLSEMsdUJBQVcsRUFMUjtBQU1IQyw0QkFBZ0IsRUFOYjtBQU9IQyxzQkFBVSxFQVBQO0FBUUhDLGtDQUFzQixDQVJuQjtBQVNIQyw4QkFBa0IsSUFUZjtBQVVIQyx1QkFBVyxFQVZSO0FBV0hDLHNCQUFVLEVBWFA7QUFZSEMsK0JBQW1CLEtBWmhCO0FBYUhDLHdCQUFZLElBYlQ7QUFjSEMsMEJBQWM7QUFkWCxTLFFBaUJSQyxPLEdBQVUsRUFBQyxZQUFXLEVBQUMsT0FBTSxjQUFQLEVBQXNCLFNBQVEsY0FBOUIsRUFBWixFQUEwRCxjQUFhLEVBQUMsT0FBTSxlQUFQLEVBQXVCLFNBQVEsa0JBQS9CLEVBQXZFLEUsUUFDakJDLE0sR0FBUyxFQUFDLGdCQUFlLEVBQUMsZ0JBQWUsRUFBQyxTQUFRLEVBQVQsRUFBWSxPQUFNLFVBQWxCLEVBQTZCLFFBQU8sTUFBcEMsRUFBMkMsU0FBUSxPQUFuRCxFQUEyRCxPQUFNLE9BQWpFLEVBQWhCLEVBQTBGLGtCQUFpQixFQUFDLFNBQVEsNkJBQVQsRUFBdUMsT0FBTSxVQUE3QyxFQUF3RCxRQUFPLE1BQS9ELEVBQXNFLFNBQVEsT0FBOUUsRUFBc0YsT0FBTSxPQUE1RixFQUEzRyxFQUFnTix1QkFBc0IsRUFBQyxTQUFRLE1BQVQsRUFBZ0IsUUFBTyxNQUF2QixFQUE4QixPQUFNLFVBQXBDLEVBQStDLFFBQU8sTUFBdEQsRUFB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LHdDQUFZRyxZQUFaLEdBQTJCSCxZQUFZSSxTQUFaLElBQXlCLENBQXBEO0FBQ0FKLHdDQUFZSSxTQUFaLEdBQXdCSixZQUFZSyxjQUFaLEdBQTZCTCxZQUFZRyxZQUFqRTtBQUNILHlCQUpEO0FBS0gscUJBUEQ7QUFRSCxpQkFURDtBQVVBLHVCQUFLbkQsVUFBTCxHQUFrQmUsT0FBTyxFQUF6QjtBQUNBLHVCQUFLRSxNQUFMO0FBQ0gsYUFkRCxFQWNHLGVBQU87QUFDTix1QkFBS2pCLFVBQUwsR0FBa0IsRUFBbEI7QUFDQSx1QkFBS2lCLE1BQUw7QUFDSCxhQWpCRDtBQWtCSDs7OytCQUVNcUMsTSxFQUFRO0FBQ1gsaUJBQUtsRSxTQUFMLEdBQWtCLEtBQUtrQyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JsQyxRQUF4QixDQUFpQzBDLE9BQWpDLEdBQTJDLEVBQTVDLEtBQW9ELEdBQXJFO0FBQ0EsaUJBQUtsQyxTQUFMLEdBQWlCeUQsT0FBT0MsUUFBeEI7QUFDQSxpQkFBS3pELFFBQUwsR0FBZ0J3RCxPQUFPRSxPQUF2QjtBQUNBLGlCQUFLQyxJQUFMO0FBQ0g7OzttQ0FFVSxDQUFFOzs7O0VBdEkyQixlQUFLQyxJOztrQkFBNUIxRSxjIiwiZmlsZSI6InJldmlld0ZpbmlzaFRhc2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICAgIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgICBpbXBvcnQgY2hhdE1lc3NhZ2UgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jaGF0TWVzc2FnZSdcclxuICAgIGltcG9ydCBwYW5lbCBmcm9tICcuLi8uLi9jb21wb25lbnRzL3BhbmVsJ1xyXG4gICAgaW1wb3J0IHJlbWFya1RwbCBmcm9tICcuLi8uLi9jb21wb25lbnRzL3JlbWFyay10cGwnXHJcbiAgICBpbXBvcnQgcmVtYXJrUmVjb3JkIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcmVtYXJrLXJlY29yZCdcclxuXHJcbiAgICBpbXBvcnQge2dldENoYXRNc2dCeVBhZ2UsIGdldFRlYWNoZXJSZW1hcmtCeUdyb3VwLCBpc1N0dUluQ291cnNlR3JvdXB9IGZyb20gJy4uLy4uL2FwaSdcclxuXHJcbiAgICBleHBvcnQgZGVmYXVsdCBjbGFzcyBSZXZpZXdQcmFjdGljZSBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICAgICAgY29uZmlnID0ge1xyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Liq5oCn5YyW5a2m5Lmg5Lit5b+DJ1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGF0YSA9IHtcclxuICAgICAgICAgICAgaXNUZWFjaGVyOiBmYWxzZSxcclxuICAgICAgICAgICAgdXNlckluZm86IG51bGwsXHJcbiAgICAgICAgICAgIGNoYXRIaXN0b3J5SGVpZ2h0OiAnY2FsYygxMDB2aCAtIDg4cnB4KScsXHJcbiAgICAgICAgICAgIG1vcmVBY3Rpb25TaG93bjogZmFsc2UsXHJcbiAgICAgICAgICAgIG1lc3NhZ2VJZDogJycsXHJcbiAgICAgICAgICAgIHVzZXJJbmZvRm9yTXNnOiB7fSxcclxuICAgICAgICAgICAgbWVzc2FnZXM6IFtdLFxyXG4gICAgICAgICAgICBjdXJyZW50TXNnc1BhZ2VJbmRleDogMSxcclxuICAgICAgICAgICAgaGF2ZU1vcmVDaGF0TXNnczogdHJ1ZSxcclxuICAgICAgICAgICAgQ291cnNlRklEOiAnJyxcclxuICAgICAgICAgICAgR3JvdXBGSUQ6ICcnLFxyXG4gICAgICAgICAgICBpc1RlYWNoZXJSZW1hcmtlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIHJlbWFya0xpc3Q6IG51bGwsXHJcbiAgICAgICAgICAgIGlzU3R1SW5Hcm91cDogZmFsc2VcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgJHJlcGVhdCA9IHtcIm1lc3NhZ2VzXCI6e1wiY29tXCI6XCJjaGF0LW1lc3NhZ2VcIixcInByb3BzXCI6XCJtc2dEYXRhLnN5bmNcIn0sXCJyZW1hcmtMaXN0XCI6e1wiY29tXCI6XCJyZW1hcmstcmVjb3JkXCIsXCJwcm9wc1wiOlwiZ3JvdXBNZW1iZXIuc3luY1wifX07XHJcbiRwcm9wcyA9IHtcImNoYXQtbWVzc2FnZVwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwibWVzc2FnZXNcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDppZC5vbmNlXCI6e1widmFsdWVcIjpcIidtZXNzYWdlXycgKyBpdGVtLk1lc3NhZ2VJRFwiLFwiZm9yXCI6XCJtZXNzYWdlc1wiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOm1zZ0RhdGEuc3luY1wiOntcInZhbHVlXCI6XCJpdGVtXCIsXCJ0eXBlXCI6XCJpdGVtXCIsXCJmb3JcIjpcIm1lc3NhZ2VzXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6aXNTZWxmLm9uY2VcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5pc1NlbGZcIixcImZvclwiOlwibWVzc2FnZXNcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDppc1Nob3dNb3JlLm9uY2VcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5pc1Nob3dNb3JlXCIsXCJmb3JcIjpcIm1lc3NhZ2VzXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJlZGl0YWJsZVwiOntcInZhbHVlXCI6XCJ7e2ZhbHNlfX1cIixcImZvclwiOlwibWVzc2FnZXNcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifX0sXCJyZW1hcmstcmVjb3JkXCI6e1widi1iaW5kOmdyb3VwTWVtYmVyLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJyZW1hcmtMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9fX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgICAgICAgICdjaGF0LW1lc3NhZ2UnOiBjaGF0TWVzc2FnZSxcclxuICAgICAgICAgICAgcGFuZWw6IHBhbmVsLFxyXG4gICAgICAgICAgICAncmVtYXJrLXRwbCc6IHJlbWFya1RwbCxcclxuICAgICAgICAgICAgJ3JlbWFyay1yZWNvcmQnOiByZW1hcmtSZWNvcmRcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbXB1dGVkID0ge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgICAgIG9uU2Nyb2xsVXBwZXIoZSkge1xyXG4gICAgICAgICAgICAgICAgLy8g5ZCR5LiK5rua5Yqo77yM5Yqg6L295pu05aSa5pWw5o2uXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXZlTW9yZUNoYXRNc2dzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TXNnc1BhZ2VJbmRleCsrXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkQ2hhdE1zZ0J5UGFnZSh0aGlzLmN1cnJlbnRNc2dzUGFnZUluZGV4KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsYXN0TWVzc2FnZUlkID0gdGhpcy5tZXNzYWdlc1swXS5NZXNzYWdlSURcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlcyA9IHJlcy5jb25jYXQodGhpcy5tZXNzYWdlcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlSWQgPSAnbWVzc2FnZV8nICsgbGFzdE1lc3NhZ2VJZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXZlbnRzID0ge1xyXG4gICAgICAgICAgICAnaGlkZS1vdGhlci1hY3Rpb25zJzogZnVuY3Rpb24oZSkge30sXHJcbiAgICAgICAgICAgICdkZWxldGUtbXNnJzogZnVuY3Rpb24oZSkge31cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNjcm9sbFRvQ3VycmVudE1zZygpIHtcclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlSWQgPSAnbWVzc2FnZV8nICsgdGhpcy5tZXNzYWdlc1sodGhpcy5tZXNzYWdlcy5sZW5ndGggLSAxKV0uTWVzc2FnZUlEXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdENoYXRIaXN0b3J5KClcclxuICAgICAgICAgICAgdGhpcy5pbml0VGVhY2hlclJlbWFyaygpXHJcbiAgICAgICAgICAgIGlzU3R1SW5Db3Vyc2VHcm91cCh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mby5GbG5rSUQsIHRoaXMuQ291cnNlRklELCB0aGlzLkdyb3VwRklEKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNTdHVJbkdyb3VwID0gcmVzXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNTdHVJbkdyb3VwID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXRDaGF0SGlzdG9yeSgpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkQ2hhdE1zZ0J5UGFnZSgxKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VzID0gW10uY29uY2F0KHJlcylcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9DdXJyZW50TXNnKClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxvYWRDaGF0TXNnQnlQYWdlKHBhZ2VJbmRleCA9IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCB1c2VySWQgPSAnJ1xyXG4gICAgICAgICAgICAgICAgbGV0IFJvbGVOdW0gPSBudWxsXHJcbiAgICAgICAgICAgICAgICBnZXRDaGF0TXNnQnlQYWdlKHRoaXMuR3JvdXBGSUQsIHVzZXJJZCwgUm9sZU51bSwgcGFnZUluZGV4KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5QYWdlQ291bnQgPD0gdGhpcy5jdXJyZW50TXNnc1BhZ2VJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhdmVNb3JlQ2hhdE1zZ3MgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGF2ZU1vcmVDaGF0TXNncyA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxpc3QgPSByZXMuRGF0YVNvdXJjZVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gW11cclxuICAgICAgICAgICAgICAgICAgICBsaXN0LmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtc2dCb2R5ID0gSlNPTi5wYXJzZShpdGVtLk1lc3NhZ2VCb2R5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtc2dCb2R5LmlzU2VsZiA9IG1zZ0JvZHkuRnJvbVVzZXIgPT09IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvLkZsbmtJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnVuc2hpZnQobXNnQm9keSlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSlcclxuICAgICAgICAgICAgICAgIH0sIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXZlTW9yZUNoYXRNc2dzID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChyZXMpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdFRlYWNoZXJSZW1hcmsoKSB7XHJcbiAgICAgICAgICAgIGdldFRlYWNoZXJSZW1hcmtCeUdyb3VwKHRoaXMuR3JvdXBGSUQpLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIHJlcyA9IHJlcyB8fCBbXVxyXG4gICAgICAgICAgICAgICAgcmVzLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5tb2RlbExpc3QuZm9yRWFjaChjYXRlaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGVpdGVtLlJlZmxlY3ROYW1lID0gY2F0ZWl0ZW0uUmVmbGVjdENhdGVnb3J5TmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRlaXRlbS5tb2RlbExpc3QuZm9yRWFjaChzdWJDYXRlSXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJDYXRlSXRlbS5SZWZsZWN0SXRlbU5hbWUgPSBzdWJDYXRlSXRlbS5SZWZsZWN0Q29udGVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViQ2F0ZUl0ZW0uc3R1U3RhclZhbHVlID0gc3ViQ2F0ZUl0ZW0uU3RhclZhbHVlIHx8IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YkNhdGVJdGVtLlN0YXJWYWx1ZSA9IHN1YkNhdGVJdGVtLlRvdGFsU3RhclZhbHVlIC0gc3ViQ2F0ZUl0ZW0uc3R1U3RhclZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbWFya0xpc3QgPSByZXMgfHwgW11cclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSwgcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtYXJrTGlzdCA9IFtdXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkxvYWQob3B0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNUZWFjaGVyID0gKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvLlJvbGVOdW0gKyAnJykgPT09ICcyJ1xyXG4gICAgICAgICAgICB0aGlzLkNvdXJzZUZJRCA9IG9wdGlvbi5jb3Vyc2VJZFxyXG4gICAgICAgICAgICB0aGlzLkdyb3VwRklEID0gb3B0aW9uLmdyb3VwSWRcclxuICAgICAgICAgICAgdGhpcy5pbml0KClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uVW5sb2FkKCkge31cclxuICAgIH1cclxuIl19