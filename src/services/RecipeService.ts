import firebaseApp from './firebase';

import { collection, addDoc, getFirestore, getDocs } from 'firebase/firestore';
import { Recipe } from '../types/RecipeType';

const db = getFirestore(firebaseApp);

const addNewRecipe = async ({ title, description, ingredients, instructions, images }: Recipe) => {
    try {
        const docRef = await addDoc(collection(db, 'recipes'), {
            title,
            description,
            ingredients,
            instructions,
            images
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
                images: []
            });
        });
        console.log(result);
        return result;
    } catch (e) {
        console.error('Error reading documents');
    }
}

export default {
    addNewRecipe,
    getRecipes
}