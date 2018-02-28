export class Message {
    constructor (userInfo, message, type, isSelf) {
        this.userInfo = userInfo
        this.message = {
            content: message,
            type: type || 'TEXT'
        }
        this.isSelf = !!isSelf
    }
}
