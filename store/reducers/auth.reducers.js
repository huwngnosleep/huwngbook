import { SIGN_IN, SIGN_UP } from "../actions/auth.actions";

const initialState = {
    idToken: null,
    userId: null,
    user: {
        name: 'Guess',
        avatar: 'https://www.cstitches.com/wp-content/uploads/2019/05/no_avatar.png',
        bio: 'Bio',
        birthday: '',
        detailInfo: ['Detail', 'Detail', 'Detail'],
        posts: [
            {"id":1,"owner":"Kalie Gipp","date":"5/30/2020","imageUri":"http://dummyimage.com/200x200.png/cc0000/ffffff","content":"Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue."},
            {"id":9,"owner":"Em Giorgetti","date":"10/30/2020","imageUri":"http://dummyimage.com/200x200.jpg/ff4444/ffffff","content":"Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim."},
            {"id":10,"owner":"Lola Wallworke","date":"6/15/2020","imageUri":"http://dummyimage.com/200x200.jpg/dddddd/000000","content":"Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc."}
        ],
        friends: [1,2,3,4,5,6,7,8,9],
    },
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                user: action.user,
            }
        case SIGN_UP:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
            }
    
        default:
            return state
    }
}