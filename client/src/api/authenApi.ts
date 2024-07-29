import { AxiosResponse } from "axios";
import axiosClient from "@/config/axiosClient";
import {
  SigninValues,
  SignupValues,
  responseTokenProps,
} from "@/interfaces/interface";

const login = (formValues: SigninValues) => {
  return axiosClient.post("/v1/auth/login", formValues);
};

const signUp = (formValues: SignupValues) => {
  return axiosClient.post("/v1/auth/register", formValues);
};

const requestRefreshToken = (
  refreshToken: string,
): Promise<AxiosResponse<responseTokenProps>> => {
  return axiosClient.post<responseTokenProps>("/v1/auth/refresh", {
    refreshToken,
  });
};

const getInfoUser = () => {
  return axiosClient.get("/v1/auth/infoUser");
};

export { login, getInfoUser, signUp, requestRefreshToken };
