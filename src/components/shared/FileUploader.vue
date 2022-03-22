<template>
  <div class="file-uploader">
    <input type="file" @change="handleFileInput" ref="fileInput" hidden />
    <button
      type="button"
      @click.preventDefault="uploadImage"
      :class="props.classes"
    >
      Submit Image
    </button>
    <div v-if="url">
        <img :src="url" />
    </div>
  </div>
</template>
<script setup>
import { defineProps, ref } from "vue";

const props = defineProps({
  onFileSelectSuccess: Function,
  onFileSelectError: Function,
  classes: String,
});
const fileInput = ref(null);
const url = ref("");

const handleFileInput = (e) => {
  console.log(e);
  const file = e.target.files[0];
  if (fileInput.value.size > 1024) {
    props.onFileSelectError({ error: "File size cannot exceed more that 1MB" });
  } else {
    url.value = URL.createObjectURL(file);
    props.onFileSelectSuccess({ file });
  }
};

const uploadImage = () => {
  fileInput.value && fileInput.value.click();
};
</script>
