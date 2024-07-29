import { Form, Input, Modal, Rate } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { FeedBack, ProductInfo } from "@/interfaces/interface";
import useProductService from "@/services/productService";

interface EditCommentModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: ProductInfo;
  commentInfo?: FeedBack;
}

const EditCommentModal: React.FC<EditCommentModalProps> = React.memo(
  (props) => {
    const { isOpen, setIsOpen, product, commentInfo } = props;
    const { TextArea } = Input;
    const productId = product && product?._id;
    const { updateCommentItem } = useProductService("", "", productId);
    const [star, setStar] = useState<number>();
    const commentId = commentInfo && commentInfo?._id;
    const [form] = Form.useForm();

    useEffect(() => {
      if (isOpen && commentInfo) {
        setStar(commentInfo.rating);
        form.setFieldsValue(commentInfo);
      }
    }, [isOpen, commentInfo, form]);

    const handleStar = useCallback(
      (value: number) => {
        setStar(value);
        form.setFieldsValue({ rating: value });
      },
      [form],
    );

    const handleSubmit = async (values: FeedBack) => {
      if (values?.content && values?.rating && commentId) {
        try {
          await updateCommentItem(productId, commentId, values);
          setIsOpen(false);
        } catch (err) {
          setIsOpen(true);
          console.error("Err", err);
        }
      }
    };

    return (
      <Modal
        title={<p className="text-red text-lg">Đánh giá & nhận xét</p>}
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          onFinish={handleSubmit}
          initialValues={{ rating: star }}
        >
          <Form.Item
            name="rating"
            rules={[
              {
                required: true,
                message: "Vui lòng đánh giá sao",
              },
            ]}
            colon={true}
            labelCol={{ span: 24 }}
            className="formItem"
          >
            <div className="">
              <div className="flex gap-3">
                <img
                  src={product?.image}
                  alt=""
                  className="h-[100px] w-[100px]"
                />
                <span className="pt-5 text-lg font-bold">{product?.name}</span>
              </div>
              <div className="mt-7">
                <p className="mb-2 font-bold">Đánh giá chung</p>
                <Rate
                  allowHalf
                  value={star}
                  onChange={handleStar}
                  className="text-center text-4xl"
                />
              </div>
            </div>
          </Form.Item>
          <Form.Item
            name="content"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập nhận xét",
              },
              {
                min: 8,
                message: "Nhận xét phải có ít nhất 8 ký tự",
              },
            ]}
            colon={true}
            label="Nhận xét"
            labelCol={{ span: 24 }}
            className="formItem"
          >
            <TextArea placeholder="Gửi nhận xét" rows={3} />
          </Form.Item>
          <Form.Item>
            <button
              type="submit"
              className="mt-3 w-full border-2 bg-[#08cde9] px-[30px] py-[10px] font-bold text-[white] transition-all duration-500 ease-in-out hover:rounded-2xl hover:border-[#08cde9] hover:bg-[white] hover:tracking-wide hover:text-[#08cde9]"
            >
              GỬI ĐÁNH GIÁ
            </button>
          </Form.Item>
        </Form>
      </Modal>
    );
  },
);

export default EditCommentModal;
