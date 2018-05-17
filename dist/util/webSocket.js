'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var currentSocketTask = null;
var isSocketOpen = false;
var messageStack = [];

exports.default = {
    getActiveGroupTask: function getActiveGroupTask() {
        return _wepy2.default.getStorageSync('activeTaskInfo');
    },
    connectSocket: function connectSocket(param) {
        if (!currentSocketTask) {
            _wepy2.default.connectSocket({
                url: param.url,
                success: function success(e) {
                    currentSocketTask = e;
                }
            });
        }
    },
    registerSocketOpen: function registerSocketOpen() {
        var self = this;
        if (currentSocketTask) {
            currentSocketTask.onOpen(function () {
                isSocketOpen = true;
                if (messageStack && messageStack.length > 0) {
                    messageStack.forEach(function (item) {
                        self.sendMessage(item);
                    });
                    messageStack = [];
                }
            });
        } else {
            _wepy2.default.onSocketOpen(function () {
                isSocketOpen = true;
                if (messageStack && messageStack.length > 0) {
                    messageStack.forEach(function (item) {
                        self.sendMessage(item);
                    });
                    messageStack = [];
                }
            });
        }
    },
    registerScoketClose: function registerScoketClose() {
        if (currentSocketTask) {
            currentSocketTask.onClose(function () {
                isSocketOpen = false;
            });
            currentSocketTask.onError(function () {
                isSocketOpen = false;
            });
        } else {
            _wepy2.default.onSocketClose(function () {
                isSocketOpen = false;
            });
            _wepy2.default.onSocketError(function () {
                isSocketOpen = false;
            });
        }
    },
    sendMessage: function sendMessage(data) {
        if (currentSocketTask) {
            if (isSocketOpen) {
                currentSocketTask.send({
                    data: data
                });
            } else {
                messageStack.push(data);
            }
        } else {
            if (isSocketOpen) {
                _wepy2.default.sendSocketMessage({
                    data: data
                });
            } else {
                messageStack.push(data);
            }
        }
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYlNvY2tldC5qcyJdLCJuYW1lcyI6WyJjdXJyZW50U29ja2V0VGFzayIsImlzU29ja2V0T3BlbiIsIm1lc3NhZ2VTdGFjayIsImdldEFjdGl2ZUdyb3VwVGFzayIsImdldFN0b3JhZ2VTeW5jIiwiY29ubmVjdFNvY2tldCIsInBhcmFtIiwidXJsIiwic3VjY2VzcyIsImUiLCJyZWdpc3RlclNvY2tldE9wZW4iLCJzZWxmIiwib25PcGVuIiwibGVuZ3RoIiwiZm9yRWFjaCIsInNlbmRNZXNzYWdlIiwiaXRlbSIsIm9uU29ja2V0T3BlbiIsInJlZ2lzdGVyU2Nva2V0Q2xvc2UiLCJvbkNsb3NlIiwib25FcnJvciIsIm9uU29ja2V0Q2xvc2UiLCJvblNvY2tldEVycm9yIiwiZGF0YSIsInNlbmQiLCJwdXNoIiwic2VuZFNvY2tldE1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7QUFDQSxJQUFJQSxvQkFBb0IsSUFBeEI7QUFDQSxJQUFJQyxlQUFlLEtBQW5CO0FBQ0EsSUFBSUMsZUFBZSxFQUFuQjs7a0JBRWU7QUFDWEMsc0JBRFcsZ0NBQ1U7QUFDakIsZUFBTyxlQUFLQyxjQUFMLENBQW9CLGdCQUFwQixDQUFQO0FBQ0gsS0FIVTtBQUlYQyxpQkFKVyx5QkFJR0MsS0FKSCxFQUlVO0FBQ2pCLFlBQUksQ0FBQ04saUJBQUwsRUFBd0I7QUFDcEIsMkJBQUtLLGFBQUwsQ0FBbUI7QUFDZkUscUJBQUtELE1BQU1DLEdBREk7QUFFZkMsdUJBRmUsbUJBRVBDLENBRk8sRUFFSjtBQUNQVCx3Q0FBb0JTLENBQXBCO0FBQ0g7QUFKYyxhQUFuQjtBQU1IO0FBQ0osS0FiVTtBQWNYQyxzQkFkVyxnQ0FjVTtBQUNqQixZQUFJQyxPQUFPLElBQVg7QUFDQSxZQUFJWCxpQkFBSixFQUF1QjtBQUNuQkEsOEJBQWtCWSxNQUFsQixDQUF5QixZQUFXO0FBQ2hDWCwrQkFBZSxJQUFmO0FBQ0Esb0JBQUlDLGdCQUFnQkEsYUFBYVcsTUFBYixHQUFzQixDQUExQyxFQUE2QztBQUN6Q1gsaUNBQWFZLE9BQWIsQ0FBcUIsZ0JBQVE7QUFDekJILDZCQUFLSSxXQUFMLENBQWlCQyxJQUFqQjtBQUNILHFCQUZEO0FBR0FkLG1DQUFlLEVBQWY7QUFDSDtBQUNKLGFBUkQ7QUFTSCxTQVZELE1BVU87QUFDSCwyQkFBS2UsWUFBTCxDQUFrQixZQUFXO0FBQ3pCaEIsK0JBQWUsSUFBZjtBQUNBLG9CQUFJQyxnQkFBZ0JBLGFBQWFXLE1BQWIsR0FBc0IsQ0FBMUMsRUFBNkM7QUFDekNYLGlDQUFhWSxPQUFiLENBQXFCLGdCQUFRO0FBQ3pCSCw2QkFBS0ksV0FBTCxDQUFpQkMsSUFBakI7QUFDSCxxQkFGRDtBQUdBZCxtQ0FBZSxFQUFmO0FBQ0g7QUFDSixhQVJEO0FBU0g7QUFDSixLQXJDVTtBQXNDWGdCLHVCQXRDVyxpQ0FzQ1c7QUFDbEIsWUFBSWxCLGlCQUFKLEVBQXVCO0FBQ25CQSw4QkFBa0JtQixPQUFsQixDQUEwQixZQUFXO0FBQ2pDbEIsK0JBQWUsS0FBZjtBQUNILGFBRkQ7QUFHQUQsOEJBQWtCb0IsT0FBbEIsQ0FBMEIsWUFBVztBQUNqQ25CLCtCQUFlLEtBQWY7QUFDSCxhQUZEO0FBR0gsU0FQRCxNQU9PO0FBQ0gsMkJBQUtvQixhQUFMLENBQW1CLFlBQVc7QUFDMUJwQiwrQkFBZSxLQUFmO0FBQ0gsYUFGRDtBQUdBLDJCQUFLcUIsYUFBTCxDQUFtQixZQUFXO0FBQzFCckIsK0JBQWUsS0FBZjtBQUNILGFBRkQ7QUFHSDtBQUNKLEtBdERVO0FBdURYYyxlQXZEVyx1QkF1RENRLElBdkRELEVBdURPO0FBQ2QsWUFBSXZCLGlCQUFKLEVBQXVCO0FBQ25CLGdCQUFJQyxZQUFKLEVBQWtCO0FBQ2RELGtDQUFrQndCLElBQWxCLENBQXVCO0FBQ25CRCwwQkFBTUE7QUFEYSxpQkFBdkI7QUFHSCxhQUpELE1BSU87QUFDSHJCLDZCQUFhdUIsSUFBYixDQUFrQkYsSUFBbEI7QUFDSDtBQUNKLFNBUkQsTUFRTztBQUNILGdCQUFJdEIsWUFBSixFQUFrQjtBQUNkLCtCQUFLeUIsaUJBQUwsQ0FBdUI7QUFDbkJILDBCQUFNQTtBQURhLGlCQUF2QjtBQUdILGFBSkQsTUFJTztBQUNIckIsNkJBQWF1QixJQUFiLENBQWtCRixJQUFsQjtBQUNIO0FBQ0o7QUFDSjtBQXpFVSxDIiwiZmlsZSI6IndlYlNvY2tldC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5sZXQgY3VycmVudFNvY2tldFRhc2sgPSBudWxsXG5sZXQgaXNTb2NrZXRPcGVuID0gZmFsc2VcbmxldCBtZXNzYWdlU3RhY2sgPSBbXVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZ2V0QWN0aXZlR3JvdXBUYXNrKCkge1xuICAgICAgICByZXR1cm4gd2VweS5nZXRTdG9yYWdlU3luYygnYWN0aXZlVGFza0luZm8nKVxuICAgIH0sXG4gICAgY29ubmVjdFNvY2tldChwYXJhbSkge1xuICAgICAgICBpZiAoIWN1cnJlbnRTb2NrZXRUYXNrKSB7XG4gICAgICAgICAgICB3ZXB5LmNvbm5lY3RTb2NrZXQoe1xuICAgICAgICAgICAgICAgIHVybDogcGFyYW0udXJsLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MoZSkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U29ja2V0VGFzayA9IGVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfSxcbiAgICByZWdpc3RlclNvY2tldE9wZW4oKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICBpZiAoY3VycmVudFNvY2tldFRhc2spIHtcbiAgICAgICAgICAgIGN1cnJlbnRTb2NrZXRUYXNrLm9uT3BlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpc1NvY2tldE9wZW4gPSB0cnVlXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2VTdGFjayAmJiBtZXNzYWdlU3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlU3RhY2suZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2VuZE1lc3NhZ2UoaXRlbSlcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZVN0YWNrID0gW11cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2VweS5vblNvY2tldE9wZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaXNTb2NrZXRPcGVuID0gdHJ1ZVxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlU3RhY2sgJiYgbWVzc2FnZVN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZVN0YWNrLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNlbmRNZXNzYWdlKGl0ZW0pXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VTdGFjayA9IFtdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVnaXN0ZXJTY29rZXRDbG9zZSgpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRTb2NrZXRUYXNrKSB7XG4gICAgICAgICAgICBjdXJyZW50U29ja2V0VGFzay5vbkNsb3NlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlzU29ja2V0T3BlbiA9IGZhbHNlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgY3VycmVudFNvY2tldFRhc2sub25FcnJvcihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpc1NvY2tldE9wZW4gPSBmYWxzZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdlcHkub25Tb2NrZXRDbG9zZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpc1NvY2tldE9wZW4gPSBmYWxzZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHdlcHkub25Tb2NrZXRFcnJvcihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpc1NvY2tldE9wZW4gPSBmYWxzZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH0sXG4gICAgc2VuZE1lc3NhZ2UoZGF0YSkge1xuICAgICAgICBpZiAoY3VycmVudFNvY2tldFRhc2spIHtcbiAgICAgICAgICAgIGlmIChpc1NvY2tldE9wZW4pIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50U29ja2V0VGFzay5zZW5kKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2VTdGFjay5wdXNoKGRhdGEpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoaXNTb2NrZXRPcGVuKSB7XG4gICAgICAgICAgICAgICAgd2VweS5zZW5kU29ja2V0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlU3RhY2sucHVzaChkYXRhKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19