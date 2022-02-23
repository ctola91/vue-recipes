import { DefineComponent, defineComponent } from 'vue';
<template>
  <div class="home">
    <div class="tabs is-fullwidth">
      <ul>
        <li class="is-active"><a>Popular Recipes</a></li>
        <li><a>My Recipes</a></li>
      </ul>
    </div>
    <div class="container">
      <div class="title-container">
        <h1 class="title">What are we cooking?</h1>
      </div>
      <div v-if="recipes.length > 0">
        <ul>
          <li v-for="recipe in recipes" @key="recipe.id">
            <a href="#">
              <div class="card">
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img
                      src="https://bulma.io/images/placeholders/1280x960.png"
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-4">{{ recipe.title }}</p>
                      <p class="subtitle is-6">{{ recipe.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div v-else>There are no recipes assigned</div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, Ref, defineComponent, computed, onMounted } from "vue";
import RecipeService from "../services/RecipeService";
import { Recipe } from "../types/RecipeType";

export default defineComponent({
  setup() {
    const recipes: Ref<Recipe[]> = ref([]);

    onMounted(async () => {
      recipes.value = await RecipeService.getRecipes();
    });

    return {
      recipes,
    };
  },
});
</script>
