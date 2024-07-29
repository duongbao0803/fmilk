import React, { useCallback } from "react";
import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { ChangePasswordForm } from "@/interfaces/interface";
import useAuthService from "@/services/authService";

const ChangePasswordUserForm: React.FC = () => {
  const { changePasswordItem } = useAuthService();

  const [form] = Form.useForm();

  const onFinish = useCallback(
    async (values: ChangePasswordForm) => {
      if (values) {
        await changePasswordItem(values);
      }
    },
    [changePasswordItem],
  );

  return (
    <Form name="normal_login" form={form} onFinish={onFinish}>
      <Form.Item
        name="oldPassword"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mật khẩu cũ",
          },
          {
            min: 8,
            message: "Mật khẩu phải có ít nhất 8 ký tự",
          },
        ]}
        colon={true}
        label="Mật khẩu cũ"
        labelCol={{ span: 24 }}
        className="formItem"
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Mật khẩu cũ"
          className="p-2"
        />
      </Form.Item>
      <Form.Item
        name="newPassword"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mật khẩu mới",
          },
          {
            min: 8,
            message: "Mật khẩu phải có ít nhất 8 ký tự",
          },
        ]}
        colon={true}
        label="Mật khẩu mới"
        labelCol={{ span: 24 }}
        className="formItem"
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Mật khẩu mới"
          className="p-2"
        />
      </Form.Item>

      <Form.Item id="form-button">
        <Button
          type="primary"
          htmlType="submit"
          className="text-md mt-2 block tracking-wider"
        >
          Thay đổi mật khẩu
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangePasswordUserForm;
