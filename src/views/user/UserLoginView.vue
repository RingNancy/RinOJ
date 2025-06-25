<template>
  <div class="userLoginView">
    <div class="login-container">
      <a-space class="wrapper" direction="vertical">
        <h2 class="title">用户登录</h2>
        <a-form
          class="login-form"
          ref="formRef"
          :rules="rules"
          :model="form"
          @submit="handleSubmit"
        >
          <a-form-item field="userAccount" label="账号" validate-trigger="blur">
            <a-input v-model="form.userAccount" placeholder="请输入账号..." />
          </a-form-item>
          <a-form-item
            field="userPassword"
            label="密码"
            validate-trigger="blur"
          >
            <a-input-password
              v-model="form.userPassword"
              placeholder="请输入密码..."
            />
          </a-form-item>
          <!--        <a-form-item field="password2" label="确认密码" validate-trigger="blur">-->
          <!--          <a-input-password-->
          <!--            v-model="form.password2"-->
          <!--            placeholder="please confirm your password..."-->
          <!--          />-->
          <!--        </a-form-item>-->

          <a-form-item class="button-group">
            <a-button
              html-type="submit"
              type="primary"
              size="medium"
              class="login-btn"
              >登录
            </a-button>
            <a-button
              @click="register"
              type="outline"
              size="medium"
              class="register-btn"
              >注册
            </a-button>
          </a-form-item>
        </a-form>
      </a-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

/**
 * 表单信息
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);

const rules = reactive({
  userAccount: [{ required: true, message: "账号不能为空！", trigger: "blur" }],
  userPassword: [{ required: true, message: "号不能为空！", trigger: "blur" }],
});
/**
 * 提交表单信息
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  if (res.code === 0) {
    //获取当前登录用户
    await store.dispatch("user/getLoginUser");
    router.push({
      path: "/",
      replace: true,
    });
    message.success("登录成功！");
  } else {
    message.error("登录失败！" + res.message);
  }
};

const register = () => {
  const url = window.location.origin + "/user/register";
  window.open(url, "_blank");
};
</script>

<style scoped lang="less">
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.wrapper {
  width: 400px;
  padding: 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  margin-bottom: 32px;
  margin-top: 0;
  font-size: 24px;
  font-weight: 600;
  color: #1d2129;
}

.login-form {
  width: 100%;
}

.button-group {
  margin-top: 24px;

  .login-btn,
  .register-btn {
    width: 100%;
    height: 44px;
    font-size: 16px;
    font-weight: 500;
  }

  .login-btn {
    margin-right: 8px;
  }

  .register-btn {
    margin-bottom: 0;
  }
}

// 覆盖 Arco Design 的默认样式
:deep(.arco-form-item-label) {
  font-weight: 500;
  color: #4e5969;
}

:deep(.arco-input-wrapper) {
  border-radius: 4px;
}

:deep(.arco-btn) {
  border-radius: 50px;
}
</style>
