<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img
          src="https://bulma.io/images/bulma-logo.png"
          width="112"
          height="28"
        />
      </router-link>

      <a
        role="button"
        :class="{ 'is-active': isActive }"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        @click="toggleMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div
      id="navbarBasicExample"
      class="navbar-menu"
      :class="{ 'is-active': isActive }"
    >
      <div class="navbar-start">
        <router-link to="/" class="navbar-item">
          Home
        </router-link>
        <router-link to="/recipes/new" class="navbar-item">
          Add new recipe
        </router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <template v-if="isLoggedin">
              <a class="button is-primary">
                <strong>Logout</strong>
              </a>
            </template>
            <template v-else>
              <router-link to="/signup" class="button is-primary">
                <strong>Sign up</strong>
              </router-link>
              <router-link to="/login" class="button is-light">
                Log in
              </router-link>
            </template>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const isLoggedin = ref(localStorage.getItem("token") !== null);
    const isActive = ref(false);

    const toggleMenu = () => {
      isActive.value = !isActive.value;
    };

    return {
      isLoggedin,
      isActive,
      toggleMenu,
    };
  },
});
</script>
