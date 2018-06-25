'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChatMessage = function (_wepy$component) {
    _inherits(ChatMessage, _wepy$component);

    function ChatMessage() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ChatMessage);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ChatMessage.__proto__ || Object.getPrototypeOf(ChatMessage)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
            id: {},
            msgData: {},
            isSelf: {},
            isShowMore: {
                twoWay: true
            },
            editable: {
                default: true
            }
        }, _this.methods = {
            playAudio: function playAudio(message) {
                var innerAudioContext = _wepy2.default.createInnerAudioContext();
                innerAudioContext.autoplay = false;
                innerAudioContext.src = message.MessageBody.msgcontent;
                innerAudioContext.onEnded(function () {
                    innerAudioContext.stop();
                });
                innerAudioContext.onError(function (res) {
                    console.log(res.errMsg);
                    console.log(res.errCode);
                    innerAudioContext.stop();
                });
                innerAudioContext.play();
            },
            playVideo: function playVideo(message) {
                this.$emit('preview-image', message);
                _wepy2.default.navigateTo({
                    url: '/practice/pages/playVideo?url=' + message.MessageBody.msgcontent
                });
            },
            previewImage: function previewImage(message) {
                this.$emit('preview-image', message);
                _wepy2.default.previewImage({
                    urls: [message.MessageBody.msgcontent]
                });
            },
            moreActions: function moreActions(msgData) {
                console.log(msgData);
                this.$emit('hide-other-actions', msgData);
                this.$nextTick(function () {
                    msgData.isShowMore = true;
                });
                msgData.isShowMore = true;
                console.log(msgData);
                this.$apply();
            },
            copy: function copy() {
                if (this.msgData.MessageBody.msgtype === '1') {
                    _wepy2.default.setClipboardData({
                        data: this.msgData.MessageBody.msgcontent
                    });
                }
            },
            deleteMsg: function deleteMsg() {
                this.$emit('delete-msg', this.msgData);
            }
        }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ChatMessage, [{
        key: 'onLoad',
        value: function onLoad() {}
    }]);

    return ChatMessage;
}(_wepy2.default.component);

exports.default = ChatMessage;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoYXRNZXNzYWdlLmpzIl0sIm5hbWVzIjpbIkNoYXRNZXNzYWdlIiwicHJvcHMiLCJpZCIsIm1zZ0RhdGEiLCJpc1NlbGYiLCJpc1Nob3dNb3JlIiwidHdvV2F5IiwiZWRpdGFibGUiLCJkZWZhdWx0IiwibWV0aG9kcyIsInBsYXlBdWRpbyIsIm1lc3NhZ2UiLCJpbm5lckF1ZGlvQ29udGV4dCIsIndlcHkiLCJjcmVhdGVJbm5lckF1ZGlvQ29udGV4dCIsImF1dG9wbGF5Iiwic3JjIiwiTWVzc2FnZUJvZHkiLCJtc2djb250ZW50Iiwib25FbmRlZCIsInN0b3AiLCJvbkVycm9yIiwicmVzIiwiY29uc29sZSIsImxvZyIsImVyck1zZyIsImVyckNvZGUiLCJwbGF5IiwicGxheVZpZGVvIiwiJGVtaXQiLCJuYXZpZ2F0ZVRvIiwidXJsIiwicHJldmlld0ltYWdlIiwidXJscyIsIm1vcmVBY3Rpb25zIiwiJG5leHRUaWNrIiwiJGFwcGx5IiwiY29weSIsIm1zZ3R5cGUiLCJzZXRDbGlwYm9hcmREYXRhIiwiZGF0YSIsImRlbGV0ZU1zZyIsImV2ZW50cyIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0k7Ozs7Ozs7Ozs7OztJQUVxQkEsVzs7Ozs7Ozs7Ozs7Ozs7b01BQ2pCQyxLLEdBQVE7QUFDSkMsZ0JBQUksRUFEQTtBQUVKQyxxQkFBUyxFQUZMO0FBR0pDLG9CQUFRLEVBSEo7QUFJSkMsd0JBQVk7QUFDUkMsd0JBQVE7QUFEQSxhQUpSO0FBT0pDLHNCQUFVO0FBQ05DLHlCQUFTO0FBREg7QUFQTixTLFFBWVJDLE8sR0FBVTtBQUNOQyxxQkFETSxxQkFDSUMsT0FESixFQUNhO0FBQ2Ysb0JBQU1DLG9CQUFvQkMsZUFBS0MsdUJBQUwsRUFBMUI7QUFDQUYsa0NBQWtCRyxRQUFsQixHQUE2QixLQUE3QjtBQUNBSCxrQ0FBa0JJLEdBQWxCLEdBQXdCTCxRQUFRTSxXQUFSLENBQW9CQyxVQUE1QztBQUNBTixrQ0FBa0JPLE9BQWxCLENBQTBCLFlBQU07QUFDNUJQLHNDQUFrQlEsSUFBbEI7QUFDSCxpQkFGRDtBQUdBUixrQ0FBa0JTLE9BQWxCLENBQTBCLFVBQUNDLEdBQUQsRUFBUztBQUMvQkMsNEJBQVFDLEdBQVIsQ0FBWUYsSUFBSUcsTUFBaEI7QUFDQUYsNEJBQVFDLEdBQVIsQ0FBWUYsSUFBSUksT0FBaEI7QUFDQWQsc0NBQWtCUSxJQUFsQjtBQUNILGlCQUpEO0FBS0FSLGtDQUFrQmUsSUFBbEI7QUFDSCxhQWRLO0FBZU5DLHFCQWZNLHFCQWVJakIsT0FmSixFQWVhO0FBQ2YscUJBQUtrQixLQUFMLENBQVcsZUFBWCxFQUE0QmxCLE9BQTVCO0FBQ0FFLCtCQUFLaUIsVUFBTCxDQUFnQjtBQUNaQyx5QkFBSyxtQ0FBbUNwQixRQUFRTSxXQUFSLENBQW9CQztBQURoRCxpQkFBaEI7QUFHSCxhQXBCSztBQXFCTmMsd0JBckJNLHdCQXFCT3JCLE9BckJQLEVBcUJnQjtBQUNsQixxQkFBS2tCLEtBQUwsQ0FBVyxlQUFYLEVBQTRCbEIsT0FBNUI7QUFDQUUsK0JBQUttQixZQUFMLENBQWtCO0FBQ2RDLDBCQUFNLENBQUN0QixRQUFRTSxXQUFSLENBQW9CQyxVQUFyQjtBQURRLGlCQUFsQjtBQUdILGFBMUJLO0FBMkJOZ0IsdUJBM0JNLHVCQTJCTS9CLE9BM0JOLEVBMkJlO0FBQ2pCb0Isd0JBQVFDLEdBQVIsQ0FBWXJCLE9BQVo7QUFDQSxxQkFBSzBCLEtBQUwsQ0FBVyxvQkFBWCxFQUFpQzFCLE9BQWpDO0FBQ0EscUJBQUtnQyxTQUFMLENBQWUsWUFBTTtBQUNqQmhDLDRCQUFRRSxVQUFSLEdBQXFCLElBQXJCO0FBQ0gsaUJBRkQ7QUFHQUYsd0JBQVFFLFVBQVIsR0FBcUIsSUFBckI7QUFDQWtCLHdCQUFRQyxHQUFSLENBQVlyQixPQUFaO0FBQ0EscUJBQUtpQyxNQUFMO0FBQ0gsYUFwQ0s7QUFxQ05DLGdCQXJDTSxrQkFxQ0M7QUFDSCxvQkFBSSxLQUFLbEMsT0FBTCxDQUFhYyxXQUFiLENBQXlCcUIsT0FBekIsS0FBcUMsR0FBekMsRUFBOEM7QUFDMUN6QixtQ0FBSzBCLGdCQUFMLENBQXNCO0FBQ2xCQyw4QkFBTSxLQUFLckMsT0FBTCxDQUFhYyxXQUFiLENBQXlCQztBQURiLHFCQUF0QjtBQUdIO0FBQ0osYUEzQ0s7QUE0Q051QixxQkE1Q00sdUJBNENNO0FBQ1IscUJBQUtaLEtBQUwsQ0FBVyxZQUFYLEVBQXlCLEtBQUsxQixPQUE5QjtBQUNIO0FBOUNLLFMsUUFpRFZ1QyxNLEdBQVMsRTs7Ozs7aUNBSUEsQ0FBRTs7OztFQWxFMEI3QixlQUFLOEIsUzs7a0JBQXpCM0MsVyIsImZpbGUiOiJjaGF0TWVzc2FnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgICBleHBvcnQgZGVmYXVsdCBjbGFzcyBDaGF0TWVzc2FnZSBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICAgICAgcHJvcHMgPSB7XG4gICAgICAgICAgICBpZDoge30sXG4gICAgICAgICAgICBtc2dEYXRhOiB7fSxcbiAgICAgICAgICAgIGlzU2VsZjoge30sXG4gICAgICAgICAgICBpc1Nob3dNb3JlOiB7XG4gICAgICAgICAgICAgICAgdHdvV2F5OiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZWRpdGFibGU6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBtZXRob2RzID0ge1xuICAgICAgICAgICAgcGxheUF1ZGlvKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbm5lckF1ZGlvQ29udGV4dCA9IHdlcHkuY3JlYXRlSW5uZXJBdWRpb0NvbnRleHQoKVxuICAgICAgICAgICAgICAgIGlubmVyQXVkaW9Db250ZXh0LmF1dG9wbGF5ID0gZmFsc2VcbiAgICAgICAgICAgICAgICBpbm5lckF1ZGlvQ29udGV4dC5zcmMgPSBtZXNzYWdlLk1lc3NhZ2VCb2R5Lm1zZ2NvbnRlbnRcbiAgICAgICAgICAgICAgICBpbm5lckF1ZGlvQ29udGV4dC5vbkVuZGVkKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaW5uZXJBdWRpb0NvbnRleHQuc3RvcCgpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBpbm5lckF1ZGlvQ29udGV4dC5vbkVycm9yKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmVyck1zZylcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmVyckNvZGUpXG4gICAgICAgICAgICAgICAgICAgIGlubmVyQXVkaW9Db250ZXh0LnN0b3AoKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgaW5uZXJBdWRpb0NvbnRleHQucGxheSgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGxheVZpZGVvKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdwcmV2aWV3LWltYWdlJywgbWVzc2FnZSlcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvcHJhY3RpY2UvcGFnZXMvcGxheVZpZGVvP3VybD0nICsgbWVzc2FnZS5NZXNzYWdlQm9keS5tc2djb250ZW50XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcmV2aWV3SW1hZ2UobWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ3ByZXZpZXctaW1hZ2UnLCBtZXNzYWdlKVxuICAgICAgICAgICAgICAgIHdlcHkucHJldmlld0ltYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsczogW21lc3NhZ2UuTWVzc2FnZUJvZHkubXNnY29udGVudF1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1vcmVBY3Rpb25zKG1zZ0RhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtc2dEYXRhKVxuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2hpZGUtb3RoZXItYWN0aW9ucycsIG1zZ0RhdGEpXG4gICAgICAgICAgICAgICAgdGhpcy4kbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBtc2dEYXRhLmlzU2hvd01vcmUgPSB0cnVlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBtc2dEYXRhLmlzU2hvd01vcmUgPSB0cnVlXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobXNnRGF0YSlcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29weSgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tc2dEYXRhLk1lc3NhZ2VCb2R5Lm1zZ3R5cGUgPT09ICcxJykge1xuICAgICAgICAgICAgICAgICAgICB3ZXB5LnNldENsaXBib2FyZERhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy5tc2dEYXRhLk1lc3NhZ2VCb2R5Lm1zZ2NvbnRlbnRcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVsZXRlTXNnKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2RlbGV0ZS1tc2cnLCB0aGlzLm1zZ0RhdGEpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBldmVudHMgPSB7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIG9uTG9hZCgpIHt9XG4gICAgfVxuIl19