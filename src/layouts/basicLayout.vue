<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalNav />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer"> 版权连接</a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#basicLayout {
}

#basicLayout .header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: #fff;
  margin-bottom: 4px;
  box-shadow: #eee 1px 1px 5px;
}

#basicLayout .content {
  background: #f7f8fa;
  padding: 24px;
  margin-bottom: 8px;
}

#basicLayout .footer {
  background: whitesmoke;
  padding: 16px;
  position: sticky;
  text-align: center;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>

<script setup lang="ts">
import GlobalNav from "@/components/GlobalNav.vue";
</script>
