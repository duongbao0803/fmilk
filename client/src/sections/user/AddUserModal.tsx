import { useState } from "react";
import { Modal, Form, Input, Row, Col, Select } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  LockOutlined,
  MailOutlined,
  BankOutlined,
  AuditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { validatePhoneNumber } from "@/util/validate";
import useUserService from "@/services/userService";
import { AddModalProps } from "@/interfaces/interface";
import { roles } from "@/constant/constant";

const AddModal: React.FC<AddModalProps> = (props) => {
  const { setIsShow, isShow } = props;
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const { addNewUserItem } = useUserService();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [form] = Form.useForm();

  const validatePassword = (_: unknown, value: string) => {
    const password = form.getFieldValue("password");
    if (value && password && value !== password) {
      return Promise.reject("Mật khẩu không trùng khớp");
    }
    return Promise.resolve();
  };

  const togglePassword = (): void => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = (): void => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          await addNewUserItem(values);
          setIsConfirmLoading(false);
          setIsShow(false);
        } catch (error) {
          setIsConfirmLoading(false);
          setIsShow(true);
        }
      }, 1000);
    } catch (errorInfo) {
      console.error("Validation failed:", errorInfo);
    }
  };

  const handleCancel = () => {
    setIsShow(false);
    form.resetFields();
  };

  return (
    <Modal
      title={<p className="text-lg text-[red]">Add new user</p>}
      open={isShow}
      onOk={handleOk}
      confirmLoading={isConfirmLoading}
      onCancel={handleCancel}
    >
      <Form name="normal_login" className="login-form" form={form}>
        <Row gutter={16} className="relative">
          <Col span={12}>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên đăng nhập",
                },
                {
                  min: 8,
                  message: "Phải có ít nhất 8 ký tự",
                },
                {
                  max: 30,
                  message: "Không được vượt quá 30 ký tự",
                },
                {
                  pattern: /^[^\s]+$/,
                  message: "Không được chứa khoảng trắng",
                },
                {
                  pattern: /^[a-z0-9]+$/,
                  message: "Không chứa các ký tự đặc biệt",
                },
              ]}
              colon={true}
              label="Tên đăng nhập"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon mr-1" />}
                placeholder="Tên đăng nhập"
                autoFocus
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên",
                },
                {
                  min: 8,
                  message: "Phải có ít nhất 8 ký tự",
                },
              ]}
              colon={true}
              label="Họ và tên"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={<AuditOutlined className="site-form-item-icon mr-1" />}
                placeholder="Họ và tên"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} className="relative mt-1">
          <Col span={12}>
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại",
                },
                { validator: validatePhoneNumber },
              ]}
              colon={true}
              label="Số điện thoại"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={
                  <PhoneOutlined className="site-form-item-icon mr-1 rotate-90" />
                }
                placeholder="Số điện thoại"
                maxLength={10}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="role"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn vai trò",
                },
              ]}
              colon={true}
              label="Vai trò"
              labelCol={{ span: 24 }}
              className="formItem w-full"
            >
              <Select options={roles} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} className="relative mt-1">
          <Col span={12}>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập email",
                },
                {
                  type: "email",
                  message: "Nhập đúng định dạng email",
                },
              ]}
              colon={true}
              label="Email"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon mr-1" />}
                placeholder="Email"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="address"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ",
                },
              ]}
              colon={true}
              label="Địa chỉ"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={<BankOutlined className="site-form-item-icon mr-1" />}
                placeholder="Địa chỉ"
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu",
            },
            {
              min: 8,
              message: "Mật khẩu phải ít nhất 8 ký tự",
            },
          ]}
          colon={true}
          label="Mật khẩu"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon mr-1" />}
            autoFocus
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
        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Vui lòng xác nhận mật khẩu",
            },
            {
              validator: validatePassword,
            },
          ]}
          colon={true}
          label="Xác nhận mật khẩu"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon mr-1" />}
            placeholder="Xác nhận mật khẩu"
            type={showConfirmPassword ? "text" : "password"}
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
      </Form>
    </Modal>
  );
};

export default AddModal;
