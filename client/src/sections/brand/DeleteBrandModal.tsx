import React from "react";
import { Modal } from "antd";

const DeleteBrandModel: React.FC<{
  deleteBrandItem: (id: string) => void;
  brandId: string;
}> = ({ deleteBrandItem, brandId }) => {
  const confirm = Modal.confirm;
  confirm({
    title: "Xóa thương hiệu",
    content: `Bạn có chắc chắn xóa thương hiệu này. Hành động này không thể khôi phục`,
    okText: "Đồng ý",
    okType: "danger",
    cancelText: "Không",
    onOk() {
      deleteBrandItem(brandId);
    },
  });
  return null;
};

export default DeleteBrandModel;
