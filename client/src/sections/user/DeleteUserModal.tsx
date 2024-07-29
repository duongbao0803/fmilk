/* eslint-disable no-unused-vars */
import React from "react";
import { Modal } from "antd";

const DeleteModal: React.FC<{
  deleteUserItem: (id: string) => void;
  userId: string;
}> = ({ deleteUserItem, userId }) => {
  const confirm = Modal.confirm;
  confirm({
    title: "Xóa người dùng",
    content: `Bạn có chắc chắn xóa người dùng. Hành động này không thể khôi phục`,
    okText: "Đồng ý",
    okType: "danger",
    cancelText: "Không",
    onOk() {
      deleteUserItem(userId);
    },
  });
  return null;
};

export default DeleteModal;
