<template>
  <li class="is-one-third">
    <router-link :to="`/recipes/${recipe.id}`" class="recipe">
      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img
              :src="image"
              alt="Placeholder image"
            />
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">{{ recipe.title }}</p>
              <p class="">{{ recipe.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </li>
</template>
<script setup>
import { onMounted, defineProps, ref } from "vue";
import ImageService from "../../services/ImageService";

const image = ref("");
const props = defineProps({
  recipe: {
    type: Object,
    required: true,
  },
});

onMounted(async () => {
  if (props.recipe && props.recipe.images.length > 0) {
    image.value = await ImageService.getURLImage(props.recipe.images[0]);
  } else {
      image.value = 'https://bulma.io/images/placeholders/1280x960.png';
  }
});
</script>
<style>
a.recipe  {
  transition: all 0.2s ease-in;
}
a.recipe:hover {
  transform: scale(1.15);
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 20%);
  /* z-index: 99999; */
}
</style>
