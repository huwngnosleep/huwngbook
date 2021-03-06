export default class PostModel {
    constructor(postData) {
        this.id = postData.id
        this.owner = postData.owner
        this.ownerId = postData.ownerId
        this.ownerAvatar = postData.ownerAvatar
        this.date = postData.date
        this.imageUri = postData.imageUri
        this.content = postData.content
    }
}