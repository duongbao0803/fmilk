import React from "react";
import { Modal } from "antd";

const DeleteProductModal: React.FC<{
  deleteProductItem: (id: string) => void;
  productId: string;
}> = ({ deleteProductItem, productId }) => {
  const confirm = Modal.confirm;
  confirm({
    title: "Xóa sản phẩm",
    content: `Bạn có chắc chắn xóa sản phẩm này. Hành động này không thể khôi phục`,
    okText: "Đồng ý",
    okType: "danger",
    cancelText: "Không",
    onOk() {
      deleteProductItem(productId);
    },
  });
  return null;
};

export default DeleteProductModal;
