export default class PostModel {
    constructor(postData) {
        this.postId = postData.postId
        this.ownerId = postData.ownerId
        this.date = postData.date
        this.imageUri = postData.imageUri
        this.content = postData.content
        this.likes = postData.likes || {}
        this.comments = postData.comments || {}
    }
}