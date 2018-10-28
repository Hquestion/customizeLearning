'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _step = require('./step.js');

var _step2 = _interopRequireDefault(_step);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var sy = void 0,
    my = void 0;
var isPrepareDragging = false;

var StepList = function (_wepy$component) {
    _inherits(StepList, _wepy$component);

    function StepList() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, StepList);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = StepList.__proto__ || Object.getPrototypeOf(StepList)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
            list: {
                twoWay: true
            },
            editable: {},
            parentScrollTop: {
                twoWay: true
            }
        }, _this.$repeat = { "list": { "com": "step", "props": "stepData.sync" } }, _this.$props = { "step": { "xmlns:v-bind": { "value": "", "for": "list", "item": "item", "index": "index", "key": "key" }, "v-bind:stepData.sync": { "value": "item", "type": "item", "for": "list", "item": "item", "index": "index", "key": "key" }, "v-bind:index.sync": { "value": "index + 1", "for": "list", "item": "item", "index": "index", "key": "key" }, "v-bind:editable.sync": { "value": "editable", "for": "list", "item": "item", "index": "index", "key": "key" } } }, _this.$events = {}, _this.components = {
            'step': _step2.default
        }, _this.data = {
            offsetTopList: [],
            movingIndex: -1,
            offsetTop: 0,
            opacity: 1
        }, _this.events = {}, _this.methods = {
            onLongPress: function onLongPress(e) {
                if (this.editable) {
                    isPrepareDragging = true;
                    this.movingIndex = +e.currentTarget.dataset.index;
                    this.$emit('disable-scroll');
                }
            },
            onStartTouch: function onStartTouch(e) {
                if (!this.editable) return;
                this.getOffsetTopList();
                sy = e.touches[0].clientY;
            },
            onTouchMove: function onTouchMove(e) {
                if (!this.editable) return;
                if (isPrepareDragging) {
                    my = e.touches[0].clientY;
                    var distance = my - sy;
                    this.offsetTop += distance;
                    sy = my;
                }
            },
            onTouchEnd: function onTouchEnd(e) {
                if (!this.editable) return;
                if (isPrepareDragging) {
                    this.movingIndex = -1;
                    this.offsetTop = 0;
                    var distIndex = this.findStepItemIndex(e.currentTarget.offsetTop);
                    this.rebuildList(e.currentTarget.dataset.index, distIndex);
                    this.$apply();
                    isPrepareDragging = false;
                    this.$emit('enable-scroll');
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(StepList, [{
        key: 'getOffsetTopList',
        value: function getOffsetTopList() {
            var self = this;
            var offsets = [];
            var selectQuery = _wepy2.default.createSelectorQuery();
            var $nodeRefs = selectQuery.selectAll('.step-item');
            $nodeRefs.boundingClientRect();
            selectQuery.exec(function (res) {
                res[0].forEach(function (item) {
                    offsets.push(item.top + (self.$parent.parentScrollTop || 0));
                });
            });
            this.offsetTopList = offsets;
        }
    }, {
        key: 'findStepItemIndex',
        value: function findStepItemIndex(offset) {
            var index = 0;
            for (var i = 0, len = this.offsetTopList.length; i < len; i++) {
                if (offset <= this.offsetTopList[i]) {
                    index = i - 1;
                    break;
                } else if (offset >= this.offsetTopList[i] && offset < this.offsetTopList[i + 1]) {
                    index = i + 1;
                    break;
                } else if (offset > this.offsetTopList[len - 1]) {
                    index = len;
                    break;
                }
            }
            console.log('offset:', offset);
            console.log(this.offsetTopList);
            console.log('index:', index);
            index = index < 0 ? 0 : index;
            return index;
        }
    }, {
        key: 'rebuildList',
        value: function rebuildList(oldIndex, newIndex) {
            console.log(oldIndex);
            console.log('newIndex', newIndex);
            if (oldIndex !== newIndex) {
                if (oldIndex > newIndex) {
                    var data = this.list[oldIndex];
                    this.list.splice(oldIndex, 1);
                    this.list.splice(newIndex, 0, data);
                } else {
                    var _data = this.list[oldIndex];
                    this.list.splice(oldIndex, 1);
                    this.list.splice(newIndex, 0, _data);
                }
            }
        }
    }]);

    return StepList;
}(_wepy2.default.component);

exports.default = StepList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0ZXAtbGlzdC5qcyJdLCJuYW1lcyI6WyJzeSIsIm15IiwiaXNQcmVwYXJlRHJhZ2dpbmciLCJTdGVwTGlzdCIsInByb3BzIiwibGlzdCIsInR3b1dheSIsImVkaXRhYmxlIiwicGFyZW50U2Nyb2xsVG9wIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiZGF0YSIsIm9mZnNldFRvcExpc3QiLCJtb3ZpbmdJbmRleCIsIm9mZnNldFRvcCIsIm9wYWNpdHkiLCJldmVudHMiLCJtZXRob2RzIiwib25Mb25nUHJlc3MiLCJlIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJpbmRleCIsIiRlbWl0Iiwib25TdGFydFRvdWNoIiwiZ2V0T2Zmc2V0VG9wTGlzdCIsInRvdWNoZXMiLCJjbGllbnRZIiwib25Ub3VjaE1vdmUiLCJkaXN0YW5jZSIsIm9uVG91Y2hFbmQiLCJkaXN0SW5kZXgiLCJmaW5kU3RlcEl0ZW1JbmRleCIsInJlYnVpbGRMaXN0IiwiJGFwcGx5Iiwic2VsZiIsIm9mZnNldHMiLCJzZWxlY3RRdWVyeSIsImNyZWF0ZVNlbGVjdG9yUXVlcnkiLCIkbm9kZVJlZnMiLCJzZWxlY3RBbGwiLCJib3VuZGluZ0NsaWVudFJlY3QiLCJleGVjIiwicmVzIiwiZm9yRWFjaCIsInB1c2giLCJpdGVtIiwidG9wIiwiJHBhcmVudCIsIm9mZnNldCIsImkiLCJsZW4iLCJsZW5ndGgiLCJjb25zb2xlIiwibG9nIiwib2xkSW5kZXgiLCJuZXdJbmRleCIsInNwbGljZSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0k7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSUEsV0FBSjtBQUFBLElBQVFDLFdBQVI7QUFDQSxJQUFJQyxvQkFBb0IsS0FBeEI7O0lBRXFCQyxROzs7Ozs7Ozs7Ozs7Ozs4TEFDakJDLEssR0FBUTtBQUNKQyxrQkFBTTtBQUNGQyx3QkFBUTtBQUROLGFBREY7QUFJSkMsc0JBQVUsRUFKTjtB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QUFVQyxRLEVBQVU7QUFDNUJILG9CQUFRQyxHQUFSLENBQVlDLFFBQVo7QUFDQUYsb0JBQVFDLEdBQVIsQ0FBWSxVQUFaLEVBQXdCRSxRQUF4QjtBQUNBLGdCQUFJRCxhQUFhQyxRQUFqQixFQUEyQjtBQUN2QixvQkFBSUQsV0FBV0MsUUFBZixFQUF5QjtBQUNyQix3QkFBSTdDLE9BQU8sS0FBS1IsSUFBTCxDQUFVb0QsUUFBVixDQUFYO0FBQ0EseUJBQUtwRCxJQUFMLENBQVVzRCxNQUFWLENBQWlCRixRQUFqQixFQUEyQixDQUEzQjtBQUNBLHlCQUFLcEQsSUFBTCxDQUFVc0QsTUFBVixDQUFpQkQsUUFBakIsRUFBMkIsQ0FBM0IsRUFBOEI3QyxJQUE5QjtBQUNILGlCQUpELE1BSU87QUFDSCx3QkFBSUEsUUFBTyxLQUFLUixJQUFMLENBQVVvRCxRQUFWLENBQVg7QUFDQSx5QkFBS3BELElBQUwsQ0FBVXNELE1BQVYsQ0FBaUJGLFFBQWpCLEVBQTJCLENBQTNCO0FBQ0EseUJBQUtwRCxJQUFMLENBQVVzRCxNQUFWLENBQWlCRCxRQUFqQixFQUEyQixDQUEzQixFQUE4QjdDLEtBQTlCO0FBQ0g7QUFDSjtBQUNKOzs7O0VBakhpQyxlQUFLK0MsUzs7a0JBQXRCekQsUSIsImZpbGUiOiJzdGVwLWxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICAgIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgICBpbXBvcnQgc3RlcCBmcm9tICcuL3N0ZXAnXHJcblxyXG4gICAgbGV0IHN5LCBteVxyXG4gICAgbGV0IGlzUHJlcGFyZURyYWdnaW5nID0gZmFsc2VcclxuXHJcbiAgICBleHBvcnQgZGVmYXVsdCBjbGFzcyBTdGVwTGlzdCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICAgICAgICBwcm9wcyA9IHtcclxuICAgICAgICAgICAgbGlzdDoge1xyXG4gICAgICAgICAgICAgICAgdHdvV2F5OiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVkaXRhYmxlOiB7fSxcclxuICAgICAgICAgICAgcGFyZW50U2Nyb2xsVG9wOiB7XHJcbiAgICAgICAgICAgICAgICB0d29XYXk6IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAkcmVwZWF0ID0ge1wibGlzdFwiOntcImNvbVwiOlwic3RlcFwiLFwicHJvcHNcIjpcInN0ZXBEYXRhLnN5bmNcIn19O1xyXG4kcHJvcHMgPSB7XCJzdGVwXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOnN0ZXBEYXRhLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOmluZGV4LnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaW5kZXggKyAxXCIsXCJmb3JcIjpcImxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6ZWRpdGFibGUuc3luY1wiOntcInZhbHVlXCI6XCJlZGl0YWJsZVwiLFwiZm9yXCI6XCJsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9fX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgICAgICAgICdzdGVwJzogc3RlcFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGF0YSA9IHtcclxuICAgICAgICAgICAgb2Zmc2V0VG9wTGlzdDogW10sXHJcbiAgICAgICAgICAgIG1vdmluZ0luZGV4OiAtMSxcclxuICAgICAgICAgICAgb2Zmc2V0VG9wOiAwLFxyXG4gICAgICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGV2ZW50cyA9IHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtZXRob2RzID0ge1xyXG4gICAgICAgICAgICBvbkxvbmdQcmVzcyhlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lZGl0YWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzUHJlcGFyZURyYWdnaW5nID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92aW5nSW5kZXggPSArZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXhcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdkaXNhYmxlLXNjcm9sbCcpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uU3RhcnRUb3VjaChlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZWRpdGFibGUpIHJldHVyblxyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRPZmZzZXRUb3BMaXN0KClcclxuICAgICAgICAgICAgICAgIHN5ID0gZS50b3VjaGVzWzBdLmNsaWVudFlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25Ub3VjaE1vdmUoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmVkaXRhYmxlKSByZXR1cm5cclxuICAgICAgICAgICAgICAgIGlmIChpc1ByZXBhcmVEcmFnZ2luZykge1xyXG4gICAgICAgICAgICAgICAgICAgIG15ID0gZS50b3VjaGVzWzBdLmNsaWVudFlcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSBteSAtIHN5XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vZmZzZXRUb3AgKz0gZGlzdGFuY2VcclxuICAgICAgICAgICAgICAgICAgICBzeSA9IG15XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uVG91Y2hFbmQoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmVkaXRhYmxlKSByZXR1cm5cclxuICAgICAgICAgICAgICAgIGlmIChpc1ByZXBhcmVEcmFnZ2luZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92aW5nSW5kZXggPSAtMVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2Zmc2V0VG9wID0gMFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkaXN0SW5kZXggPSB0aGlzLmZpbmRTdGVwSXRlbUluZGV4KGUuY3VycmVudFRhcmdldC5vZmZzZXRUb3ApXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWJ1aWxkTGlzdChlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleCwgZGlzdEluZGV4KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICBpc1ByZXBhcmVEcmFnZ2luZyA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnZW5hYmxlLXNjcm9sbCcpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldE9mZnNldFRvcExpc3QoKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0cyA9IFtdXHJcbiAgICAgICAgICAgIGxldCBzZWxlY3RRdWVyeSA9IHdlcHkuY3JlYXRlU2VsZWN0b3JRdWVyeSgpXHJcbiAgICAgICAgICAgIGxldCAkbm9kZVJlZnMgPSBzZWxlY3RRdWVyeS5zZWxlY3RBbGwoJy5zdGVwLWl0ZW0nKVxyXG4gICAgICAgICAgICAkbm9kZVJlZnMuYm91bmRpbmdDbGllbnRSZWN0KClcclxuICAgICAgICAgICAgc2VsZWN0UXVlcnkuZXhlYyhmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgIHJlc1swXS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldHMucHVzaChpdGVtLnRvcCArIChzZWxmLiRwYXJlbnQucGFyZW50U2Nyb2xsVG9wIHx8IDApKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5vZmZzZXRUb3BMaXN0ID0gb2Zmc2V0c1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZmluZFN0ZXBJdGVtSW5kZXgob2Zmc2V0KSB7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDBcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMub2Zmc2V0VG9wTGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9mZnNldCA8PSB0aGlzLm9mZnNldFRvcExpc3RbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGkgLSAxXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAob2Zmc2V0ID49IHRoaXMub2Zmc2V0VG9wTGlzdFtpXSAmJiBvZmZzZXQgPCB0aGlzLm9mZnNldFRvcExpc3RbaSArIDFdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBpICsgMVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG9mZnNldCA+IHRoaXMub2Zmc2V0VG9wTGlzdFtsZW4gLSAxXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gbGVuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnb2Zmc2V0OicsIG9mZnNldClcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5vZmZzZXRUb3BMaXN0KVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaW5kZXg6JywgaW5kZXgpXHJcbiAgICAgICAgICAgIGluZGV4ID0gaW5kZXggPCAwID8gMCA6IGluZGV4XHJcbiAgICAgICAgICAgIHJldHVybiBpbmRleFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVidWlsZExpc3Qob2xkSW5kZXgsIG5ld0luZGV4KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG9sZEluZGV4KVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbmV3SW5kZXgnLCBuZXdJbmRleClcclxuICAgICAgICAgICAgaWYgKG9sZEluZGV4ICE9PSBuZXdJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9sZEluZGV4ID4gbmV3SW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMubGlzdFtvbGRJbmRleF1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3Quc3BsaWNlKG9sZEluZGV4LCAxKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdC5zcGxpY2UobmV3SW5kZXgsIDAsIGRhdGEpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gdGhpcy5saXN0W29sZEluZGV4XVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdC5zcGxpY2Uob2xkSW5kZXgsIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0LnNwbGljZShuZXdJbmRleCwgMCwgZGF0YSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuIl19