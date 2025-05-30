import ACCESS_ENUM from "@/access/AccessEnum";

/**
 * 权限校验(判断当前用户是否具有页面的访问权限)
 * @param loginUser 当前登录用户
 * @param requireAccess 所需要的权限
 * @return boolean 权限有无
 */

const checkAccess = (loginUser: any, requireAccess = ACCESS_ENUM.NOT_LOGIN) => {
  // 获取当前登录用户的权限(如果没有loginUser则表示为未登录)
  const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;

  // 如果当前不需要登录就可展示的页面
  if (requireAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }

  // 需要用户登录才可以访问
  if (requireAccess === ACCESS_ENUM.USER) {
    // 如果没有登录则无权限
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false;
    }
  }

  //只有管理员才可以访问
  if (requireAccess === ACCESS_ENUM.ADMIN) {
    // 如果不是管理员
    if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
      return false;
    }
  }
  return true;
};
export default checkAccess;
