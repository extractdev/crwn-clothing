import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyDbv2_UTMqxflbnNjDJ_WNaXZg6S-712v0",
    authDomain: "crwn-db-4729b.firebaseapp.com",
    databaseURL: "https://crwn-db-4729b.firebaseio.com",
    projectId: "crwn-db-4729b",
    storageBucket: "",
    messagingSenderId: "384027292282",
    appId: "1:384027292282:web:a9febc33b65bc9288a01c3"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get()
    if(!snapShot.exists) {
        const {displayName, email} = userAuth
        const createdAt = new Date()
        console.log(createdAt)
        try {
            userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (err) {
            console.log('error creating user', err.message)
        }
    }

    return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()

provider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => auth.signInWithPopup(provider)
