import { get, post } from "@/utils/request";
import type { UserBean } from "@/types/user";
export const getUserInfo = () => get<UserBean>("/user/info");

export const login = (data: { username: string; password: string }) => post("/user/login", data);

export const loginByPhone = (data: { phone: string; code: string }) =>
  post("/user/loginByPhone", data);

export const getSmsCode = (phone: string) => post("/user/getSmsCode", { phone });

export const userApi = { getUserInfo, login, loginByPhone, getSmsCode };
