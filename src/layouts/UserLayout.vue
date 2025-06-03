import router from '../router/index';
<template>
  <div id="UserLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header"> 用户布局 </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer"> 版权连接</a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#UserLayout {
}

#UserLayout .header {
  margin-bottom: 8px;
  box-shadow: #eee 1px 1px 5px;
}

#UserLayout .content {
  background: gainsboro;
  padding: 20px;
  margin-bottom: 16px;
}

#UserLayout .footer {
  background: whitesmoke;
  padding: 16px;
  position: sticky;
  text-align: center;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>

<script setup lang="ts"></script>
