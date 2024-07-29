import React from "react";
import { Helmet } from "react-helmet";
import { CartView } from "@/sections/cart/view";

const CartPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> FMilk | Giỏ hàng </title>
      </Helmet>
      <CartView />
    </>
  );
};

export default CartPage;
