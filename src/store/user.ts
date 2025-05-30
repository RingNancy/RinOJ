import { StoreOptions } from "vuex";
import ACCESS_ENUM from "@/access/AccessEnum";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "Sign In",
      userRole: ACCESS_ENUM.NOT_LOGIN,
    },
  }),

  actions: {
    getLoginUser({ commit, state }, payload) {
      commit("updateUser", payload);
    },
  },

  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
