<template>
  <div class="content">
    <h1 class="title">{{ recipe.title }}</h1>
    <div class="img-container">
      <img :src="image" :alt="recipe.title" />
    </div>
    <h2 class="subtitle">Description</h2>
    <p>{{ recipe.description }}</p>
    <h2 class="subtitle">Ingredients</h2>
    <ul>
      <li
        class="ingredient-item"
        v-for="ingredient in recipe.ingredients"
        :key="ingredient"
      >
        <label :for="ingredient">
          <input :id="ingredient" type="checkbox" :value="ingredient" />
          {{ ingredient }}
        </label>
      </li>
    </ul>
    <h2 class="subtitle">Instructions</h2>
    <p>{{ recipe.instructions }}</p>
  </div>
</template>
<script lang="ts">
import { useRoute } from "vue-router";
import { ref, onMounted, defineComponent } from "vue";
import RecipeService from "../services/RecipeService";
import ImageService from "../services/ImageService";
import { Recipe } from "../types/RecipeType";

export default defineComponent({
  setup() {
    const route = useRoute();
    const recipe = ref<Recipe>({
      id: "",
      title: "",
      description: "",
      ingredients: [],
      instructions: "",
      images: [],
    });
    const image = ref("");
    onMounted(async () => await getRecipe(<string>route.params.id));

    const getRecipe = async (id: string) => {
      recipe.value = await RecipeService.getRecipe(<string>id);
      if (recipe !== null && recipe.value.images.length > 0) {
        image.value = await ImageService.getURLImage(<string>recipe.value.images[0]);
      } else {
        image.value = "https://bulma.io/images/placeholders/1280x960.png";
      }
    };

    return {
      recipe,
      image,
    };
  },
});
</script>
<style>
.img-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
.ingredient-item {
  list-style: none;
}
</style>
