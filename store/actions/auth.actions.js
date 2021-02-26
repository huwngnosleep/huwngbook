import ENV from '../../env'

export const SIGN_IN = 'SIGN_IN'
export const SIGN_UP = 'SIGN_UP'
export const SIGN_OUT = 'SIGN_OUT'

export const signOut = () => {
    return (dispatch) => {
        let guessUser = {
            name: 'Guess',
            avatar: 'https://www.cstitches.com/wp-content/uploads/2019/05/no_avatar.png',
            bio: 'Bio',
            birthday: '',
            detailInfo: ['Detail', 'Detail', 'Detail'],
            posts: [
                {"id":1,"owner":"Kalie Gipp","date":"5/30/2020","imageUri":"http://dummyimage.com/200x200.png/cc0000/ffffff","content":"Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue."},
                {"id":2,"owner":"Em Giorgetti","date":"10/30/2020","imageUri":"http://dummyimage.com/200x200.jpg/ff4444/ffffff","content":"Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim."},
                {"id":3,"owner":"Lola Wallworke","date":"6/15/2020","imageUri":"http://dummyimage.com/200x200.jpg/dddddd/000000","content":"Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc."}
            ],
            friends: [1,2,3,4,5,6,7,8,9],
        }

        dispatch({
            type: SIGN_OUT,
            id: null,
            localId: null,
            user: guessUser,
        })
    }
}

export const signUp = (email, password) => {
    return async (dispatch) => {
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ENV.googleApiKey}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        })
        
        const resData = await response.json()

        if(!response.ok) {
            throw new Error(resData.error.message)
        }

        const databaseResponse = await fetch('https://huwngbook-default-rtdb.firebaseio.com/users.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: '',
                localId: resData.localId,
                email,
                password,
                name: 'Guess',
                userName: null,
                avatar: 'https://www.cstitches.com/wp-content/uploads/2019/05/no_avatar.png',
                bio: 'Bio',
                birthday: null,
                detailInfo: [],
                posts: [],
                friends: [],
            })
        })

        
        const databaseResData = await databaseResponse.json()
        
        let responseId = databaseResData.name

        // update id in database by response id to edit user later
        fetch(`https://huwngbook-default-rtdb.firebaseio.com/users/${responseId}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: responseId,
            })
        })


        dispatch({
            type: SIGN_UP,
            id: responseId,
            localId: resData.localId,
            user: {
                name: 'Guess',
                avatar: 'https://www.cstitches.com/wp-content/uploads/2019/05/no_avatar.png',
                bio: 'Bio',
                birthday: '',
                detailInfo: [],
                posts: [],
                friends: [],
            },
        })
    }
}

export const signIn = (email, password) => {
    return async (dispatch) => {
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ENV.googleApiKey}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        })

        const resData = await response.json()

        if(!response.ok) {
            throw new Error(resData.error.message)
        }

        const usersResponse = await fetch('https://huwngbook-default-rtdb.firebaseio.com/users.json')

        const usersData = await usersResponse.json()

        for(const key in usersData) {
            if(usersData[key].localId === resData.localId) {
                var user = usersData[key]
            }
        }

        dispatch({
            type: SIGN_IN, 
            localId: resData.localId,
            user,
        })
    }
}