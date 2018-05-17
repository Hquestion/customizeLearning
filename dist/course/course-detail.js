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

var CourseDetail = function (_wepy$page) {
    _inherits(CourseDetail, _wepy$page);

    function CourseDetail() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, CourseDetail);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CourseDetail.__proto__ || Object.getPrototypeOf(CourseDetail)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '课程详情'
        }, _this.data = {
            userInfo: null,
            courseId: ''
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(CourseDetail, [{
        key: 'onLoad',
        value: function onLoad(option) {
            this.courseId = option.courseid;
        }
    }]);

    return CourseDetail;
}(_wepy2.default.page);

exports.default = CourseDetail;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdXJzZS1kZXRhaWwuanMiXSwibmFtZXMiOlsiQ291cnNlRGV0YWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1c2VySW5mbyIsImNvdXJzZUlkIiwib3B0aW9uIiwiY291cnNlaWQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDSTs7Ozs7Ozs7Ozs7O0lBRXFCQSxZOzs7Ozs7Ozs7Ozs7OztzTUFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUlUQyxJLEdBQU87QUFDSEMsc0JBQVUsSUFEUDtBQUVIQyxzQkFBVTtBQUZQLFM7Ozs7OytCQUtBQyxNLEVBQVE7QUFDWCxpQkFBS0QsUUFBTCxHQUFnQkMsT0FBT0MsUUFBdkI7QUFDSDs7OztFQVpxQyxlQUFLQyxJOztrQkFBMUJSLFkiLCJmaWxlIjoiY291cnNlLWRldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgICBleHBvcnQgZGVmYXVsdCBjbGFzcyBDb3Vyc2VEZXRhaWwgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgICAgICBjb25maWcgPSB7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6K++56iL6K+m5oOFJ1xuICAgICAgICB9XG5cbiAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgIHVzZXJJbmZvOiBudWxsLFxuICAgICAgICAgICAgY291cnNlSWQ6ICcnXG4gICAgICAgIH1cblxuICAgICAgICBvbkxvYWQob3B0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmNvdXJzZUlkID0gb3B0aW9uLmNvdXJzZWlkXG4gICAgICAgIH1cbiAgICB9XG4iXX0=