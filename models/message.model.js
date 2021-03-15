export default class message {
    constructor(messageData) {
        this.content = messageData.content
        this.userId = messageData.userId
        this.timeStamp = messageData.timeStamp
    }
}