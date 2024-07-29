import React from "react";
import BrandList from "../BrandList";

const brandManagement = React.memo(() => {
  return (
    <>
      <div className="rounded-t-xl bg-[#e8e8e8] p-5">
        <p className="text-2xl font-bold text-[#000000]">Quản lý thương hiệu</p>
      </div>
      <div className="p-5">
        <BrandList />
      </div>
    </>
  );
});

export default brandManagement;
