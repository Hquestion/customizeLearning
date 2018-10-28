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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZUdyb3VwU3VjY2Vzcy5qcyJdLCJuYW1lcyI6WyJDcmVhdGVHcm91cFN1Y2Nlc3MiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiZGF0YSIsInVzZXJJbmZvIiwiY291cnNlSWQiLCJncm91cElkIiwiY291cnNlSW5mbyIsImdyb3VwTWVtYmVycyIsIm1ldGhvZHMiLCJzdGFydENvdXJzZSIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiRmxua0lEIiwidGhlbiIsImFjdGl2ZVRhc2tJbmZvIiwiQ291cnNlRklEIiwiR3JvdXBGSUQiLCJzZXRTdG9yYWdlU3luYyIsInN3aXRjaFRhYiIsInVybCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImV2ZW50cyIsInJlcyIsIiRhcHBseSIsIm9wdGlvbiIsImdldFN0b3JhZ2VTeW5jIiwidW5zaGlmdCIsIk1lbWJlck5hbWUiLCJYTSIsImluaXQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDSTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7SUFFcUJBLGtCOzs7Ozs7Ozs7Ozs7OztrTkFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUlWQyxPLEdBQVUsRSxRQUNqQkMsTSxHQUFTLEVBQUMsZUFBYyxFQUFDLFFBQU8sTUFBUixFQUFlLFFBQU8sS0FBdEIsRUFBNEIsU0FBUSxTQUFwQyxFQUE4QyxjQUFhLEVBQTNELEVBQWYsRSxRQUNUQyxPLEdBQVUsRUFBQyxlQUFjLEVBQUMsWUFBVyxhQUFaLEVBQWYsRSxRQUNUQyxVLEdBQWE7QUFDRjtBQURFLFMsUUFJTkMsSSxHQUFPO0FBQ0hDLHNCQUFVLElBRFA7QUFFSEMsc0JBQVUsRUFGUDtBQUdIQyxxQkFBUyxFQUhOO0FBSUhDLHdCQUFZLElBSlQ7QUFLSEMsMEJBQWM7QUFMWCxTLFFBUVBDLE8sR0FBVTtBQUNOQyx1QkFETSx5QkFDUTtBQUFBOztBQUNWO0FBQ0EsNENBQWtCLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QlIsUUFBeEIsQ0FBaUNTLE1BQW5ELEVBQTJELEtBQUtQLE9BQWhFLEVBQXlFLEtBQUtELFFBQTlFLEVBQXdGUyxJQUF4RixDQUE2RixlQUFPO0FBQ2hHLHdCQUFJQyxpQkFBaUIsRUFBQ0MsV0FBVyxPQUFLWCxRQUFqQixFQUEyQlksVUFBVSxPQUFLWCxPQUExQyxFQUFyQjtBQUNBLG1DQUFLWSxjQUFMLENBQW9CLGdCQUFwQixFQUFzQ0gsY0FBdEM7QUFDQSxtQ0FBS0ksU0FBTCxDQUFlO0FBQ1hDLDZCQUFLO0FBRE0scUJBQWY7QUFHSCxpQkFORCxFQU1HLFlBQU07QUFDTCxtQ0FBS0MsU0FBTCxDQUFlO0FBQ1hDLCtCQUFPLE1BREk7QUFFWEMsOEJBQU07QUFGSyxxQkFBZjtBQUlILGlCQVhEO0FBWUg7QUFmSyxTLFFBa0JWQyxNLEdBQVMsRTs7Ozs7K0JBSUY7QUFBQTs7QUFDSCwwQ0FBb0IsS0FBS25CLFFBQXpCLEVBQW1DUyxJQUFuQyxDQUF3QyxlQUFPO0FBQzNDLHVCQUFLUCxVQUFMLEdBQWtCa0IsR0FBbEI7QUFDQSx1QkFBS0MsTUFBTDtBQUNILGFBSEQ7QUFJSDs7OytCQUVNQyxNLEVBQVE7QUFDWCxpQkFBS3RCLFFBQUwsR0FBZ0JzQixPQUFPdEIsUUFBdkI7QUFDQSxpQkFBS0MsT0FBTCxHQUFlcUIsT0FBT3JCLE9BQXRCO0FBQ0EsaUJBQUtFLFlBQUwsR0FBcUIsZUFBS29CLGNBQUwsQ0FBb0IsY0FBcEIsS0FBdUMsRUFBNUQ7QUFDQSxpQkFBS3BCLFlBQUwsQ0FBa0JxQixPQUFsQixDQUEwQjtBQUN0QkMsNEJBQVksS0FBS25CLE9BQUwsQ0FBYUMsVUFBYixDQUF3QlIsUUFBeEIsQ0FBaUMyQjtBQUR2QixhQUExQjtBQUdBLGlCQUFLQyxJQUFMO0FBQ0g7Ozs7RUF6RDJDLGVBQUtDLEk7O2tCQUFoQ3JDLGtCIiwiZmlsZSI6ImNyZWF0ZUdyb3VwU3VjY2Vzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gICAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICAgIGltcG9ydCByaWNoQnV0dG9uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcmljaC1idXR0b24nXHJcblxyXG4gICAgaW1wb3J0IHtnZXRDb3Vyc2VEZXRhaWxCeUlkLCBhY3RpdmF0ZUdyb3VwVGFza30gZnJvbSAnLi4vLi4vYXBpJ1xyXG5cclxuICAgIGV4cG9ydCBkZWZhdWx0IGNsYXNzIENyZWF0ZUdyb3VwU3VjY2VzcyBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICAgICAgY29uZmlnID0ge1xyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6K++56iL6K+m5oOFJ1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInJpY2gtYnV0dG9uXCI6e1widGV4dFwiOlwi5byA5aeL6K++56iLXCIsXCJzaXplXCI6XCJiaWdcIixcInRoZW1lXCI6XCJ3YXJuaW5nXCIsXCJ4bWxuczp2LW9uXCI6XCJcIn19O1xyXG4kZXZlbnRzID0ge1wicmljaC1idXR0b25cIjp7XCJ2LW9uOnRhcFwiOlwic3RhcnRDb3Vyc2VcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgICAgICAgICAgJ3JpY2gtYnV0dG9uJzogcmljaEJ1dHRvblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGF0YSA9IHtcclxuICAgICAgICAgICAgdXNlckluZm86IG51bGwsXHJcbiAgICAgICAgICAgIGNvdXJzZUlkOiAnJyxcclxuICAgICAgICAgICAgZ3JvdXBJZDogJycsXHJcbiAgICAgICAgICAgIGNvdXJzZUluZm86IG51bGwsXHJcbiAgICAgICAgICAgIGdyb3VwTWVtYmVyczogW11cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgICAgIHN0YXJ0Q291cnNlKCkge1xyXG4gICAgICAgICAgICAgICAgLy8g5qCh6aqM6K+l5a2m55Sf5piv5ZCm5Zyo6K+l6K++56iL55qE5p+Q5LiA5Liq5Lu75Yqh5Lit77yM5aaC5p6c5Zyo5Lu75Yqh5Lit5YiZ5peg5rOV5Yib5bu6XHJcbiAgICAgICAgICAgICAgICBhY3RpdmF0ZUdyb3VwVGFzayh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mby5GbG5rSUQsIHRoaXMuZ3JvdXBJZCwgdGhpcy5jb3Vyc2VJZCkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhY3RpdmVUYXNrSW5mbyA9IHtDb3Vyc2VGSUQ6IHRoaXMuY291cnNlSWQsIEdyb3VwRklEOiB0aGlzLmdyb3VwSWR9XHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygnYWN0aXZlVGFza0luZm8nLCBhY3RpdmVUYXNrSW5mbylcclxuICAgICAgICAgICAgICAgICAgICB3ZXB5LnN3aXRjaFRhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy9wYWdlcy9wcmFjdGljZSdcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmk43kvZzlpLHotKUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXZlbnRzID0ge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKSB7XHJcbiAgICAgICAgICAgIGdldENvdXJzZURldGFpbEJ5SWQodGhpcy5jb3Vyc2VJZCkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb3Vyc2VJbmZvID0gcmVzXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkxvYWQob3B0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY291cnNlSWQgPSBvcHRpb24uY291cnNlSWRcclxuICAgICAgICAgICAgdGhpcy5ncm91cElkID0gb3B0aW9uLmdyb3VwSWRcclxuICAgICAgICAgICAgdGhpcy5ncm91cE1lbWJlcnMgPSAod2VweS5nZXRTdG9yYWdlU3luYygnZ3JvdXBNZW1iZXJzJykgfHwgW10pXHJcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBNZW1iZXJzLnVuc2hpZnQoe1xyXG4gICAgICAgICAgICAgICAgTWVtYmVyTmFtZTogdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8uWE1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5pbml0KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiJdfQ==