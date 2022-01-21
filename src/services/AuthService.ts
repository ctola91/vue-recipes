import firebaseApp from './firebase';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

const auth = getAuth(firebaseApp);

const login = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return { user };
    }
    catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return { errorCode, errorMessage };
    }
}

const signup = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return { user };
    } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return { user: null, errorCode, errorMessage };
    }
}

const isLoggedIn = (validFunc: Function, errorFunc: Function) => {
    onAuthStateChanged(auth, user => {
        if (user) {
            localStorage.setItem('token', user.uid);
            validFunc(user)
        } else {
            localStorage.removeItem('token');
            errorFunc()
        }
    })
}

export default {
    login,
    signup,
    isLoggedIn
}