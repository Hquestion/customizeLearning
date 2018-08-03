'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _courseDetail = require('./../../components/course-detail.js');

var _courseDetail2 = _interopRequireDefault(_courseDetail);

var _panel = require('./../../components/panel.js');

var _panel2 = _interopRequireDefault(_panel);

var _remarkTpl = require('./../../components/remark-tpl.js');

var _remarkTpl2 = _interopRequireDefault(_remarkTpl);

var _wxParse = require('./../../wxParse/wxParse.js');

var _wxParse2 = _interopRequireDefault(_wxParse);

var _api = require('./../../api/index.js');

var _util = require('./../../util/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var prevKnow = function (_wepy$page) {
    _inherits(prevKnow, _wepy$page);

    function prevKnow() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, prevKnow);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = prevKnow.__proto__ || Object.getPrototypeOf(prevKnow)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '早知道'
        }, _this.data = {
            isTeacher: false,
            userInfo: null,
            courseInfo: null,
            prevKnowContent: '',
            remarkStandardList: [],
            queryParam: null,
            navigateUrlMap: {
                arrange: '/practice/pages/arrange',
                practice: '/pages/practice',
                practiceOpenType: 'switchTab',
                think: '/practice/pages/think'
            },
            isStuInGroup: false
        }, _this.$repeat = { "remarkStandardList": { "com": "remark-tpl", "props": "remarkInfo.sync" } }, _this.$props = { "remark-tpl": { "v-bind:remarkInfo.sync": { "value": "item", "type": "item", "for": "remarkStandardList", "item": "item", "index": "index", "key": "key" } }, "course-detail": { "xmlns:v-bind": "", "v-bind:courseInfo.sync": "courseInfo" }, "panel": { "class": "remark-standard-panel" } }, _this.$events = {}, _this.components = {
            'course-detail': _courseDetail2.default,
            'panel': _panel2.default,
            'remark-tpl': _remarkTpl2.default
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(prevKnow, [{
        key: 'init',
        value: function init() {
            var _this2 = this;

            var activeGroupTask = void 0;
            if (this.queryParam) {
                activeGroupTask = this.queryParam;
            } else {
                activeGroupTask = _wepy2.default.getStorageSync('activeTaskInfo');
            }
            (0, _api.getCourseDetailById)(activeGroupTask.CourseFID).then(function (res) {
                (0, _api.getGroupDetail)(activeGroupTask.GroupFID).then(function (groupRes) {
                    res.groupMembers = groupRes.AttendMembers ? groupRes.GroupLeaderName + ',' + groupRes.AttendMembers : groupRes.GroupLeaderName;
                    res.showCreateTime = (0, _util.parseTime)(res.CreateTime);
                    res.showOpenStartTime = (0, _util.parseTime)(res.OpenStartTime);
                    res.showOpenEndTime = (0, _util.parseTime)(res.OpenEndTime);
                    _this2.courseInfo = res;
                    _this2.$apply();
                });
            });
            (0, _api.getPrevKnowByCourse)(activeGroupTask.CourseFID).then(function (res) {
                _this2.prevKnowContent = res.KnowContent;
                _wxParse2.default.wxParse('knowContent', 'html', res.KnowContent, _this2, 5);
                _this2.$apply();
            });
            (0, _api.getRemarkStandard)(activeGroupTask.CourseFID).then(function (res) {
                _this2.remarkStandardList = res;
                _this2.$apply();
            });
            (0, _api.isStuInCourseGroup)(this.$parent.globalData.userInfo.FlnkID, activeGroupTask.CourseFID, activeGroupTask.GroupFID).then(function (res) {
                _this2.isStuInGroup = res;
                _this2.$apply();
            }, function () {
                _this2.isStuInGroup = false;
                _this2.$apply();
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad(option) {
            var self = this;
            this.$parent.getUserInfo(function (res) {
                self.userInfo = res;
                self.$apply();
            });
            if (option && option.courseId) {
                this.queryParam = {
                    CourseFID: option.courseId,
                    GroupFID: option.groupId
                };
                this.navigateUrlMap = {
                    arrange: '/practice/pages/arrange?courseId=' + option.courseId + '&groupId=' + option.groupId,
                    practice: '/practice/pages/reviewFinishTask?courseId=' + option.courseId + '&groupId=' + option.groupId,
                    practiceOpenType: 'redirect',
                    think: '/practice/pages/think?courseId=' + option.courseId + '&groupId=' + option.groupId
                };
                this.$apply();
            }
            this.isTeacher = this.$parent.globalData.userInfo.RoleNum + '' === '2';
            this.init();
        }
    }]);

    return prevKnow;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(prevKnow , 'practice/pages/prevKnow'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZLbm93LmpzIl0sIm5hbWVzIjpbInByZXZLbm93IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJpc1RlYWNoZXIiLCJ1c2VySW5mbyIsImNvdXJzZUluZm8iLCJwcmV2S25vd0NvbnRlbnQiLCJyZW1hcmtTdGFuZGFyZExpc3QiLCJxdWVyeVBhcmFtIiwibmF2aWdhdGVVcmxNYXAiLCJhcnJhbmdlIiwicHJhY3RpY2UiLCJwcmFjdGljZU9wZW5UeXBlIiwidGhpbmsiLCJpc1N0dUluR3JvdXAiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb3Vyc2VEZXRhaWwiLCJQYW5lbCIsInJlbWFya1RwbCIsImFjdGl2ZUdyb3VwVGFzayIsIndlcHkiLCJnZXRTdG9yYWdlU3luYyIsIkNvdXJzZUZJRCIsInRoZW4iLCJHcm91cEZJRCIsInJlcyIsImdyb3VwTWVtYmVycyIsImdyb3VwUmVzIiwiQXR0ZW5kTWVtYmVycyIsIkdyb3VwTGVhZGVyTmFtZSIsInNob3dDcmVhdGVUaW1lIiwiQ3JlYXRlVGltZSIsInNob3dPcGVuU3RhcnRUaW1lIiwiT3BlblN0YXJ0VGltZSIsInNob3dPcGVuRW5kVGltZSIsIk9wZW5FbmRUaW1lIiwiJGFwcGx5IiwiS25vd0NvbnRlbnQiLCJXeFBhcnNlIiwid3hQYXJzZSIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiRmxua0lEIiwib3B0aW9uIiwic2VsZiIsImdldFVzZXJJbmZvIiwiY291cnNlSWQiLCJncm91cElkIiwiUm9sZU51bSIsImluaXQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDSTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzhMQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBSVRDLEksR0FBTztBQUNIQyx1QkFBVyxLQURS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TCxDQUFhSyxXQUFiLENBQXlCLFVBQVNwQixHQUFULEVBQWM7QUFDbkNtQixxQkFBSzNDLFFBQUwsR0FBZ0J3QixHQUFoQjtBQUNBbUIscUJBQUtSLE1BQUw7QUFDSCxhQUhEO0FBSUEsZ0JBQUlPLFVBQVVBLE9BQU9HLFFBQXJCLEVBQStCO0FBQzNCLHFCQUFLekMsVUFBTCxHQUFrQjtBQUNkaUIsK0JBQVdxQixPQUFPRyxRQURKO0FBRWR0Qiw4QkFBVW1CLE9BQU9JO0FBRkgsaUJBQWxCO0FBSUEscUJBQUt6QyxjQUFMLEdBQXNCO0FBQ2xCQyw2QkFBUyxzQ0FBc0NvQyxPQUFPRyxRQUE3QyxHQUF3RCxXQUF4RCxHQUFzRUgsT0FBT0ksT0FEcEU7QUFFbEJ2Qyw4QkFBVSwrQ0FBK0NtQyxPQUFPRyxRQUF0RCxHQUFpRSxXQUFqRSxHQUErRUgsT0FBT0ksT0FGOUU7QUFHbEJ0QyxzQ0FBa0IsVUFIQTtBQUlsQkMsMkJBQU8sb0NBQW9DaUMsT0FBT0csUUFBM0MsR0FBc0QsV0FBdEQsR0FBb0VILE9BQU9JO0FBSmhFLGlCQUF0QjtBQU1BLHFCQUFLWCxNQUFMO0FBQ0g7QUFDRCxpQkFBS3BDLFNBQUwsR0FBa0IsS0FBS3dDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QnhDLFFBQXhCLENBQWlDK0MsT0FBakMsR0FBMkMsRUFBNUMsS0FBb0QsR0FBckU7QUFDQSxpQkFBS0MsSUFBTDtBQUNIOzs7O0VBdEZpQzdCLGVBQUs4QixJOztrQkFBdEJ0RCxRIiwiZmlsZSI6InByZXZLbm93LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgICBpbXBvcnQgY291cnNlRGV0YWlsIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY291cnNlLWRldGFpbCdcbiAgICBpbXBvcnQgUGFuZWwgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9wYW5lbCdcbiAgICBpbXBvcnQgcmVtYXJrVHBsIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcmVtYXJrLXRwbCdcbiAgICBpbXBvcnQgV3hQYXJzZSBmcm9tICcuLi8uLi93eFBhcnNlL3d4UGFyc2UuanMnXG5cbiAgICBpbXBvcnQge2dldENvdXJzZURldGFpbEJ5SWQsIGdldEdyb3VwRGV0YWlsLCBnZXRQcmV2S25vd0J5Q291cnNlLCBnZXRSZW1hcmtTdGFuZGFyZCwgaXNTdHVJbkNvdXJzZUdyb3VwfSBmcm9tICcuLi8uLi9hcGknXG4gICAgaW1wb3J0IHtwYXJzZVRpbWV9IGZyb20gJy4uLy4uL3V0aWwnXG5cbiAgICBleHBvcnQgZGVmYXVsdCBjbGFzcyBwcmV2S25vdyBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgICAgIGNvbmZpZyA9IHtcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfml6nnn6XpgZMnXG4gICAgICAgIH1cblxuICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgaXNUZWFjaGVyOiBmYWxzZSxcbiAgICAgICAgICAgIHVzZXJJbmZvOiBudWxsLFxuICAgICAgICAgICAgY291cnNlSW5mbzogbnVsbCxcbiAgICAgICAgICAgIHByZXZLbm93Q29udGVudDogJycsXG4gICAgICAgICAgICByZW1hcmtTdGFuZGFyZExpc3Q6IFtdLFxuICAgICAgICAgICAgcXVlcnlQYXJhbTogbnVsbCxcbiAgICAgICAgICAgIG5hdmlnYXRlVXJsTWFwOiB7XG4gICAgICAgICAgICAgICAgYXJyYW5nZTogJy9wcmFjdGljZS9wYWdlcy9hcnJhbmdlJyxcbiAgICAgICAgICAgICAgICBwcmFjdGljZTogJy9wYWdlcy9wcmFjdGljZScsXG4gICAgICAgICAgICAgICAgcHJhY3RpY2VPcGVuVHlwZTogJ3N3aXRjaFRhYicsXG4gICAgICAgICAgICAgICAgdGhpbms6ICcvcHJhY3RpY2UvcGFnZXMvdGhpbmsnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNTdHVJbkdyb3VwOiBmYWxzZVxuICAgICAgICB9XG5cbiAgICAgICAkcmVwZWF0ID0ge1wicmVtYXJrU3RhbmRhcmRMaXN0XCI6e1wiY29tXCI6XCJyZW1hcmstdHBsXCIsXCJwcm9wc1wiOlwicmVtYXJrSW5mby5zeW5jXCJ9fTtcclxuJHByb3BzID0ge1wicmVtYXJrLXRwbFwiOntcInYtYmluZDpyZW1hcmtJbmZvLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJyZW1hcmtTdGFuZGFyZExpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn19LFwiY291cnNlLWRldGFpbFwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6Y291cnNlSW5mby5zeW5jXCI6XCJjb3Vyc2VJbmZvXCJ9LFwicGFuZWxcIjp7XCJjbGFzc1wiOlwicmVtYXJrLXN0YW5kYXJkLXBhbmVsXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgICAgICAgICdjb3Vyc2UtZGV0YWlsJzogY291cnNlRGV0YWlsLFxuICAgICAgICAgICAgJ3BhbmVsJzogUGFuZWwsXG4gICAgICAgICAgICAncmVtYXJrLXRwbCc6IHJlbWFya1RwbFxuICAgICAgICB9XG5cbiAgICAgICAgaW5pdCgpIHtcbiAgICAgICAgICAgIGxldCBhY3RpdmVHcm91cFRhc2tcbiAgICAgICAgICAgIGlmICh0aGlzLnF1ZXJ5UGFyYW0pIHtcbiAgICAgICAgICAgICAgICBhY3RpdmVHcm91cFRhc2sgPSB0aGlzLnF1ZXJ5UGFyYW1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWN0aXZlR3JvdXBUYXNrID0gd2VweS5nZXRTdG9yYWdlU3luYygnYWN0aXZlVGFza0luZm8nKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ2V0Q291cnNlRGV0YWlsQnlJZChhY3RpdmVHcm91cFRhc2suQ291cnNlRklEKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgZ2V0R3JvdXBEZXRhaWwoYWN0aXZlR3JvdXBUYXNrLkdyb3VwRklEKS50aGVuKGdyb3VwUmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLmdyb3VwTWVtYmVycyA9IGdyb3VwUmVzLkF0dGVuZE1lbWJlcnMgPyAoZ3JvdXBSZXMuR3JvdXBMZWFkZXJOYW1lICsgJywnICsgZ3JvdXBSZXMuQXR0ZW5kTWVtYmVycykgOiBncm91cFJlcy5Hcm91cExlYWRlck5hbWVcbiAgICAgICAgICAgICAgICAgICAgcmVzLnNob3dDcmVhdGVUaW1lID0gcGFyc2VUaW1lKHJlcy5DcmVhdGVUaW1lKVxuICAgICAgICAgICAgICAgICAgICByZXMuc2hvd09wZW5TdGFydFRpbWUgPSBwYXJzZVRpbWUocmVzLk9wZW5TdGFydFRpbWUpXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zaG93T3BlbkVuZFRpbWUgPSBwYXJzZVRpbWUocmVzLk9wZW5FbmRUaW1lKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvdXJzZUluZm8gPSByZXNcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgZ2V0UHJldktub3dCeUNvdXJzZShhY3RpdmVHcm91cFRhc2suQ291cnNlRklEKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2S25vd0NvbnRlbnQgPSByZXMuS25vd0NvbnRlbnRcbiAgICAgICAgICAgICAgICBXeFBhcnNlLnd4UGFyc2UoJ2tub3dDb250ZW50JywgJ2h0bWwnLCByZXMuS25vd0NvbnRlbnQsIHRoaXMsIDUpXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGdldFJlbWFya1N0YW5kYXJkKGFjdGl2ZUdyb3VwVGFzay5Db3Vyc2VGSUQpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbWFya1N0YW5kYXJkTGlzdCA9IHJlc1xuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBpc1N0dUluQ291cnNlR3JvdXAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8uRmxua0lELCBhY3RpdmVHcm91cFRhc2suQ291cnNlRklELCBhY3RpdmVHcm91cFRhc2suR3JvdXBGSUQpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNTdHVJbkdyb3VwID0gcmVzXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNTdHVJbkdyb3VwID0gZmFsc2VcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgb25Mb2FkKG9wdGlvbikge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2V0VXNlckluZm8oZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgc2VsZi51c2VySW5mbyA9IHJlc1xuICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBpZiAob3B0aW9uICYmIG9wdGlvbi5jb3Vyc2VJZCkge1xuICAgICAgICAgICAgICAgIHRoaXMucXVlcnlQYXJhbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgQ291cnNlRklEOiBvcHRpb24uY291cnNlSWQsXG4gICAgICAgICAgICAgICAgICAgIEdyb3VwRklEOiBvcHRpb24uZ3JvdXBJZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlVXJsTWFwID0ge1xuICAgICAgICAgICAgICAgICAgICBhcnJhbmdlOiAnL3ByYWN0aWNlL3BhZ2VzL2FycmFuZ2U/Y291cnNlSWQ9JyArIG9wdGlvbi5jb3Vyc2VJZCArICcmZ3JvdXBJZD0nICsgb3B0aW9uLmdyb3VwSWQsXG4gICAgICAgICAgICAgICAgICAgIHByYWN0aWNlOiAnL3ByYWN0aWNlL3BhZ2VzL3Jldmlld0ZpbmlzaFRhc2s/Y291cnNlSWQ9JyArIG9wdGlvbi5jb3Vyc2VJZCArICcmZ3JvdXBJZD0nICsgb3B0aW9uLmdyb3VwSWQsXG4gICAgICAgICAgICAgICAgICAgIHByYWN0aWNlT3BlblR5cGU6ICdyZWRpcmVjdCcsXG4gICAgICAgICAgICAgICAgICAgIHRoaW5rOiAnL3ByYWN0aWNlL3BhZ2VzL3RoaW5rP2NvdXJzZUlkPScgKyBvcHRpb24uY291cnNlSWQgKyAnJmdyb3VwSWQ9JyArIG9wdGlvbi5ncm91cElkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaXNUZWFjaGVyID0gKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvLlJvbGVOdW0gKyAnJykgPT09ICcyJ1xuICAgICAgICAgICAgdGhpcy5pbml0KClcbiAgICAgICAgfVxuICAgIH1cbiJdfQ==