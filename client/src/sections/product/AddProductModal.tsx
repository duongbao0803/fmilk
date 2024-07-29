import { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Row,
  Col,
  InputNumber,
  DatePicker,
  Select,
} from "antd";
import { UserOutlined, PoundCircleOutlined } from "@ant-design/icons";
import useProductService from "@/services/productService";
import UploadImageProduct from "./UploadImageProduct";
import moment from "moment/moment";
import useBrandService from "@/services/brandService";
import { formatDate } from "@/util/validate";

export interface AddModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const AddProductModal: React.FC<AddModalProps> = (props) => {
  const [fileChange, setFileChange] = useState<string>("");
  const { setIsOpen, isOpen } = props;
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const { addNewProductItem } = useProductService("", "", "");
  const { brands } = useBrandService();
  const { Option } = Select;
  const { TextArea } = Input;

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ image: fileChange });
  }, [fileChange, form]);

  const disabledDate = (current: object) => {
    return current && current < moment().startOf("day");
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formattedDate = formatDate(values.dob);
      const updatedValues = { ...values, dob: formattedDate };
      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          await addNewProductItem(updatedValues);
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
      title={<p className="text-lg text-[red]">Thêm sản phẩm</p>}
      open={isOpen}
      onOk={handleOk}
      confirmLoading={isConfirmLoading}
      onCancel={handleCancel}
    >
      <Form name="normal_login" className="login-form" form={form}>
        <Row gutter={16} className="relative mt-1">
          <Col span={12}>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên sản phẩm",
                },
                {
                  min: 5,
                  message: "Name must be at least 5 characters",
                },
              ]}
              colon={true}
              label="Tên sản phẩm"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon mr-1" />}
                placeholder="Tên sản phẩm"
                autoFocus
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="expireDate"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ngày hết hạn",
                },
              ]}
              colon={true}
              label="Ngày hết hạn"
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

        <Row gutter={16} className="relative mt-1">
          <Col span={8}>
            <Form.Item
              name="price"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập giá",
                },
              ]}
              colon={true}
              label="Giá"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <InputNumber
                className="w-full"
                type="number"
                prefix={
                  <PoundCircleOutlined className="site-form-item-icon mr-1" />
                }
                placeholder="Giá"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="quantity"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số lượng",
                },
              ]}
              colon={true}
              label="Số lượng"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <InputNumber
                type="number"
                className="w-full"
                prefix={
                  <PoundCircleOutlined className="site-form-item-icon mr-1" />
                }
                placeholder="Số lượng"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="brand"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn thương hiệu",
                },
              ]}
              colon={true}
              label="Thương hiệu"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Select placeholder="Chọn thương hiệu">
                {brands?.map(
                  (
                    brand: { _id: unknown; brandName: unknown },
                    index: number,
                  ) => (
                    <Option
                      key={index}
                      value={`${brand?._id}`}
                      label={brand.brandName}
                    >
                      {`${brand?.brandName}`}
                    </Option>
                  ),
                )}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="description"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mô tả",
            },
          ]}
          label="Mô tả"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <TextArea placeholder="Mô tả" />
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
          <UploadImageProduct
            onFileChange={handleFileChange}
            initialImage={""}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProductModal;
