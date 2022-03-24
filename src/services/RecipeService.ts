import firebaseApp from './firebase';

import { collection, addDoc, getFirestore, getDocs, doc, getDoc } from 'firebase/firestore';
import { Recipe } from '../types/RecipeType';
import ImageService from './ImageService';

const db = getFirestore(firebaseApp);

const addNewRecipe = async ({ title, description, ingredients, instructions, images }: Recipe) => {
    try {
        console.log(images);
        const fileName = await ImageService.uploadImage(images[0], title.split(" ").join("-"));
        const docRef = await addDoc(collection(db, 'recipes'), {
            title,
            description,
            ingredients,
            instructions,
            images: [fileName]
        });
        console.log("Document written with ID", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

const getRecipes = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'recipes'));
        let result: Array<Recipe> = [];
        querySnapshot.forEach(doc => {
            let recipeDoc = doc.data();
            console.table(recipeDoc.title);
            result.push({
                id: <string>doc.id,
                title: <string>recipeDoc.title,
                description: <string>recipeDoc.description,
                ingredients: <Array<string>>recipeDoc.ingredients,
                instructions: <string>recipeDoc.instructions,
                images: recipeDoc.images
            });
        });
        // console.log(result);
        return result;
    } catch (e) {
        console.error('Error reading documents');
    }
}

const getRecipe = async (id) => {
    try {
        const ref = doc(db, 'recipes', id);
        const docSnap = await getDoc(ref);
        
        if(docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            return {id, ...docSnap.data()}
        }
        else {
            throw Error("There is no document")
        }
    } catch(e) {
        console.error(e);
    }
}

export default {
    addNewRecipe,
    getRecipes,
    getRecipe,
}