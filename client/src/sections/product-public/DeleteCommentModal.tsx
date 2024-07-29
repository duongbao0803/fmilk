import React from "react";
import { Modal } from "antd";

const DeleteCommentModal: React.FC<{
  deleteCommentItem: (productId: string, commentId: string) => void;
  productId: string;
  commentId: string;
}> = ({ deleteCommentItem, productId, commentId }) => {
  const confirm = Modal.confirm;
  confirm({
    title: "Xóa nhận xét",
    content: `Bạn có chắc chắn muốn xóa nhận xét này. Hành động này không thể khôi phục`,
    okText: "Đồng ý",
    okType: "danger",
    cancelText: "Không",
    onOk() {
      deleteCommentItem(productId, commentId);
    },
  });
  return null;
};

export default DeleteCommentModal;
