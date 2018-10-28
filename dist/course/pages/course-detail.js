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

var _panel = require('./../../components/panel.js');

var _panel2 = _interopRequireDefault(_panel);

var _wxParse = require('./../../wxParse/wxParse.js');

var _wxParse2 = _interopRequireDefault(_wxParse);

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
        }, _this.$repeat = {}, _this.$props = { "rich-button": { "v-bind:text.sync": "buttonText", "xmlns:v-on": "", "v-bind:theme.sync": "buttonTheme" }, "course-detail": { "xmlns:v-bind": "", "v-bind:courseInfo.sync": "courseInfo" }, "panel": { "class": "prev-know-panel" } }, _this.$events = { "rich-button": { "v-on:tap": "selectClassmates" } }, _this.components = {
            'rich-button': _richButton2.default,
            'course-detail': _courseDetail2.default,
            'panel': _panel2.default
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

            (0, _api.getPrevKnowByCourse)(this.courseId).then(function (res) {
                _this2.prevKnowContent = res.KnowContent;
                _wxParse2.default.wxParse('knowContent', 'html', res.KnowContent, _this2, 5);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdXJzZS1kZXRhaWwuanMiXSwibmFtZXMiOlsiQ291cnNlRGV0YWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImRhdGEiLCJ1c2VySW5mbyIsImNvdXJzZUlkIiwiY291cnNlSW5mbyIsInN0dUZpbmlzaExpc3QiLCJidXR0b25UZXh0IiwiY2FuQ3JlYXRlR3JvdXAiLCJtZXRob2RzIiwic2VsZWN0Q2xhc3NtYXRlcyIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjb21wdXRlZCIsImJ1dHRvblRoZW1lIiwidGhlbiIsInJlcyIsInNob3dDcmVhdGVUaW1lIiwiQ3JlYXRlVGltZSIsInNob3dPcGVuU3RhcnRUaW1lIiwiT3BlblN0YXJ0VGltZSIsInNob3dPcGVuRW5kVGltZSIsIk9wZW5FbmRUaW1lIiwiJGFwcGx5IiwicHJldktub3dDb250ZW50IiwiS25vd0NvbnRlbnQiLCJ3eFBhcnNlIiwiZm9yRWFjaCIsIml0ZW0iLCJzaG93Q29tcGxldGVEYXRlIiwiQ29tcGxldGVEYXRlIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJGbG5rSUQiLCJvcHRpb24iLCJpbml0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0k7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7O0lBRXFCQSxZOzs7Ozs7Ozs7Ozs7OztzTUFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUlWQyxPLEdBQVUsRSxRQUNqQkMsTSxHQUFTLEVBQUMsZUFBYyxFQUFDLG9CQUFtQixZQUFwQixFQUFpQyxjQUFhLEVBQTlDLEVBQWlELHFCQUFvQixhQUFyRSxFQUFmLEVBQW1HLGlCQUFnQixFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLDBCQUF5QixZQUE1QyxFQUFuSCxFQUE2SyxTQUFRLEVBQUMsU0FBUSxpQkFBVCxFQUFyTCxF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dCI6WyJcclxuICAgIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgICBpbXBvcnQgcmljaEJ1dHRvbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL3JpY2gtYnV0dG9uJ1xyXG4gICAgaW1wb3J0IGNvdXJzZURldGFpbCBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvdXJzZS1kZXRhaWwnXHJcbiAgICBpbXBvcnQgcGFuZWwgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9wYW5lbCdcclxuICAgIGltcG9ydCBXeFBhcnNlIGZyb20gJy4uLy4uL3d4UGFyc2Uvd3hQYXJzZS5qcydcclxuXHJcbiAgICBpbXBvcnQge2dldENvdXJzZURldGFpbEJ5SWQsIGdldFN1Y2Nlc3NUYXNrc0J5Q291cnNlSWQsIGlzU3R1SW5Db3Vyc2VHcm91cCwgZ2V0UHJldktub3dCeUNvdXJzZX0gZnJvbSAnLi4vLi4vYXBpJ1xyXG4gICAgaW1wb3J0IHtwYXJzZVRpbWV9IGZyb20gJy4uLy4uL3V0aWwnXHJcblxyXG4gICAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ291cnNlRGV0YWlsIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgICAgICBjb25maWcgPSB7XHJcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfor77nqIvor6bmg4UnXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wicmljaC1idXR0b25cIjp7XCJ2LWJpbmQ6dGV4dC5zeW5jXCI6XCJidXR0b25UZXh0XCIsXCJ4bWxuczp2LW9uXCI6XCJcIixcInYtYmluZDp0aGVtZS5zeW5jXCI6XCJidXR0b25UaGVtZVwifSxcImNvdXJzZS1kZXRhaWxcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmNvdXJzZUluZm8uc3luY1wiOlwiY291cnNlSW5mb1wifSxcInBhbmVsXCI6e1wiY2xhc3NcIjpcInByZXYta25vdy1wYW5lbFwifX07XHJcbiRldmVudHMgPSB7XCJyaWNoLWJ1dHRvblwiOntcInYtb246dGFwXCI6XCJzZWxlY3RDbGFzc21hdGVzXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgICAgICAgICdyaWNoLWJ1dHRvbic6IHJpY2hCdXR0b24sXHJcbiAgICAgICAgICAgICdjb3Vyc2UtZGV0YWlsJzogY291cnNlRGV0YWlsLFxyXG4gICAgICAgICAgICAncGFuZWwnOiBwYW5lbFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGF0YSA9IHtcclxuICAgICAgICAgICAgdXNlckluZm86IG51bGwsXHJcbiAgICAgICAgICAgIGNvdXJzZUlkOiAnJyxcclxuICAgICAgICAgICAgY291cnNlSW5mbzogbnVsbCxcclxuICAgICAgICAgICAgc3R1RmluaXNoTGlzdDogW10sXHJcbiAgICAgICAgICAgIGJ1dHRvblRleHQ6ICcnLFxyXG4gICAgICAgICAgICBjYW5DcmVhdGVHcm91cDogZmFsc2VcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgICAgIHNlbGVjdENsYXNzbWF0ZXMoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDmoKHpqozor6XlrabnlJ/mmK/lkKblnKjor6Xor77nqIvnmoTmn5DkuIDkuKrku7vliqHkuK3vvIzlpoLmnpzlnKjku7vliqHkuK3liJnml6Dms5XliJvlu7pcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhbkNyZWF0ZUdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnL2NvdXJzZS9wYWdlcy9zZWxlY3RDbGFzc21hdGVzP2NvdXJzZUlkPScgKyB0aGlzLmNvdXJzZUlkXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29tcHV0ZWQgPSB7XHJcbiAgICAgICAgICAgIGJ1dHRvblRoZW1lKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FuQ3JlYXRlR3JvdXAgPyAnZ3JlZW4nIDogJ2dyZXknXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKSB7XHJcbiAgICAgICAgICAgIGdldENvdXJzZURldGFpbEJ5SWQodGhpcy5jb3Vyc2VJZCkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb3Vyc2VJbmZvID0gcmVzXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvdXJzZUluZm8uc2hvd0NyZWF0ZVRpbWUgPSBwYXJzZVRpbWUodGhpcy5jb3Vyc2VJbmZvLkNyZWF0ZVRpbWUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvdXJzZUluZm8uc2hvd09wZW5TdGFydFRpbWUgPSBwYXJzZVRpbWUodGhpcy5jb3Vyc2VJbmZvLk9wZW5TdGFydFRpbWUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvdXJzZUluZm8uc2hvd09wZW5FbmRUaW1lID0gcGFyc2VUaW1lKHRoaXMuY291cnNlSW5mby5PcGVuRW5kVGltZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGdldFByZXZLbm93QnlDb3Vyc2UodGhpcy5jb3Vyc2VJZCkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2S25vd0NvbnRlbnQgPSByZXMuS25vd0NvbnRlbnRcclxuICAgICAgICAgICAgICAgIFd4UGFyc2Uud3hQYXJzZSgna25vd0NvbnRlbnQnLCAnaHRtbCcsIHJlcy5Lbm93Q29udGVudCwgdGhpcywgNSlcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGdldFN1Y2Nlc3NUYXNrc0J5Q291cnNlSWQodGhpcy5jb3Vyc2VJZCkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdHVGaW5pc2hMaXN0ID0gcmVzIHx8IFtdXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0dUZpbmlzaExpc3QuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnNob3dDb21wbGV0ZURhdGUgPSBwYXJzZVRpbWUoaXRlbS5Db21wbGV0ZURhdGUpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB9LCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdHVGaW5pc2hMaXN0ID0gW11cclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGlzU3R1SW5Db3Vyc2VHcm91cCh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mby5GbG5rSUQsIHRoaXMuY291cnNlSWQpLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvblRleHQgPSAn5oiR5bey5Yqg5YWl5bCP57uEJ1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FuQ3JlYXRlR3JvdXAgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvblRleHQgPSAn5oiR6KaB5Yib5bu65bCP57uEJ1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FuQ3JlYXRlR3JvdXAgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH0sIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvblRleHQgPSAn5oiR6KaB5Yib5bu65bCP57uEJ1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW5DcmVhdGVHcm91cCA9IHRydWVcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uTG9hZChvcHRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5jb3Vyc2VJZCA9IG9wdGlvbi5jb3Vyc2VJZFxyXG4gICAgICAgICAgICB0aGlzLmluaXQoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuIl19