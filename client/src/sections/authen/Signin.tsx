/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Form, Input, Checkbox, notification, Spin } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import Cookies from "js-cookie";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Signup from "./Signup";
import { auth } from "@/config/firebase";
import ForgotPasswordForm from "./ForgotPassword";
import useAuth from "@/hooks/useAuth";
import { login } from "@/api/authenApi";
import { SigninValues } from "@/interfaces/interface";
import { encryptData } from "@/util/cryptoUtils";
import { useDecryptCredentials } from "@/hooks/useDecryptCredentials";
import { Link } from "react-router-dom";

const Signin: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isShowRegister, setIsShowRegister] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isShowForgotPassword, setIsShowForgotPassword] =
    useState<boolean>(false);
  const [, setValues] = useState<SigninValues>({
    username: "",
    password: "",
  });
  const { username, password, secretKey } = useDecryptCredentials();

  const handleClick = (): void => {
    const googleProvider = new GoogleAuthProvider();

    signInWithPopup(auth, googleProvider).then((data) => {
      console.log("check data", data);
    });
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onFinish = (values: SigninValues) => {
    setValues(values);
    if (values?.username && values?.password) {
      handleSignin(values);
    }
  };

  const handleSignin = async (formValues: SigninValues) => {
    if (isLoggingIn) {
      return;
    }
    try {
      setIsLoggingIn(true);
      const { username, password } = formValues;
      const res = await login(formValues);
      if (res && res.status === 200) {
        notification.success({
          message: "Đăng nhập thành công",
          description: "Bạn đăng nhập vào hệ thống thành công",
          duration: 2,
        });
        const jwtAccessToken = res.data.accessToken;
        const jwtRefreshToken = res.data.refreshToken;
        Cookies.set("accessToken", jwtAccessToken, { expires: 1 });
        Cookies.set("refreshToken", jwtRefreshToken, { expires: 10 });

        if (rememberMe) {
          const encryptedUsername = encryptData(username, secretKey);
          const encryptedPassword = encryptData(password, secretKey);
          Cookies.set("username", encryptedUsername);
          Cookies.set("password", encryptedPassword);
        }
        const authStore = useAuth.getState();
        authStore.login();
      }
    } catch (err: any) {
      notification.error({
        message: "Đăng nhập thất bại",
        description: `${err.response.data.message}`,
        duration: 2,
      });
      console.error(">>> Error signing server", err);
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      {isShowForgotPassword ? (
        <ForgotPasswordForm
          isShowRegister={isShowRegister}
          setIsShowRegister={setIsShowRegister}
        />
      ) : !isShowRegister ? (
        <>
          <div className="">
            <div data-aos="fade-down">
              <h1 className="text-center text-3xl font-bold text-[#1677ff]">
                CHÀO MỪNG TRỞ LẠI
              </h1>
              <p className="mx-12 my-4 text-center text-sm text-[#a3a1a1]">
                Trải nghiệm sữa chất lượng được đơn giản hóa với{" "}
                <Link
                  to={"/"}
                  className="cursor-pointer font-bold text-[#08cde9]"
                >
                  FMilk
                </Link>
                . Bắt đầu ngay.
              </p>
            </div>
            <Form
              name="normal_login"
              className="login-form"
              onFinish={onFinish}
            >
              <div data-aos="fade-right">
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên đăng nhập",
                    },
                    {
                      min: 8,
                      message: "Tên đăng nhập phải có ít nhất 8 ký tự",
                    },
                    {
                      max: 30,
                      message: "Tên đăng nhập không được vượt quá 30 ký tự",
                    },
                  ]}
                  colon={true}
                  label="Tên đăng nhập"
                  labelCol={{ span: 24 }}
                  className="formItem"
                  initialValue={username}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Tên đăng nhập"
                    className="p-2"
                    autoFocus
                  />
                </Form.Item>
              </div>
              <div data-aos="fade-right">
                <Form.Item
                  name="password"
                  id="formItem"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu",
                    },
                    {
                      min: 8,
                      message: "Mật khẩu phải có ít nhất 8 ký tự",
                    },
                  ]}
                  label="Mật khẩu"
                  labelCol={{ span: 24 }}
                  className="formItem"
                  initialValue={password}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    className="p-2"
                    type={showPassword ? "text" : "password"}
                    placeholder="Mật khẩu"
                    suffix={
                      <>
                        {showPassword ? (
                          <EyeInvisibleOutlined onClick={togglePassword} />
                        ) : (
                          <EyeOutlined onClick={togglePassword} />
                        )}
                      </>
                    }
                  />
                </Form.Item>
              </div>
              <div data-aos="fade-left">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox onChange={(e) => setRememberMe(e.target.checked)}>
                    Ghi nhớ
                  </Checkbox>
                  <a
                    href="#"
                    className="login-form-forgot float-right font-semibold text-[#3094ff] hover:underline"
                    onClick={() => setIsShowForgotPassword(true)}
                  >
                    Quên mật khẩu?
                  </a>
                </Form.Item>
              </div>
              <Form.Item>
                <div data-aos="fade-right">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button mx-auto mt-5 block h-11 w-full text-lg tracking-wider"
                  >
                    {isLoggingIn ? (
                      <Spin
                        indicator={<LoadingOutlined className="text-[#fff]" />}
                      />
                    ) : (
                      "Đăng nhập"
                    )}
                  </Button>
                </div>
              </Form.Item>
            </Form>
            <div data-aos="flip-up">
              <div className="mt-4 flex items-center justify-center text-center">
                <div className="mr-2 h-[1px] w-full bg-[#e6e8eb]"></div>
                <span className="text-[#999999]">HOẶC</span>
                <div className="ml-2 h-[1px] w-full bg-[#e6e8eb]"></div>
              </div>
            </div>
            <div data-aos="fade-left">
              <div>
                <Button
                  className="mx-auto mt-5 block h-11 w-full rounded-[5px] border border-gray-300 bg-[#fff] text-[grey] shadow-none"
                  onClick={handleClick}
                >
                  <div className="flex items-center justify-center tracking-wider">
                    <img
                      src="https://freesvg.org/img/1534129544.png"
                      width={23}
                      alt=""
                      className="mr-2"
                    />
                    Đăng nhập với Google
                  </div>
                </Button>
              </div>
            </div>
            <div data-aos="fade-up">
              <div className="mt-2 text-center text-sm">
                <span>Bạn chưa có tài khoản? </span>
                <a
                  href="#"
                  className="font-semibold text-[#3094ff] hover:underline"
                  onClick={() => setIsShowRegister(true)}
                >
                  Đăng ký
                </a>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Signup
          isShowRegister={isShowRegister}
          setIsShowRegister={setIsShowRegister}
        />
      )}
    </>
  );
};

export default Signin;
