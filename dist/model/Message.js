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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1lc3NhZ2UuanMiXSwibmFtZXMiOlsiTWVzc2FnZSIsInVzZXJJbmZvIiwibWVzc2FnZSIsIm1lc3NhZ2VUeXBlIiwiaXNTZWxmIiwiTWVzc2FnZVR5cGUiLCJGcm9tVXNlciIsInVzZXJJZCIsIlRvVXNlciIsIlRvR3JvdXAiLCJncm91cElkIiwiUm9sZU51bSIsIkF2YXRhclVybCIsIlVzZXJOYW1lIiwidXNlck5hbWUiLCJNZXNzYWdlQm9keSIsIm1zZ2tleSIsIm1zZ3R5cGUiLCJtc2djb250ZW50Iiwic3RlcGtleSIsInN0ZXBjb2RlIiwic3RlcG5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0lBQWFBLE8sV0FBQUEsTyxHQUNULGlCQUFhQyxRQUFiLEVBQXVCQyxPQUF2QixFQUFnQ0MsV0FBaEMsRUFBNkNDLE1BQTdDLEVBQXFEO0FBQUE7O0FBQ2pELFNBQUtDLFdBQUwsR0FBbUIsT0FBT0YsV0FBUCxLQUF1QixXQUF2QixHQUFxQyxDQUFyQyxHQUF5Q0EsV0FBNUQ7QUFDQSxTQUFLRyxRQUFMLEdBQWdCTCxTQUFTTSxNQUF6QjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxJQUFkO0FBQ0EsU0FBS0MsT0FBTCxHQUFlUixTQUFTUyxPQUF4QjtBQUNBLFNBQUtDLE9BQUwsR0FBZVYsU0FBU1UsT0FBeEI7QUFDQSxTQUFLQyxTQUFMLEdBQWlCWCxTQUFTVyxTQUExQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JaLFNBQVNhLFFBQXpCO0FBQ0EsUUFBSSxLQUFLVCxXQUFMLEtBQXFCLENBQXpCLEVBQTRCO0FBQ3hCLGFBQUtVLFdBQUwsR0FBbUI7QUFDZkYsc0JBQVVaLFNBQVNNO0FBREosU0FBbkI7QUFHSCxLQUpELE1BSU87QUFDSCxhQUFLUSxXQUFMLEdBQW1CO0FBQ2ZDLG9CQUFRLEVBRE87QUFFZkMscUJBQVNmLFFBQVFlLE9BQVIsSUFBbUIsR0FGYjtBQUdmQyx3QkFBWWhCLFFBQVFnQixVQUFSLElBQXNCLEVBSG5CO0FBSWZDLHFCQUFTakIsUUFBUWlCLE9BQVIsSUFBbUIsRUFKYjtBQUtmQyxzQkFBVWxCLFFBQVFrQixRQUFSLElBQW9CLEVBTGY7QUFNZkMsc0JBQVVuQixRQUFRbUIsUUFBUixJQUFvQjtBQU5mLFNBQW5CO0FBUUg7QUFDSixDIiwiZmlsZSI6Ik1lc3NhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IgKHVzZXJJbmZvLCBtZXNzYWdlLCBtZXNzYWdlVHlwZSwgaXNTZWxmKSB7XG4gICAgICAgIHRoaXMuTWVzc2FnZVR5cGUgPSB0eXBlb2YgbWVzc2FnZVR5cGUgPT09ICd1bmRlZmluZWQnID8gMiA6IG1lc3NhZ2VUeXBlXG4gICAgICAgIHRoaXMuRnJvbVVzZXIgPSB1c2VySW5mby51c2VySWRcbiAgICAgICAgdGhpcy5Ub1VzZXIgPSBudWxsXG4gICAgICAgIHRoaXMuVG9Hcm91cCA9IHVzZXJJbmZvLmdyb3VwSWRcbiAgICAgICAgdGhpcy5Sb2xlTnVtID0gdXNlckluZm8uUm9sZU51bVxuICAgICAgICB0aGlzLkF2YXRhclVybCA9IHVzZXJJbmZvLkF2YXRhclVybFxuICAgICAgICB0aGlzLlVzZXJOYW1lID0gdXNlckluZm8udXNlck5hbWVcbiAgICAgICAgaWYgKHRoaXMuTWVzc2FnZVR5cGUgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuTWVzc2FnZUJvZHkgPSB7XG4gICAgICAgICAgICAgICAgVXNlck5hbWU6IHVzZXJJbmZvLnVzZXJJZFxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5NZXNzYWdlQm9keSA9IHtcbiAgICAgICAgICAgICAgICBtc2drZXk6ICcnLFxuICAgICAgICAgICAgICAgIG1zZ3R5cGU6IG1lc3NhZ2UubXNndHlwZSB8fCAnMScsXG4gICAgICAgICAgICAgICAgbXNnY29udGVudDogbWVzc2FnZS5tc2djb250ZW50IHx8ICcnLFxuICAgICAgICAgICAgICAgIHN0ZXBrZXk6IG1lc3NhZ2Uuc3RlcGtleSB8fCAnJyxcbiAgICAgICAgICAgICAgICBzdGVwY29kZTogbWVzc2FnZS5zdGVwY29kZSB8fCAnJyxcbiAgICAgICAgICAgICAgICBzdGVwbmFtZTogbWVzc2FnZS5zdGVwbmFtZSB8fCAnJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19