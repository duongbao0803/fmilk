import React from "react";
import { Modal } from "antd";

const DeletePostModal: React.FC<{
  deletePostItem: (id: string) => void;
  postId: string;
}> = ({ deletePostItem, postId }) => {
  const confirm = Modal.confirm;
  confirm({
    title: "Xóa bài viết",
    content: `Bạn có chắc chắn xóa bài viết này. Hành động này không thể khôi phục`,
    okText: "Đồng ý",
    okType: "danger",
    cancelText: "Không",
    onOk() {
      deletePostItem(postId);
    },
  });
  return null;
};

export default DeletePostModal;
