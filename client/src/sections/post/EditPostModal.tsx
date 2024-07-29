import React, { useCallback, useEffect, useState } from "react";
import { Modal, Form, Input, Select } from "antd";
import { FormOutlined } from "@ant-design/icons";
import { DataType } from "./PostList";
import usePostService from "@/services/postService";
import UploadImagePost from "./UploadImagePost";
import { ProductInfo } from "@/interfaces/interface";
import useProductService from "@/services/productService";

export interface EditModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  postInfo?: DataType;
}

const EditPostModal: React.FC<EditModalProps> = React.memo((props) => {
  const { setIsOpen, isOpen, postInfo } = props;
  const { Option } = Select;
  const [fileChange, setFileChange] = useState<string>("");
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const { updatePostItem } = usePostService();
  const { products } = useProductService("", "", "");
  const [form] = Form.useForm();
  const { TextArea } = Input;

  useEffect(() => {
    if (isOpen) {
      form.setFieldsValue(postInfo);
    }
  }, [form, isOpen]);

  useEffect(() => {
    form.setFieldsValue({ image: fileChange });
  }, [fileChange, form]);

  const handleOk = useCallback(async () => {
    try {
      const values = await form.validateFields();
      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          if (postInfo && postInfo._id) {
            await updatePostItem(postInfo._id, values);
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
  }, [form, postInfo, setIsOpen, updatePostItem]);

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleFileChange = (newFileChange: string) => {
    setFileChange(newFileChange);
  };

  return (
    <Modal
      title={<p className="text-lg text-[red]">Chỉnh sửa bài viết</p>}
      open={isOpen}
      onOk={handleOk}
      confirmLoading={isConfirmLoading}
      onCancel={handleCancel}
    >
      <Form name="normal_login" className="login-form" form={form}>
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tiêu đề",
            },
            {
              min: 5,
              message: "Tiêu đề phải có ít nhất 5 ký tự",
            },
          ]}
          colon={true}
          label="Tiêu đề"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <Input
            prefix={<FormOutlined className="site-form-item-icon mr-1" />}
            placeholder="Tiêu đề"
            autoFocus
          />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mô tả",
            },
            {
              min: 5,
              message: "Mô tả phải có ít nhất 5 ký tự",
            },
          ]}
          colon={true}
          label="Mô tả"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <TextArea placeholder="Mô tả" />
        </Form.Item>
        <Form.Item
          name="product"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn sản phẩm",
            },
          ]}
          colon={true}
          label="Sản phẩm"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <Select
            showSearch
            placeholder="Chọn sản phẩm"
            optionFilterProp="children"
          >
            {products?.map((product: ProductInfo, index: number) => (
              <Option
                key={index}
                value={`${product?._id}`}
                label={product?.name}
              >
                {`${product?.name}`}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="image"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn hình ảnh",
            },
          ]}
          colon={true}
          label="Hình ảnh"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <UploadImagePost
            onFileChange={handleFileChange}
            initialImage={postInfo?.image}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default EditPostModal;
