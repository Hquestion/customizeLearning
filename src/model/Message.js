export class Message {
    constructor (userInfo, message, messageType, isSelf) {
        this.MessageType = typeof messageType === 'undefined' ? 2 : messageType
        this.FromUser = userInfo.userId
        this.ToUser = null
        this.ToGroup = userInfo.groupId
        this.RoleNum = userInfo.RoleNum
        this.AvatarUrl = userInfo.AvatarUrl
        this.UserName = userInfo.userName
        if (this.MessageType === 0) {
            this.MessageBody = {
                UserName: userInfo.userId
            }
        } else {
            this.MessageBody = {
                msgkey: '',
                msgtype: message.msgtype || '1',
                msgcontent: message.msgcontent || '',
                stepkey: message.stepkey || '',
                stepcode: message.stepcode || '',
                stepname: message.stepname || ''
            }
        }
        // this.isSelf = !!isSelf
    }
}
