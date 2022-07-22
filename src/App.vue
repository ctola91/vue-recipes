
<template>
  <Header />
  <Content>
    <router-view></router-view>
  </Content>
  <Footer />
</template>
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Header from "./components/layout/Header.vue";
import Footer from "./components/layout/Footer.vue";
import Content from "./components/layout/Content.vue";
</script>
<style>
.container {
  padding: 0 20px 20px;
}
</style>