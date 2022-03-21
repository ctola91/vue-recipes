<template>
  <div class="content">
    <h1>{{ recipe.title }}</h1>
    <img src="https://bulma.io/images/placeholders/1280x960.png" :alt="recipe.title" />
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

export default defineComponent({
  setup() {
    const route = useRoute();
    const recipe = ref({});

    onMounted(async () => {
      await getRecipe(route.params.id);
    });

    const getRecipe = async (id) => {
      recipe.value = await RecipeService.getRecipe(id);
      console.log(recipe.value);
    };

    return {
      recipe,
    };
  },
});
</script>
