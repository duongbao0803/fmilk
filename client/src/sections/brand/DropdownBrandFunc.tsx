import React, { useState } from "react";
import { Dropdown } from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import DeleteBrandModel from "./DeleteBrandModal";
import EditBrandModal from "./EditBrandModal";
import { DataType } from "./BrandList";
import useBrandService from "../../services/brandService";

export interface DropdownBrandProps {
  brandInfo: DataType;
}

const DropdownBrand: React.FC<DropdownBrandProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { deleteBrandItem } = useBrandService();
  const { brandInfo } = props;
  const brandId = brandInfo?._id;

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
                  Chỉnh sửa thương hiệu
                </Link>
              ),
            },
            {
              key: "2",
              label: (
                <Link
                  rel="noopener noreferrer"
                  to="#"
                  onClick={() => DeleteBrandModel({ deleteBrandItem, brandId })}
                >
                  <DeleteOutlined className="pr-2" />
                  Xóa thương hiệu
                </Link>
              ),
            },
          ],
        }}
        trigger={["click"]}
      >
        <MoreOutlined className="rotate-90" />
      </Dropdown>

      <EditBrandModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        brandInfo={brandInfo}
      />
    </>
  );
};

export default DropdownBrand;
