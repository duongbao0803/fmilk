import React, { useState } from "react";
import { Dropdown } from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import DeleteProductModal from "./DeleteProductModal";
import { DataType } from "./ProductList";
import useProductService from "@/services/productService";
import EditProductModal from "./EditProductModal";

export interface DropdownFunctionProps {
  productInfo: DataType;
}

const DropdownFunction: React.FC<DropdownFunctionProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { deleteProductItem } = useProductService("", "", "");
  const { productInfo } = props;
  const productId = productInfo?._id;

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
                  Chỉnh sửa sản phẩm
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
                    DeleteProductModal({
                      productId,
                      deleteProductItem,
                    })
                  }
                >
                  <DeleteOutlined className="pr-2" />
                  Xóa sản phẩm
                </Link>
              ),
            },
          ],
        }}
        trigger={["click"]}
      >
        <MoreOutlined className="rotate-90" />
      </Dropdown>

      <EditProductModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        productInfo={productInfo}
      />
    </>
  );
};

export default DropdownFunction;
