<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user')">
      <router-view />
    </template>
    <template v-else>
      <basicLayout />
    </template>
  </div>
</template>

<style>
#app {
}
</style>

<script setup lang="ts">
import basicLayout from "@/layouts/basicLayout.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>
