<template>
  <a-row id="globalNav" align="center" :wrap="false">
    <!--    导航栏右侧设置用户头像-->
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClicked"
      >
        <!--logo设置-->
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/jinXI_logo.jpg" />
            <div class="title-name">Rin OJ</div>
          </div>
        </a-menu-item>
        <!-- 通过Arco design  的API 事件，采用路由进行跳转-->
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="80px" style="cursor: pointer">
      <!--根据当前状态来实现是否需要进行登录，未登录状态下无法进行下拉列表，点击头像直接进行登录-->
      <a-space>
        <a-dropdown>
          <a-avatar :style="{ backgroundColor: '#14a9f8' }" :size="48">
            {{ store.state.user?.loginUser?.userName ?? "Sign In" }}
          </a-avatar>
          <template #content>
            <a-doption>用户中心</a-doption>
            <a-doption :value="{ value: 'Option3' }">退出登录</a-doption>
          </template>
        </a-dropdown>
      </a-space>
    </a-col>
  </a-row>
</template>

<!--采用路由进行页面的跳转-->
<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/CheckAccess";
import ACCESS_ENUM from "@/access/AccessEnum";

const router = useRouter();
const store = useStore();

// 默认主页
const selectedKeys = ref(["/"]);

//路由跳转后，更新选中的菜单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideMenu) {
      return false;
    }
    if (
      !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    ) {
      return false;
    }
    return true;
  });
});

// 测试案例，5s后自动登录，并且修改角色信息拥有管理员权限
setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "rin",
    userRole: ACCESS_ENUM.ADMIN,
  });
}, 3000);

const doMenuClicked = (key: string) => {
  router.push({
    path: key,
  });
};
</script>

<style scoped>
.title-bar {
  align-items: center;
  display: flex;
}
.title-name {
  color: #14a9f8;
  margin-left: 14px;
  font-size: 18px;
}

.logo {
  height: 48px;
}
</style>
