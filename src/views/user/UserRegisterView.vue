<template>
  <div class="userLoginView">
    <a-space class="wrapper" direction="vertical">
      <h2 style="margin-bottom: 16px">用户注册</h2>
      <a-form
        style="max-width: 480px; margin: 0 auto"
        ref="formRef"
        label-align="right"
        :rules="rules"
        :model="form"
        @submit="handleSubmit"
      >
        <a-form-item field="userAccount" label="账号" validate-trigger="blur">
          <a-input v-model="form.userAccount" placeholder="请输入账号..." />
        </a-form-item>
        <a-form-item field="userPassword" label="密码" validate-trigger="blur">
          <a-input-password
            v-model="form.userPassword"
            placeholder="请输入密码..."
          />
        </a-form-item>
        <a-form-item
          field="checkPassword"
          label="确认密码"
          validate-trigger="blur"
        >
          <a-input-password
            v-model="form.checkPassword"
            placeholder="请确认密码！"
          />
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit" type="outline" long>注册</a-button>
        </a-form-item>
      </a-form>
    </a-space>
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
  checkPassword: "",
} as UserLoginRequest);

const rules = reactive({
  userAccount: [{ required: true, message: "账号不能为空!", trigger: "blur" }],
  userPassword: [{ required: true, message: "密码不能为空"!, trigger: "blur" }],
  checkPassword: [{ required: true, message: "确认密码"!, trigger: "blur" }],
});
/**
 * 提交表单信息
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userRegisterUsingPost(form);
  if (res.code === 0) {
    router.push({
      path: "/user/login",
      replace: true, //注册成功之后禁止回退到注册页面
    });
    alert("注册成功" + JSON.stringify(res.data, null, 2));
  } else {
    message.error("注册失败" + res.message);
  }
};
</script>

<style scoped lang="less">
.wrapper {
  width: 480px;
  padding: 20px;
  border: 1px solid var(~"--color-border");
  border-radius: 6px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
}
</style>
