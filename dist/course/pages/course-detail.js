'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _richButton = require('./../../components/rich-button.js');

var _richButton2 = _interopRequireDefault(_richButton);

var _courseDetail = require('./../../components/course-detail.js');

var _courseDetail2 = _interopRequireDefault(_courseDetail);

var _api = require('./../../api/index.js');

var _util = require('./../../util/index.js');

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
        }, _this.$repeat = {}, _this.$props = { "rich-button": { "v-bind:text.sync": "buttonText", "xmlns:v-on": "", "v-bind:theme.sync": "buttonTheme" }, "course-detail": { "xmlns:v-bind": "", "v-bind:courseInfo.sync": "courseInfo" } }, _this.$events = { "rich-button": { "v-on:tap": "selectClassmates" } }, _this.components = {
            'rich-button': _richButton2.default,
            'course-detail': _courseDetail2.default
        }, _this.data = {
            userInfo: null,
            courseId: '',
            courseInfo: null,
            stuFinishList: [],
            buttonText: '',
            canCreateGroup: false
        }, _this.methods = {
            selectClassmates: function selectClassmates() {
                // 校验该学生是否在该课程的某一个任务中，如果在任务中则无法创建
                if (this.canCreateGroup) {
                    _wepy2.default.navigateTo({
                        url: '/course/pages/selectClassmates?courseId=' + this.courseId
                    });
                }
            }
        }, _this.computed = {
            buttonTheme: function buttonTheme() {
                return this.canCreateGroup ? 'green' : 'grey';
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(CourseDetail, [{
        key: 'init',
        value: function init() {
            var _this2 = this;

            (0, _api.getCourseDetailById)(this.courseId).then(function (res) {
                _this2.courseInfo = res;
                _this2.courseInfo.showCreateTime = (0, _util.parseTime)(_this2.courseInfo.CreateTime);
                _this2.courseInfo.showOpenStartTime = (0, _util.parseTime)(_this2.courseInfo.OpenStartTime);
                _this2.courseInfo.showOpenEndTime = (0, _util.parseTime)(_this2.courseInfo.OpenEndTime);
                _this2.$apply();
            });

            (0, _api.getSuccessTasksByCourseId)(this.courseId).then(function (res) {
                _this2.stuFinishList = res || [];
                _this2.stuFinishList.forEach(function (item) {
                    item.showCompleteDate = (0, _util.parseTime)(item.CompleteDate);
                });
                _this2.$apply();
            }, function (res) {
                _this2.stuFinishList = [];
                _this2.$apply();
            });

            (0, _api.isStuInCourseGroup)(this.$parent.globalData.userInfo.FlnkID, this.courseId).then(function (res) {
                if (res) {
                    _this2.buttonText = '我已加入小组';
                    _this2.canCreateGroup = false;
                } else {
                    _this2.buttonText = '我要创建小组';
                    _this2.canCreateGroup = true;
                }
                _this2.$apply();
            }, function (res) {
                _this2.buttonText = '我要创建小组';
                _this2.canCreateGroup = true;
                _this2.$apply();
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad(option) {
            this.courseId = option.courseId;
            this.init();
        }
    }]);

    return CourseDetail;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(CourseDetail , 'course/pages/course-detail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdXJzZS1kZXRhaWwuanMiXSwibmFtZXMiOlsiQ291cnNlRGV0YWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInJpY2hCdXR0b24iLCJjb3Vyc2VEZXRhaWwiLCJkYXRhIiwidXNlckluZm8iLCJjb3Vyc2VJZCIsImNvdXJzZUluZm8iLCJzdHVGaW5pc2hMaXN0IiwiYnV0dG9uVGV4dCIsImNhbkNyZWF0ZUdyb3VwIiwibWV0aG9kcyIsInNlbGVjdENsYXNzbWF0ZXMiLCJ3ZXB5IiwibmF2aWdhdGVUbyIsInVybCIsImNvbXB1dGVkIiwiYnV0dG9uVGhlbWUiLCJ0aGVuIiwicmVzIiwic2hvd0NyZWF0ZVRpbWUiLCJDcmVhdGVUaW1lIiwic2hvd09wZW5TdGFydFRpbWUiLCJPcGVuU3RhcnRUaW1lIiwic2hvd09wZW5FbmRUaW1lIiwiT3BlbkVuZFRpbWUiLCIkYXBwbHkiLCJmb3JFYWNoIiwiaXRlbSIsInNob3dDb21wbGV0ZURhdGUiLCJDb21wbGV0ZURhdGUiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsIkZsbmtJRCIsIm9wdGlvbiIsImluaXQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDSTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7OztJQUVxQkEsWTs7Ozs7Ozs7Ozs7Ozs7c01BQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFJVkMsTyxHQUFVLEUsUUFDakJDLE0sR0FBUyxFQUFDLGVBQWMsRUFBQyxvQkFBbUIsWUFBcEIsRUFBaUMsY0FBYSxFQUE5QyxFQUFpRCxxQkFBb0IsYUFBckUsRUFBZixFQUFtRyxpQkFBZ0IsRUFBQyxnQkFBZSxFQUFoQixFQUFtQiwwQkFBeUIsWUFBNUMsRUFBbkgsRSxRQUNUQyxPLEdBQVUsRUFBQyxlQUFjLEVBQUMsWUFBVyxrQkFBWixFQUFmLEUsUUFDVEMsVSxHQUFhO0FBQ0YsMkJBQWVDLG9CQURiO0FBRUYsNkJBQWlCQztBQUZmLFMsUUFLTkMsSSxHQUFPO0FBQ0hDLHNCQUFVLElBRFA7QUFFSEMsc0JBQVUsRUFGUDtBQUdIQyx3QkFBWSxJQUhUO0FBSUhDLDJCQUFlLEVBSlo7QUFLSEMsd0JBQVksRUFMVDtBQU1IQyw0QkFBZ0I7QUFOYixTLFFBU1BDLE8sR0FBVTtBQUNOQyw0QkFETSw4QkFDYTtBQUNmO0FBQ0Esb0JBQUksS0FBS0YsY0FBVCxFQUF5QjtBQUNyQkcsbUNBQUtDLFVBQUwsQ0FBZ0I7QUFDWkMsNkJBQUssNkNBQTZDLEtBQUtUO0FBRDNDLHFCQUFoQjtBQUdIO0FBQ0o7QUFSSyxTLFFBV1ZVLFEsR0FBVztBQUNQQyx1QkFETyx5QkFDTztBQUNWLHVCQUFPLEtBQUtQLGNBQUwsR0FBc0IsT0FBdEIsR0FBZ0MsTUFBdkM7QUFDSDtBQUhNLFM7Ozs7OytCQU1KO0FBQUE7O0FBQ0gsMENBQW9CLEtBQUtKLFFBQXpCLEVBQW1DWSxJQUFuQyxDQUF3QyxlQUFPO0FBQzNDLHVCQUFLWCxVQUFMLEdBQWtCWSxHQUFsQjtBQUNBLHVCQUFLWixVQUFMLENBQWdCYSxjQUFoQixHQUFpQyxxQkFBVSxPQUFLYixVQUFMLENBQWdCYyxVQUExQixDQUFqQztBQUNBLHVCQUFLZCxVQUFMLENBQWdCZSxpQkFBaEIsR0FBb0MscUJBQVUsT0FBS2YsVUFBTCxDQUFnQmdCLGFBQTFCLENBQXBDO0FBQ0EsdUJBQUtoQixVQUFMLENBQWdCaUIsZUFBaEIsR0FBa0MscUJBQVUsT0FBS2pCLFVBQUwsQ0FBZ0JrQixXQUExQixDQUFsQztBQUNBLHVCQUFLQyxNQUFMO0FBQ0gsYUFORDs7QUFRQSxnREFBMEIsS0FBS3BCLFFBQS9CLEVBQXlDWSxJQUF6QyxDQUE4QyxlQUFPO0FBQ2pELHVCQUFLVixhQUFMLEdBQXFCVyxPQUFPLEVBQTVCO0FBQ0EsdUJBQUtYLGFBQUwsQ0FBbUJtQixPQUFuQixDQUEyQixnQkFBUTtBQUMvQkMseUJBQUtDLGdCQUFMLEdBQXdCLHFCQUFVRCxLQUFLRSxZQUFmLENBQXhCO0FBQ0gsaUJBRkQ7QUFHQSx1QkFBS0osTUFBTDtBQUNILGFBTkQsRUFNRyxlQUFPO0FBQ04sdUJBQUtsQixhQUFMLEdBQXFCLEVBQXJCO0FBQ0EsdUJBQUtrQixNQUFMO0FBQ0gsYUFURDs7QUFXQSx5Q0FBbUIsS0FBS0ssT0FBTCxDQUFhQyxVQUFiLENBQXdCM0IsUUFBeEIsQ0FBaUM0QixNQUFwRCxFQUE0RCxLQUFLM0IsUUFBakUsRUFBMkVZLElBQTNFLENBQWdGLGVBQU87QUFDbkYsb0JBQUlDLEdBQUosRUFBUztBQUNMLDJCQUFLVixVQUFMLEdBQWtCLFFBQWxCO0FBQ0EsMkJBQUtDLGNBQUwsR0FBc0IsS0FBdEI7QUFDSCxpQkFIRCxNQUdPO0FBQ0gsMkJBQUtELFVBQUwsR0FBa0IsUUFBbEI7QUFDQSwyQkFBS0MsY0FBTCxHQUFzQixJQUF0QjtBQUNIO0FBQ0QsdUJBQUtnQixNQUFMO0FBQ0gsYUFURCxFQVNHLGVBQU87QUFDTix1QkFBS2pCLFVBQUwsR0FBa0IsUUFBbEI7QUFDQSx1QkFBS0MsY0FBTCxHQUFzQixJQUF0QjtBQUNBLHVCQUFLZ0IsTUFBTDtBQUNILGFBYkQ7QUFjSDs7OytCQUVNUSxNLEVBQVE7QUFDWCxpQkFBSzVCLFFBQUwsR0FBZ0I0QixPQUFPNUIsUUFBdkI7QUFDQSxpQkFBSzZCLElBQUw7QUFDSDs7OztFQTlFcUN0QixlQUFLdUIsSTs7a0JBQTFCekMsWSIsImZpbGUiOiJjb3Vyc2UtZGV0YWlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgICBpbXBvcnQgcmljaEJ1dHRvbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL3JpY2gtYnV0dG9uJ1xuICAgIGltcG9ydCBjb3Vyc2VEZXRhaWwgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb3Vyc2UtZGV0YWlsJ1xuXG4gICAgaW1wb3J0IHtnZXRDb3Vyc2VEZXRhaWxCeUlkLCBnZXRTdWNjZXNzVGFza3NCeUNvdXJzZUlkLCBpc1N0dUluQ291cnNlR3JvdXB9IGZyb20gJy4uLy4uL2FwaSdcbiAgICBpbXBvcnQge3BhcnNlVGltZX0gZnJvbSAnLi4vLi4vdXRpbCdcblxuICAgIGV4cG9ydCBkZWZhdWx0IGNsYXNzIENvdXJzZURldGFpbCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgICAgIGNvbmZpZyA9IHtcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfor77nqIvor6bmg4UnXG4gICAgICAgIH1cblxuICAgICAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wicmljaC1idXR0b25cIjp7XCJ2LWJpbmQ6dGV4dC5zeW5jXCI6XCJidXR0b25UZXh0XCIsXCJ4bWxuczp2LW9uXCI6XCJcIixcInYtYmluZDp0aGVtZS5zeW5jXCI6XCJidXR0b25UaGVtZVwifSxcImNvdXJzZS1kZXRhaWxcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmNvdXJzZUluZm8uc3luY1wiOlwiY291cnNlSW5mb1wifX07XHJcbiRldmVudHMgPSB7XCJyaWNoLWJ1dHRvblwiOntcInYtb246dGFwXCI6XCJzZWxlY3RDbGFzc21hdGVzXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICAgICAgICAncmljaC1idXR0b24nOiByaWNoQnV0dG9uLFxuICAgICAgICAgICAgJ2NvdXJzZS1kZXRhaWwnOiBjb3Vyc2VEZXRhaWxcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICB1c2VySW5mbzogbnVsbCxcbiAgICAgICAgICAgIGNvdXJzZUlkOiAnJyxcbiAgICAgICAgICAgIGNvdXJzZUluZm86IG51bGwsXG4gICAgICAgICAgICBzdHVGaW5pc2hMaXN0OiBbXSxcbiAgICAgICAgICAgIGJ1dHRvblRleHQ6ICcnLFxuICAgICAgICAgICAgY2FuQ3JlYXRlR3JvdXA6IGZhbHNlXG4gICAgICAgIH1cblxuICAgICAgICBtZXRob2RzID0ge1xuICAgICAgICAgICAgc2VsZWN0Q2xhc3NtYXRlcygpIHtcbiAgICAgICAgICAgICAgICAvLyDmoKHpqozor6XlrabnlJ/mmK/lkKblnKjor6Xor77nqIvnmoTmn5DkuIDkuKrku7vliqHkuK3vvIzlpoLmnpzlnKjku7vliqHkuK3liJnml6Dms5XliJvlu7pcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYW5DcmVhdGVHcm91cCkge1xuICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnL2NvdXJzZS9wYWdlcy9zZWxlY3RDbGFzc21hdGVzP2NvdXJzZUlkPScgKyB0aGlzLmNvdXJzZUlkXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29tcHV0ZWQgPSB7XG4gICAgICAgICAgICBidXR0b25UaGVtZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYW5DcmVhdGVHcm91cCA/ICdncmVlbicgOiAnZ3JleSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGluaXQoKSB7XG4gICAgICAgICAgICBnZXRDb3Vyc2VEZXRhaWxCeUlkKHRoaXMuY291cnNlSWQpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvdXJzZUluZm8gPSByZXNcbiAgICAgICAgICAgICAgICB0aGlzLmNvdXJzZUluZm8uc2hvd0NyZWF0ZVRpbWUgPSBwYXJzZVRpbWUodGhpcy5jb3Vyc2VJbmZvLkNyZWF0ZVRpbWUpXG4gICAgICAgICAgICAgICAgdGhpcy5jb3Vyc2VJbmZvLnNob3dPcGVuU3RhcnRUaW1lID0gcGFyc2VUaW1lKHRoaXMuY291cnNlSW5mby5PcGVuU3RhcnRUaW1lKVxuICAgICAgICAgICAgICAgIHRoaXMuY291cnNlSW5mby5zaG93T3BlbkVuZFRpbWUgPSBwYXJzZVRpbWUodGhpcy5jb3Vyc2VJbmZvLk9wZW5FbmRUaW1lKVxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGdldFN1Y2Nlc3NUYXNrc0J5Q291cnNlSWQodGhpcy5jb3Vyc2VJZCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc3R1RmluaXNoTGlzdCA9IHJlcyB8fCBbXVxuICAgICAgICAgICAgICAgIHRoaXMuc3R1RmluaXNoTGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnNob3dDb21wbGV0ZURhdGUgPSBwYXJzZVRpbWUoaXRlbS5Db21wbGV0ZURhdGUpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICB9LCByZXMgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc3R1RmluaXNoTGlzdCA9IFtdXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgaXNTdHVJbkNvdXJzZUdyb3VwKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvLkZsbmtJRCwgdGhpcy5jb3Vyc2VJZCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b25UZXh0ID0gJ+aIkeW3suWKoOWFpeWwj+e7hCdcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW5DcmVhdGVHcm91cCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b25UZXh0ID0gJ+aIkeimgeWIm+W7uuWwj+e7hCdcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW5DcmVhdGVHcm91cCA9IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgfSwgcmVzID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvblRleHQgPSAn5oiR6KaB5Yib5bu65bCP57uEJ1xuICAgICAgICAgICAgICAgIHRoaXMuY2FuQ3JlYXRlR3JvdXAgPSB0cnVlXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIG9uTG9hZChvcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuY291cnNlSWQgPSBvcHRpb24uY291cnNlSWRcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpXG4gICAgICAgIH1cbiAgICB9XG4iXX0=