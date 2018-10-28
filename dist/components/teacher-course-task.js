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

var TeacherCourseTask = function (_wepy$component) {
    _inherits(TeacherCourseTask, _wepy$component);

    function TeacherCourseTask() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, TeacherCourseTask);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TeacherCourseTask.__proto__ || Object.getPrototypeOf(TeacherCourseTask)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
            taskInfo: {}
        }, _this.methods = {
            CheckCourse: function CheckCourse(taskInfo) {
                this.$emit('teacher-check-course', taskInfo);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(TeacherCourseTask, [{
        key: 'onLoad',
        value: function onLoad() {
            console.log(this);
        }
    }]);

    return TeacherCourseTask;
}(_wepy2.default.component);

exports.default = TeacherCourseTask;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlYWNoZXItY291cnNlLXRhc2suanMiXSwibmFtZXMiOlsiVGVhY2hlckNvdXJzZVRhc2siLCJwcm9wcyIsInRhc2tJbmZvIiwibWV0aG9kcyIsIkNoZWNrQ291cnNlIiwiJGVtaXQiLCJjb25zb2xlIiwibG9nIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDSTs7Ozs7Ozs7Ozs7O0lBRXFCQSxpQjs7Ozs7Ozs7Ozs7Ozs7Z05BQ2pCQyxLLEdBQVE7QUFDSkMsc0JBQVU7QUFETixTLFFBSVJDLE8sR0FBVTtBQUNOQyx1QkFETSx1QkFDTUYsUUFETixFQUNnQjtBQUNsQixxQkFBS0csS0FBTCxDQUFXLHNCQUFYLEVBQW1DSCxRQUFuQztBQUNIO0FBSEssUzs7Ozs7aUNBTUQ7QUFDTEksb0JBQVFDLEdBQVIsQ0FBWSxJQUFaO0FBQ0g7Ozs7RUFiMEMsZUFBS0MsUzs7a0JBQS9CUixpQiIsImZpbGUiOiJ0ZWFjaGVyLWNvdXJzZS10YXNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5cclxuICAgIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlYWNoZXJDb3Vyc2VUYXNrIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gICAgICAgIHByb3BzID0ge1xyXG4gICAgICAgICAgICB0YXNrSW5mbzoge31cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgICAgIENoZWNrQ291cnNlKHRhc2tJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCd0ZWFjaGVyLWNoZWNrLWNvdXJzZScsIHRhc2tJbmZvKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4iXX0=