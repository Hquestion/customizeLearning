'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Message = exports.Message = function Message(userInfo, message, messageType, isSelf) {
    _classCallCheck(this, Message);

    this.MessageType = typeof messageType === 'undefined' ? 2 : messageType;
    this.FromUser = userInfo.userId;
    this.ToUser = null;
    this.ToGroup = userInfo.groupId;
    this.RoleNum = userInfo.RoleNum;
    this.AvatarUrl = userInfo.AvatarUrl;
    this.UserName = userInfo.userName;
    if (this.MessageType === 0) {
        this.MessageBody = {
            UserName: userInfo.userId
        };
    } else {
        this.MessageBody = {
            msgkey: '',
            msgtype: message.msgtype || '1',
            msgcontent: message.msgcontent || '',
            stepkey: message.stepkey || '',
            stepcode: message.stepcode || '',
            stepname: message.stepname || ''
        };
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1lc3NhZ2UuanMiXSwibmFtZXMiOlsiTWVzc2FnZSIsInVzZXJJbmZvIiwibWVzc2FnZSIsIm1lc3NhZ2VUeXBlIiwiaXNTZWxmIiwiTWVzc2FnZVR5cGUiLCJGcm9tVXNlciIsInVzZXJJZCIsIlRvVXNlciIsIlRvR3JvdXAiLCJncm91cElkIiwiUm9sZU51bSIsIkF2YXRhclVybCIsIlVzZXJOYW1lIiwidXNlck5hbWUiLCJNZXNzYWdlQm9keSIsIm1zZ2tleSIsIm1zZ3R5cGUiLCJtc2djb250ZW50Iiwic3RlcGtleSIsInN0ZXBjb2RlIiwic3RlcG5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0lBQWFBLE8sV0FBQUEsTyxHQUNULGlCQUFhQyxRQUFiLEVBQXVCQyxPQUF2QixFQUFnQ0MsV0FBaEMsRUFBNkNDLE1BQTdDLEVBQXFEO0FBQUE7O0FBQ2pELFNBQUtDLFdBQUwsR0FBbUIsT0FBT0YsV0FBUCxLQUF1QixXQUF2QixHQUFxQyxDQUFyQyxHQUF5Q0EsV0FBNUQ7QUFDQSxTQUFLRyxRQUFMLEdBQWdCTCxTQUFTTSxNQUF6QjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxJQUFkO0FBQ0EsU0FBS0MsT0FBTCxHQUFlUixTQUFTUyxPQUF4QjtBQUNBLFNBQUtDLE9BQUwsR0FBZVYsU0FBU1UsT0FBeEI7QUFDQSxTQUFLQyxTQUFMLEdBQWlCWCxTQUFTVyxTQUExQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JaLFNBQVNhLFFBQXpCO0FBQ0EsUUFBSSxLQUFLVCxXQUFMLEtBQXFCLENBQXpCLEVBQTRCO0FBQ3hCLGFBQUtVLFdBQUwsR0FBbUI7QUFDZkYsc0JBQVVaLFNBQVNNO0FBREosU0FBbkI7QUFHSCxLQUpELE1BSU87QUFDSCxhQUFLUSxXQUFMLEdBQW1CO0FBQ2ZDLG9CQUFRLEVBRE87QUFFZkMscUJBQVNmLFFBQVFlLE9BQVIsSUFBbUIsR0FGYjtBQUdmQyx3QkFBWWhCLFFBQVFnQixVQUFSLElBQXNCLEVBSG5CO0FBSWZDLHFCQUFTakIsUUFBUWlCLE9BQVIsSUFBbUIsRUFKYjtBQUtmQyxzQkFBVWxCLFFBQVFrQixRQUFSLElBQW9CLEVBTGY7QUFNZkMsc0JBQVVuQixRQUFRbUIsUUFBUixJQUFvQjtBQU5mLFNBQW5CO0FBUUg7QUFDSixDIiwiZmlsZSI6Ik1lc3NhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgTWVzc2FnZSB7XHJcbiAgICBjb25zdHJ1Y3RvciAodXNlckluZm8sIG1lc3NhZ2UsIG1lc3NhZ2VUeXBlLCBpc1NlbGYpIHtcclxuICAgICAgICB0aGlzLk1lc3NhZ2VUeXBlID0gdHlwZW9mIG1lc3NhZ2VUeXBlID09PSAndW5kZWZpbmVkJyA/IDIgOiBtZXNzYWdlVHlwZVxyXG4gICAgICAgIHRoaXMuRnJvbVVzZXIgPSB1c2VySW5mby51c2VySWRcclxuICAgICAgICB0aGlzLlRvVXNlciA9IG51bGxcclxuICAgICAgICB0aGlzLlRvR3JvdXAgPSB1c2VySW5mby5ncm91cElkXHJcbiAgICAgICAgdGhpcy5Sb2xlTnVtID0gdXNlckluZm8uUm9sZU51bVxyXG4gICAgICAgIHRoaXMuQXZhdGFyVXJsID0gdXNlckluZm8uQXZhdGFyVXJsXHJcbiAgICAgICAgdGhpcy5Vc2VyTmFtZSA9IHVzZXJJbmZvLnVzZXJOYW1lXHJcbiAgICAgICAgaWYgKHRoaXMuTWVzc2FnZVR5cGUgPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5NZXNzYWdlQm9keSA9IHtcclxuICAgICAgICAgICAgICAgIFVzZXJOYW1lOiB1c2VySW5mby51c2VySWRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuTWVzc2FnZUJvZHkgPSB7XHJcbiAgICAgICAgICAgICAgICBtc2drZXk6ICcnLFxyXG4gICAgICAgICAgICAgICAgbXNndHlwZTogbWVzc2FnZS5tc2d0eXBlIHx8ICcxJyxcclxuICAgICAgICAgICAgICAgIG1zZ2NvbnRlbnQ6IG1lc3NhZ2UubXNnY29udGVudCB8fCAnJyxcclxuICAgICAgICAgICAgICAgIHN0ZXBrZXk6IG1lc3NhZ2Uuc3RlcGtleSB8fCAnJyxcclxuICAgICAgICAgICAgICAgIHN0ZXBjb2RlOiBtZXNzYWdlLnN0ZXBjb2RlIHx8ICcnLFxyXG4gICAgICAgICAgICAgICAgc3RlcG5hbWU6IG1lc3NhZ2Uuc3RlcG5hbWUgfHwgJydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=