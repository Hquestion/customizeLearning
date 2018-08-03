'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlayVideo = function (_wepy$page) {
    _inherits(PlayVideo, _wepy$page);

    function PlayVideo() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, PlayVideo);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PlayVideo.__proto__ || Object.getPrototypeOf(PlayVideo)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '视频'
        }, _this.data = {
            userInfo: null,
            playUrl: ''
        }, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(PlayVideo, [{
        key: 'onLoad',
        value: function onLoad(option) {
            this.playUrl = option.url;
        }
    }]);

    return PlayVideo;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(PlayVideo , 'practice/pages/playVideo'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsYXlWaWRlby5qcyJdLCJuYW1lcyI6WyJQbGF5VmlkZW8iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInVzZXJJbmZvIiwicGxheVVybCIsIm1ldGhvZHMiLCJvcHRpb24iLCJ1cmwiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0k7Ozs7Ozs7Ozs7OztJQUVxQkEsUzs7Ozs7Ozs7Ozs7Ozs7Z01BQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFJVEMsSSxHQUFPO0FBQ0hDLHNCQUFVLElBRFA7QUFFSEMscUJBQVM7QUFGTixTLFFBS1BDLE8sR0FBVSxFOzs7OzsrQkFJSEMsTSxFQUFRO0FBQ1gsaUJBQUtGLE9BQUwsR0FBZUUsT0FBT0MsR0FBdEI7QUFDSDs7OztFQWhCa0NDLGVBQUtDLEk7O2tCQUF2QlYsUyIsImZpbGUiOiJwbGF5VmlkZW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gICAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheVZpZGVvIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICAgICAgY29uZmlnID0ge1xuICAgICAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+inhumikSdcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICB1c2VySW5mbzogbnVsbCxcbiAgICAgICAgICAgIHBsYXlVcmw6ICcnXG4gICAgICAgIH1cblxuICAgICAgICBtZXRob2RzID0ge1xuXG4gICAgICAgIH1cblxuICAgICAgICBvbkxvYWQob3B0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXlVcmwgPSBvcHRpb24udXJsXG4gICAgICAgIH1cbiAgICB9XG4iXX0=