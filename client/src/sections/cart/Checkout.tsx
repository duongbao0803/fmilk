import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  notification,
  Radio,
  RadioChangeEvent,
  Table,
  TableProps,
} from "antd";
import { HomeFilled, RightOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "@/api/orderApi";
import { Role } from "@/enums/enum";
import useCartStore from "@/hooks/useCartStore";
import { PriceFormat, validatePhoneNumber } from "@/util/validate";
import { CartItem } from "@/interfaces/interface";
import LogoVnpay from "@/assets/images/logo/logo_vnpay.png";
import LogoCash from "@/assets/images/logo/logo_cash.png";
import useAuthService from "@/services/authService";

const Checkout: React.FC = () => {
  const testPrice = localStorage.getItem("cart");
  const parseJson = testPrice ? JSON.parse(testPrice) : null;
  const { cart, itemsPrice, clearCart } = useCartStore();
  const { infoUser } = useAuthService();
  const [value, setValue] = useState<string>("");
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (infoUser) {
      form.setFieldsValue({
        name: infoUser.username,
        address: infoUser.address,
        phone: infoUser.phone,
      });
    }
  }, [infoUser, form]);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const TRANSFER_FEE = [
    { min: 2000000, fee: 0 },
    { min: 1500000, max: 2000000, fee: 20000 },
    { min: 1000000, max: 1500000, fee: 40000 },
    { max: 1000000, fee: 60000 },
    { min: 0, fee: 0 },
  ];

  const getShippingFee = (itemsPrice: number) => {
    for (let i = 0; i < TRANSFER_FEE.length; i++) {
      const { min = 0, max = Infinity, fee } = TRANSFER_FEE[i];
      if (itemsPrice >= min && itemsPrice < max) {
        return fee;
      }
    }
    return 0;
  };

  const transferPrice = getShippingFee(itemsPrice);
  const subtotal = itemsPrice + transferPrice;

  const columns: TableProps<CartItem>["columns"] = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_, _record, index) => index + 1,
    },
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (_text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record?.image}
            alt={record.name}
            style={{ width: 50, height: 50, marginRight: 10 }}
          />
          <span>{record.name}</span>
        </div>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (price) => (
        <span>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(price)}
        </span>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (_text, record) => (
        <div className="flex items-center">
          <span className="text-md mx-2">{record.quantity}</span>
        </div>
      ),
    },
    {
      title: "Tổng cộng",
      dataIndex: "totalProductPrice",
      render: (totalProductPrice) => (
        <span>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(totalProductPrice)}
        </span>
      ),
    },
  ];

  const filteredArray = cart.map(({ _id, quantity }) => ({ _id, quantity }));
  const updatedProducts = filteredArray.map((product) => ({
    productId: product._id,
    amount: product.quantity,
  }));

  const [data] = useState({
    transferAddress: {
      fullName: infoUser?.username,
      address: infoUser?.address,
      phone: infoUser?.phone,
    },
    orderProducts: updatedProducts,
    userId: infoUser?._id,
    paymentMethod: value,
    itemsPrice: parseJson.state.itemsPrice,
    transferPrice: transferPrice,
    totalPrice: subtotal,
  });

  const handlePayment = async () => {
    try {
      if (!isConfirm) {
        notification.warning({
          message: "Thanh toán thất bại",
          description: "Vui lòng xác nhận đơn hàng trước khi thanh toán",
          duration: 2,
        });
      }
      const formValues = {
        ...data,
        transferAddress: form.getFieldsValue(),
        paymentMethod: value,
      };
      const res = await createOrder(formValues);
      if (res && res.status === 200) {
        if (formValues?.paymentMethod === "VNPAY") {
          notification.success({
            message: "Tạo đơn hàng thành công",
            description:
              "Đơn hàng đã được tạo thành công! Chuyển hướng đến trang thanh toán trong 3 giây...",
            duration: 2,
          });
          setTimeout(() => {
            window.location.href = res.data.data;
          }, 3000);
        } else {
          notification.success({
            message: "Tạo đơn hàng thành công",
            description:
              "Đơn hàng đã được tạo thành công! Chúng tôi sẽ liên hệ với bạn sớm. Xin cảm ơn",
            duration: 2,
          });
          navigate("/");
          clearCart();
        }
      }
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const error = err as { response: { data: { message: string } } };
        notification.error({
          message: "Tạo đơn hàng thất bại",
          description: error.response.data.message,
          duration: 2,
        });
      }
      console.error("Err payment", err);
    }
  };

  return (
    <>
      <div>
        <div className="h-[600px]">
          <div className="background4 relative top-[69.5px]">
            <div className="text-center">
              <h4 className="py-3 text-3xl font-semibold tracking-widest text-[#08cde9]">
                FMILK
              </h4>
              <h1 className="text-4xl font-bold text-white">THANH TOÁN</h1>
            </div>
          </div>
        </div>

        <div className="mx-10 mb-16 min-h-screen md:mx-36">
          <div className="mb-5">
            <Link to={"/"}>
              <HomeFilled className="text-xl text-[#08cde9]" />
            </Link>
            <RightOutlined className="mx-2 text-[#08cde9]" />
            <Link to={"/cart"}>Giỏ hàng của bạn</Link>
            <RightOutlined className="mx-2 text-[#08cde9]" />
            <span className="font-bold">Thanh toán</span>
          </div>
          <div>
            <strong>Thông tin liên hệ</strong>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="cart col-span-2 rounded-lg bg-white">
                <div className="col-span-3 ">
                  <Form form={form} layout="vertical">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                      <div className="col-span-3 mb-5">
                        <div className="rounded-lg bg-white p-4 shadow-md">
                          <Form.Item
                            label="Họ và tên"
                            name="name"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập tên của bạn",
                              },
                              {
                                min: 8,
                                message: "Họ và tên phải có ít nhất 8 ký tự",
                              },
                            ]}
                          >
                            <Input placeholder="Nhập tên của bạn" />
                          </Form.Item>
                          <Form.Item
                            label="Địa chỉ"
                            name="address"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập địa chỉ của bạn",
                              },
                              {
                                min: 8,
                                message: "Địa chỉ phải có ít nhất 8 ký tự",
                              },
                            ]}
                          >
                            <Input placeholder="Nhập địa chỉ của bạn" />
                          </Form.Item>
                          <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập số điện thoại của bạn",
                              },
                              { validator: validatePhoneNumber },
                            ]}
                          >
                            <Input placeholder="Nhập số điện thoại của bạn" />
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                  </Form>
                  <div>
                    <strong>Đơn hàng của bạn</strong>
                    <Table
                      id="myTable"
                      columns={columns}
                      dataSource={cart}
                      pagination={false}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <div className="rounded-lg bg-white shadow-md">
                  <label className="block rounded-lg rounded-bl-none rounded-br-none bg-[#fafafa] p-4 text-[14px] font-semibold">
                    Thông tin đơn hàng
                  </label>
                  <div className="mb-5 px-5 py-[22px]">
                    <div className="mb-[11px] flex justify-between">
                      <span className="text-md">Tổng Giá Sản Phẩm</span>
                      <span className="text-md">
                        {" "}
                        {PriceFormat.format(itemsPrice ?? 0)}
                      </span>
                    </div>
                    <div className="mb-[11px] flex justify-between">
                      <span className="text-md ">Phí Vận Chuyển</span>
                      {transferPrice === 0
                        ? "Miễn phí"
                        : `${PriceFormat.format(transferPrice)}`}
                    </div>
                    <div className="mb-[11px] flex justify-between">
                      <span className="text-md">Mã giảm giá</span>
                      <span className="text-md">0</span>
                    </div>
                    <div className="mb-[11px] flex justify-between">
                      <span className="text-md">Phí VAT</span>
                      <span className="text-md">0</span>
                    </div>
                    <div className="my-5 h-0.5 w-full bg-[#f0efef]" />
                    <div className="flex justify-between font-semibold">
                      <span className="text-md">Tạm Tính</span>
                      {PriceFormat.format(subtotal)}
                    </div>
                  </div>
                </div>
                <div className="mb-8 mt-[42px] rounded-lg shadow-md">
                  <label className="block rounded-lg rounded-bl-none rounded-br-none bg-[#fafafa] p-4 text-[14px] font-semibold">
                    Phương thức thanh toán
                  </label>
                  <div className="px-5 py-3">
                    <Radio.Group
                      onChange={onChange}
                      className="w-full"
                      value={value}
                    >
                      {infoUser && infoUser?.role === Role.MEMBER && (
                        <div className="relative mb-5 flex w-full items-center justify-between rounded-lg border border-[#bebcbc] p-5 hover:border-[#08a2e9]">
                          <Radio value={"VNPAY"} className="w-full">
                            <div className="inline w-full">
                              <div className="border-1 w-full">
                                Thanh toán VNPAY
                              </div>
                            </div>
                          </Radio>
                          <div className="ml-4">
                            <img
                              src={LogoVnpay}
                              alt="Logo-vnpay"
                              className="w-11"
                            />
                          </div>
                        </div>
                      )}

                      <div className="relative flex w-full items-center justify-between rounded-lg border border-[#bebcbc] p-5 hover:border-[#08a2e9]">
                        <Radio value={"CASH"} className="w-full">
                          <div className="inline w-full">
                            <div className="border-1 w-full">
                              Thanh toán khi nhận hàng
                            </div>
                          </div>
                        </Radio>
                        <div className="ml-4">
                          <img
                            src={LogoCash}
                            alt="Logo-cash"
                            className="w-11"
                          />
                        </div>
                      </div>
                    </Radio.Group>
                    <div className="mt-5 flex gap-2">
                      <input
                        type="checkbox"
                        required
                        onChange={(e) => setIsConfirm(e.target.checked)}
                      />
                      <p className="text-sm">
                        Vui lòng xác nhận lại đơn hàng trước khi thanh toán
                      </p>
                    </div>
                    <Button
                      className="mt-5 h-10 w-full rounded-md py-1"
                      type="primary"
                      onClick={handlePayment}
                    >
                      Thanh toán
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
