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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZLbm93LmpzIl0sIm5hbWVzIjpbInByZXZLbm93IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJpc1RlYWNoZXIiLCJ1c2VySW5mbyIsImNvdXJzZUluZm8iLCJwcmV2S25vd0NvbnRlbnQiLCJyZW1hcmtTdGFuZGFyZExpc3QiLCJxdWVyeVBhcmFtIiwibmF2aWdhdGVVcmxNYXAiLCJhcnJhbmdlIiwicHJhY3RpY2UiLCJwcmFjdGljZU9wZW5UeXBlIiwidGhpbmsiLCJpc1N0dUluR3JvdXAiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJhY3RpdmVHcm91cFRhc2siLCJnZXRTdG9yYWdlU3luYyIsIkNvdXJzZUZJRCIsInRoZW4iLCJHcm91cEZJRCIsInJlcyIsImdyb3VwTWVtYmVycyIsImdyb3VwUmVzIiwiQXR0ZW5kTWVtYmVycyIsIkdyb3VwTGVhZGVyTmFtZSIsInNob3dDcmVhdGVUaW1lIiwiQ3JlYXRlVGltZSIsInNob3dPcGVuU3RhcnRUaW1lIiwiT3BlblN0YXJ0VGltZSIsInNob3dPcGVuRW5kVGltZSIsIk9wZW5FbmRUaW1lIiwiJGFwcGx5IiwiS25vd0NvbnRlbnQiLCJ3eFBhcnNlIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJGbG5rSUQiLCJvcHRpb24iLCJzZWxmIiwiZ2V0VXNlckluZm8iLCJjb3Vyc2VJZCIsImdyb3VwSWQiLCJSb2xlTnVtIiwiaW5pdCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNJOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7Ozs7Ozs7OExBQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFJVEMsSSxHQUFPO0FBQ0hDLHVCQUFXLEtBRFI7QUFFSEMsc0JBQVUsSUFGUDtBQUdIQyx3QkFBWSxJQUhUO0FBSUhDLDZCQUFpQixFQUpk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TDtBQUNILGFBSEQ7QUFJQSxnQkFBSU0sVUFBVUEsT0FBT0csUUFBckIsRUFBK0I7QUFDM0IscUJBQUtwQyxVQUFMLEdBQWtCO0FBQ2RhLCtCQUFXb0IsT0FBT0csUUFESjtBQUVkckIsOEJBQVVrQixPQUFPSTtBQUZILGlCQUFsQjtBQUlBLHFCQUFLcEMsY0FBTCxHQUFzQjtBQUNsQkMsNkJBQVMsc0NBQXNDK0IsT0FBT0csUUFBN0MsR0FBd0QsV0FBeEQsR0FBc0VILE9BQU9JLE9BRHBFO0FBRWxCbEMsOEJBQVUsK0NBQStDOEIsT0FBT0csUUFBdEQsR0FBaUUsV0FBakUsR0FBK0VILE9BQU9JLE9BRjlFO0FBR2xCakMsc0NBQWtCLFVBSEE7QUFJbEJDLDJCQUFPLG9DQUFvQzRCLE9BQU9HLFFBQTNDLEdBQXNELFdBQXRELEdBQW9FSCxPQUFPSTtBQUpoRSxpQkFBdEI7QUFNQSxxQkFBS1YsTUFBTDtBQUNIO0FBQ0QsaUJBQUtoQyxTQUFMLEdBQWtCLEtBQUttQyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JuQyxRQUF4QixDQUFpQzBDLE9BQWpDLEdBQTJDLEVBQTVDLEtBQW9ELEdBQXJFO0FBQ0EsaUJBQUtDLElBQUw7QUFDSDs7OztFQXRGaUMsZUFBS0MsSTs7a0JBQXRCakQsUSIsImZpbGUiOiJwcmV2S25vdy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gICAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICAgIGltcG9ydCBjb3Vyc2VEZXRhaWwgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb3Vyc2UtZGV0YWlsJ1xyXG4gICAgaW1wb3J0IFBhbmVsIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcGFuZWwnXHJcbiAgICBpbXBvcnQgcmVtYXJrVHBsIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcmVtYXJrLXRwbCdcclxuICAgIGltcG9ydCBXeFBhcnNlIGZyb20gJy4uLy4uL3d4UGFyc2Uvd3hQYXJzZS5qcydcclxuXHJcbiAgICBpbXBvcnQge2dldENvdXJzZURldGFpbEJ5SWQsIGdldEdyb3VwRGV0YWlsLCBnZXRQcmV2S25vd0J5Q291cnNlLCBnZXRSZW1hcmtTdGFuZGFyZCwgaXNTdHVJbkNvdXJzZUdyb3VwfSBmcm9tICcuLi8uLi9hcGknXHJcbiAgICBpbXBvcnQge3BhcnNlVGltZX0gZnJvbSAnLi4vLi4vdXRpbCdcclxuXHJcbiAgICBleHBvcnQgZGVmYXVsdCBjbGFzcyBwcmV2S25vdyBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICAgICAgY29uZmlnID0ge1xyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5pep55+l6YGTJ1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGF0YSA9IHtcclxuICAgICAgICAgICAgaXNUZWFjaGVyOiBmYWxzZSxcclxuICAgICAgICAgICAgdXNlckluZm86IG51bGwsXHJcbiAgICAgICAgICAgIGNvdXJzZUluZm86IG51bGwsXHJcbiAgICAgICAgICAgIHByZXZLbm93Q29udGVudDogJycsXHJcbiAgICAgICAgICAgIHJlbWFya1N0YW5kYXJkTGlzdDogW10sXHJcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW06IG51bGwsXHJcbiAgICAgICAgICAgIG5hdmlnYXRlVXJsTWFwOiB7XHJcbiAgICAgICAgICAgICAgICBhcnJhbmdlOiAnL3ByYWN0aWNlL3BhZ2VzL2FycmFuZ2UnLFxyXG4gICAgICAgICAgICAgICAgcHJhY3RpY2U6ICcvcGFnZXMvcHJhY3RpY2UnLFxyXG4gICAgICAgICAgICAgICAgcHJhY3RpY2VPcGVuVHlwZTogJ3N3aXRjaFRhYicsXHJcbiAgICAgICAgICAgICAgICB0aGluazogJy9wcmFjdGljZS9wYWdlcy90aGluaydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaXNTdHVJbkdyb3VwOiBmYWxzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAkcmVwZWF0ID0ge1wicmVtYXJrU3RhbmRhcmRMaXN0XCI6e1wiY29tXCI6XCJyZW1hcmstdHBsXCIsXCJwcm9wc1wiOlwicmVtYXJrSW5mby5zeW5jXCJ9fTtcclxuJHByb3BzID0ge1wicmVtYXJrLXRwbFwiOntcInYtYmluZDpyZW1hcmtJbmZvLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJyZW1hcmtTdGFuZGFyZExpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn19LFwiY291cnNlLWRldGFpbFwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6Y291cnNlSW5mby5zeW5jXCI6XCJjb3Vyc2VJbmZvXCJ9LFwicGFuZWxcIjp7XCJjbGFzc1wiOlwicmVtYXJrLXN0YW5kYXJkLXBhbmVsXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgICAgICAgICAgJ2NvdXJzZS1kZXRhaWwnOiBjb3Vyc2VEZXRhaWwsXHJcbiAgICAgICAgICAgICdwYW5lbCc6IFBhbmVsLFxyXG4gICAgICAgICAgICAncmVtYXJrLXRwbCc6IHJlbWFya1RwbFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpIHtcclxuICAgICAgICAgICAgbGV0IGFjdGl2ZUdyb3VwVGFza1xyXG4gICAgICAgICAgICBpZiAodGhpcy5xdWVyeVBhcmFtKSB7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVHcm91cFRhc2sgPSB0aGlzLnF1ZXJ5UGFyYW1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZUdyb3VwVGFzayA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ2FjdGl2ZVRhc2tJbmZvJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXRDb3Vyc2VEZXRhaWxCeUlkKGFjdGl2ZUdyb3VwVGFzay5Db3Vyc2VGSUQpLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGdldEdyb3VwRGV0YWlsKGFjdGl2ZUdyb3VwVGFzay5Hcm91cEZJRCkudGhlbihncm91cFJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLmdyb3VwTWVtYmVycyA9IGdyb3VwUmVzLkF0dGVuZE1lbWJlcnMgPyAoZ3JvdXBSZXMuR3JvdXBMZWFkZXJOYW1lICsgJywnICsgZ3JvdXBSZXMuQXR0ZW5kTWVtYmVycykgOiBncm91cFJlcy5Hcm91cExlYWRlck5hbWVcclxuICAgICAgICAgICAgICAgICAgICByZXMuc2hvd0NyZWF0ZVRpbWUgPSBwYXJzZVRpbWUocmVzLkNyZWF0ZVRpbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnNob3dPcGVuU3RhcnRUaW1lID0gcGFyc2VUaW1lKHJlcy5PcGVuU3RhcnRUaW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zaG93T3BlbkVuZFRpbWUgPSBwYXJzZVRpbWUocmVzLk9wZW5FbmRUaW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY291cnNlSW5mbyA9IHJlc1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGdldFByZXZLbm93QnlDb3Vyc2UoYWN0aXZlR3JvdXBUYXNrLkNvdXJzZUZJRCkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2S25vd0NvbnRlbnQgPSByZXMuS25vd0NvbnRlbnRcclxuICAgICAgICAgICAgICAgIFd4UGFyc2Uud3hQYXJzZSgna25vd0NvbnRlbnQnLCAnaHRtbCcsIHJlcy5Lbm93Q29udGVudCwgdGhpcywgNSlcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgZ2V0UmVtYXJrU3RhbmRhcmQoYWN0aXZlR3JvdXBUYXNrLkNvdXJzZUZJRCkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1hcmtTdGFuZGFyZExpc3QgPSByZXNcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgaXNTdHVJbkNvdXJzZUdyb3VwKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvLkZsbmtJRCwgYWN0aXZlR3JvdXBUYXNrLkNvdXJzZUZJRCwgYWN0aXZlR3JvdXBUYXNrLkdyb3VwRklEKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNTdHVJbkdyb3VwID0gcmVzXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNTdHVJbkdyb3VwID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uTG9hZChvcHRpb24pIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nZXRVc2VySW5mbyhmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYudXNlckluZm8gPSByZXNcclxuICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgaWYgKG9wdGlvbiAmJiBvcHRpb24uY291cnNlSWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucXVlcnlQYXJhbSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBDb3Vyc2VGSUQ6IG9wdGlvbi5jb3Vyc2VJZCxcclxuICAgICAgICAgICAgICAgICAgICBHcm91cEZJRDogb3B0aW9uLmdyb3VwSWRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVVcmxNYXAgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyYW5nZTogJy9wcmFjdGljZS9wYWdlcy9hcnJhbmdlP2NvdXJzZUlkPScgKyBvcHRpb24uY291cnNlSWQgKyAnJmdyb3VwSWQ9JyArIG9wdGlvbi5ncm91cElkLFxyXG4gICAgICAgICAgICAgICAgICAgIHByYWN0aWNlOiAnL3ByYWN0aWNlL3BhZ2VzL3Jldmlld0ZpbmlzaFRhc2s/Y291cnNlSWQ9JyArIG9wdGlvbi5jb3Vyc2VJZCArICcmZ3JvdXBJZD0nICsgb3B0aW9uLmdyb3VwSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJhY3RpY2VPcGVuVHlwZTogJ3JlZGlyZWN0JyxcclxuICAgICAgICAgICAgICAgICAgICB0aGluazogJy9wcmFjdGljZS9wYWdlcy90aGluaz9jb3Vyc2VJZD0nICsgb3B0aW9uLmNvdXJzZUlkICsgJyZncm91cElkPScgKyBvcHRpb24uZ3JvdXBJZFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNUZWFjaGVyID0gKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvLlJvbGVOdW0gKyAnJykgPT09ICcyJ1xyXG4gICAgICAgICAgICB0aGlzLmluaXQoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuIl19