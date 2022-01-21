<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h1 class="card-header-title">Signup</h1>
      </div>
      <form class="card-content" @submit.prevent="handleOnSubmit">
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input
              class="input"
              type="email"
              placeholder="Ex: admin"
              v-model="username"
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input
              class="input"
              type="password"
              placeholder="Type your password"
              v-model="password"
            />
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link">Submit</button>
          </div>
          <div class="control">
            <button class="button is-link is-light">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import AuthService from "../services/AuthService";

export default defineComponent({
  setup() {
    const router = useRouter();
    const username = ref<string>("");
    const password = ref<string>("");

    const handleOnSubmit = () => {
      console.log(username.value, password.value);
      registerUser(username.value, password.value);
      username.value = "";
      password.value = "";
    };

    const registerUser = async (email: string, password: string) => {
      const result = await AuthService.signup(email, password);
      if (result.user) {
        // console.log(result.user);
        localStorage.setItem("user", JSON.stringify(result.user.email));
        router.push({
          name: "Home",
          params: { email: result.user.email },
        });
      } else {
        console.log(`Error: ${result.errorCode} - ${result.errorMessage}`);
      }
    };

    return {
      username,
      password,
      handleOnSubmit,
    };
  },
});
</script>
