import React, { useState } from "react";
import { Button, Input, Switch, Table, Tag } from "antd";
import type { TablePaginationConfig, TableProps } from "antd";
import { FilterOutlined, UserAddOutlined } from "@ant-design/icons";
import useUserService from "@/services/userService";
import { formatDate } from "@/util/validate";
import AddModal from "./AddUserModal";
import ExportButton from "./ExportUser";
import DropdownFunctionUser from "./DropdownFunctionUser";

export interface DataType {
  image: string | undefined;
  quantity: number;
  _id: string;
  key: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  role: string;
  status: boolean;
}

const UserList: React.FC = () => {
  const { users, isFetching, updateStatus } = useUserService();
  const [isShow, setIsShow] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleStatusChange = async (userId: string, newStatus: boolean) => {
    if (userId) {
      updateStatus(userId, newStatus);
    }
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Tên",
      dataIndex: "name",
      width: "20%",
      className: "first-column",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "20%",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
      width: "15%",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: "10%",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      width: "15%",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      width: "10%",
      filters: [
        { text: "ADMIN", value: "ADMIN" },
        { text: "STAFF", value: "STAFF" },
        { text: "MEMBER", value: "MEMBER" },
        { text: "GUEST", value: "GUEST" },
      ],
      onFilter: (value, record) => record.role === value,
      render: (role) => {
        let color;
        switch (role) {
          case "ADMIN":
            color = "blue";
            break;
          case "STAFF":
            color = "green";
            break;
          case "MEMBER":
            color = "red";
            break;
          case "GUEST":
            color = "orange";
            break;
        }
        return (
          <Tag color={color} key={role}>
            {role}
          </Tag>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: "10%",
      render: (_, record) => (
        <Switch
          checkedChildren="Active"
          unCheckedChildren="Inactive"
          checked={record.status}
          onChange={(newStatus) => handleStatusChange(record._id, newStatus)}
        />
      ),
    },

    {
      title: "",
      dataIndex: "",
      render: (_, record) => (
        <>
          <div className="flex gap-3">
            <DropdownFunctionUser userInfo={record} />
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-x-2">
          <Input
            placeholder="Tìm kiếm theo..."
            className="h-8 max-w-lg rounded-lg sm:mb-5 sm:w-[300px]"
          />
          <Button className="flex items-center" type="primary">
            <FilterOutlined className="align-middle" />
            Lọc
          </Button>
        </div>
        <div className="flex gap-x-2">
          <div>
            <ExportButton />
          </div>
          <div>
            <Button type="primary" onClick={() => setIsShow(true)}>
              <div className="flex justify-center">
                <UserAddOutlined className="mr-1 text-lg" /> Thêm người dùng
              </div>
            </Button>
          </div>
        </div>
      </div>
      <Table
        className="pagination"
        id="myTable"
        columns={columns}
        dataSource={users?.map(
          (record: { id: unknown; dob: string | number | Date }) => ({
            ...record,
            key: record.id,
            dob: formatDate(record.dob),
          }),
        )}
        pagination={{
          current: currentPage,
          total: users.totalUsers || 0,
          pageSize: 5,
        }}
        onChange={handleTableChange}
        loading={isFetching}
        rowKey={(record) => record._id}
      />
      <AddModal setIsShow={setIsShow} isShow={isShow} />
    </>
  );
};

export default UserList;
