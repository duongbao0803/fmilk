import useOrderedService from "@/services/orderedService";
import React from "react";
import { Divider, Tag } from "antd";
import { convertToDDMMYYYY, PriceFormat } from "@/util/validate";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Order } from "@/interfaces/interface";

const OrderedList: React.FC = () => {
  const { orders } = useOrderedService();

  const getStatusTag = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return <Tag color="green">SUCCESS</Tag>;
      case "FAILED":
        return <Tag color="red">FAILED</Tag>;
      default:
        return <Tag color="blue">{status}</Tag>;
    }
  };

  return (
    <div className="mb-5">
      {orders &&
        orders.length > 0 &&
        orders.map((order: Order, index: number) => (
          <div className="mb-5 bg-[white] p-5" key={index}>
            <div className="flex justify-between">
              <p className="font-bold">#{order?._id}</p>
              <div className="flex gap-3">
                <p>
                  <span className="font-bold text-[#404040]">Trạng thái:</span>{" "}
                  {getStatusTag(order.transactions[0]?.status || "PENDING")}
                </p>
                <p>
                  <ClockCircleOutlined className="mr-1" />
                  {convertToDDMMYYYY(order?.createdAt)}
                </p>
              </div>
            </div>
            <Divider />
            {order.orderProducts.length > 0 &&
              order.orderProducts.map((orderProduct, index: number) => (
                <div
                  className="my-5 flex items-center justify-between"
                  key={index}
                >
                  <div className="flex gap-3">
                    <img
                      src={orderProduct?.image}
                      alt="error"
                      className="h-[70px] w-[70px]"
                    />
                    <div>
                      <p>{orderProduct?.name}</p>
                      <p>x{orderProduct?.amount}</p>
                    </div>
                  </div>
                  <div>{PriceFormat.format(orderProduct?.price)}</div>
                </div>
              ))}

            <Divider />
            <div className="mb-2 text-right">
              <span className="font-bold">Phí vận chuyển:</span>{" "}
              {PriceFormat.format(order.transferPrice)}
            </div>
            <div className="text-right">
              <span className="font-bold">Tổng cộng:</span>{" "}
              {PriceFormat.format(order.totalPrice)}
            </div>
          </div>
        ))}
    </div>
  );
};

export default OrderedList;
