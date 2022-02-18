import firebaseApp from './firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

const storage = getStorage(firebaseApp);

const uploadImage = async (file: File, name: string) => {
    try {
        const imageRef = ref(storage, `images/${name}.jpg`);
        const snapshot = await uploadBytes(imageRef, file);
        if (!snapshot) {
            throw new Error('Image was not found');
        }
        console.log(snapshot);
    } catch (e) {
        console.log(e);
    }
}

const getURLImage = async (name: string) => {
    const pathRef = ref(storage, `images/${name.split(' ').join('_')}.jpg`);
    const url = await getDownloadURL(pathRef);
    if (!url) {
        throw new Error('image not found');
    }
    return url;
}

export default {
    uploadImage,
    getURLImage
}