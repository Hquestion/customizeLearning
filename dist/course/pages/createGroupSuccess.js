'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _richButton = require('./../../components/rich-button.js');

var _richButton2 = _interopRequireDefault(_richButton);

var _api = require('./../../api/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CreateGroupSuccess = function (_wepy$page) {
    _inherits(CreateGroupSuccess, _wepy$page);

    function CreateGroupSuccess() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, CreateGroupSuccess);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CreateGroupSuccess.__proto__ || Object.getPrototypeOf(CreateGroupSuccess)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '课程详情'
        }, _this.$repeat = {}, _this.$props = { "rich-button": { "text": "开始课程", "size": "big", "theme": "warning", "xmlns:v-on": "" } }, _this.$events = { "rich-button": { "v-on:tap": "startCourse" } }, _this.components = {
            'rich-button': _richButton2.default
        }, _this.data = {
            userInfo: null,
            courseId: '',
            groupId: '',
            courseInfo: null,
            groupMembers: []
        }, _this.methods = {
            startCourse: function startCourse() {
                var _this2 = this;

                // 校验该学生是否在该课程的某一个任务中，如果在任务中则无法创建
                (0, _api.activateGroupTask)(this.$parent.globalData.userInfo.FlnkID, this.groupId, this.courseId).then(function (res) {
                    var activeTaskInfo = { CourseFID: _this2.courseId, GroupFID: _this2.groupId };
                    _wepy2.default.setStorageSync('activeTaskInfo', activeTaskInfo);
                    _wepy2.default.switchTab({
                        url: '/pages/practice'
                    });
                }, function () {
                    _wepy2.default.showToast({
                        title: '操作失败',
                        icon: 'none'
                    });
                });
            }
        }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(CreateGroupSuccess, [{
        key: 'init',
        value: function init() {
            var _this3 = this;

            (0, _api.getCourseDetailById)(this.courseId).then(function (res) {
                _this3.courseInfo = res;
                _this3.$apply();
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad(option) {
            this.courseId = option.courseId;
            this.groupId = option.groupId;
            this.groupMembers = _wepy2.default.getStorageSync('groupMembers') || [];
            this.groupMembers.unshift({
                MemberName: this.$parent.globalData.userInfo.XM
            });
            this.init();
        }
    }]);

    return CreateGroupSuccess;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(CreateGroupSuccess , 'course/pages/createGroupSuccess'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZUdyb3VwU3VjY2Vzcy5qcyJdLCJuYW1lcyI6WyJDcmVhdGVHcm91cFN1Y2Nlc3MiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicmljaEJ1dHRvbiIsImRhdGEiLCJ1c2VySW5mbyIsImNvdXJzZUlkIiwiZ3JvdXBJZCIsImNvdXJzZUluZm8iLCJncm91cE1lbWJlcnMiLCJtZXRob2RzIiwic3RhcnRDb3Vyc2UiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsIkZsbmtJRCIsInRoZW4iLCJhY3RpdmVUYXNrSW5mbyIsIkNvdXJzZUZJRCIsIkdyb3VwRklEIiwid2VweSIsInNldFN0b3JhZ2VTeW5jIiwic3dpdGNoVGFiIiwidXJsIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiZXZlbnRzIiwicmVzIiwiJGFwcGx5Iiwib3B0aW9uIiwiZ2V0U3RvcmFnZVN5bmMiLCJ1bnNoaWZ0IiwiTWVtYmVyTmFtZSIsIlhNIiwiaW5pdCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNJOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7OztJQUVxQkEsa0I7Ozs7Ozs7Ozs7Ozs7O2tOQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBSVZDLE8sR0FBVSxFLFFBQ2pCQyxNLEdBQVMsRUFBQyxlQUFjLEVBQUMsUUFBTyxNQUFSLEVBQWUsUUFBTyxLQUF0QixFQUE0QixTQUFRLFNBQXBDLEVBQThDLGNBQWEsRUFBM0QsRUFBZixFLFFBQ1RDLE8sR0FBVSxFQUFDLGVBQWMsRUFBQyxZQUFXLGFBQVosRUFBZixFLFFBQ1RDLFUsR0FBYTtBQUNGLDJCQUFlQztBQURiLFMsUUFJTkMsSSxHQUFPO0FBQ0hDLHNCQUFVLElBRFA7QUFFSEMsc0JBQVUsRUFGUDtBQUdIQyxxQkFBUyxFQUhOO0FBSUhDLHdCQUFZLElBSlQ7QUFLSEMsMEJBQWM7QUFMWCxTLFFBUVBDLE8sR0FBVTtBQUNOQyx1QkFETSx5QkFDUTtBQUFBOztBQUNWO0FBQ0EsNENBQWtCLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QlIsUUFBeEIsQ0FBaUNTLE1BQW5ELEVBQTJELEtBQUtQLE9BQWhFLEVBQXlFLEtBQUtELFFBQTlFLEVBQXdGUyxJQUF4RixDQUE2RixlQUFPO0FBQ2hHLHdCQUFJQyxpQkFBaUIsRUFBQ0MsV0FBVyxPQUFLWCxRQUFqQixFQUEyQlksVUFBVSxPQUFLWCxPQUExQyxFQUFyQjtBQUNBWSxtQ0FBS0MsY0FBTCxDQUFvQixnQkFBcEIsRUFBc0NKLGNBQXRDO0FBQ0FHLG1DQUFLRSxTQUFMLENBQWU7QUFDWEMsNkJBQUs7QUFETSxxQkFBZjtBQUdILGlCQU5ELEVBTUcsWUFBTTtBQUNMSCxtQ0FBS0ksU0FBTCxDQUFlO0FBQ1hDLCtCQUFPLE1BREk7QUFFWEMsOEJBQU07QUFGSyxxQkFBZjtBQUlILGlCQVhEO0FBWUg7QUFmSyxTLFFBa0JWQyxNLEdBQVMsRTs7Ozs7K0JBSUY7QUFBQTs7QUFDSCwwQ0FBb0IsS0FBS3BCLFFBQXpCLEVBQW1DUyxJQUFuQyxDQUF3QyxlQUFPO0FBQzNDLHVCQUFLUCxVQUFMLEdBQWtCbUIsR0FBbEI7QUFDQSx1QkFBS0MsTUFBTDtBQUNILGFBSEQ7QUFJSDs7OytCQUVNQyxNLEVBQVE7QUFDWCxpQkFBS3ZCLFFBQUwsR0FBZ0J1QixPQUFPdkIsUUFBdkI7QUFDQSxpQkFBS0MsT0FBTCxHQUFlc0IsT0FBT3RCLE9BQXRCO0FBQ0EsaUJBQUtFLFlBQUwsR0FBcUJVLGVBQUtXLGNBQUwsQ0FBb0IsY0FBcEIsS0FBdUMsRUFBNUQ7QUFDQSxpQkFBS3JCLFlBQUwsQ0FBa0JzQixPQUFsQixDQUEwQjtBQUN0QkMsNEJBQVksS0FBS3BCLE9BQUwsQ0FBYUMsVUFBYixDQUF3QlIsUUFBeEIsQ0FBaUM0QjtBQUR2QixhQUExQjtBQUdBLGlCQUFLQyxJQUFMO0FBQ0g7Ozs7RUF6RDJDZixlQUFLZ0IsSTs7a0JBQWhDdkMsa0IiLCJmaWxlIjoiY3JlYXRlR3JvdXBTdWNjZXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgICBpbXBvcnQgcmljaEJ1dHRvbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL3JpY2gtYnV0dG9uJ1xuXG4gICAgaW1wb3J0IHtnZXRDb3Vyc2VEZXRhaWxCeUlkLCBhY3RpdmF0ZUdyb3VwVGFza30gZnJvbSAnLi4vLi4vYXBpJ1xuXG4gICAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3JlYXRlR3JvdXBTdWNjZXNzIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICAgICAgY29uZmlnID0ge1xuICAgICAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ivvueoi+ivpuaDhSdcbiAgICAgICAgfVxuXG4gICAgICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJyaWNoLWJ1dHRvblwiOntcInRleHRcIjpcIuW8gOWni+ivvueoi1wiLFwic2l6ZVwiOlwiYmlnXCIsXCJ0aGVtZVwiOlwid2FybmluZ1wiLFwieG1sbnM6di1vblwiOlwiXCJ9fTtcclxuJGV2ZW50cyA9IHtcInJpY2gtYnV0dG9uXCI6e1widi1vbjp0YXBcIjpcInN0YXJ0Q291cnNlXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICAgICAgICAncmljaC1idXR0b24nOiByaWNoQnV0dG9uXG4gICAgICAgIH1cblxuICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgdXNlckluZm86IG51bGwsXG4gICAgICAgICAgICBjb3Vyc2VJZDogJycsXG4gICAgICAgICAgICBncm91cElkOiAnJyxcbiAgICAgICAgICAgIGNvdXJzZUluZm86IG51bGwsXG4gICAgICAgICAgICBncm91cE1lbWJlcnM6IFtdXG4gICAgICAgIH1cblxuICAgICAgICBtZXRob2RzID0ge1xuICAgICAgICAgICAgc3RhcnRDb3Vyc2UoKSB7XG4gICAgICAgICAgICAgICAgLy8g5qCh6aqM6K+l5a2m55Sf5piv5ZCm5Zyo6K+l6K++56iL55qE5p+Q5LiA5Liq5Lu75Yqh5Lit77yM5aaC5p6c5Zyo5Lu75Yqh5Lit5YiZ5peg5rOV5Yib5bu6XG4gICAgICAgICAgICAgICAgYWN0aXZhdGVHcm91cFRhc2sodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8uRmxua0lELCB0aGlzLmdyb3VwSWQsIHRoaXMuY291cnNlSWQpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFjdGl2ZVRhc2tJbmZvID0ge0NvdXJzZUZJRDogdGhpcy5jb3Vyc2VJZCwgR3JvdXBGSUQ6IHRoaXMuZ3JvdXBJZH1cbiAgICAgICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygnYWN0aXZlVGFza0luZm8nLCBhY3RpdmVUYXNrSW5mbylcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnL3BhZ2VzL3ByYWN0aWNlJ1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmk43kvZzlpLHotKUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50cyA9IHtcblxuICAgICAgICB9XG5cbiAgICAgICAgaW5pdCgpIHtcbiAgICAgICAgICAgIGdldENvdXJzZURldGFpbEJ5SWQodGhpcy5jb3Vyc2VJZCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY291cnNlSW5mbyA9IHJlc1xuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBvbkxvYWQob3B0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmNvdXJzZUlkID0gb3B0aW9uLmNvdXJzZUlkXG4gICAgICAgICAgICB0aGlzLmdyb3VwSWQgPSBvcHRpb24uZ3JvdXBJZFxuICAgICAgICAgICAgdGhpcy5ncm91cE1lbWJlcnMgPSAod2VweS5nZXRTdG9yYWdlU3luYygnZ3JvdXBNZW1iZXJzJykgfHwgW10pXG4gICAgICAgICAgICB0aGlzLmdyb3VwTWVtYmVycy51bnNoaWZ0KHtcbiAgICAgICAgICAgICAgICBNZW1iZXJOYW1lOiB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mby5YTVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpXG4gICAgICAgIH1cbiAgICB9XG4iXX0=