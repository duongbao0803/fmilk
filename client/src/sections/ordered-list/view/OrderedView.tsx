import React from "react";
import OrderedList from "../OrderedList";

const OrderedView: React.FC = () => {
  return (
    <>
      <div className="min-h-screen w-full">
        <p className="my-[10px] font-bold">Lịch sử đặt hàng</p>
        <div className="rounded-lg">
          <OrderedList />
        </div>
      </div>
    </>
  );
};

export default OrderedView;
