import firebaseApp from './firebase';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

const auth = getAuth();

const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user;
    }
    catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return { errorCode, errorMessage };
    }
}

const signup = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user;
    } catch (e) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return { errorCode, errorMessage };
    }
}

export default {
    login,
    signup,
}