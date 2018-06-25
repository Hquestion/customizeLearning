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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0ZXAtbGlzdC5qcyJdLCJuYW1lcyI6WyJzeSIsIm15IiwiaXNQcmVwYXJlRHJhZ2dpbmciLCJTdGVwTGlzdCIsInByb3BzIiwibGlzdCIsInR3b1dheSIsImVkaXRhYmxlIiwicGFyZW50U2Nyb2xsVG9wIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwic3RlcCIsImRhdGEiLCJvZmZzZXRUb3BMaXN0IiwibW92aW5nSW5kZXgiLCJvZmZzZXRUb3AiLCJvcGFjaXR5IiwiZXZlbnRzIiwibWV0aG9kcyIsIm9uTG9uZ1ByZXNzIiwiZSIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiaW5kZXgiLCIkZW1pdCIsIm9uU3RhcnRUb3VjaCIsImdldE9mZnNldFRvcExpc3QiLCJ0b3VjaGVzIiwiY2xpZW50WSIsIm9uVG91Y2hNb3ZlIiwiZGlzdGFuY2UiLCJvblRvdWNoRW5kIiwiZGlzdEluZGV4IiwiZmluZFN0ZXBJdGVtSW5kZXgiLCJyZWJ1aWxkTGlzdCIsIiRhcHBseSIsInNlbGYiLCJvZmZzZXRzIiwic2VsZWN0UXVlcnkiLCJ3ZXB5IiwiY3JlYXRlU2VsZWN0b3JRdWVyeSIsIiRub2RlUmVmcyIsInNlbGVjdEFsbCIsImJvdW5kaW5nQ2xpZW50UmVjdCIsImV4ZWMiLCJyZXMiLCJmb3JFYWNoIiwicHVzaCIsIml0ZW0iLCJ0b3AiLCIkcGFyZW50Iiwib2Zmc2V0IiwiaSIsImxlbiIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCJvbGRJbmRleCIsIm5ld0luZGV4Iiwic3BsaWNlIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDSTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxXQUFKO0FBQUEsSUFBUUMsV0FBUjtBQUNBLElBQUlDLG9CQUFvQixLQUF4Qjs7SUFFcUJDLFE7Ozs7Ozs7Ozs7Ozs7OzhMQUNqQkMsSyxHQUFRO0FBQ0pDLGtCQUFNO0FBQ0ZDLHdCQUFRO0FBRE4sYUFERjtBQUlK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QUFQO0FBQ0g7OztvQ0FFV2tDLFEsRUFBVUMsUSxFQUFVO0FBQzVCSCxvQkFBUUMsR0FBUixDQUFZQyxRQUFaO0FBQ0FGLG9CQUFRQyxHQUFSLENBQVksVUFBWixFQUF3QkUsUUFBeEI7QUFDQSxnQkFBSUQsYUFBYUMsUUFBakIsRUFBMkI7QUFDdkIsb0JBQUlELFdBQVdDLFFBQWYsRUFBeUI7QUFDckIsd0JBQUk5QyxPQUFPLEtBQUtULElBQUwsQ0FBVXNELFFBQVYsQ0FBWDtBQUNBLHlCQUFLdEQsSUFBTCxDQUFVd0QsTUFBVixDQUFpQkYsUUFBakIsRUFBMkIsQ0FBM0I7QUFDQSx5QkFBS3RELElBQUwsQ0FBVXdELE1BQVYsQ0FBaUJELFFBQWpCLEVBQTJCLENBQTNCLEVBQThCOUMsSUFBOUI7QUFDSCxpQkFKRCxNQUlPO0FBQ0gsd0JBQUlBLFFBQU8sS0FBS1QsSUFBTCxDQUFVc0QsUUFBVixDQUFYO0FBQ0EseUJBQUt0RCxJQUFMLENBQVV3RCxNQUFWLENBQWlCRixRQUFqQixFQUEyQixDQUEzQjtBQUNBLHlCQUFLdEQsSUFBTCxDQUFVd0QsTUFBVixDQUFpQkQsUUFBakIsRUFBMkIsQ0FBM0IsRUFBOEI5QyxLQUE5QjtBQUNIO0FBQ0o7QUFDSjs7OztFQWpIaUMyQixlQUFLcUIsUzs7a0JBQXRCM0QsUSIsImZpbGUiOiJzdGVwLWxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICAgIGltcG9ydCBzdGVwIGZyb20gJy4vc3RlcCdcblxuICAgIGxldCBzeSwgbXlcbiAgICBsZXQgaXNQcmVwYXJlRHJhZ2dpbmcgPSBmYWxzZVxuXG4gICAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RlcExpc3QgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gICAgICAgIHByb3BzID0ge1xuICAgICAgICAgICAgbGlzdDoge1xuICAgICAgICAgICAgICAgIHR3b1dheTogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVkaXRhYmxlOiB7fSxcbiAgICAgICAgICAgIHBhcmVudFNjcm9sbFRvcDoge1xuICAgICAgICAgICAgICAgIHR3b1dheTogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAkcmVwZWF0ID0ge1wibGlzdFwiOntcImNvbVwiOlwic3RlcFwiLFwicHJvcHNcIjpcInN0ZXBEYXRhLnN5bmNcIn19O1xyXG4kcHJvcHMgPSB7XCJzdGVwXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOnN0ZXBEYXRhLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOmluZGV4LnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaW5kZXggKyAxXCIsXCJmb3JcIjpcImxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6ZWRpdGFibGUuc3luY1wiOntcInZhbHVlXCI6XCJlZGl0YWJsZVwiLFwiZm9yXCI6XCJsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9fX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICAgICAgICAnc3RlcCc6IHN0ZXBcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICBvZmZzZXRUb3BMaXN0OiBbXSxcbiAgICAgICAgICAgIG1vdmluZ0luZGV4OiAtMSxcbiAgICAgICAgICAgIG9mZnNldFRvcDogMCxcbiAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgfVxuICAgICAgICBldmVudHMgPSB7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIG1ldGhvZHMgPSB7XG4gICAgICAgICAgICBvbkxvbmdQcmVzcyhlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZWRpdGFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaXNQcmVwYXJlRHJhZ2dpbmcgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92aW5nSW5kZXggPSArZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnZGlzYWJsZS1zY3JvbGwnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvblN0YXJ0VG91Y2goZSkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5lZGl0YWJsZSkgcmV0dXJuXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRPZmZzZXRUb3BMaXN0KClcbiAgICAgICAgICAgICAgICBzeSA9IGUudG91Y2hlc1swXS5jbGllbnRZXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25Ub3VjaE1vdmUoZSkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5lZGl0YWJsZSkgcmV0dXJuXG4gICAgICAgICAgICAgICAgaWYgKGlzUHJlcGFyZURyYWdnaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIG15ID0gZS50b3VjaGVzWzBdLmNsaWVudFlcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpc3RhbmNlID0gbXkgLSBzeVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9mZnNldFRvcCArPSBkaXN0YW5jZVxuICAgICAgICAgICAgICAgICAgICBzeSA9IG15XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uVG91Y2hFbmQoZSkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5lZGl0YWJsZSkgcmV0dXJuXG4gICAgICAgICAgICAgICAgaWYgKGlzUHJlcGFyZURyYWdnaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92aW5nSW5kZXggPSAtMVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9mZnNldFRvcCA9IDBcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpc3RJbmRleCA9IHRoaXMuZmluZFN0ZXBJdGVtSW5kZXgoZS5jdXJyZW50VGFyZ2V0Lm9mZnNldFRvcClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWJ1aWxkTGlzdChlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleCwgZGlzdEluZGV4KVxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICAgICAgICAgIGlzUHJlcGFyZURyYWdnaW5nID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnZW5hYmxlLXNjcm9sbCcpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZ2V0T2Zmc2V0VG9wTGlzdCgpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgbGV0IG9mZnNldHMgPSBbXVxuICAgICAgICAgICAgbGV0IHNlbGVjdFF1ZXJ5ID0gd2VweS5jcmVhdGVTZWxlY3RvclF1ZXJ5KClcbiAgICAgICAgICAgIGxldCAkbm9kZVJlZnMgPSBzZWxlY3RRdWVyeS5zZWxlY3RBbGwoJy5zdGVwLWl0ZW0nKVxuICAgICAgICAgICAgJG5vZGVSZWZzLmJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgICBzZWxlY3RRdWVyeS5leGVjKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgIHJlc1swXS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXRzLnB1c2goaXRlbS50b3AgKyAoc2VsZi4kcGFyZW50LnBhcmVudFNjcm9sbFRvcCB8fCAwKSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRoaXMub2Zmc2V0VG9wTGlzdCA9IG9mZnNldHNcbiAgICAgICAgfVxuXG4gICAgICAgIGZpbmRTdGVwSXRlbUluZGV4KG9mZnNldCkge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gMFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMub2Zmc2V0VG9wTGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChvZmZzZXQgPD0gdGhpcy5vZmZzZXRUb3BMaXN0W2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaSAtIDFcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG9mZnNldCA+PSB0aGlzLm9mZnNldFRvcExpc3RbaV0gJiYgb2Zmc2V0IDwgdGhpcy5vZmZzZXRUb3BMaXN0W2kgKyAxXSkge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGkgKyAxXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvZmZzZXQgPiB0aGlzLm9mZnNldFRvcExpc3RbbGVuIC0gMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBsZW5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnb2Zmc2V0OicsIG9mZnNldClcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMub2Zmc2V0VG9wTGlzdClcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbmRleDonLCBpbmRleClcbiAgICAgICAgICAgIGluZGV4ID0gaW5kZXggPCAwID8gMCA6IGluZGV4XG4gICAgICAgICAgICByZXR1cm4gaW5kZXhcbiAgICAgICAgfVxuXG4gICAgICAgIHJlYnVpbGRMaXN0KG9sZEluZGV4LCBuZXdJbmRleCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2cob2xkSW5kZXgpXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbmV3SW5kZXgnLCBuZXdJbmRleClcbiAgICAgICAgICAgIGlmIChvbGRJbmRleCAhPT0gbmV3SW5kZXgpIHtcbiAgICAgICAgICAgICAgICBpZiAob2xkSW5kZXggPiBuZXdJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMubGlzdFtvbGRJbmRleF1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0LnNwbGljZShvbGRJbmRleCwgMSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0LnNwbGljZShuZXdJbmRleCwgMCwgZGF0YSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMubGlzdFtvbGRJbmRleF1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0LnNwbGljZShvbGRJbmRleCwgMSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0LnNwbGljZShuZXdJbmRleCwgMCwgZGF0YSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4iXX0=