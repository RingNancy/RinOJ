<template>
  <div id="app">
    <basicLayout />
  </div>
</template>

<style>
#app {
}
</style>

<script setup lang="ts">
import basicLayout from "@/layouts/basicLayout.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

//页面跳转之前先判断是否拥有管理员权限
router.beforeEach((to, from, next) => {
  if (to.meta?.access === "canAdmin") {
    if (store.state.user.loginUser?.role !== "Admin") {
      console.log("无管理员权限，跳转到到无权限页面");
      next("/none_authority");
      return;
    }
    console.log("权限校验通过");
  }
  next();
});
</script>
