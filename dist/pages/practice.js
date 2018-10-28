'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _chatMessage = require('./../components/chatMessage.js');

var _chatMessage2 = _interopRequireDefault(_chatMessage);

var _loading = require('./../components/loading.js');

var _loading2 = _interopRequireDefault(_loading);

var _Message = require('./../model/Message.js');

var _config = require('./../config.js');

var _config2 = _interopRequireDefault(_config);

var _api = require('./../api/index.js');

var _util = require('./../util/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Practice = function (_wepy$page) {
    _inherits(Practice, _wepy$page);

    function Practice() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Practice);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Practice.__proto__ || Object.getPrototypeOf(Practice)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '个性化学习中心'
        }, _this.data = {
            filterConditionVisible: false,
            filterType: 0, // 1:仅显示我的  2：显示老师内容  0: 显示全部
            isTeacher: false,
            haveActiveGroupTask: true,
            userInfo: null,
            arrangeList: [],
            arrangeIndex: 0,
            inputMode: 'TEXT',
            userTextInput: '',
            userTextContent: '',
            // chatHistoryHeight: 'calc(100vh - 250rpx)',
            moreActionShown: false,
            messageId: '',
            userInfoForMsg: {},
            messages: [],
            currentMsgsPageIndex: 1,
            haveMoreChatMsgs: true,
            isFocus: false,
            isLoadingMsg: false,
            unsendMessages: [],
            textareaHeight: 40,
            isScrollToNewEnable: true
        }, _this.$repeat = { "messages": { "com": "chat-message", "props": "msgData.sync" } }, _this.$props = { "chat-message": { "xmlns:v-bind": { "value": "", "for": "messages", "item": "item", "index": "index", "key": "index" }, "v-bind:id.once": { "value": "'message_' + item.MessageID", "for": "messages", "item": "item", "index": "index", "key": "index" }, "v-bind:msgData.sync": { "value": "item", "type": "item", "for": "messages", "item": "item", "index": "index", "key": "index" }, "v-bind:isSelf.once": { "value": "item.isSelf", "for": "messages", "item": "item", "index": "index", "key": "index" }, "v-bind:isShowMore.once": { "value": "item.isShowMore", "for": "messages", "item": "item", "index": "index", "key": "index" } }, "loading": {} }, _this.$events = {}, _this.components = {
            'chat-message': _chatMessage2.default,
            'loading': _loading2.default
        }, _this.computed = {
            chatHistoryHeight: function chatHistoryHeight() {
                return this.moreActionShown ? 'calc(100vh - 410rpx - ' + this.textareaHeight + 'rpx)' : 'calc(100vh - 210rpx - ' + this.textareaHeight + 'rpx)';
            },
            btnToolHeight: function btnToolHeight() {
                return this.textareaHeight + 48 + 'rpx';
            }
        }, _this.methods = {
            arrangeStepChange: function arrangeStepChange(e) {
                this.arrangeIndex = +e.detail.value;
            },
            onInputText: function onInputText(e) {
                console.log('input', e.detail.value);
                this.userTextInput = e.detail.value;
            },
            toggleFilterCondition: function toggleFilterCondition() {
                this.filterConditionVisible = !this.filterConditionVisible;
                this.$apply();
            },
            filtChatHistory: function filtChatHistory(param) {
                if (param === '1') {
                    // 过滤自己的聊天记录
                    this.filterType = 1;
                } else if (param === '2') {
                    // 过滤老师的聊天记录
                    this.filterType = 2;
                } else {
                    // 显示全部内容
                    this.filterType = 0;
                }
                this.filterConditionVisible = false;
                this.initChatHistory();
            },
            setInputMode: function setInputMode() {
                if (this.inputMode === 'TEXT') {
                    this.inputMode = 'AUDIO';
                } else {
                    this.inputMode = 'TEXT';
                }
            },
            sendTextMsg: function sendTextMsg() {
                var _this2 = this;

                // 发送文字消息
                this.sendCommonMsg('1', this.userTextInput).then(function (res) {
                    _this2.userTextInput = '';
                    _this2.userTextContent = ' ';
                    _this2.textareaHeight = 40;
                    setTimeout(function () {
                        _this2.userTextContent = '';
                    }, 0);
                    _this2.$apply();
                });
            },
            showMoreActions: function showMoreActions() {
                // 显示更多操作
                this.moreActionShown = !this.moreActionShown;
                // this.chatHistoryHeight = this.moreActionShown ? 'calc(100vh - 450rpx)' : 'calc(100vh - 250rpx)'
            },
            uploadPic: function uploadPic() {
                var that = this;
                _wepy2.default.chooseImage({
                    count: 4,
                    success: function success(res) {
                        res.tempFilePaths.forEach(function (item) {
                            (0, _api.uploadFile)(item, {
                                FileType: 2,
                                userFID: that.$parent.globalData.userInfo.FlnkID
                            }).then(function (res) {
                                that.sendCommonMsg('2', res.FileLink, res.FileId);
                            }, function (res) {
                                _wepy2.default.showToast({
                                    title: '发送失败',
                                    icon: 'none'
                                });
                            });
                        });
                    }
                });
            },
            takePhoto: function takePhoto() {
                var that = this;
                _wepy2.default.chooseVideo({
                    sourceType: ['album', 'camera'],
                    maxDuration: 60,
                    camera: 'back',
                    success: function success(res) {
                        console.log('success:', res);
                        if (res.duration > 60) {
                            _wepy2.default.showToast({
                                title: '视频不能超过1分钟',
                                icon: 'none'
                            });
                            return;
                        }
                        var path = res.tempFilePath;
                        _wepy2.default.showLoading({ title: '正在上传' });
                        (0, _api.uploadFile)(path, {
                            FileType: 3,
                            userFID: that.$parent.globalData.userInfo.FlnkID
                        }).then(function (res) {
                            _wepy2.default.hideLoading();
                            that.sendCommonMsg('3', res.FileLink, res.FileId);
                        }, function (res) {
                            _wepy2.default.hideLoading();
                            _wepy2.default.showToast({
                                title: '发送失败',
                                icon: 'none'
                            });
                        });
                    },
                    fail: function fail(res) {
                        console.log('fail:', res);
                        console.error(res);
                    }
                });
            },
            startRecordAudio: function startRecordAudio() {
                var that = this;
                var recorderManager = _wepy2.default.getRecorderManager();
                recorderManager.onStop(function (res) {
                    var path = res.tempFilePath;
                    (0, _api.uploadFile)(path, {
                        FileType: 4,
                        userFID: that.$parent.globalData.userInfo.FlnkID
                    }).then(function (res) {
                        that.sendCommonMsg('4', res.FileLink, res.FileId);
                    }, function (res) {
                        _wepy2.default.showToast({
                            title: '发送失败',
                            icon: 'none'
                        });
                    });
                });
                recorderManager.onError(function (res) {
                    _wepy2.default.showToast({
                        title: '发送失败',
                        icon: 'none'
                    });
                });
                var options = {
                    duration: 600000,
                    sampleRate: 44100,
                    numberOfChannels: 1,
                    encodeBitRate: 192000,
                    format: 'mp3'
                };
                recorderManager.start(options);
            },
            stopRecordAudio: function stopRecordAudio() {
                var recorderManager = _wepy2.default.getRecorderManager();
                recorderManager.stop();
            },
            hideChatMsgMore: function hideChatMsgMore() {
                this.messages.forEach(function (item) {
                    item.isShowMore = false;
                });
                this.$apply();
            },
            hideActionBtns: function hideActionBtns() {
                this.moreActionShown = false;
                this.filterConditionVisible = false;
                this.chatHistoryHeight = 'calc(100vh - 250rpx)';
                this.$apply();
            },
            onScrollUpper: function onScrollUpper(e) {
                var _this3 = this;

                // 向上滚动，加载更多数据
                if (this.haveMoreChatMsgs) {
                    this.currentMsgsPageIndex++;
                    this.loadChatMsgByPage(this.currentMsgsPageIndex).then(function (res) {
                        var lastMessageId = _this3.messages[0].MessageID;
                        _this3.messages = res.concat(_this3.messages);
                        _this3.messageId = 'message_' + lastMessageId;
                        _this3.$apply();
                    });
                }
            },
            onChatScroll: function onChatScroll(e) {
                if (e.detail.scrollHeight - e.detail.scrollTop > 800) {
                    this.isScrollToNewEnable = false;
                } else {
                    this.isScrollToNewEnable = true;
                }
            },
            onDeleteMsg: function onDeleteMsg(data) {
                console.log(data);
            },
            focusTextArea: function focusTextArea() {
                this.isFocus = true;
                this.$apply();
            },
            cancelFocus: function cancelFocus(e) {
                this.isFocus = false;
                this.$apply();
            },
            inputLineChange: function inputLineChange(e) {
                if (e.detail.lineCount <= 5) {
                    this.textareaHeight = e.detail.heightRpx;
                    this.$apply();
                }
            }
        }, _this.events = {
            'hide-other-actions': function hideOtherActions(e) {
                console.log(e);
                this.messages.forEach(function (item) {
                    item.isShowMore = item.MessageID === e.MessageID;
                });
                this.$apply();
            },
            'delete-msg': function deleteMsg(e) {
                var _this4 = this;

                if (e.FromUser === this.$parent.globalData.userInfo.FlnkID) {
                    (0, _api.deleteChatMsg)(e.MessageID, e.FromUser).then(function (res) {
                        var index = _this4.messages.findIndex(function (item) {
                            return item.MessageID === e.MessageID;
                        });
                        _this4.messages.splice(index, 1);
                        _this4.$apply();
                    });
                } else {
                    _wepy2.default.showToast({
                        title: '不可删除',
                        icon: 'none'
                    });
                }
            },
            'preview-image': function previewImage(e) {
                this.$parent.setGlobalData('isPreviewImg', true);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Practice, [{
        key: 'sendCommonMsg',
        value: function sendCommonMsg(msgtype, msgcontent, fileId) {
            var stepInfo = {};
            var self = this;
            if (this.arrangeIndex > 0) {
                // 如果选择了步骤，需要提交步骤信息
                stepInfo = this.arrangeList[this.arrangeIndex];
            }
            var msg = new _Message.Message(this.userInfoForMsg, {
                msgtype: msgtype || '1',
                msgcontent: msgcontent,
                msgkey: fileId || '',
                stepkey: stepInfo.FlnkID || '',
                stepcode: stepInfo.SortCode || '',
                stepname: stepInfo.ArrangeName || ''
            });
            return new Promise(function (resolve, reject) {
                _wepy2.default.sendSocketMessage({
                    data: JSON.stringify(msg),
                    success: function success(res) {
                        self.arrangeIndex = 0;
                        self.$apply();
                        resolve(res);
                    },
                    fail: function fail(res) {
                        self.unsendMessages.push({
                            msgtype: msgtype || '1',
                            msgcontent: msgcontent,
                            msgkey: fileId || ''
                        });
                        self.startSocket(true);
                        reject(res);
                    }
                });
            });
        }
    }, {
        key: 'scrollToCurrentMsg',
        value: function scrollToCurrentMsg() {
            this.messageId = 'message_' + this.messages[this.messages.length - 1].MessageID;
            this.$apply();
        }
    }, {
        key: 'init',
        value: function init() {
            var activeTaskInfo = _wepy2.default.getStorageSync('activeTaskInfo');
            this.haveActiveGroupTask = !!activeTaskInfo;
            if (this.haveActiveGroupTask) {
                // 如果有激活的小组任务，则连接WebSocket
                this.initSteps(activeTaskInfo);
                this.initChatHistory();
                this.userInfoForMsg = {
                    userId: this.$parent.globalData.userInfo.FlnkID,
                    userName: this.$parent.globalData.userInfo.XM,
                    RoleNum: this.$parent.globalData.userInfo.RoleNum,
                    AvatarUrl: this.$parent.globalData.wxUserInfo.avatarUrl,
                    groupId: activeTaskInfo.GroupFID
                };
                this.startSocket();
            }
        }
    }, {
        key: 'initSteps',
        value: function initSteps(activeTaskInfo) {
            var _this5 = this;

            (0, _api.getCourseArrangeList)(activeTaskInfo.CourseFID, activeTaskInfo.GroupFID).then(function (res) {
                // 需求修改：如果是客观型的内容则展示子步骤名称，否则展示父步骤
                var list = res;
                var result = [{
                    showArrangeName: '不提交步骤',
                    FlnkID: '',
                    pFlnkID: '',
                    pSortCode: ''
                }];
                list.forEach(function (item) {
                    if (item.modelList[0] && item.modelList[0].ArrangeType === 1) {
                        item.modelList.forEach(function (model) {
                            if (model.ArrangeType === 1 && model.IsCheck) {
                                result.push({
                                    showArrangeName: '\u6B65\u9AA4' + item.SortCode + '.' + model.SortCode + ' : ' + model.ArrangeContent,
                                    ArrangeName: model.ArrangeContent,
                                    FlnkID: model.FlnkID,
                                    pFlnkID: item.FlnkID,
                                    pSortCode: item.SortCode,
                                    SortCode: item.SortCode + '.' + model.SortCode
                                });
                            }
                        });
                    } else {
                        result.push({
                            showArrangeName: '\u6B65\u9AA4' + item.SortCode + ':' + item.ArrangeName,
                            ArrangeName: item.ArrangeName,
                            FlnkID: item.modelList[0].FlnkID,
                            pFlnkID: item.FlnkID,
                            pSortCode: item.SortCode,
                            SortCode: item.SortCode
                        });
                    }
                });
                _this5.arrangeList = result;
                _this5.$apply();
            });
        }
    }, {
        key: 'initChatHistory',
        value: function initChatHistory() {
            var _this6 = this;

            this.currentMsgsPageIndex = 1;
            this.haveMoreChatMsgs = true;
            this.loadChatMsgByPage(1).then(function (res) {
                _this6.messages = [].concat(res);
                _this6.$apply();
                _this6.scrollToCurrentMsg();
            });
        }
    }, {
        key: 'loadChatMsgByPage',
        value: function loadChatMsgByPage() {
            var _this7 = this;

            var pageIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            this.isLoadingMsg = true;
            var activeTaskInfo = _wepy2.default.getStorageSync('activeTaskInfo');
            return new Promise(function (resolve, reject) {
                var userId = '';
                var RoleNum = null;
                if (_this7.filterType === 1) {
                    userId = _this7.$parent.globalData.userInfo.FlnkID;
                } else if (_this7.filterType === 2) {
                    RoleNum = 2;
                }
                (0, _api.getChatMsgByPage)(activeTaskInfo.GroupFID, userId, RoleNum, pageIndex).then(function (res) {
                    if (res.PageCount <= _this7.currentMsgsPageIndex) {
                        _this7.haveMoreChatMsgs = false;
                    } else {
                        _this7.haveMoreChatMsgs = true;
                    }
                    var list = res.DataSource;
                    var data = [];
                    list.forEach(function (item) {
                        var msgBody = JSON.parse(item.MessageBody);
                        msgBody.isSelf = msgBody.FromUser === _this7.$parent.globalData.userInfo.FlnkID;
                        msgBody.showSendTime = (0, _util.getMessageSendTime)(item.SendTime + '+0800');
                        data.unshift(msgBody);
                    });
                    _this7.isLoadingMsg = false;
                    resolve(data);
                }, function (res) {
                    _this7.isLoadingMsg = false;
                    _this7.haveMoreChatMsgs = true;
                    reject(res);
                });
            });
        }
    }, {
        key: 'startSocket',
        value: function startSocket(force) {
            var _this8 = this;

            if (force) {
                this.$parent.setGlobalData('isInitSocket', false);
            }
            if (this.$parent.globalData.isInitSocket) {
                return;
            } else {
                this.$parent.setGlobalData('isInitSocket', true);
            }
            var self = this;
            _wepy2.default.connectSocket({
                url: _config2.default.socketServerUrl,
                success: function success(res) {
                    console.log('连接成功');
                },
                fail: function fail(res) {
                    console.error('连接失败');
                }
            });
            _wepy2.default.onSocketOpen(function (res) {
                // 加入群聊
                var registerInfo = new _Message.Message(_this8.userInfoForMsg, {}, 0);
                _wepy2.default.sendSocketMessage({
                    data: JSON.stringify(registerInfo),
                    success: function success(res) {
                        console.log('进入房间成功！');
                        if (self.unsendMessages && self.unsendMessages.length > 0) {
                            self.unsendMessages.forEach(function (item) {
                                self.sendCommonMsg(item.msgtype, item.msgcontent, item.msgkey).then(function (res) {
                                    self.userTextInput = '';
                                    self.userTextContent = '';
                                    self.textareaHeight = 40;
                                    self.$apply();
                                });
                            });
                            self.unsendMessages = [];
                            self.$apply();
                        }
                    },
                    fail: function fail() {
                        console.log('进入房间失败！');
                    }
                });
                _wepy2.default.onSocketMessage(function (res) {
                    var data = JSON.parse(res.data);
                    data.isSelf = data.FromUser === _this8.$parent.globalData.userInfo.FlnkID;
                    data.showSendTime = (0, _util.getMessageSendTime)(data.MessageTime);
                    _this8.messages.push(data);
                    _this8.$apply();
                    if (data.isSelf || _this8.isScrollToNewEnable) {
                        _this8.scrollToCurrentMsg();
                    }
                    var pageStack = _wepy2.default.getCurrentPages();
                    if (pageStack[pageStack.length - 1].route !== 'pages/practice') {
                        _wepy2.default.showTabBarRedDot({
                            index: 1
                        });
                    }
                });
            });
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            var self = this;
            _wepy2.default.hideTabBarRedDot({
                index: 1
            });
            this.$parent.getUserInfo().then(function (res) {
                self.userInfo = res;
            });
            this.isTeacher = this.$parent.globalData.userInfo.RoleNum + '' === '2';
            if (this.$parent.globalData.isPreviewImg) {
                this.$parent.setGlobalData('isPreviewImg', false);
                return;
            }
            this.init();
        }
    }, {
        key: 'onUnload',
        value: function onUnload() {
            this.$parent.setGlobalData('isInitSocket', false);
            console.log('页面卸载');
            _wepy2.default.closeSocket({
                success: function success() {
                    console.log('断开socket成功');
                }
            });
        }
    }]);

    return Practice;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Practice , 'pages/practice'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByYWN0aWNlLmpzIl0sIm5hbWVzIjpbIlByYWN0aWNlIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJmaWx0ZXJDb25kaXRpb25WaXNpYmxlIiwiZmlsdGVyVHlwZSIsImlzVGVhY2hlciIsImhhdmVBY3RpdmVHcm91cFRhc2siLCJ1c2VySW5mbyIsImFycmFuZ2VMaXN0IiwiYXJyYW5nZUluZGV4IiwiaW5wdXRNb2RlIiwidXNlclRleHRJbnB1dCIsInVzZXJUZXh0Q29udGVudCIsIm1vcmVBY3Rpb25TaG93biIsIm1lc3NhZ2VJZCIsInVzZXJJbmZvRm9yTXNnIiwibWVzc2FnZXMiLCJjdXJyZW50TXNnc1BhZ2VJbmRleCIsImhhdmVNb3JlQ2hhdE1zZ3MiLCJpc0ZvY3VzIiwiaXNMb2FkaW5nTXNnIiwidW5zZW5kTWVzc2FnZXMiLCJ0ZXh0YXJlYUhlaWdodCIsImlzU2Nyb2xsVG9OZXdFbmFibGUiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb21wdXRlZCIsImNoYXRIaXN0b3J5SGVpZ2h0IiwiYnRuVG9vbEhlaWdodCIsIm1ldGhvZHMiLCJhcnJhbmdlU3RlcENoYW5nZSIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsIm9uSW5wdXRUZXh0IiwiY29uc29sZSIsImxvZyIsInRvZ2dsZUZpbHRlckNvbmRpdGlvbiIsIiRhcHBseSIsImZpbHRDaGF0SGlzdG9yeSIsInBhcmFtIiwiaW5pdENoYXRIaXN0b3J5Iiwic2V0SW5wdXRNb2RlIiwic2VuZFRleHRNc2ciLCJzZW5kQ29tbW9uTXNnIiwidGhlbiIsInNldFRpbWVvdXQiLCJzaG93TW9yZUFjdGlvbnMiLCJ1cGxvYWRQaWMiLCJ0aGF0IiwiY2hvb3NlSW1hZ2UiLCJjb3VudCIsInN1Y2Nlc3MiLCJyZXMiLCJ0ZW1wRmlsZVBhdGhzIiwiZm9yRWFjaCIsIml0ZW0iLCJGaWxlVHlwZSIsInVzZXJGSUQiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsIkZsbmtJRCIsIkZpbGVMaW5rIiwiRmlsZUlkIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwidGFrZVBob3RvIiwiY2hvb3NlVmlkZW8iLCJzb3VyY2VUeXBlIiwibWF4RHVyYXRpb24iLCJjYW1lcmEiLCJkdXJhdGlvbiIsInBhdGgiLCJ0ZW1wRmlsZVBhdGgiLCJzaG93TG9hZGluZyIsImhpZGVMb2FkaW5nIiwiZmFpbCIsImVycm9yIiwic3RhcnRSZWNvcmRBdWRpbyIsInJlY29yZGVyTWFuYWdlciIsImdldFJlY29yZGVyTWFuYWdlciIsIm9uU3RvcCIsIm9uRXJyb3IiLCJvcHRpb25zIiwic2FtcGxlUmF0ZSIsIm51bWJlck9mQ2hhbm5lbHMiLCJlbmNvZGVCaXRSYXRlIiwiZm9ybWF0Iiwic3RhcnQiLCJzdG9wUmVjb3JkQXVkaW8iLCJzdG9wIiwiaGlkZUNoYXRNc2dNb3JlIiwiaXNTaG93TW9yZSIsImhpZGVBY3Rpb25CdG5zIiwib25TY3JvbGxVcHBlciIsImxvYWRDaGF0TXNnQnlQYWdlIiwibGFzdE1lc3NhZ2VJZCIsIk1lc3NhZ2VJRCIsImNvbmNhdCIsIm9uQ2hhdFNjcm9sbCIsInNjcm9sbEhlaWdodCIsInNjcm9sbFRvcCIsIm9uRGVsZXRlTXNnIiwiZm9jdXNUZXh0QXJlYSIsImNhbmNlbEZvY3VzIiwiaW5wdXRMaW5lQ2hhbmdlIiwibGluZUNvdW50IiwiaGVpZ2h0UnB4IiwiZXZlbnRzIiwiRnJvbVVzZXIiLCJpbmRleCIsImZpbmRJbmRleCIsInNwbGljZSIsInNldEdsb2JhbERhdGEiLCJtc2d0eXBlIiwibXNnY29udGVudCIsImZpbGVJZCIsInN0ZXBJbmZvIiwic2VsZiIsIm1zZyIsIm1zZ2tleSIsInN0ZXBrZXkiLCJzdGVwY29kZSIsIlNvcnRDb2RlIiwic3RlcG5hbWUiLCJBcnJhbmdlTmFtZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic2VuZFNvY2tldE1lc3NhZ2UiLCJKU09OIiwic3RyaW5naWZ5IiwicHVzaCIsInN0YXJ0U29ja2V0IiwibGVuZ3RoIiwiYWN0aXZlVGFza0luZm8iLCJnZXRTdG9yYWdlU3luYyIsImluaXRTdGVwcyIsInVzZXJJZCIsInVzZXJOYW1lIiwiWE0iLCJSb2xlTnVtIiwiQXZhdGFyVXJsIiwid3hVc2VySW5mbyIsImF2YXRhclVybCIsImdyb3VwSWQiLCJHcm91cEZJRCIsIkNvdXJzZUZJRCIsImxpc3QiLCJyZXN1bHQiLCJzaG93QXJyYW5nZU5hbWUiLCJwRmxua0lEIiwicFNvcnRDb2RlIiwibW9kZWxMaXN0IiwiQXJyYW5nZVR5cGUiLCJtb2RlbCIsIklzQ2hlY2siLCJBcnJhbmdlQ29udGVudCIsInNjcm9sbFRvQ3VycmVudE1zZyIsInBhZ2VJbmRleCIsIlBhZ2VDb3VudCIsIkRhdGFTb3VyY2UiLCJtc2dCb2R5IiwicGFyc2UiLCJNZXNzYWdlQm9keSIsImlzU2VsZiIsInNob3dTZW5kVGltZSIsIlNlbmRUaW1lIiwidW5zaGlmdCIsImZvcmNlIiwiaXNJbml0U29ja2V0IiwiY29ubmVjdFNvY2tldCIsInVybCIsInNvY2tldFNlcnZlclVybCIsIm9uU29ja2V0T3BlbiIsInJlZ2lzdGVySW5mbyIsIm9uU29ja2V0TWVzc2FnZSIsIk1lc3NhZ2VUaW1lIiwicGFnZVN0YWNrIiwiZ2V0Q3VycmVudFBhZ2VzIiwicm91dGUiLCJzaG93VGFiQmFyUmVkRG90IiwiaGlkZVRhYkJhclJlZERvdCIsImdldFVzZXJJbmZvIiwiaXNQcmV2aWV3SW1nIiwiaW5pdCIsImNsb3NlU29ja2V0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0k7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7Ozs7Ozs7OExBQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFJVEMsSSxHQUFPO0FBQ0hDLG9DQUF3QixLQURyQjtBQUVIQyx3QkFBWSxDQUZULEVBRWU7QUFDbEJDLHVCQUFXLEtBSFI7QUFJSEMsaUNBQXFCLElBSmxCO0FB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Z0MsVUFBQ1EsR0FBRCxFQUFTO0FBQ3JDa0UscUJBQUtsSCxRQUFMLEdBQWdCZ0QsR0FBaEI7QUFDSCxhQUZEO0FBR0EsaUJBQUtsRCxTQUFMLEdBQWtCLEtBQUt3RCxPQUFMLENBQWFDLFVBQWIsQ0FBd0J2RCxRQUF4QixDQUFpQ3lJLE9BQWpDLEdBQTJDLEVBQTVDLEtBQW9ELEdBQXJFO0FBQ0EsZ0JBQUksS0FBS25GLE9BQUwsQ0FBYUMsVUFBYixDQUF3QjZILFlBQTVCLEVBQTBDO0FBQ3RDLHFCQUFLOUgsT0FBTCxDQUFhdUQsYUFBYixDQUEyQixjQUEzQixFQUEyQyxLQUEzQztBQUNBO0FBQ0g7QUFDRCxpQkFBS3dFLElBQUw7QUFDSDs7O21DQUVVO0FBQ1AsaUJBQUsvSCxPQUFMLENBQWF1RCxhQUFiLENBQTJCLGNBQTNCLEVBQTJDLEtBQTNDO0FBQ0EvRSxvQkFBUUMsR0FBUixDQUFZLE1BQVo7QUFDQSwyQkFBS3VKLFdBQUwsQ0FBaUI7QUFDYnZJLHVCQURhLHFCQUNIO0FBQ05qQiw0QkFBUUMsR0FBUixDQUFZLFlBQVo7QUFDSDtBQUhZLGFBQWpCO0FBS0g7Ozs7RUFwZmlDLGVBQUt3SixJOztrQkFBdEIvTCxRIiwiZmlsZSI6InByYWN0aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gICAgaW1wb3J0IGNoYXRNZXNzYWdlIGZyb20gJy4uL2NvbXBvbmVudHMvY2hhdE1lc3NhZ2UnXHJcbiAgICBpbXBvcnQgbG9hZGluZyBmcm9tICcuLi9jb21wb25lbnRzL2xvYWRpbmcnXHJcbiAgICBpbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSAnLi4vbW9kZWwvTWVzc2FnZSdcclxuICAgIGltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJ1xyXG5cclxuICAgIGltcG9ydCB7Z2V0Q291cnNlQXJyYW5nZUxpc3QsIHVwbG9hZEZpbGUsIGdldENoYXRNc2dCeVBhZ2UsIGRlbGV0ZUNoYXRNc2d9IGZyb20gJy4uL2FwaSdcclxuICAgIGltcG9ydCB7Z2V0TWVzc2FnZVNlbmRUaW1lfSBmcm9tICcuLi91dGlsJ1xyXG5cclxuICAgIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFByYWN0aWNlIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgICAgICBjb25maWcgPSB7XHJcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkuKrmgKfljJblrabkuaDkuK3lv4MnXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkYXRhID0ge1xyXG4gICAgICAgICAgICBmaWx0ZXJDb25kaXRpb25WaXNpYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgZmlsdGVyVHlwZTogMCwgICAgLy8gMTrku4XmmL7npLrmiJHnmoQgIDLvvJrmmL7npLrogIHluIjlhoXlrrkgIDA6IOaYvuekuuWFqOmDqFxyXG4gICAgICAgICAgICBpc1RlYWNoZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICBoYXZlQWN0aXZlR3JvdXBUYXNrOiB0cnVlLFxyXG4gICAgICAgICAgICB1c2VySW5mbzogbnVsbCxcclxuICAgICAgICAgICAgYXJyYW5nZUxpc3Q6IFtdLFxyXG4gICAgICAgICAgICBhcnJhbmdlSW5kZXg6IDAsXHJcbiAgICAgICAgICAgIGlucHV0TW9kZTogJ1RFWFQnLFxyXG4gICAgICAgICAgICB1c2VyVGV4dElucHV0OiAnJyxcclxuICAgICAgICAgICAgdXNlclRleHRDb250ZW50OiAnJyxcclxuICAgICAgICAgICAgLy8gY2hhdEhpc3RvcnlIZWlnaHQ6ICdjYWxjKDEwMHZoIC0gMjUwcnB4KScsXHJcbiAgICAgICAgICAgIG1vcmVBY3Rpb25TaG93bjogZmFsc2UsXHJcbiAgICAgICAgICAgIG1lc3NhZ2VJZDogJycsXHJcbiAgICAgICAgICAgIHVzZXJJbmZvRm9yTXNnOiB7fSxcclxuICAgICAgICAgICAgbWVzc2FnZXM6IFtdLFxyXG4gICAgICAgICAgICBjdXJyZW50TXNnc1BhZ2VJbmRleDogMSxcclxuICAgICAgICAgICAgaGF2ZU1vcmVDaGF0TXNnczogdHJ1ZSxcclxuICAgICAgICAgICAgaXNGb2N1czogZmFsc2UsXHJcbiAgICAgICAgICAgIGlzTG9hZGluZ01zZzogZmFsc2UsXHJcbiAgICAgICAgICAgIHVuc2VuZE1lc3NhZ2VzOiBbXSxcclxuICAgICAgICAgICAgdGV4dGFyZWFIZWlnaHQ6IDQwLFxyXG4gICAgICAgICAgICBpc1Njcm9sbFRvTmV3RW5hYmxlOiB0cnVlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICRyZXBlYXQgPSB7XCJtZXNzYWdlc1wiOntcImNvbVwiOlwiY2hhdC1tZXNzYWdlXCIsXCJwcm9wc1wiOlwibXNnRGF0YS5zeW5jXCJ9fTtcclxuJHByb3BzID0ge1wiY2hhdC1tZXNzYWdlXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJtZXNzYWdlc1wiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOmlkLm9uY2VcIjp7XCJ2YWx1ZVwiOlwiJ21lc3NhZ2VfJyArIGl0ZW0uTWVzc2FnZUlEXCIsXCJmb3JcIjpcIm1lc3NhZ2VzXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6bXNnRGF0YS5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW1cIixcInR5cGVcIjpcIml0ZW1cIixcImZvclwiOlwibWVzc2FnZXNcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDppc1NlbGYub25jZVwiOntcInZhbHVlXCI6XCJpdGVtLmlzU2VsZlwiLFwiZm9yXCI6XCJtZXNzYWdlc1wiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOmlzU2hvd01vcmUub25jZVwiOntcInZhbHVlXCI6XCJpdGVtLmlzU2hvd01vcmVcIixcImZvclwiOlwibWVzc2FnZXNcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifX0sXCJsb2FkaW5nXCI6e319O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICAgICAgICAnY2hhdC1tZXNzYWdlJzogY2hhdE1lc3NhZ2UsXHJcbiAgICAgICAgICAgICdsb2FkaW5nJzogbG9hZGluZ1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29tcHV0ZWQgPSB7XHJcbiAgICAgICAgICAgIGNoYXRIaXN0b3J5SGVpZ2h0KCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9yZUFjdGlvblNob3duID8gYGNhbGMoMTAwdmggLSA0MTBycHggLSAke3RoaXMudGV4dGFyZWFIZWlnaHR9cnB4KWAgOiBgY2FsYygxMDB2aCAtIDIxMHJweCAtICR7dGhpcy50ZXh0YXJlYUhlaWdodH1ycHgpYFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBidG5Ub29sSGVpZ2h0KCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLnRleHRhcmVhSGVpZ2h0ICsgNDgpICsgJ3JweCdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbWV0aG9kcyA9IHtcclxuICAgICAgICAgICAgYXJyYW5nZVN0ZXBDaGFuZ2UoZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnJhbmdlSW5kZXggPSArZS5kZXRhaWwudmFsdWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25JbnB1dFRleHQoZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2lucHV0JywgZS5kZXRhaWwudmFsdWUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJUZXh0SW5wdXQgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0b2dnbGVGaWx0ZXJDb25kaXRpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlckNvbmRpdGlvblZpc2libGUgPSAhdGhpcy5maWx0ZXJDb25kaXRpb25WaXNpYmxlXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZpbHRDaGF0SGlzdG9yeShwYXJhbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtID09PSAnMScpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDov4fmu6Toh6rlt7HnmoTogYrlpKnorrDlvZVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclR5cGUgPSAxXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtID09PSAnMicpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDov4fmu6TogIHluIjnmoTogYrlpKnorrDlvZVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclR5cGUgPSAyXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOaYvuekuuWFqOmDqOWGheWuuVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyVHlwZSA9IDBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyQ29uZGl0aW9uVmlzaWJsZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRDaGF0SGlzdG9yeSgpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldElucHV0TW9kZSgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlucHV0TW9kZSA9PT0gJ1RFWFQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dE1vZGUgPSAnQVVESU8nXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRNb2RlID0gJ1RFWFQnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNlbmRUZXh0TXNnKCkge1xyXG4gICAgICAgICAgICAgICAgLy8g5Y+R6YCB5paH5a2X5raI5oGvXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmRDb21tb25Nc2coJzEnLCB0aGlzLnVzZXJUZXh0SW5wdXQpLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJUZXh0SW5wdXQgPSAnJ1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXNlclRleHRDb250ZW50ID0gJyAnXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0YXJlYUhlaWdodCA9IDQwXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXNlclRleHRDb250ZW50ID0gJydcclxuICAgICAgICAgICAgICAgICAgICB9LCAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNob3dNb3JlQWN0aW9ucygpIHtcclxuICAgICAgICAgICAgICAgIC8vIOaYvuekuuabtOWkmuaTjeS9nFxyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3JlQWN0aW9uU2hvd24gPSAhdGhpcy5tb3JlQWN0aW9uU2hvd25cclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuY2hhdEhpc3RvcnlIZWlnaHQgPSB0aGlzLm1vcmVBY3Rpb25TaG93biA/ICdjYWxjKDEwMHZoIC0gNDUwcnB4KScgOiAnY2FsYygxMDB2aCAtIDI1MHJweCknXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVwbG9hZFBpYygpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpc1xyXG4gICAgICAgICAgICAgICAgd2VweS5jaG9vc2VJbWFnZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQ6IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnRlbXBGaWxlUGF0aHMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwbG9hZEZpbGUoaXRlbSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZpbGVUeXBlOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJGSUQ6IHRoYXQuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvLkZsbmtJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2VuZENvbW1vbk1zZygnMicsIHJlcy5GaWxlTGluaywgcmVzLkZpbGVJZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5Y+R6YCB5aSx6LSlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGFrZVBob3RvKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzXHJcbiAgICAgICAgICAgICAgICB3ZXB5LmNob29zZVZpZGVvKHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2VUeXBlOiBbJ2FsYnVtJywgJ2NhbWVyYSddLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heER1cmF0aW9uOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICBjYW1lcmE6ICdiYWNrJyxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc3VjY2VzczonLCByZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZHVyYXRpb24gPiA2MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn6KeG6aKR5LiN6IO96LaF6L+HMeWIhumSnycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBhdGggPSByZXMudGVtcEZpbGVQYXRoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe3RpdGxlOiAn5q2j5Zyo5LiK5LygJ30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwbG9hZEZpbGUocGF0aCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRmlsZVR5cGU6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyRklEOiB0aGF0LiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mby5GbG5rSURcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNlbmRDb21tb25Nc2coJzMnLCByZXMuRmlsZUxpbmssIHJlcy5GaWxlSWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5Y+R6YCB5aSx6LSlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBmYWlsKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZmFpbDonLCByZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN0YXJ0UmVjb3JkQXVkaW8oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXNcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlY29yZGVyTWFuYWdlciA9IHdlcHkuZ2V0UmVjb3JkZXJNYW5hZ2VyKClcclxuICAgICAgICAgICAgICAgIHJlY29yZGVyTWFuYWdlci5vblN0b3AoKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXRoID0gcmVzLnRlbXBGaWxlUGF0aFxyXG4gICAgICAgICAgICAgICAgICAgIHVwbG9hZEZpbGUocGF0aCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBGaWxlVHlwZTogNCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlckZJRDogdGhhdC4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8uRmxua0lEXHJcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNlbmRDb21tb25Nc2coJzQnLCByZXMuRmlsZUxpbmssIHJlcy5GaWxlSWQpXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+WPkemAgeWksei0pScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHJlY29yZGVyTWFuYWdlci5vbkVycm9yKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+WPkemAgeWksei0pScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogNjAwMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNhbXBsZVJhdGU6IDQ0MTAwLFxyXG4gICAgICAgICAgICAgICAgICAgIG51bWJlck9mQ2hhbm5lbHM6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5jb2RlQml0UmF0ZTogMTkyMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdDogJ21wMydcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlY29yZGVyTWFuYWdlci5zdGFydChvcHRpb25zKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdG9wUmVjb3JkQXVkaW8oKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZWNvcmRlck1hbmFnZXIgPSB3ZXB5LmdldFJlY29yZGVyTWFuYWdlcigpXHJcbiAgICAgICAgICAgICAgICByZWNvcmRlck1hbmFnZXIuc3RvcCgpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhpZGVDaGF0TXNnTW9yZSgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmlzU2hvd01vcmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGlkZUFjdGlvbkJ0bnMoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vcmVBY3Rpb25TaG93biA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlckNvbmRpdGlvblZpc2libGUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGF0SGlzdG9yeUhlaWdodCA9ICdjYWxjKDEwMHZoIC0gMjUwcnB4KSdcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25TY3JvbGxVcHBlcihlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDlkJHkuIrmu5rliqjvvIzliqDovb3mm7TlpJrmlbDmja5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhhdmVNb3JlQ2hhdE1zZ3MpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRNc2dzUGFnZUluZGV4KytcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRDaGF0TXNnQnlQYWdlKHRoaXMuY3VycmVudE1zZ3NQYWdlSW5kZXgpLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxhc3RNZXNzYWdlSWQgPSB0aGlzLm1lc3NhZ2VzWzBdLk1lc3NhZ2VJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VzID0gcmVzLmNvbmNhdCh0aGlzLm1lc3NhZ2VzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VJZCA9ICdtZXNzYWdlXycgKyBsYXN0TWVzc2FnZUlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbkNoYXRTY3JvbGwoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUuZGV0YWlsLnNjcm9sbEhlaWdodCAtIGUuZGV0YWlsLnNjcm9sbFRvcCA+IDgwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTY3JvbGxUb05ld0VuYWJsZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTY3JvbGxUb05ld0VuYWJsZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25EZWxldGVNc2coZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZm9jdXNUZXh0QXJlYSgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNGb2N1cyA9IHRydWVcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2FuY2VsRm9jdXMoZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0ZvY3VzID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW5wdXRMaW5lQ2hhbmdlKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlLmRldGFpbC5saW5lQ291bnQgPD0gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dGFyZWFIZWlnaHQgPSBlLmRldGFpbC5oZWlnaHRScHhcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV2ZW50cyA9IHtcclxuICAgICAgICAgICAgJ2hpZGUtb3RoZXItYWN0aW9ucyc6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VzLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5pc1Nob3dNb3JlID0gaXRlbS5NZXNzYWdlSUQgPT09IGUuTWVzc2FnZUlEXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAnZGVsZXRlLW1zZyc6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlLkZyb21Vc2VyID09PSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mby5GbG5rSUQpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGVDaGF0TXNnKGUuTWVzc2FnZUlELCBlLkZyb21Vc2VyKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMubWVzc2FnZXMuZmluZEluZGV4KGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uTWVzc2FnZUlEID09PSBlLk1lc3NhZ2VJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VzLnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfkuI3lj6/liKDpmaQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAncHJldmlldy1pbWFnZSc6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5zZXRHbG9iYWxEYXRhKCdpc1ByZXZpZXdJbWcnLCB0cnVlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZW5kQ29tbW9uTXNnKG1zZ3R5cGUsIG1zZ2NvbnRlbnQsIGZpbGVJZCkge1xyXG4gICAgICAgICAgICBsZXQgc3RlcEluZm8gPSB7fVxyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgaWYgKHRoaXMuYXJyYW5nZUluZGV4ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8g5aaC5p6c6YCJ5oup5LqG5q2l6aqk77yM6ZyA6KaB5o+Q5Lqk5q2l6aqk5L+h5oGvXHJcbiAgICAgICAgICAgICAgICBzdGVwSW5mbyA9IHRoaXMuYXJyYW5nZUxpc3RbdGhpcy5hcnJhbmdlSW5kZXhdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG1zZyA9IG5ldyBNZXNzYWdlKHRoaXMudXNlckluZm9Gb3JNc2csIHtcclxuICAgICAgICAgICAgICAgIG1zZ3R5cGU6IG1zZ3R5cGUgfHwgJzEnLFxyXG4gICAgICAgICAgICAgICAgbXNnY29udGVudDogbXNnY29udGVudCxcclxuICAgICAgICAgICAgICAgIG1zZ2tleTogZmlsZUlkIHx8ICcnLFxyXG4gICAgICAgICAgICAgICAgc3RlcGtleTogc3RlcEluZm8uRmxua0lEIHx8ICcnLFxyXG4gICAgICAgICAgICAgICAgc3RlcGNvZGU6IHN0ZXBJbmZvLlNvcnRDb2RlIHx8ICcnLFxyXG4gICAgICAgICAgICAgICAgc3RlcG5hbWU6IHN0ZXBJbmZvLkFycmFuZ2VOYW1lIHx8ICcnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5LnNlbmRTb2NrZXRNZXNzYWdlKHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShtc2cpLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYXJyYW5nZUluZGV4ID0gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmFpbChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi51bnNlbmRNZXNzYWdlcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1zZ3R5cGU6IG1zZ3R5cGUgfHwgJzEnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbXNnY29udGVudDogbXNnY29udGVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1zZ2tleTogZmlsZUlkIHx8ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc3RhcnRTb2NrZXQodHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlcylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2Nyb2xsVG9DdXJyZW50TXNnKCkge1xyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VJZCA9ICdtZXNzYWdlXycgKyB0aGlzLm1lc3NhZ2VzWyh0aGlzLm1lc3NhZ2VzLmxlbmd0aCAtIDEpXS5NZXNzYWdlSURcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpIHtcclxuICAgICAgICAgICAgbGV0IGFjdGl2ZVRhc2tJbmZvID0gd2VweS5nZXRTdG9yYWdlU3luYygnYWN0aXZlVGFza0luZm8nKVxyXG4gICAgICAgICAgICB0aGlzLmhhdmVBY3RpdmVHcm91cFRhc2sgPSAhIWFjdGl2ZVRhc2tJbmZvXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhhdmVBY3RpdmVHcm91cFRhc2spIHtcclxuICAgICAgICAgICAgICAgIC8vIOWmguaenOaciea/gOa0u+eahOWwj+e7hOS7u+WKoe+8jOWImei/nuaOpVdlYlNvY2tldFxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0U3RlcHMoYWN0aXZlVGFza0luZm8pXHJcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRDaGF0SGlzdG9yeSgpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJJbmZvRm9yTXNnID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8uRmxua0lELFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJOYW1lOiB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mby5YTSxcclxuICAgICAgICAgICAgICAgICAgICBSb2xlTnVtOiB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mby5Sb2xlTnVtLFxyXG4gICAgICAgICAgICAgICAgICAgIEF2YXRhclVybDogdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEud3hVc2VySW5mby5hdmF0YXJVcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBJZDogYWN0aXZlVGFza0luZm8uR3JvdXBGSURcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTb2NrZXQoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0U3RlcHMoYWN0aXZlVGFza0luZm8pIHtcclxuICAgICAgICAgICAgZ2V0Q291cnNlQXJyYW5nZUxpc3QoYWN0aXZlVGFza0luZm8uQ291cnNlRklELCBhY3RpdmVUYXNrSW5mby5Hcm91cEZJRCkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8g6ZyA5rGC5L+u5pS577ya5aaC5p6c5piv5a6i6KeC5Z6L55qE5YaF5a655YiZ5bGV56S65a2Q5q2l6aqk5ZCN56ew77yM5ZCm5YiZ5bGV56S654i25q2l6aqkXHJcbiAgICAgICAgICAgICAgICBsZXQgbGlzdCA9IHJlc1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0FycmFuZ2VOYW1lOiAn5LiN5o+Q5Lqk5q2l6aqkJyxcclxuICAgICAgICAgICAgICAgICAgICBGbG5rSUQ6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBGbG5rSUQ6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBTb3J0Q29kZTogJydcclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICBsaXN0LmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ubW9kZWxMaXN0WzBdICYmIGl0ZW0ubW9kZWxMaXN0WzBdLkFycmFuZ2VUeXBlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ubW9kZWxMaXN0LmZvckVhY2gobW9kZWwgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGVsLkFycmFuZ2VUeXBlID09PSAxICYmIG1vZGVsLklzQ2hlY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dBcnJhbmdlTmFtZTogYOatpemqpCR7aXRlbS5Tb3J0Q29kZX0uJHttb2RlbC5Tb3J0Q29kZX0gOiAke21vZGVsLkFycmFuZ2VDb250ZW50fWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFycmFuZ2VOYW1lOiBtb2RlbC5BcnJhbmdlQ29udGVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRmxua0lEOiBtb2RlbC5GbG5rSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBGbG5rSUQ6IGl0ZW0uRmxua0lELFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwU29ydENvZGU6IGl0ZW0uU29ydENvZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNvcnRDb2RlOiBgJHtpdGVtLlNvcnRDb2RlfS4ke21vZGVsLlNvcnRDb2RlfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dBcnJhbmdlTmFtZTogYOatpemqpCR7aXRlbS5Tb3J0Q29kZX06JHtpdGVtLkFycmFuZ2VOYW1lfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBcnJhbmdlTmFtZTogaXRlbS5BcnJhbmdlTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZsbmtJRDogaXRlbS5tb2RlbExpc3RbMF0uRmxua0lELFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcEZsbmtJRDogaXRlbS5GbG5rSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwU29ydENvZGU6IGl0ZW0uU29ydENvZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTb3J0Q29kZTogaXRlbS5Tb3J0Q29kZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFycmFuZ2VMaXN0ID0gcmVzdWx0XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0Q2hhdEhpc3RvcnkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1zZ3NQYWdlSW5kZXggPSAxXHJcbiAgICAgICAgICAgIHRoaXMuaGF2ZU1vcmVDaGF0TXNncyA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5sb2FkQ2hhdE1zZ0J5UGFnZSgxKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VzID0gW10uY29uY2F0KHJlcylcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9DdXJyZW50TXNnKClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxvYWRDaGF0TXNnQnlQYWdlKHBhZ2VJbmRleCA9IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmdNc2cgPSB0cnVlXHJcbiAgICAgICAgICAgIGxldCBhY3RpdmVUYXNrSW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ2FjdGl2ZVRhc2tJbmZvJylcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCB1c2VySWQgPSAnJ1xyXG4gICAgICAgICAgICAgICAgbGV0IFJvbGVOdW0gPSBudWxsXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJUeXBlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8uRmxua0lEXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZmlsdGVyVHlwZSA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIFJvbGVOdW0gPSAyXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBnZXRDaGF0TXNnQnlQYWdlKGFjdGl2ZVRhc2tJbmZvLkdyb3VwRklELCB1c2VySWQsIFJvbGVOdW0sIHBhZ2VJbmRleCkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuUGFnZUNvdW50IDw9IHRoaXMuY3VycmVudE1zZ3NQYWdlSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXZlTW9yZUNoYXRNc2dzID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhdmVNb3JlQ2hhdE1zZ3MgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsaXN0ID0gcmVzLkRhdGFTb3VyY2VcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbXNnQm9keSA9IEpTT04ucGFyc2UoaXRlbS5NZXNzYWdlQm9keSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXNnQm9keS5pc1NlbGYgPSBtc2dCb2R5LkZyb21Vc2VyID09PSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mby5GbG5rSURcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXNnQm9keS5zaG93U2VuZFRpbWUgPSBnZXRNZXNzYWdlU2VuZFRpbWUoaXRlbS5TZW5kVGltZSArICcrMDgwMCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEudW5zaGlmdChtc2dCb2R5KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmdNc2cgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSlcclxuICAgICAgICAgICAgICAgIH0sIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmdNc2cgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGF2ZU1vcmVDaGF0TXNncyA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QocmVzKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXJ0U29ja2V0KGZvcmNlKSB7XHJcbiAgICAgICAgICAgIGlmIChmb3JjZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnNldEdsb2JhbERhdGEoJ2lzSW5pdFNvY2tldCcsIGZhbHNlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5pc0luaXRTb2NrZXQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnNldEdsb2JhbERhdGEoJ2lzSW5pdFNvY2tldCcsIHRydWUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHdlcHkuY29ubmVjdFNvY2tldCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGNvbmZpZy5zb2NrZXRTZXJ2ZXJVcmwsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfov57mjqXmiJDlip8nKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWwocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign6L+e5o6l5aSx6LSlJylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgd2VweS5vblNvY2tldE9wZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8g5Yqg5YWl576k6IGKXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVnaXN0ZXJJbmZvID0gbmV3IE1lc3NhZ2UodGhpcy51c2VySW5mb0Zvck1zZywge30sIDApXHJcbiAgICAgICAgICAgICAgICB3ZXB5LnNlbmRTb2NrZXRNZXNzYWdlKHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShyZWdpc3RlckluZm8pLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfov5vlhaXmiL/pl7TmiJDlip/vvIEnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi51bnNlbmRNZXNzYWdlcyAmJiBzZWxmLnVuc2VuZE1lc3NhZ2VzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudW5zZW5kTWVzc2FnZXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNlbmRDb21tb25Nc2coaXRlbS5tc2d0eXBlLCBpdGVtLm1zZ2NvbnRlbnQsIGl0ZW0ubXNna2V5KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudXNlclRleHRJbnB1dCA9ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudXNlclRleHRDb250ZW50ID0gJydcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi50ZXh0YXJlYUhlaWdodCA9IDQwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudW5zZW5kTWVzc2FnZXMgPSBbXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBmYWlsKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn6L+b5YWl5oi/6Ze05aSx6LSl77yBJylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgd2VweS5vblNvY2tldE1lc3NhZ2UoKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmlzU2VsZiA9IGRhdGEuRnJvbVVzZXIgPT09IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvLkZsbmtJRFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuc2hvd1NlbmRUaW1lID0gZ2V0TWVzc2FnZVNlbmRUaW1lKGRhdGEuTWVzc2FnZVRpbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlcy5wdXNoKGRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmlzU2VsZiB8fCB0aGlzLmlzU2Nyb2xsVG9OZXdFbmFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxUb0N1cnJlbnRNc2coKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGFnZVN0YWNrID0gd2VweS5nZXRDdXJyZW50UGFnZXMoKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYWdlU3RhY2tbcGFnZVN0YWNrLmxlbmd0aCAtIDFdLnJvdXRlICE9PSAncGFnZXMvcHJhY3RpY2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RhYkJhclJlZERvdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvblNob3coKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICB3ZXB5LmhpZGVUYWJCYXJSZWREb3Qoe1xyXG4gICAgICAgICAgICAgICAgaW5kZXg6IDFcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50LmdldFVzZXJJbmZvKCkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnVzZXJJbmZvID0gcmVzXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMuaXNUZWFjaGVyID0gKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvLlJvbGVOdW0gKyAnJykgPT09ICcyJ1xyXG4gICAgICAgICAgICBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuaXNQcmV2aWV3SW1nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuc2V0R2xvYmFsRGF0YSgnaXNQcmV2aWV3SW1nJywgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmluaXQoKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25VbmxvYWQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5zZXRHbG9iYWxEYXRhKCdpc0luaXRTb2NrZXQnLCBmYWxzZSlcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+mhtemdouWNuOi9vScpXHJcbiAgICAgICAgICAgIHdlcHkuY2xvc2VTb2NrZXQoe1xyXG4gICAgICAgICAgICAgICAgc3VjY2VzcygpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5pat5byAc29ja2V05oiQ5YqfJylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiJdfQ==