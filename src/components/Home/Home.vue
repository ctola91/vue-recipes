<template>
  <div class="home">
    <div class="tabs is-fullwidth">
      <ul>
        <li class="is-active"><a>Popular Recipes</a></li>
        <li><a>My Recipes</a></li>
      </ul>
    </div>
    <div class="container">
      <div class="title-container p-1">
        <h1 class="title">What are we cooking?</h1>
      </div>
      <div v-if="recipes.length > 0" class="p-1">
        <ul class="is-flex is-flex-wrap-wrap justify-center recipe-container">
          <RecipeItem
            v-for="recipe in recipes"
            :key="recipe.id"
            class="recipe is-one-third"
            :recipe="recipe"
          />
        </ul>
      </div>
      <div v-else>There are no recipes assigned</div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, Ref, defineComponent, computed, onMounted } from "vue";
import RecipeService from "../../services/RecipeService";
import { Recipe } from "../../types/RecipeType";
import ImageService from "../../services/ImageService";

import RecipeItem from "./RecipeItem.vue";

export default defineComponent({
  components: { RecipeItem },
  setup() {
    const recipes: Ref<Recipe[]> = ref([]);

    onMounted(async () => {
      recipes.value = await RecipeService.getRecipes();
    });

    const formatURLImage = async (name: string) => {
      const image = await ImageService.getURLImage(name);
      return image;
    };

    return {
      recipes,
      formatURLImage,
    };
  },
});
</script>
<style>
.recipe-container {
  row-gap: 1rem;
  column-gap: 1rem;
}
.recipe {
  width: 30%;
}
@media screen and (max-width: 768px) {
  .recipe {
    width: 100%;
  }
}
</style>
