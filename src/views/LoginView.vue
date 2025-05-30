<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <h2>用户登录</h2>
        <p>欢迎回来，请登录您的账户</p>
      </div>

      <a-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        layout="vertical"
        @submit="handleLogin"
        class="login-form"
      >
        <a-form-item label="用户名" field="username">
          <a-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            size="large"
            allow-clear
          >
            <template #prefix>
              <icon-user />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item label="密码" field="password">
          <a-input-password
            v-model="loginForm.password"
            placeholder="请输入密码"
            size="large"
            allow-clear
          >
            <template #prefix>
              <icon-lock />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <div class="login-options">
            <a-checkbox v-model="loginForm.rememberMe"> 记住我 </a-checkbox>
            <a-link>忘记密码？</a-link>
          </div>
        </a-form-item>

        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            size="large"
            long
            :loading="loginLoading"
          >
            登录
          </a-button>
        </a-form-item>

        <a-form-item>
          <div class="register-link">
            还没有账户？ <a-link @click="goToRegister">立即注册</a-link>
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Message } from "@arco-design/web-vue";
import { IconUser, IconLock } from "@arco-design/web-vue/es/icon";

const store = useStore();
const router = useRouter();

// 登录表单数据
const loginForm = ref({
  username: "",
  password: "",
  rememberMe: false,
});

// 表单引用和加载状态
const loginFormRef = ref();
const loginLoading = ref(false);

// 登录表单验证规则
const loginRules = {
  username: [
    { required: true, message: "请输入用户名" },
    { minLength: 2, message: "用户名至少2个字符" },
  ],
  password: [
    { required: true, message: "请输入密码" },
    { minLength: 6, message: "密码至少6个字符" },
  ],
};

// 处理登录
const handleLogin = async ({ errors, values }) => {
  if (errors) return;

  loginLoading.value = true;

  try {
    // 模拟登录API调用延迟
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 这里可以添加实际的登录API调用
    // const response = await loginApi(values);

    // 模拟登录成功，更新store状态
    const userData = {
      userName: values.username,
      role: "user", // 或根据API返回的角色设置
    };

    store.dispatch("user/getLoginUser", userData);

    // 显示成功消息
    Message.success("登录成功！");

    // 跳转回首页或之前的页面
    router.push("/");
  } catch (error) {
    Message.error("登录失败，请检查用户名和密码");
  } finally {
    loginLoading.value = false;
  }
};

// 跳转到注册页面
const goToRegister = () => {
  router.push("/register");
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-box {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-header h2 {
  margin: 0 0 8px 0;
  color: #1d2129;
  font-size: 24px;
  font-weight: 600;
}

.login-header p {
  margin: 0;
  color: #86909c;
  font-size: 14px;
}

.login-form {
  width: 100%;
}

.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.register-link {
  text-align: center;
  margin-top: 16px;
  color: #86909c;
  font-size: 14px;
}

:deep(.arco-form-item) {
  margin-bottom: 24px;
}
</style>
