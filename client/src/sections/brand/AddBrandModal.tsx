import React, { useState } from "react";
import { Modal, Form, Input, Select } from "antd";
import { BarcodeOutlined } from "@ant-design/icons";
import useBrandService from "../../services/brandService";
import { Countries } from "@/constant/constant";

export interface AddModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const AddBrandModal: React.FC<AddModalProps> = React.memo((props) => {
  const { addNewBrandItem } = useBrandService();
  const { setIsOpen, isOpen } = props;
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { Option } = Select;

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          await addNewBrandItem(values);
          form.resetFields();
          setIsConfirmLoading(false);
          setIsOpen(false);
        } catch (error) {
          setIsConfirmLoading(false);
          setIsOpen(true);
        }
      }, 1500);
    } catch (err) {
      console.error("Validation failed:", err);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      title={<p className="text-lg font-bold text-[red] ">Thêm thương hiệu</p>}
      open={isOpen}
      onOk={handleOk}
      confirmLoading={isConfirmLoading}
      onCancel={handleCancel}
    >
      <Form name="normal_login" className="login-form" form={form}>
        <Form.Item
          name="brandName"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên thương hiệu",
            },
          ]}
          colon={true}
          label="Thương hiệu"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <Input
            prefix={<BarcodeOutlined className="site-form-item-icon mr-1" />}
            placeholder="Thương hiệu"
            className="p-2"
            autoFocus
          />
        </Form.Item>
        <Form.Item
          name="origin"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn nguồn gốc xuất xứ",
            },
          ]}
          colon={true}
          label="Xuất xứ"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <Select placeholder="Chọn nguồn gốc">
            {Countries?.map((country, index: number) => (
              <Option key={index} value={country} label={country}>
                {country}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default AddBrandModal;
