import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "@/access/AccessEnum";
import checkAccess from "@/access/CheckAccess";

//页面跳转之前先判断是否拥有管理员权限

router.beforeEach(async (to, from, next) => {
  console.log("登录用户信息", store.state.user.loginUser);
  // TODO:自动登录
  let loginUser = store.state.user.loginUser;
  // 当前没有登录，或者之前也没有登录过
  if (!loginUser || !loginUser.userRole) {
    //等待用户登录之后再执行后续的代码
    await store.dispatch("user/getLoginUser");
    loginUser = store.state.user.loginUser; //更新当前的用户状态是否登录
  }
  // TODO 登录之后获取当前权限
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN; //权限为空则为未登录状态
  // 需要跳转的页面必须要登录
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    // 如果没有登陆
    if (!loginUser || !loginUser.userRole) {
      next(`user/login?redirect=${to.fullPath}`);
      return;
    }
    //如果已经登录但是权限不够
    if (!checkAccess(loginUser, needAccess)) {
      next("/none_authority");
      return;
    }
  }
  next();
});
