/**
 * 1. 远程获取登录信息
 * */

import { StoreOptions } from "vuex";
import ACCESS_ENUM from "@/access/AccessEnum";
import { UserControllerService } from "../../generated";

// 当前为没有登录状态
export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "Sign In",
    },
  }),
  // 远程请求请求获取当前登录用户信息
  actions: {
    async getLoginUser({ commit, state }, payload) {
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code === 0) {
        commit("updateUser", res.data);
      } else {
        // 登录失败之后设置为not_login
        commit("updateUser", {
          ...state.loginUser,
          userRole: ACCESS_ENUM.NOT_LOGIN,
        });
      }
    },
  },

  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
