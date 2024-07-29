import React, { useState } from "react";
import { Dropdown } from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import DeleteCommentModal from "./DeleteCommentModal";
import EditCommentModal from "./EditCommentModal";
import useProductService from "@/services/productService";
import { FeedBack, ProductInfo } from "@/interfaces/interface";

export interface DropdownCommentProps {
  commentId: string;
  commentInfo: FeedBack;
  product: ProductInfo;
}

const DropdownCommentFunc: React.FC<DropdownCommentProps> = React.memo(
  (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const { deleteCommentItem } = useProductService("", "", "");
    const { commentId, commentInfo, product } = props;
    const productId = product?._id;
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
                  <Link
                    rel="noopener noreferrer"
                    to="#"
                    onClick={openEditModal}
                  >
                    <EditOutlined className="pr-2" />
                    Chỉnh sửa nhận xét
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
                      DeleteCommentModal({
                        deleteCommentItem,
                        productId,
                        commentId,
                      })
                    }
                  >
                    <DeleteOutlined className="pr-2" />
                    Xóa nhận xét
                  </Link>
                ),
              },
            ],
          }}
          trigger={["click"]}
        >
          <MoreOutlined className="rotate-90" />
        </Dropdown>

        <EditCommentModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          commentInfo={commentInfo}
          product={product}
        />
      </>
    );
  },
);

export default DropdownCommentFunc;
