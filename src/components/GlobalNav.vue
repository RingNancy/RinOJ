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
        <a-dropdown v-if="isLogin">
          <a-avatar :style="{ backgroundColor: '#14a9f8' }" :size="48">
            {{ displayUserName }}
          </a-avatar>
          <template #content>
            <a-doption @click="user">
              <template #icon>
                <icon-user />
              </template>
              <template #default> 用户中心</template>
            </a-doption>
            <a-doption @click="userLogout">
              <template #icon>
                <icon-export />
              </template>
              <template #default> 退出登录</template>
            </a-doption>
          </template>
        </a-dropdown>
        <a-avatar
          v-else
          :style="{ backgroundColor: '#3370ff' }"
          :size="48"
          @click="Login"
        >
          <IconUser />
        </a-avatar>
      </a-space>
    </a-col>
  </a-row>
</template>

<!--采用路由进行页面的跳转-->
<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/CheckAccess";
import ACCESS_ENUM from "@/access/AccessEnum";
import { Message } from "@arco-design/web-vue";

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

//获取登录用户信息
onMounted(() => {
  store.dispatch("user/getLoginUser");
});

const isLogin = computed(() => {
  const loginUser = store.state.user?.loginUser;
  // 通过 userRole 判断是否已登录，避免默认的 "Sign In" 状态被误判为已登录
  return (
    loginUser &&
    loginUser.userRole &&
    loginUser.userRole !== ACCESS_ENUM.NOT_LOGIN &&
    loginUser.userName !== "Sign In"
  );
});
// 计算属性：当前用户信息
const currentUser = computed(() => {
  return store.state.user?.loginUser || { userName: "Sign In" };
});

// 计算属性：显示的用户名
const displayUserName = computed(() => {
  if (isLogin.value) {
    return currentUser.value.userName;
  }
  return "Sign In";
});

// 跳转到用户中心
const user = () => {
  router.push("/user");
};

// 用户退出登录
const userLogout = async () => {
  try {
    // 如果有退出登录的 API 接口，可以调用
    // await UserControllerService.logoutUsingPost()

    // 更新本地状态为未登录
    store.commit("user/updateUser", {
      userName: "Sign In",
      userRole: ACCESS_ENUM.NOT_LOGIN,
    });

    // 可以显示退出成功提示
    Message.success("退出登录成功");
    // 跳转到首页或登录页
    router.push("/");
  } catch (error) {
    console.error("退出登录失败:", error);
    // Message.error('退出登录失败')
  }
};
// 跳转到登录页
const Login = () => {
  router.push("/user/login");
};

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
