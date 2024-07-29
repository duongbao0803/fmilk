import React, { useState } from "react";
import { Dropdown } from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import usePostService from "@/services/postService";
import { DataType } from "./PostList";
import DeletePostModal from "./DeletePostModal";
import EditPostModal from "./EditPostModal";

export interface DropdownPostProps {
  postInfo: DataType;
}

const DropdownPostFunction: React.FC<DropdownPostProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { deletePostItem } = usePostService();
  const { postInfo } = props;
  const postId = postInfo?._id;

  const openEditModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Dropdown
        menu={{
          items: [
            {
              key: "1",
              label: (
                <Link rel="noopener noreferrer" to="#" onClick={openEditModal}>
                  <EditOutlined className="pr-2" />
                  Chỉnh sửa bài viết
                </Link>
              ),
            },
            {
              key: "2",
              label: (
                <Link
                  rel="noopener noreferrer"
                  to="#"
                  onClick={() =>
                    DeletePostModal({
                      postId,
                      deletePostItem,
                    })
                  }
                >
                  <DeleteOutlined className="pr-2" />
                  Xóa bài viết
                </Link>
              ),
            },
          ],
        }}
        trigger={["click"]}
      >
        <MoreOutlined className="rotate-90" />
      </Dropdown>

      <EditPostModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        postInfo={postInfo}
      />
    </>
  );
};

export default DropdownPostFunction;
