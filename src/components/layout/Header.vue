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
        <a @click="goTo('/')" class="navbar-item"> Home </a>
        <a @click="goTo('/recipes/new')" class="navbar-item">
          Add new recipe
        </a>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <template v-if="isLoggedin">
              <a class="button is-primary" @click="goTo('/', false)">
                <strong>Logout</strong>
              </a>
            </template>
            <template v-else>
              <a @click="goTo('/signup')" class="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a @click="goTo('/login')" class="button is-light">
                Log in
              </a>
            </template>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import AuthService from "../../services/AuthService";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const isLoggedin = ref(localStorage.getItem("token") !== null);
    const isActive = ref(false);
    const router = useRouter();

    const goTo = (path: string, isLogged: boolean = true) => {
      isActive.value = false;
      if (isLoggedin) {
        router.push(path);
      } else {
        AuthService.logout();
        router.push({ name: "Login" });
      }
    };

    const toggleMenu = () => {
      isActive.value = !isActive.value;
    };

    return {
      isLoggedin,
      isActive,
      toggleMenu,
      goTo,
    };
  },
});
</script>
