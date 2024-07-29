/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  MailOutlined,
  AuditOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Button, Col, Form, Input, Row, notification } from "antd";
import "aos/dist/aos.css";
import Signin from "./Signin";
import { SignupProps, SignupValues } from "@/interfaces/interface";
import { signUp } from "@/api/authenApi";
import { validatePhoneNumber } from "@/util/validate";

const Signup: React.FC<SignupProps> = ({
  isShowRegister,
  setIsShowRegister,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [, setValues] = useState<SignupValues>({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const [form] = Form.useForm();

  const validatePassword = (_: unknown, value: string) => {
    const password = form.getFieldValue("password");
    if (value && password && value !== password) {
      return Promise.reject("Mật khẩu xác nhận không trùng khớp");
    }
    return Promise.resolve();
  };

  const togglePassword = (): void => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = (): void => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onFinish = (values: SignupValues) => {
    setValues(values);
    if (values?.username && values?.name && values?.email && values?.password) {
      handleSignup(values);
    }
  };

  const handleSignup = async (formValues: SignupValues) => {
    try {
      const res = await signUp(formValues);
      if (res && res.status === 200) {
        notification.success({
          message: "Đăng ký thành công",
          description: "Bạn đã đăng ký tài khoản thành công",
          duration: 2,
        });
        setIsShowRegister(false);
      }
    } catch (err: any) {
      notification.error({
        message: "Đăng ký thất bại",
        description: `${err.response.data.message}`,
        duration: 2,
      });
      console.error("Error signing up user", err);
    }
  };

  return (
    <>
      {isShowRegister ? (
        <>
          <div data-aos="fade-down">
            <h1 className=" mb-5 text-center text-4xl font-bold text-[#1677ff]">
              SIGN UP
            </h1>
          </div>
          <Form name="normal_login" form={form} onFinish={onFinish}>
            <Row gutter={16} className="relative">
              <Col span={12}>
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
                        message: "Must not exceed 30 characters",
                      },
                      {
                        pattern: /^[^\s]+$/,
                        message: "Tên đăng nhập không được chứa khoảng trắng",
                      },
                      {
                        pattern: /^[a-z0-9]+$/,
                        message: "Tên đăng nhập không được chứa ký tự đặc biệt",
                      },
                    ]}
                    colon={true}
                    label="Tên đăng nhập"
                    labelCol={{ span: 24 }}
                    className="formItem"
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Tên đăng nhập"
                      className="p-2"
                      autoFocus
                    />
                  </Form.Item>
                </div>
              </Col>
              <Col span={12}>
                <div data-aos="fade-right">
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên",
                      },
                      {
                        min: 8,
                        message: "Tên phải có ít nhất 8 ký tự",
                      },
                    ]}
                    colon={true}
                    label="Họ và tên"
                    labelCol={{ span: 24 }}
                    className="formItem"
                  >
                    <Input
                      prefix={<AuditOutlined className="site-form-item-icon" />}
                      placeholder="Họ và tên"
                      className="p-2"
                    />
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row gutter={16} className="relative">
              <Col span={12}>
                <div data-aos="fade-right">
                  <Form.Item
                    name="email"
                    id="formItem"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập email",
                      },
                      {
                        type: "email",
                        message: "Vui lòng nhập đúng định dạng",
                      },
                    ]}
                    label="Email"
                    labelCol={{ span: 24 }}
                    className="formItem"
                  >
                    <Input
                      prefix={<MailOutlined className="site-form-item-icon" />}
                      placeholder="Email"
                      className="p-2"
                    />
                  </Form.Item>
                </div>
              </Col>
              <Col span={12}>
                <div data-aos="fade-right">
                  <Form.Item
                    name="phone"
                    id="formItem"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại",
                      },
                      { validator: validatePhoneNumber },
                    ]}
                    label="Số điện thoại"
                    labelCol={{ span: 24 }}
                    className="formItem"
                  >
                    <Input
                      type="number"
                      prefix={
                        <PhoneOutlined className="site-form-item-icon rotate-90" />
                      }
                      placeholder="Số điện thoại"
                      className="p-2"
                      maxLength={10}
                    />
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <div data-aos="fade-right">
              <Form.Item
                name="address"
                id="formItem"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập địa chỉ",
                  },
                ]}
                label="Địa chỉ"
                labelCol={{ span: 24 }}
                className="formItem"
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Địa chỉ"
                  className="p-2"
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
                className="formItem"
                colon={true}
                label="Mật khẩu"
                labelCol={{ span: 24 }}
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
            <div data-aos="fade-right">
              <Form.Item
                name="confirmPassword"
                id="formItem"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng xác nhận mật khẩu",
                  },
                  {
                    validator: validatePassword,
                  },
                ]}
                className="formItem"
                colon={true}
                label="Xác nhận mật khẩu"
                labelCol={{ span: 24 }}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  className="p-2"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Xác nhận mật khẩu"
                  suffix={
                    <>
                      {showConfirmPassword ? (
                        <EyeInvisibleOutlined onClick={toggleConfirmPassword} />
                      ) : (
                        <EyeOutlined onClick={toggleConfirmPassword} />
                      )}
                    </>
                  }
                />
              </Form.Item>
            </div>
            <div data-aos="fade-left">
              <Form.Item id="form-button">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button mx-auto mt-2 block h-11 w-full text-lg tracking-wider"
                >
                  Sign Up
                </Button>
              </Form.Item>
            </div>
          </Form>
          <div className="text-center text-sm">
            You already have an account? {""}
            <a
              href="#"
              className="font-semibold text-[#3094ff] hover:underline"
              onClick={() => setIsShowRegister(false)}
            >
              Sign In
            </a>
          </div>
        </>
      ) : (
        <Signin />
      )}
    </>
  );
};

export default Signup;
