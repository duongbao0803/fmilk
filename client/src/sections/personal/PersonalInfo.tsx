import React, { useCallback, useEffect } from "react";
import {
  AuditOutlined,
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, Row } from "antd";
import { validatePhoneNumber } from "@/util/validate";
import moment from "moment";
import dayjs from "dayjs";
import { UserInfo } from "@/interfaces/interface";
import useAuthService from "@/services/authService";

const PersonalInfo: React.FC = () => {
  const { infoUser, updatePersonalItem } = useAuthService();
  const disabledDate = (current: object) => {
    return current && current > moment().startOf("day");
  };
  const [form] = Form.useForm();

  useEffect(() => {
    const updateUserInfo = { ...infoUser };
    if (infoUser && infoUser.dob) {
      updateUserInfo.dob = dayjs(infoUser.dob);
    }
    form.setFieldsValue(updateUserInfo);
  }, [form, infoUser]);

  const onFinish = useCallback(
    async (values: UserInfo) => {
      if (values) {
        await updatePersonalItem(values);
      }
    },
    [updatePersonalItem],
  );

  return (
    <>
      <Form name="normal_login" form={form} onFinish={onFinish}>
        <Row gutter={16} className="relative">
          <Col span={12}>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                },
              ]}
              colon={true}
              label="Email"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email của bạn"
                className="p-2"
                readOnly
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên của bạn",
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
          </Col>
        </Row>
        <Row gutter={16} className="relative">
          <Col span={12}>
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
                prefix={
                  <PhoneOutlined className="site-form-item-icon rotate-90" />
                }
                placeholder="Số điện thoại"
                className="p-2"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              id="formItem"
              name="dob"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ngày sinh",
                },
              ]}
              colon={true}
              label="Ngày sinh"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <DatePicker
                picker="date"
                disabledDate={disabledDate}
                format="DD/MM/YYYY"
                className="w-full p-2"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} className="relative">
          <Col span={12}>
            <Form.Item
              name="address"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn địa chỉ",
                },
              ]}
              id="formItem"
              label="Địa chỉ"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={<EnvironmentOutlined className="site-form-item-icon" />}
                placeholder="Địa chỉ"
                className="p-2"
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item id="form-button">
          <Button
            type="primary"
            htmlType="submit"
            className="text-md mt-2 block tracking-wider"
          >
            Cập nhật thông tin
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default PersonalInfo;
