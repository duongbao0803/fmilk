import React from "react";
import ProductList from "../ProductList";

const ProductManagement: React.FC = React.memo(() => {
  return (
    <>
      <div className="rounded-t-xl bg-[#e8e8e8] p-5">
        <p className="text-2xl font-bold text-[#000000]">Quản lý sản phẩm</p>
      </div>
      <div className="p-5">
        <ProductList />
      </div>
    </>
  );
});

export default ProductManagement;
