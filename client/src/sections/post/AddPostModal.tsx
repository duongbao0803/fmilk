import { useEffect, useState } from "react";
import { Modal, Form, Input, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";
import UploadImagePost from "./UploadImagePost";
import usePostService from "@/services/postService";
import useProductService from "@/services/productService";
import { ProductInfo } from "@/interfaces/interface";

export interface AddPostModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const AddPostModal: React.FC<AddPostModalProps> = (props) => {
  const { Option } = Select;
  const [fileChange, setFileChange] = useState<string>("");
  const { TextArea } = Input;
  const { products } = useProductService("", "", "");
  const { setIsOpen, isOpen } = props;
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const { addNewPostItem } = usePostService();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ image: fileChange });
  }, [fileChange, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          await addNewPostItem(values);
          form.resetFields();
          setIsConfirmLoading(false);
          setIsOpen(false);
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
    form.resetFields();
  };

  const handleFileChange = (newFileChange: string) => {
    setFileChange(newFileChange);
  };

  return (
    <Modal
      title={<p className="text-lg text-[red]">Thêm bài viết</p>}
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
            prefix={<UserOutlined className="site-form-item-icon mr-1" />}
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
          <UploadImagePost onFileChange={handleFileChange} initialImage={""} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPostModal;
