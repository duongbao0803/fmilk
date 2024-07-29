import { useEffect, useState } from "react";
import { Modal, Form, Input, Row, Col, DatePicker } from "antd";
import { UserOutlined, PhoneOutlined, BankOutlined } from "@ant-design/icons";
import { formatDate } from "@/util/validate";
import useUserService from "@/services/userService";
import { UserInfo } from "@/interfaces/interface";
import moment from "moment/moment";
import dayjs from "dayjs";

interface EditModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  userInfo?: UserInfo;
}

const EditModal: React.FC<EditModalProps> = (props) => {
  const { setIsOpen, isOpen, userInfo } = props;
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const { updateUserItem } = useUserService();
  const [form] = Form.useForm();

  useEffect(() => {
    if (isOpen) {
      const updatedUserInfo = { ...userInfo };
      if (updatedUserInfo.dob) {
        updatedUserInfo.dob = dayjs(updatedUserInfo.dob);
      }
      form.setFieldsValue(updatedUserInfo);
    }
  }, [isOpen]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formattedDate = formatDate(values.dob);
      const updatedValues = { ...values, dob: formattedDate };
      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          if (userInfo && userInfo._id) {
            await updateUserItem(userInfo._id, updatedValues);
            setIsConfirmLoading(false);
            setIsOpen(false);
          } else {
            console.error("User is undefined");
          }
        } catch (error) {
          setIsConfirmLoading(false);
          setIsOpen(true);
        }
      }, 1500);
    } catch (errorInfo) {
      console.error("Validation failed:", errorInfo);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const disabledDate = (current: object) => {
    return current && current > moment().startOf("day");
  };

  return (
    <Modal
      title={<p className="text-lg text-[red]">Chỉnh sửa người dùng</p>}
      open={isOpen}
      onOk={handleOk}
      confirmLoading={isConfirmLoading}
      onCancel={handleCancel}
    >
      <Form name="normal_login" className="login-form" form={form}>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập họ tên",
            },
            {
              min: 5,
              message: "Họ tên phải có ít nhất 5 ký tự",
            },
          ]}
          colon={true}
          label="Họ và tên"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon mr-1" />}
            placeholder="Họ và tên"
            autoFocus
          />
        </Form.Item>

        <Row gutter={16} className="relative mt-1">
          <Col span={12}>
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại",
                },
                {
                  pattern: /^\d{10}$/,
                  message: "Số điện thoại phải có 10 số",
                },
              ]}
              colon={true}
              label="Số điện thoại"
              labelCol={{ span: 24 }}
              className="formItem absolute"
            >
              <Input
                type="number"
                prefix={
                  <PhoneOutlined className="site-form-item-icon mr-1 rotate-90" />
                }
                placeholder="Số điện thoại "
                maxLength={10}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="dob"
              colon={true}
              label="Ngày sinh"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <DatePicker
                picker="date"
                disabledDate={disabledDate}
                format="YYYY-MM-DD"
                className="w-full"
              />
            </Form.Item>
          </Col>
        </Row>
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
            maxLength={10}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
