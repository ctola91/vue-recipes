<template>
  <div class="content">
    <h1>{{ recipe.title }}</h1>
    <img :src="image" :alt="recipe.title" />
    <h2>Description</h2>
    <p>{{ recipe.description }}</p>
    <h2>Ingredients</h2>
    <ul>
      <li v-for="ingredient in recipe.ingredients" :key="ingredient">
        {{ ingredient }}
      </li>
    </ul>
    <h2>Instructions</h2>
    <p>{{ recipe.instructions }}</p>
  </div>
</template>
<script>
import { useRoute } from "vue-router";
import { ref, onMounted, defineComponent } from "vue";
import RecipeService from "../services/RecipeService";
import ImageService from "../services/ImageService";

export default defineComponent({
  setup() {
    const route = useRoute();
    const recipe = ref({});
    const image = ref("");
    onMounted(async () => {
      await getRecipe(route.params.id);
    });

    const getRecipe = async (id) => {
      recipe.value = await RecipeService.getRecipe(id);
      if (recipe.value.images.length > 0) {
        image.value = await ImageService.getURLImage(recipe.value.images[0]);
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