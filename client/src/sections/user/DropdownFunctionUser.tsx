import React, { useState } from "react";
import { Dropdown } from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { DataType } from "./UserList";
import DeleteModal from "./DeleteUserModal";
import EditModal from "./EditUserModal";
import useUserService from "@/services/userService";

export interface DropdownFunctionProps {
  userInfo: DataType;
}

const DropdownFunctionUser: React.FC<DropdownFunctionProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { deleteUserItem } = useUserService();
  const { userInfo } = props;
  const userId = userInfo?._id;

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
                  Chỉnh sửa người dùng
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
                    DeleteModal({
                      userId,
                      deleteUserItem,
                    })
                  }
                >
                  <DeleteOutlined className="pr-2" />
                  Xóa người dùng
                </Link>
              ),
            },
          ],
        }}
        trigger={["click"]}
      >
        <MoreOutlined className="rotate-90" />
      </Dropdown>

      <EditModal isOpen={isOpen} setIsOpen={setIsOpen} userInfo={userInfo} />
    </>
  );
};

export default DropdownFunctionUser;
