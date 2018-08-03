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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlYWNoZXItY291cnNlLXRhc2suanMiXSwibmFtZXMiOlsiVGVhY2hlckNvdXJzZVRhc2siLCJwcm9wcyIsInRhc2tJbmZvIiwibWV0aG9kcyIsIkNoZWNrQ291cnNlIiwiJGVtaXQiLCJjb25zb2xlIiwibG9nIiwid2VweSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0k7Ozs7Ozs7Ozs7OztJQUVxQkEsaUI7Ozs7Ozs7Ozs7Ozs7O2dOQUNqQkMsSyxHQUFRO0FBQ0pDLHNCQUFVO0FBRE4sUyxRQUlSQyxPLEdBQVU7QUFDTkMsdUJBRE0sdUJBQ01GLFFBRE4sRUFDZ0I7QUFDbEIscUJBQUtHLEtBQUwsQ0FBVyxzQkFBWCxFQUFtQ0gsUUFBbkM7QUFDSDtBQUhLLFM7Ozs7O2lDQU1EO0FBQ0xJLG9CQUFRQyxHQUFSLENBQVksSUFBWjtBQUNIOzs7O0VBYjBDQyxlQUFLQyxTOztrQkFBL0JULGlCIiwiZmlsZSI6InRlYWNoZXItY291cnNlLXRhc2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gICAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVhY2hlckNvdXJzZVRhc2sgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gICAgICAgIHByb3BzID0ge1xuICAgICAgICAgICAgdGFza0luZm86IHt9XG4gICAgICAgIH1cblxuICAgICAgICBtZXRob2RzID0ge1xuICAgICAgICAgICAgQ2hlY2tDb3Vyc2UodGFza0luZm8pIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCd0ZWFjaGVyLWNoZWNrLWNvdXJzZScsIHRhc2tJbmZvKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgb25Mb2FkKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcylcbiAgICAgICAgfVxuICAgIH1cbiJdfQ==