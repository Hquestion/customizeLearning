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
                    var pageStack = getCurrentPages();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByYWN0aWNlLmpzIl0sIm5hbWVzIjpbIlByYWN0aWNlIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJmaWx0ZXJDb25kaXRpb25WaXNpYmxlIiwiZmlsdGVyVHlwZSIsImlzVGVhY2hlciIsImhhdmVBY3RpdmVHcm91cFRhc2siLCJ1c2VySW5mbyIsImFycmFuZ2VMaXN0IiwiYXJyYW5nZUluZGV4IiwiaW5wdXRNb2RlIiwidXNlclRleHRJbnB1dCIsInVzZXJUZXh0Q29udGVudCIsIm1vcmVBY3Rpb25TaG93biIsIm1lc3NhZ2VJZCIsInVzZXJJbmZvRm9yTXNnIiwibWVzc2FnZXMiLCJjdXJyZW50TXNnc1BhZ2VJbmRleCIsImhhdmVNb3JlQ2hhdE1zZ3MiLCJpc0ZvY3VzIiwiaXNMb2FkaW5nTXNnIiwidW5zZW5kTWVzc2FnZXMiLCJ0ZXh0YXJlYUhlaWdodCIsImlzU2Nyb2xsVG9OZXdFbmFibGUiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjaGF0TWVzc2FnZSIsImxvYWRpbmciLCJjb21wdXRlZCIsImNoYXRIaXN0b3J5SGVpZ2h0IiwiYnRuVG9vbEhlaWdodCIsIm1ldGhvZHMiLCJhcnJhbmdlU3RlcENoYW5nZSIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsIm9uSW5wdXRUZXh0IiwiY29uc29sZSIsImxvZyIsInRvZ2dsZUZpbHRlckNvbmRpdGlvbiIsIiRhcHBseSIsImZpbHRDaGF0SGlzdG9yeSIsInBhcmFtIiwiaW5pdENoYXRIaXN0b3J5Iiwic2V0SW5wdXRNb2RlIiwic2VuZFRleHRNc2ciLCJzZW5kQ29tbW9uTXNnIiwidGhlbiIsInNldFRpbWVvdXQiLCJzaG93TW9yZUFjdGlvbnMiLCJ1cGxvYWRQaWMiLCJ0aGF0Iiwid2VweSIsImNob29zZUltYWdlIiwiY291bnQiLCJzdWNjZXNzIiwicmVzIiwidGVtcEZpbGVQYXRocyIsImZvckVhY2giLCJpdGVtIiwiRmlsZVR5cGUiLCJ1c2VyRklEIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJGbG5rSUQiLCJGaWxlTGluayIsIkZpbGVJZCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsInRha2VQaG90byIsImNob29zZVZpZGVvIiwic291cmNlVHlwZSIsIm1heER1cmF0aW9uIiwiY2FtZXJhIiwiZHVyYXRpb24iLCJwYXRoIiwidGVtcEZpbGVQYXRoIiwic2hvd0xvYWRpbmciLCJoaWRlTG9hZGluZyIsImZhaWwiLCJlcnJvciIsInN0YXJ0UmVjb3JkQXVkaW8iLCJyZWNvcmRlck1hbmFnZXIiLCJnZXRSZWNvcmRlck1hbmFnZXIiLCJvblN0b3AiLCJvbkVycm9yIiwib3B0aW9ucyIsInNhbXBsZVJhdGUiLCJudW1iZXJPZkNoYW5uZWxzIiwiZW5jb2RlQml0UmF0ZSIsImZvcm1hdCIsInN0YXJ0Iiwic3RvcFJlY29yZEF1ZGlvIiwic3RvcCIsImhpZGVDaGF0TXNnTW9yZSIsImlzU2hvd01vcmUiLCJoaWRlQWN0aW9uQnRucyIsIm9uU2Nyb2xsVXBwZXIiLCJsb2FkQ2hhdE1zZ0J5UGFnZSIsImxhc3RNZXNzYWdlSWQiLCJNZXNzYWdlSUQiLCJjb25jYXQiLCJvbkNoYXRTY3JvbGwiLCJzY3JvbGxIZWlnaHQiLCJzY3JvbGxUb3AiLCJvbkRlbGV0ZU1zZyIsImZvY3VzVGV4dEFyZWEiLCJjYW5jZWxGb2N1cyIsImlucHV0TGluZUNoYW5nZSIsImxpbmVDb3VudCIsImhlaWdodFJweCIsImV2ZW50cyIsIkZyb21Vc2VyIiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJzcGxpY2UiLCJzZXRHbG9iYWxEYXRhIiwibXNndHlwZSIsIm1zZ2NvbnRlbnQiLCJmaWxlSWQiLCJzdGVwSW5mbyIsInNlbGYiLCJtc2ciLCJNZXNzYWdlIiwibXNna2V5Iiwic3RlcGtleSIsInN0ZXBjb2RlIiwiU29ydENvZGUiLCJzdGVwbmFtZSIsIkFycmFuZ2VOYW1lIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzZW5kU29ja2V0TWVzc2FnZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJwdXNoIiwic3RhcnRTb2NrZXQiLCJsZW5ndGgiLCJhY3RpdmVUYXNrSW5mbyIsImdldFN0b3JhZ2VTeW5jIiwiaW5pdFN0ZXBzIiwidXNlcklkIiwidXNlck5hbWUiLCJYTSIsIlJvbGVOdW0iLCJBdmF0YXJVcmwiLCJ3eFVzZXJJbmZvIiwiYXZhdGFyVXJsIiwiZ3JvdXBJZCIsIkdyb3VwRklEIiwiQ291cnNlRklEIiwibGlzdCIsInJlc3VsdCIsInNob3dBcnJhbmdlTmFtZSIsInBGbG5rSUQiLCJwU29ydENvZGUiLCJtb2RlbExpc3QiLCJBcnJhbmdlVHlwZSIsIm1vZGVsIiwiSXNDaGVjayIsIkFycmFuZ2VDb250ZW50Iiwic2Nyb2xsVG9DdXJyZW50TXNnIiwicGFnZUluZGV4IiwiUGFnZUNvdW50IiwiRGF0YVNvdXJjZSIsIm1zZ0JvZHkiLCJwYXJzZSIsIk1lc3NhZ2VCb2R5IiwiaXNTZWxmIiwic2hvd1NlbmRUaW1lIiwiU2VuZFRpbWUiLCJ1bnNoaWZ0IiwiZm9yY2UiLCJpc0luaXRTb2NrZXQiLCJjb25uZWN0U29ja2V0IiwidXJsIiwic29ja2V0U2VydmVyVXJsIiwib25Tb2NrZXRPcGVuIiwicmVnaXN0ZXJJbmZvIiwib25Tb2NrZXRNZXNzYWdlIiwiTWVzc2FnZVRpbWUiLCJwYWdlU3RhY2siLCJnZXRDdXJyZW50UGFnZXMiLCJyb3V0ZSIsInNob3dUYWJCYXJSZWREb3QiLCJoaWRlVGFiQmFyUmVkRG90IiwiZ2V0VXNlckluZm8iLCJpc1ByZXZpZXdJbWciLCJpbml0IiwiY2xvc2VTb2NrZXQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDSTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7Ozs7Ozs4TEFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUlUQyxJLEdBQU87QUFDSEMsb0NBQXdCLEtBRHJCO0FBRUhDLHdCQUFZLENBRlQsRUFF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TCxnQkFBSVEsT0FBTyxJQUFYO0FBQ0F0RSwyQkFBS3VJLGdCQUFMLENBQXNCO0FBQ2xCekUsdUJBQU87QUFEVyxhQUF0QjtBQUdBLGlCQUFLcEQsT0FBTCxDQUFhOEgsV0FBYixHQUEyQjdJLElBQTNCLENBQWdDLFVBQUNTLEdBQUQsRUFBUztBQUNyQ2tFLHFCQUFLckgsUUFBTCxHQUFnQm1ELEdBQWhCO0FBQ0gsYUFGRDtBQUdBLGlCQUFLckQsU0FBTCxHQUFrQixLQUFLMkQsT0FBTCxDQUFhQyxVQUFiLENBQXdCMUQsUUFBeEIsQ0FBaUM2SSxPQUFqQyxHQUEyQyxFQUE1QyxLQUFvRCxHQUFyRTtBQUNBLGdCQUFJLEtBQUtwRixPQUFMLENBQWFDLFVBQWIsQ0FBd0I4SCxZQUE1QixFQUEwQztBQUN0QyxxQkFBSy9ILE9BQUwsQ0FBYXVELGFBQWIsQ0FBMkIsY0FBM0IsRUFBMkMsS0FBM0M7QUFDQTtBQUNIO0FBQ0QsaUJBQUt5RSxJQUFMO0FBQ0g7OzttQ0FFVTtBQUNQLGlCQUFLaEksT0FBTCxDQUFhdUQsYUFBYixDQUEyQixjQUEzQixFQUEyQyxLQUEzQztBQUNBaEYsb0JBQVFDLEdBQVIsQ0FBWSxNQUFaO0FBQ0FjLDJCQUFLMkksV0FBTCxDQUFpQjtBQUNieEksdUJBRGEscUJBQ0g7QUFDTmxCLDRCQUFRQyxHQUFSLENBQVksWUFBWjtBQUNIO0FBSFksYUFBakI7QUFLSDs7OztFQXBmaUNjLGVBQUs0SSxJOztrQkFBdEJuTSxRIiwiZmlsZSI6InByYWN0aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgICBpbXBvcnQgY2hhdE1lc3NhZ2UgZnJvbSAnLi4vY29tcG9uZW50cy9jaGF0TWVzc2FnZSdcbiAgICBpbXBvcnQgbG9hZGluZyBmcm9tICcuLi9jb21wb25lbnRzL2xvYWRpbmcnXG4gICAgaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJy4uL21vZGVsL01lc3NhZ2UnXG4gICAgaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnXG5cbiAgICBpbXBvcnQge2dldENvdXJzZUFycmFuZ2VMaXN0LCB1cGxvYWRGaWxlLCBnZXRDaGF0TXNnQnlQYWdlLCBkZWxldGVDaGF0TXNnfSBmcm9tICcuLi9hcGknXG4gICAgaW1wb3J0IHtnZXRNZXNzYWdlU2VuZFRpbWV9IGZyb20gJy4uL3V0aWwnXG5cbiAgICBleHBvcnQgZGVmYXVsdCBjbGFzcyBQcmFjdGljZSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgICAgIGNvbmZpZyA9IHtcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkuKrmgKfljJblrabkuaDkuK3lv4MnXG4gICAgICAgIH1cblxuICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgZmlsdGVyQ29uZGl0aW9uVmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICBmaWx0ZXJUeXBlOiAwLCAgICAvLyAxOuS7heaYvuekuuaIkeeahCAgMu+8muaYvuekuuiAgeW4iOWGheWuuSAgMDog5pi+56S65YWo6YOoXG4gICAgICAgICAgICBpc1RlYWNoZXI6IGZhbHNlLFxuICAgICAgICAgICAgaGF2ZUFjdGl2ZUdyb3VwVGFzazogdHJ1ZSxcbiAgICAgICAgICAgIHVzZXJJbmZvOiBudWxsLFxuICAgICAgICAgICAgYXJyYW5nZUxpc3Q6IFtdLFxuICAgICAgICAgICAgYXJyYW5nZUluZGV4OiAwLFxuICAgICAgICAgICAgaW5wdXRNb2RlOiAnVEVYVCcsXG4gICAgICAgICAgICB1c2VyVGV4dElucHV0OiAnJyxcbiAgICAgICAgICAgIHVzZXJUZXh0Q29udGVudDogJycsXG4gICAgICAgICAgICAvLyBjaGF0SGlzdG9yeUhlaWdodDogJ2NhbGMoMTAwdmggLSAyNTBycHgpJyxcbiAgICAgICAgICAgIG1vcmVBY3Rpb25TaG93bjogZmFsc2UsXG4gICAgICAgICAgICBtZXNzYWdlSWQ6ICcnLFxuICAgICAgICAgICAgdXNlckluZm9Gb3JNc2c6IHt9LFxuICAgICAgICAgICAgbWVzc2FnZXM6IFtdLFxuICAgICAgICAgICAgY3VycmVudE1zZ3NQYWdlSW5kZXg6IDEsXG4gICAgICAgICAgICBoYXZlTW9yZUNoYXRNc2dzOiB0cnVlLFxuICAgICAgICAgICAgaXNGb2N1czogZmFsc2UsXG4gICAgICAgICAgICBpc0xvYWRpbmdNc2c6IGZhbHNlLFxuICAgICAgICAgICAgdW5zZW5kTWVzc2FnZXM6IFtdLFxuICAgICAgICAgICAgdGV4dGFyZWFIZWlnaHQ6IDQwLFxuICAgICAgICAgICAgaXNTY3JvbGxUb05ld0VuYWJsZTogdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAkcmVwZWF0ID0ge1wibWVzc2FnZXNcIjp7XCJjb21cIjpcImNoYXQtbWVzc2FnZVwiLFwicHJvcHNcIjpcIm1zZ0RhdGEuc3luY1wifX07XHJcbiRwcm9wcyA9IHtcImNoYXQtbWVzc2FnZVwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwibWVzc2FnZXNcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDppZC5vbmNlXCI6e1widmFsdWVcIjpcIidtZXNzYWdlXycgKyBpdGVtLk1lc3NhZ2VJRFwiLFwiZm9yXCI6XCJtZXNzYWdlc1wiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOm1zZ0RhdGEuc3luY1wiOntcInZhbHVlXCI6XCJpdGVtXCIsXCJ0eXBlXCI6XCJpdGVtXCIsXCJmb3JcIjpcIm1lc3NhZ2VzXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6aXNTZWxmLm9uY2VcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5pc1NlbGZcIixcImZvclwiOlwibWVzc2FnZXNcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDppc1Nob3dNb3JlLm9uY2VcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5pc1Nob3dNb3JlXCIsXCJmb3JcIjpcIm1lc3NhZ2VzXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19LFwibG9hZGluZ1wiOnt9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgICAgICAgICdjaGF0LW1lc3NhZ2UnOiBjaGF0TWVzc2FnZSxcbiAgICAgICAgICAgICdsb2FkaW5nJzogbG9hZGluZ1xuICAgICAgICB9XG5cbiAgICAgICAgY29tcHV0ZWQgPSB7XG4gICAgICAgICAgICBjaGF0SGlzdG9yeUhlaWdodCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tb3JlQWN0aW9uU2hvd24gPyBgY2FsYygxMDB2aCAtIDQxMHJweCAtICR7dGhpcy50ZXh0YXJlYUhlaWdodH1ycHgpYCA6IGBjYWxjKDEwMHZoIC0gMjEwcnB4IC0gJHt0aGlzLnRleHRhcmVhSGVpZ2h0fXJweClgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYnRuVG9vbEhlaWdodCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMudGV4dGFyZWFIZWlnaHQgKyA0OCkgKyAncnB4J1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbWV0aG9kcyA9IHtcbiAgICAgICAgICAgIGFycmFuZ2VTdGVwQ2hhbmdlKGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFycmFuZ2VJbmRleCA9ICtlLmRldGFpbC52YWx1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uSW5wdXRUZXh0KGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaW5wdXQnLCBlLmRldGFpbC52YWx1ZSlcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJUZXh0SW5wdXQgPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvZ2dsZUZpbHRlckNvbmRpdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlckNvbmRpdGlvblZpc2libGUgPSAhdGhpcy5maWx0ZXJDb25kaXRpb25WaXNpYmxlXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpbHRDaGF0SGlzdG9yeShwYXJhbSkge1xuICAgICAgICAgICAgICAgIGlmIChwYXJhbSA9PT0gJzEnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOi/h+a7pOiHquW3seeahOiBiuWkqeiusOW9lVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclR5cGUgPSAxXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbSA9PT0gJzInKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOi/h+a7pOiAgeW4iOeahOiBiuWkqeiusOW9lVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclR5cGUgPSAyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g5pi+56S65YWo6YOo5YaF5a65XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyVHlwZSA9IDBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJDb25kaXRpb25WaXNpYmxlID0gZmFsc2VcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRDaGF0SGlzdG9yeSgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0SW5wdXRNb2RlKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlucHV0TW9kZSA9PT0gJ1RFWFQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRNb2RlID0gJ0FVRElPJ1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRNb2RlID0gJ1RFWFQnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlbmRUZXh0TXNnKCkge1xuICAgICAgICAgICAgICAgIC8vIOWPkemAgeaWh+Wtl+a2iOaBr1xuICAgICAgICAgICAgICAgIHRoaXMuc2VuZENvbW1vbk1zZygnMScsIHRoaXMudXNlclRleHRJbnB1dCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJUZXh0SW5wdXQgPSAnJ1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJUZXh0Q29udGVudCA9ICcgJ1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHRhcmVhSGVpZ2h0ID0gNDBcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJUZXh0Q29udGVudCA9ICcnXG4gICAgICAgICAgICAgICAgICAgIH0sIDApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNob3dNb3JlQWN0aW9ucygpIHtcbiAgICAgICAgICAgICAgICAvLyDmmL7npLrmm7TlpJrmk43kvZxcbiAgICAgICAgICAgICAgICB0aGlzLm1vcmVBY3Rpb25TaG93biA9ICF0aGlzLm1vcmVBY3Rpb25TaG93blxuICAgICAgICAgICAgICAgIC8vIHRoaXMuY2hhdEhpc3RvcnlIZWlnaHQgPSB0aGlzLm1vcmVBY3Rpb25TaG93biA/ICdjYWxjKDEwMHZoIC0gNDUwcnB4KScgOiAnY2FsYygxMDB2aCAtIDI1MHJweCknXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXBsb2FkUGljKCkge1xuICAgICAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpc1xuICAgICAgICAgICAgICAgIHdlcHkuY2hvb3NlSW1hZ2Uoe1xuICAgICAgICAgICAgICAgICAgICBjb3VudDogNCxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy50ZW1wRmlsZVBhdGhzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBsb2FkRmlsZShpdGVtLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZpbGVUeXBlOiAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyRklEOiB0aGF0LiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mby5GbG5rSURcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2VuZENvbW1vbk1zZygnMicsIHJlcy5GaWxlTGluaywgcmVzLkZpbGVJZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5Y+R6YCB5aSx6LSlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdub25lJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0YWtlUGhvdG8oKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzXG4gICAgICAgICAgICAgICAgd2VweS5jaG9vc2VWaWRlbyh7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZVR5cGU6IFsnYWxidW0nLCAnY2FtZXJhJ10sXG4gICAgICAgICAgICAgICAgICAgIG1heER1cmF0aW9uOiA2MCxcbiAgICAgICAgICAgICAgICAgICAgY2FtZXJhOiAnYmFjaycsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc3VjY2VzczonLCByZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmR1cmF0aW9uID4gNjApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn6KeG6aKR5LiN6IO96LaF6L+HMeWIhumSnycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdub25lJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGF0aCA9IHJlcy50ZW1wRmlsZVBhdGhcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe3RpdGxlOiAn5q2j5Zyo5LiK5LygJ30pXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGxvYWRGaWxlKHBhdGgsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBGaWxlVHlwZTogMyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyRklEOiB0aGF0LiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mby5GbG5rSURcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNlbmRDb21tb25Nc2coJzMnLCByZXMuRmlsZUxpbmssIHJlcy5GaWxlSWQpXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+WPkemAgeWksei0pScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdub25lJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmYWlsKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZhaWw6JywgcmVzKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihyZXMpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0YXJ0UmVjb3JkQXVkaW8oKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzXG4gICAgICAgICAgICAgICAgY29uc3QgcmVjb3JkZXJNYW5hZ2VyID0gd2VweS5nZXRSZWNvcmRlck1hbmFnZXIoKVxuICAgICAgICAgICAgICAgIHJlY29yZGVyTWFuYWdlci5vblN0b3AoKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGF0aCA9IHJlcy50ZW1wRmlsZVBhdGhcbiAgICAgICAgICAgICAgICAgICAgdXBsb2FkRmlsZShwYXRoLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBGaWxlVHlwZTogNCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJGSUQ6IHRoYXQuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvLkZsbmtJRFxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNlbmRDb21tb25Nc2coJzQnLCByZXMuRmlsZUxpbmssIHJlcy5GaWxlSWQpXG4gICAgICAgICAgICAgICAgICAgIH0sIChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+WPkemAgeWksei0pScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgcmVjb3JkZXJNYW5hZ2VyLm9uRXJyb3IocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICflj5HpgIHlpLHotKUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogNjAwMDAwLFxuICAgICAgICAgICAgICAgICAgICBzYW1wbGVSYXRlOiA0NDEwMCxcbiAgICAgICAgICAgICAgICAgICAgbnVtYmVyT2ZDaGFubmVsczogMSxcbiAgICAgICAgICAgICAgICAgICAgZW5jb2RlQml0UmF0ZTogMTkyMDAwLFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6ICdtcDMnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlY29yZGVyTWFuYWdlci5zdGFydChvcHRpb25zKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0b3BSZWNvcmRBdWRpbygpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZWNvcmRlck1hbmFnZXIgPSB3ZXB5LmdldFJlY29yZGVyTWFuYWdlcigpXG4gICAgICAgICAgICAgICAgcmVjb3JkZXJNYW5hZ2VyLnN0b3AoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhpZGVDaGF0TXNnTW9yZSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uaXNTaG93TW9yZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGlkZUFjdGlvbkJ0bnMoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3JlQWN0aW9uU2hvd24gPSBmYWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyQ29uZGl0aW9uVmlzaWJsZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5jaGF0SGlzdG9yeUhlaWdodCA9ICdjYWxjKDEwMHZoIC0gMjUwcnB4KSdcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25TY3JvbGxVcHBlcihlKSB7XG4gICAgICAgICAgICAgICAgLy8g5ZCR5LiK5rua5Yqo77yM5Yqg6L295pu05aSa5pWw5o2uXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGF2ZU1vcmVDaGF0TXNncykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRNc2dzUGFnZUluZGV4KytcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkQ2hhdE1zZ0J5UGFnZSh0aGlzLmN1cnJlbnRNc2dzUGFnZUluZGV4KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGFzdE1lc3NhZ2VJZCA9IHRoaXMubWVzc2FnZXNbMF0uTWVzc2FnZUlEXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VzID0gcmVzLmNvbmNhdCh0aGlzLm1lc3NhZ2VzKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlSWQgPSAnbWVzc2FnZV8nICsgbGFzdE1lc3NhZ2VJZFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkNoYXRTY3JvbGwoZSkge1xuICAgICAgICAgICAgICAgIGlmIChlLmRldGFpbC5zY3JvbGxIZWlnaHQgLSBlLmRldGFpbC5zY3JvbGxUb3AgPiA4MDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1Njcm9sbFRvTmV3RW5hYmxlID0gZmFsc2VcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU2Nyb2xsVG9OZXdFbmFibGUgPSB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uRGVsZXRlTXNnKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZvY3VzVGV4dEFyZWEoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0ZvY3VzID0gdHJ1ZVxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjYW5jZWxGb2N1cyhlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0ZvY3VzID0gZmFsc2VcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5wdXRMaW5lQ2hhbmdlKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZS5kZXRhaWwubGluZUNvdW50IDw9IDUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0YXJlYUhlaWdodCA9IGUuZGV0YWlsLmhlaWdodFJweFxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnRzID0ge1xuICAgICAgICAgICAgJ2hpZGUtb3RoZXItYWN0aW9ucyc6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5pc1Nob3dNb3JlID0gaXRlbS5NZXNzYWdlSUQgPT09IGUuTWVzc2FnZUlEXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2RlbGV0ZS1tc2cnOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGUuRnJvbVVzZXIgPT09IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvLkZsbmtJRCkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGVDaGF0TXNnKGUuTWVzc2FnZUlELCBlLkZyb21Vc2VyKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLm1lc3NhZ2VzLmZpbmRJbmRleChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5NZXNzYWdlSUQgPT09IGUuTWVzc2FnZUlEXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlcy5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfkuI3lj6/liKDpmaQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdwcmV2aWV3LWltYWdlJzogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5zZXRHbG9iYWxEYXRhKCdpc1ByZXZpZXdJbWcnLCB0cnVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc2VuZENvbW1vbk1zZyhtc2d0eXBlLCBtc2djb250ZW50LCBmaWxlSWQpIHtcbiAgICAgICAgICAgIGxldCBzdGVwSW5mbyA9IHt9XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIGlmICh0aGlzLmFycmFuZ2VJbmRleCA+IDApIHtcbiAgICAgICAgICAgICAgICAvLyDlpoLmnpzpgInmi6nkuobmraXpqqTvvIzpnIDopoHmj5DkuqTmraXpqqTkv6Hmga9cbiAgICAgICAgICAgICAgICBzdGVwSW5mbyA9IHRoaXMuYXJyYW5nZUxpc3RbdGhpcy5hcnJhbmdlSW5kZXhdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgbXNnID0gbmV3IE1lc3NhZ2UodGhpcy51c2VySW5mb0Zvck1zZywge1xuICAgICAgICAgICAgICAgIG1zZ3R5cGU6IG1zZ3R5cGUgfHwgJzEnLFxuICAgICAgICAgICAgICAgIG1zZ2NvbnRlbnQ6IG1zZ2NvbnRlbnQsXG4gICAgICAgICAgICAgICAgbXNna2V5OiBmaWxlSWQgfHwgJycsXG4gICAgICAgICAgICAgICAgc3RlcGtleTogc3RlcEluZm8uRmxua0lEIHx8ICcnLFxuICAgICAgICAgICAgICAgIHN0ZXBjb2RlOiBzdGVwSW5mby5Tb3J0Q29kZSB8fCAnJyxcbiAgICAgICAgICAgICAgICBzdGVwbmFtZTogc3RlcEluZm8uQXJyYW5nZU5hbWUgfHwgJydcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHdlcHkuc2VuZFNvY2tldE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShtc2cpLFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hcnJhbmdlSW5kZXggPSAwXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZmFpbChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudW5zZW5kTWVzc2FnZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbXNndHlwZTogbXNndHlwZSB8fCAnMScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbXNnY29udGVudDogbXNnY29udGVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtc2drZXk6IGZpbGVJZCB8fCAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc3RhcnRTb2NrZXQodHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChyZXMpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHNjcm9sbFRvQ3VycmVudE1zZygpIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZUlkID0gJ21lc3NhZ2VfJyArIHRoaXMubWVzc2FnZXNbKHRoaXMubWVzc2FnZXMubGVuZ3RoIC0gMSldLk1lc3NhZ2VJRFxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG5cbiAgICAgICAgaW5pdCgpIHtcbiAgICAgICAgICAgIGxldCBhY3RpdmVUYXNrSW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ2FjdGl2ZVRhc2tJbmZvJylcbiAgICAgICAgICAgIHRoaXMuaGF2ZUFjdGl2ZUdyb3VwVGFzayA9ICEhYWN0aXZlVGFza0luZm9cbiAgICAgICAgICAgIGlmICh0aGlzLmhhdmVBY3RpdmVHcm91cFRhc2spIHtcbiAgICAgICAgICAgICAgICAvLyDlpoLmnpzmnInmv4DmtLvnmoTlsI/nu4Tku7vliqHvvIzliJnov57mjqVXZWJTb2NrZXRcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRTdGVwcyhhY3RpdmVUYXNrSW5mbylcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRDaGF0SGlzdG9yeSgpXG4gICAgICAgICAgICAgICAgdGhpcy51c2VySW5mb0Zvck1zZyA9IHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkOiB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mby5GbG5rSUQsXG4gICAgICAgICAgICAgICAgICAgIHVzZXJOYW1lOiB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mby5YTSxcbiAgICAgICAgICAgICAgICAgICAgUm9sZU51bTogdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8uUm9sZU51bSxcbiAgICAgICAgICAgICAgICAgICAgQXZhdGFyVXJsOiB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS53eFVzZXJJbmZvLmF2YXRhclVybCxcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBJZDogYWN0aXZlVGFza0luZm8uR3JvdXBGSURcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFNvY2tldCgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpbml0U3RlcHMoYWN0aXZlVGFza0luZm8pIHtcbiAgICAgICAgICAgIGdldENvdXJzZUFycmFuZ2VMaXN0KGFjdGl2ZVRhc2tJbmZvLkNvdXJzZUZJRCwgYWN0aXZlVGFza0luZm8uR3JvdXBGSUQpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAvLyDpnIDmsYLkv67mlLnvvJrlpoLmnpzmmK/lrqLop4LlnovnmoTlhoXlrrnliJnlsZXnpLrlrZDmraXpqqTlkI3np7DvvIzlkKbliJnlsZXnpLrniLbmraXpqqRcbiAgICAgICAgICAgICAgICBsZXQgbGlzdCA9IHJlc1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBbe1xuICAgICAgICAgICAgICAgICAgICBzaG93QXJyYW5nZU5hbWU6ICfkuI3mj5DkuqTmraXpqqQnLFxuICAgICAgICAgICAgICAgICAgICBGbG5rSUQ6ICcnLFxuICAgICAgICAgICAgICAgICAgICBwRmxua0lEOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgcFNvcnRDb2RlOiAnJ1xuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgbGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5tb2RlbExpc3RbMF0gJiYgaXRlbS5tb2RlbExpc3RbMF0uQXJyYW5nZVR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ubW9kZWxMaXN0LmZvckVhY2gobW9kZWwgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb2RlbC5BcnJhbmdlVHlwZSA9PT0gMSAmJiBtb2RlbC5Jc0NoZWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dBcnJhbmdlTmFtZTogYOatpemqpCR7aXRlbS5Tb3J0Q29kZX0uJHttb2RlbC5Tb3J0Q29kZX0gOiAke21vZGVsLkFycmFuZ2VDb250ZW50fWAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBcnJhbmdlTmFtZTogbW9kZWwuQXJyYW5nZUNvbnRlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGbG5rSUQ6IG1vZGVsLkZsbmtJRCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBGbG5rSUQ6IGl0ZW0uRmxua0lELFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcFNvcnRDb2RlOiBpdGVtLlNvcnRDb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU29ydENvZGU6IGAke2l0ZW0uU29ydENvZGV9LiR7bW9kZWwuU29ydENvZGV9YFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0FycmFuZ2VOYW1lOiBg5q2l6aqkJHtpdGVtLlNvcnRDb2RlfToke2l0ZW0uQXJyYW5nZU5hbWV9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBcnJhbmdlTmFtZTogaXRlbS5BcnJhbmdlTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBGbG5rSUQ6IGl0ZW0ubW9kZWxMaXN0WzBdLkZsbmtJRCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwRmxua0lEOiBpdGVtLkZsbmtJRCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwU29ydENvZGU6IGl0ZW0uU29ydENvZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU29ydENvZGU6IGl0ZW0uU29ydENvZGVcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHRoaXMuYXJyYW5nZUxpc3QgPSByZXN1bHRcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgaW5pdENoYXRIaXN0b3J5KCkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50TXNnc1BhZ2VJbmRleCA9IDFcbiAgICAgICAgICAgIHRoaXMuaGF2ZU1vcmVDaGF0TXNncyA9IHRydWVcbiAgICAgICAgICAgIHRoaXMubG9hZENoYXRNc2dCeVBhZ2UoMSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZXMgPSBbXS5jb25jYXQocmVzKVxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFRvQ3VycmVudE1zZygpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgbG9hZENoYXRNc2dCeVBhZ2UocGFnZUluZGV4ID0gMSkge1xuICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmdNc2cgPSB0cnVlXG4gICAgICAgICAgICBsZXQgYWN0aXZlVGFza0luZm8gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdhY3RpdmVUYXNrSW5mbycpXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB1c2VySWQgPSAnJ1xuICAgICAgICAgICAgICAgIGxldCBSb2xlTnVtID0gbnVsbFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlclR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8uRmxua0lEXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmZpbHRlclR5cGUgPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgUm9sZU51bSA9IDJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZ2V0Q2hhdE1zZ0J5UGFnZShhY3RpdmVUYXNrSW5mby5Hcm91cEZJRCwgdXNlcklkLCBSb2xlTnVtLCBwYWdlSW5kZXgpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5QYWdlQ291bnQgPD0gdGhpcy5jdXJyZW50TXNnc1BhZ2VJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXZlTW9yZUNoYXRNc2dzID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGF2ZU1vcmVDaGF0TXNncyA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsZXQgbGlzdCA9IHJlcy5EYXRhU291cmNlXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gW11cbiAgICAgICAgICAgICAgICAgICAgbGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1zZ0JvZHkgPSBKU09OLnBhcnNlKGl0ZW0uTWVzc2FnZUJvZHkpXG4gICAgICAgICAgICAgICAgICAgICAgICBtc2dCb2R5LmlzU2VsZiA9IG1zZ0JvZHkuRnJvbVVzZXIgPT09IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvLkZsbmtJRFxuICAgICAgICAgICAgICAgICAgICAgICAgbXNnQm9keS5zaG93U2VuZFRpbWUgPSBnZXRNZXNzYWdlU2VuZFRpbWUoaXRlbS5TZW5kVGltZSArICcrMDgwMCcpXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnVuc2hpZnQobXNnQm9keSlcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmdNc2cgPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpXG4gICAgICAgICAgICAgICAgfSwgcmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmdNc2cgPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhdmVNb3JlQ2hhdE1zZ3MgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChyZXMpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBzdGFydFNvY2tldChmb3JjZSkge1xuICAgICAgICAgICAgaWYgKGZvcmNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnNldEdsb2JhbERhdGEoJ2lzSW5pdFNvY2tldCcsIGZhbHNlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmlzSW5pdFNvY2tldCkge1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuc2V0R2xvYmFsRGF0YSgnaXNJbml0U29ja2V0JywgdHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgd2VweS5jb25uZWN0U29ja2V0KHtcbiAgICAgICAgICAgICAgICB1cmw6IGNvbmZpZy5zb2NrZXRTZXJ2ZXJVcmwsXG4gICAgICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+i/nuaOpeaIkOWKnycpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmYWlsKHJlcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCfov57mjqXlpLHotKUnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB3ZXB5Lm9uU29ja2V0T3BlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8g5Yqg5YWl576k6IGKXG4gICAgICAgICAgICAgICAgbGV0IHJlZ2lzdGVySW5mbyA9IG5ldyBNZXNzYWdlKHRoaXMudXNlckluZm9Gb3JNc2csIHt9LCAwKVxuICAgICAgICAgICAgICAgIHdlcHkuc2VuZFNvY2tldE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShyZWdpc3RlckluZm8pLFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+i/m+WFpeaIv+mXtOaIkOWKn++8gScpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi51bnNlbmRNZXNzYWdlcyAmJiBzZWxmLnVuc2VuZE1lc3NhZ2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnVuc2VuZE1lc3NhZ2VzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2VuZENvbW1vbk1zZyhpdGVtLm1zZ3R5cGUsIGl0ZW0ubXNnY29udGVudCwgaXRlbS5tc2drZXkpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudXNlclRleHRJbnB1dCA9ICcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnVzZXJUZXh0Q29udGVudCA9ICcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnRleHRhcmVhSGVpZ2h0ID0gNDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudW5zZW5kTWVzc2FnZXMgPSBbXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZmFpbCgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfov5vlhaXmiL/pl7TlpLHotKXvvIEnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB3ZXB5Lm9uU29ja2V0TWVzc2FnZSgocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5pc1NlbGYgPSBkYXRhLkZyb21Vc2VyID09PSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mby5GbG5rSURcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5zaG93U2VuZFRpbWUgPSBnZXRNZXNzYWdlU2VuZFRpbWUoZGF0YS5NZXNzYWdlVGltZSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlcy5wdXNoKGRhdGEpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuaXNTZWxmIHx8IHRoaXMuaXNTY3JvbGxUb05ld0VuYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxUb0N1cnJlbnRNc2coKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCBwYWdlU3RhY2sgPSBnZXRDdXJyZW50UGFnZXMoKVxuICAgICAgICAgICAgICAgICAgICBpZiAocGFnZVN0YWNrW3BhZ2VTdGFjay5sZW5ndGggLSAxXS5yb3V0ZSAhPT0gJ3BhZ2VzL3ByYWN0aWNlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VGFiQmFyUmVkRG90KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogMVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgb25TaG93KCkge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICB3ZXB5LmhpZGVUYWJCYXJSZWREb3Qoe1xuICAgICAgICAgICAgICAgIGluZGV4OiAxXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdGhpcy4kcGFyZW50LmdldFVzZXJJbmZvKCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgc2VsZi51c2VySW5mbyA9IHJlc1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRoaXMuaXNUZWFjaGVyID0gKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvLlJvbGVOdW0gKyAnJykgPT09ICcyJ1xuICAgICAgICAgICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmlzUHJldmlld0ltZykge1xuICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5zZXRHbG9iYWxEYXRhKCdpc1ByZXZpZXdJbWcnLCBmYWxzZSlcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaW5pdCgpXG4gICAgICAgIH1cblxuICAgICAgICBvblVubG9hZCgpIHtcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5zZXRHbG9iYWxEYXRhKCdpc0luaXRTb2NrZXQnLCBmYWxzZSlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfpobXpnaLljbjovb0nKVxuICAgICAgICAgICAgd2VweS5jbG9zZVNvY2tldCh7XG4gICAgICAgICAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+aWreW8gHNvY2tldOaIkOWKnycpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cbiJdfQ==