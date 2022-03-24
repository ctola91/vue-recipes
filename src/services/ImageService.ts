import firebaseApp from './firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

const storage = getStorage(firebaseApp);

const uploadImage = async (file: File, title: string) => {
    try {
        console.log(file.name.split(" ").join("-"));
        const extension = file.name.split(".").pop();
        const imageRef = ref(storage, `images/${title}.${extension}`);
        const snapshot = await uploadBytes(imageRef, file);
        if (!snapshot) {
            throw new Error('Image was not found');
        }
        console.log(snapshot);
        return snapshot.metadata.name;
    } catch (e) {
        console.log(e);
    }
}

const getURLImage = async (name: string) => {
    const pathRef = ref(storage, `images/${name.split(' ').join('-')}`);
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