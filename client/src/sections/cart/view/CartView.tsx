import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Button, Input, notification, Table, TableProps } from "antd";
import {
  HomeFilled,
  MinusCircleOutlined,
  PlusCircleOutlined,
  RightOutlined,
} from "@ant-design/icons";
import useCartStore from "@/hooks/useCartStore";
import { PriceFormat } from "@/util/validate";
import DeleteCartModal from "../DeleteCartModal";
import { CartItem } from "@/interfaces/interface";

const CartView: React.FC = () => {
  const [discountCode, setDiscountCode] = useState<string>("");
  const { cart, addToCart, itemsPrice, removeCart } = useCartStore();
  const navigate = useNavigate();

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

  const handleRemove = (record: CartItem) => {
    if (record.quantity === 1) {
      DeleteCartModal({
        removeCart,
        record,
      });
    } else {
      removeCart(record._id);
    }
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
          <MinusCircleOutlined
            onClick={() => handleRemove(record)}
            className="text-xl text-[black]"
          />
          <span className="text-md mx-2">{record.quantity}</span>
          <PlusCircleOutlined
            className="text-xl text-[#08cde9]"
            onClick={() => addToCart(record)}
          />
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

  const handleCart = () => {
    if (cart.length <= 0) {
      notification.warning({
        message: "Không thể thực hiện",
        description: "Quý khách vui lòng thêm sản phẩm vào giỏ hàng",
        duration: 2,
      });
      return;
    }
    navigate("/checkout");
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
              <h1 className="text-4xl font-bold text-white">GIỎ HÀNG</h1>
            </div>
          </div>
        </div>

        <div className="mx-10 min-h-screen md:mx-36">
          <div className="mb-5">
            <Link to={"/"}>
              <HomeFilled className="text-xl text-[#08cde9]" />
            </Link>
            <RightOutlined className="mx-2 text-[#08cde9]" />
            <span className="font-bold">Giỏ hàng của bạn</span>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="cart col-span-2 rounded-lg bg-white">
              <Table
                className="pagination h-full"
                id="myTable"
                columns={columns}
                dataSource={cart}
                pagination={false}
              />
            </div>
            <div className="col-span-1">
              <div className="mb-8 rounded-lg shadow-md">
                <label className="block rounded-lg rounded-bl-none rounded-br-none bg-[#fafafa] p-4 text-[14px] font-semibold">
                  Mã Giảm Giá
                </label>
                <div className="px-5 py-3">
                  <Input
                    placeholder="Mã giám giá"
                    value={discountCode}
                    className="mb-2 w-full rounded-md border border-gray-300 px-2 py-1"
                    onChange={(e) => setDiscountCode(e.target.value)}
                  />
                  <Button
                    // onClick={applyDiscountCode}
                    className="h-10 w-full rounded-md py-1"
                    type="primary"
                  >
                    Áp Dụng
                  </Button>
                </div>
              </div>
              <div className="rounded-lg bg-white shadow-md">
                <label className="block rounded-lg rounded-bl-none rounded-br-none bg-[#fafafa] p-4 text-[14px] font-semibold">
                  Thông tin đơn hàng
                </label>
                <div className="px-5 py-3">
                  <div className="mb-2 flex justify-between">
                    <span className="text-md">Tổng Giá Sản Phẩm</span>
                    <span className="text-md">
                      {" "}
                      {PriceFormat.format(itemsPrice ?? 0)}
                    </span>
                  </div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-md">Phí Vận Chuyển</span>
                    {transferPrice === 0
                      ? "Miễn phí"
                      : `${PriceFormat.format(transferPrice)}`}
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-md">Tạm Tính</span>
                    {PriceFormat.format(subtotal)}
                  </div>
                  <div className="mt-5 flex flex-col gap-3">
                    <Button
                      onClick={handleCart}
                      className="h-10 w-full rounded-md"
                      type="primary"
                    >
                      Tiếp tục
                    </Button>
                    <Button
                      onClick={() => navigate("/")}
                      className="h-10 w-full rounded-md"
                      type="default"
                    >
                      Mua thêm
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

export default CartView;
