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
      <div>There are no recipes assigned</div>
    </div>
  </div>
</template>
<script>
export default defineComponent({
  setup() {
    return {};
  },
});
</script>
