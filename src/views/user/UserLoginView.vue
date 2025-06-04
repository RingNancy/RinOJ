<template>
  <div class="userLoginView">
    <a-space class="wrapper" direction="vertical">
      <h2 style="margin-bottom: 16px; margin-top: 8px">用户登录</h2>
      <a-form
        style="max-width: 400px; margin: 0 auto"
        ref="formRef"
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
        <!--        <a-form-item field="password2" label="确认密码" validate-trigger="blur">-->
        <!--          <a-input-password-->
        <!--            v-model="form.password2"-->
        <!--            placeholder="please confirm your password..."-->
        <!--          />-->
        <!--        </a-form-item>-->

        <a-form-item>
          <a-space>
            <a-row>
              <a-button
                html-type="submit"
                type="primary"
                style="margin-right: 24px"
                >登录</a-button
              >

              <a-button @click="$refs.formRef.resetFields()" type="outline">
                注册
              </a-button>
            </a-row>
          </a-space>
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
    alert("登录成功！" + JSON.stringify(res.data, null, 2));
  } else {
    message.error("登录失败！" + res.message);
  }
};
</script>

<style scoped lang="less">
.wrapper {
  width: 460px;
  padding: 20px;
  border: 1px solid var(~"--color-border");
  border-radius: 6px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
}
</style>
