<template>
  <form @submit.prevent="onSubmit">
    <h1>Add a new Recipe</h1>
    <div class="field">
      <label class="label">Title:</label>
      <input class="input" type="text" v-model="title" />
      <span>{{ errors.title }}</span>
    </div>
    <div class="field">
      <label class="label">Description:</label>
      <textarea class="textarea" v-model="description"></textarea>
      <span>{{ errors.description }}</span>
    </div>
    <div class="field">
      <label class="label">Ingredients:</label>
      <input
        class="input"
        type="text"
        v-model="ingredientsField"
        placeholder="Add new ingredients"
        @keyup.enter.prevent="addNewIngredient"
      />
    </div>
    <ul>
      <li v-for="ingredient of ingredients">{{ ingredient }}</li>
    </ul>
    <div class="field">
      <label class="label">Instructions:</label>
      <textarea class="textarea" v-model="instructions"></textarea>
      <span>{{ errors.instructions }}</span>
    </div>
    <input type="submit" value="Aceptar" />
  </form>
</template>
<script lang="ts">
import { defineComponent, ref, Ref } from "vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import RecipeService from "../services/RecipeService";

export default defineComponent({
  setup() {
    const validationSchema = yup.object({
      title: yup.string().required(),
      description: yup.string().required(),
      instructions: yup.string().required(),
    });

    const ingredientsField: Ref<string> = ref("");
    const ingredients: Ref<string[]> = ref([]);

    const { errors, handleSubmit, resetForm } = useForm({
      validationSchema,
    });

    const { value: title } = useField("title");
    const { value: description } = useField("description");
    const { value: instructions } = useField("instructions");

    const addNewIngredient = () => {
      ingredients.value.push(ingredientsField.value);
      ingredientsField.value = "";
    };

    const onSubmit = handleSubmit((values) => {
      console.log(JSON.stringify(values, null, 2));
      RecipeService.addNewRecipe({
        id: "",
        title: <string>values.title,
        description: <string>values.description,
        ingredients: ingredients.value,
        instructions: <string>values.instructions,
        images: []
      });
      ingredientsField.value = "";
      ingredients.value = [];
      resetForm();
    });

    return {
      ingredientsField,
      ingredients,
      errors,
      title,
      description,
      instructions,
      addNewIngredient,
      onSubmit,
    };
  },
});
</script>
