import { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Row,
  Col,
  InputNumber,
  Select,
  DatePicker,
} from "antd";
import { UserOutlined, PoundCircleOutlined } from "@ant-design/icons";
import { DataType } from "./ProductList";
import useProductService from "@/services/productService";
import UploadImageProduct from "./UploadImageProduct";
import useBrandService from "@/services/brandService";
import moment from "moment";
import dayjs from "dayjs";
import { formatDate } from "@/util/validate";

export interface EditModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  productInfo?: DataType;
}

const EditProductModal: React.FC<EditModalProps> = (props) => {
  const { setIsOpen, isOpen, productInfo } = props;
  const [fileChange, setFileChange] = useState<string>("");
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const { updateProductItem } = useProductService("", "", "");
  const [form] = Form.useForm();
  const { brands } = useBrandService();
  const { Option } = Select;
  const { TextArea } = Input;

  useEffect(() => {
    if (isOpen) {
      const updatedProductInfo = { ...productInfo };
      if (updatedProductInfo.expireDate) {
        updatedProductInfo.expireDate = dayjs(updatedProductInfo.expireDate);
      }
      form.setFieldsValue(updatedProductInfo);
    }
  }, [isOpen]);

  useEffect(() => {
    form.setFieldsValue({ image: fileChange });
  }, [fileChange, form]);

  const disabledDate = (current: object) => {
    return current && current < moment().startOf("day");
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formattedDate = formatDate(values.expireDate);
      const updatedValues = { ...values, expireDate: formattedDate };
      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          if (productInfo && productInfo._id) {
            await updateProductItem(productInfo._id, updatedValues);
            setIsConfirmLoading(false);
            setIsOpen(false);
          } else {
            console.error("Product is undefined");
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

  const handleFileChange = (newFileChange: string) => {
    setFileChange(newFileChange);
  };

  return (
    <Modal
      title={<p className="text-lg text-[red]">Chỉnh sửa sản phẩm</p>}
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
                  message: "Tên sản phẩm có ít nhất 5 ký tự",
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
                disabled
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} className="relative mt-1">
          <Col span={12}>
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
        <Row gutter={16} className="relative mt-1">
          <Col span={12}>
            <Form.Item
              name="price"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn giá",
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
          <Col span={12}>
            <Form.Item
              name="quantity"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn số lượng",
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
        </Row>
        <Form.Item
          name="description"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mô tả sản phẩm",
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
            initialImage={productInfo?.image}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProductModal;
