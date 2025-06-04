import router from '../router/index';
<template>
  <div id="UserLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img src="../assets/jinXI_logo.jpg" class="logo" />
          <div
            style="
              font-size: 36px;
              color: #14a9f8;
              margin-top: auto;
              margin-bottom: auto;
            "
          >
            Rin OJ
          </div>
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer"> 版权连接</a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#UserLayout {
  text-align: center;
}
#UserLayout .logo {
  height: 84px;
  width: 84px;
}

#UserLayout .header {
  margin-top: 16px;
  box-shadow: #eee 1px 1px 5px;
}

#UserLayout .content {
  padding: 20px;
  margin-bottom: 16px;
}

#UserLayout .footer {
  padding: 16px;
  position: sticky;
  text-align: center;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>

<script setup lang="ts"></script>
