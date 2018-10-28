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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoYXRNZXNzYWdlLmpzIl0sIm5hbWVzIjpbIkNoYXRNZXNzYWdlIiwicHJvcHMiLCJpZCIsIm1zZ0RhdGEiLCJpc1NlbGYiLCJpc1Nob3dNb3JlIiwidHdvV2F5IiwiZWRpdGFibGUiLCJkZWZhdWx0IiwibWV0aG9kcyIsInBsYXlBdWRpbyIsIm1lc3NhZ2UiLCJpbm5lckF1ZGlvQ29udGV4dCIsImNyZWF0ZUlubmVyQXVkaW9Db250ZXh0IiwiYXV0b3BsYXkiLCJzcmMiLCJNZXNzYWdlQm9keSIsIm1zZ2NvbnRlbnQiLCJvbkVuZGVkIiwic3RvcCIsIm9uRXJyb3IiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwiZXJyTXNnIiwiZXJyQ29kZSIsInBsYXkiLCJwbGF5VmlkZW8iLCIkZW1pdCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJwcmV2aWV3SW1hZ2UiLCJ1cmxzIiwibW9yZUFjdGlvbnMiLCIkbmV4dFRpY2siLCIkYXBwbHkiLCJjb3B5IiwibXNndHlwZSIsInNldENsaXBib2FyZERhdGEiLCJkYXRhIiwiZGVsZXRlTXNnIiwiZXZlbnRzIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDSTs7Ozs7Ozs7Ozs7O0lBRXFCQSxXOzs7Ozs7Ozs7Ozs7OztvTUFDakJDLEssR0FBUTtBQUNKQyxnQkFBSSxFQURBO0FBRUpDLHFCQUFTLEVBRkw7QUFHSkMsb0JBQVEsRUFISjtBQUlKQyx3QkFBWTtBQUNSQyx3QkFBUTtBQURBLGFBSlI7QUFPSkMsc0JBQVU7QUFDTkMseUJBQVM7QUFESDtBQVBOLFMsUUFZUkMsTyxHQUFVO0FBQ05DLHFCQURNLHFCQUNJQyxPQURKLEVBQ2E7QUFDZixvQkFBTUMsb0JBQW9CLGVBQUtDLHVCQUFMLEVBQTFCO0FBQ0FELGtDQUFrQkUsUUFBbEIsR0FBNkIsS0FBN0I7QUFDQUYsa0NBQWtCRyxHQUFsQixHQUF3QkosUUFBUUssV0FBUixDQUFvQkMsVUFBNUM7QUFDQUwsa0NBQWtCTSxPQUFsQixDQUEwQixZQUFNO0FBQzVCTixzQ0FBa0JPLElBQWxCO0FBQ0gsaUJBRkQ7QUFHQVAsa0NBQWtCUSxPQUFsQixDQUEwQixVQUFDQyxHQUFELEVBQVM7QUFDL0JDLDRCQUFRQyxHQUFSLENBQVlGLElBQUlHLE1BQWhCO0FBQ0FGLDRCQUFRQyxHQUFSLENBQVlGLElBQUlJLE9BQWhCO0FBQ0FiLHNDQUFrQk8sSUFBbEI7QUFDSCxpQkFKRDtBQUtBUCxrQ0FBa0JjLElBQWxCO0FBQ0gsYUFkSztBQWVOQyxxQkFmTSxxQkFlSWhCLE9BZkosRUFlYTtBQUNmLHFCQUFLaUIsS0FBTCxDQUFXLGVBQVgsRUFBNEJqQixPQUE1QjtBQUNBLCtCQUFLa0IsVUFBTCxDQUFnQjtBQUNaQyx5QkFBSyxtQ0FBbUNuQixRQUFRSyxXQUFSLENBQW9CQztBQURoRCxpQkFBaEI7QUFHSCxhQXBCSztBQXFCTmMsd0JBckJNLHdCQXFCT3BCLE9BckJQLEVBcUJnQjtBQUNsQixxQkFBS2lCLEtBQUwsQ0FBVyxlQUFYLEVBQTRCakIsT0FBNUI7QUFDQSwrQkFBS29CLFlBQUwsQ0FBa0I7QUFDZEMsMEJBQU0sQ0FBQ3JCLFFBQVFLLFdBQVIsQ0FBb0JDLFVBQXJCO0FBRFEsaUJBQWxCO0FBR0gsYUExQks7QUEyQk5nQix1QkEzQk0sdUJBMkJNOUIsT0EzQk4sRUEyQmU7QUFDakJtQix3QkFBUUMsR0FBUixDQUFZcEIsT0FBWjtBQUNBLHFCQUFLeUIsS0FBTCxDQUFXLG9CQUFYLEVBQWlDekIsT0FBakM7QUFDQSxxQkFBSytCLFNBQUwsQ0FBZSxZQUFNO0FBQ2pCL0IsNEJBQVFFLFVBQVIsR0FBcUIsSUFBckI7QUFDSCxpQkFGRDtBQUdBRix3QkFBUUUsVUFBUixHQUFxQixJQUFyQjtBQUNBaUIsd0JBQVFDLEdBQVIsQ0FBWXBCLE9BQVo7QUFDQSxxQkFBS2dDLE1BQUw7QUFDSCxhQXBDSztBQXFDTkMsZ0JBckNNLGtCQXFDQztBQUNILG9CQUFJLEtBQUtqQyxPQUFMLENBQWFhLFdBQWIsQ0FBeUJxQixPQUF6QixLQUFxQyxHQUF6QyxFQUE4QztBQUMxQyxtQ0FBS0MsZ0JBQUwsQ0FBc0I7QUFDbEJDLDhCQUFNLEtBQUtwQyxPQUFMLENBQWFhLFdBQWIsQ0FBeUJDO0FBRGIscUJBQXRCO0FBR0g7QUFDSixhQTNDSztBQTRDTnVCLHFCQTVDTSx1QkE0Q007QUFDUixxQkFBS1osS0FBTCxDQUFXLFlBQVgsRUFBeUIsS0FBS3pCLE9BQTlCO0FBQ0g7QUE5Q0ssUyxRQWlEVnNDLE0sR0FBUyxFOzs7OztpQ0FJQSxDQUFFOzs7O0VBbEUwQixlQUFLQyxTOztrQkFBekIxQyxXIiwiZmlsZSI6ImNoYXRNZXNzYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5cclxuICAgIGV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYXRNZXNzYWdlIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gICAgICAgIHByb3BzID0ge1xyXG4gICAgICAgICAgICBpZDoge30sXHJcbiAgICAgICAgICAgIG1zZ0RhdGE6IHt9LFxyXG4gICAgICAgICAgICBpc1NlbGY6IHt9LFxyXG4gICAgICAgICAgICBpc1Nob3dNb3JlOiB7XHJcbiAgICAgICAgICAgICAgICB0d29XYXk6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZWRpdGFibGU6IHtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbWV0aG9kcyA9IHtcclxuICAgICAgICAgICAgcGxheUF1ZGlvKG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlubmVyQXVkaW9Db250ZXh0ID0gd2VweS5jcmVhdGVJbm5lckF1ZGlvQ29udGV4dCgpXHJcbiAgICAgICAgICAgICAgICBpbm5lckF1ZGlvQ29udGV4dC5hdXRvcGxheSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICBpbm5lckF1ZGlvQ29udGV4dC5zcmMgPSBtZXNzYWdlLk1lc3NhZ2VCb2R5Lm1zZ2NvbnRlbnRcclxuICAgICAgICAgICAgICAgIGlubmVyQXVkaW9Db250ZXh0Lm9uRW5kZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlubmVyQXVkaW9Db250ZXh0LnN0b3AoKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGlubmVyQXVkaW9Db250ZXh0Lm9uRXJyb3IoKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5lcnJNc2cpXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmVyckNvZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgaW5uZXJBdWRpb0NvbnRleHQuc3RvcCgpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgaW5uZXJBdWRpb0NvbnRleHQucGxheSgpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBsYXlWaWRlbyhtZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdwcmV2aWV3LWltYWdlJywgbWVzc2FnZSlcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL3ByYWN0aWNlL3BhZ2VzL3BsYXlWaWRlbz91cmw9JyArIG1lc3NhZ2UuTWVzc2FnZUJvZHkubXNnY29udGVudFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcHJldmlld0ltYWdlKG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ3ByZXZpZXctaW1hZ2UnLCBtZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgd2VweS5wcmV2aWV3SW1hZ2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybHM6IFttZXNzYWdlLk1lc3NhZ2VCb2R5Lm1zZ2NvbnRlbnRdXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBtb3JlQWN0aW9ucyhtc2dEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtc2dEYXRhKVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnaGlkZS1vdGhlci1hY3Rpb25zJywgbXNnRGF0YSlcclxuICAgICAgICAgICAgICAgIHRoaXMuJG5leHRUaWNrKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBtc2dEYXRhLmlzU2hvd01vcmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgbXNnRGF0YS5pc1Nob3dNb3JlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobXNnRGF0YSlcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29weSgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1zZ0RhdGEuTWVzc2FnZUJvZHkubXNndHlwZSA9PT0gJzEnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zZXRDbGlwYm9hcmREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy5tc2dEYXRhLk1lc3NhZ2VCb2R5Lm1zZ2NvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkZWxldGVNc2coKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdkZWxldGUtbXNnJywgdGhpcy5tc2dEYXRhKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBldmVudHMgPSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25Mb2FkKCkge31cclxuICAgIH1cclxuIl19