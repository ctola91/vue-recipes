<template>
  <div>
    <h1>Add a new Recipe</h1>
    <input type="text" v-model="name" />
    <button>Aceptar</button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useField } from "vee-validate";

export default defineComponent({
  setup() {
    const isRequired = (name: string) => {
      if (name && name.trim()) {
        return true;
      }

      return "This is required";
    };

    const { errorMessage, name } = useField("name", isRequired);

    return {
      errorMessage,
      name,
    };
  },
});
</script>
