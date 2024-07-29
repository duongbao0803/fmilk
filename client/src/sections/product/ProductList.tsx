import React, { useState } from "react";
import { Button, Input, Table, Tag } from "antd";
import type { TablePaginationConfig, TableProps } from "antd";
import { AppstoreAddOutlined, FilterOutlined } from "@ant-design/icons";
import useProductService from "@/services/productService";
import ExportButton from "./ExportProduct";
import DropdownFunction from "./DropdownFunction";
import AddProductModal from "./AddProductModal";
import { Dayjs } from "dayjs";

export interface DataType {
  _id: string;
  key: string;
  name: string;
  image: string;
  description: string;
  quantity: number;
  price: number;
  brand: string;
  origin: string;
  expireDate: string | number | Date | Dayjs | null | undefined;
}

const ProductList: React.FC = () => {
  const { products, isFetching, totalCount } = useProductService("", "", "");

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      width: "15%",
      className: "first-column",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      width: "10%",
      render: (image) => (
        <img
          src={image}
          alt="Avatar"
          className="h-[100px] w-[100px] rounded-[100%] object-cover"
        />
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      width: "35%",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      width: "9%",
    },
    {
      title: "Thương hiệu",
      dataIndex: "brand",
      width: "5%",
      render: (brand) => brand?.brandName || "N/A",
    },
    {
      title: "Xuất xứ",
      dataIndex: "brand",
      width: "10%",
      render: (brand) => brand?.origin || "N/A",
    },
    {
      title: "Giá",
      dataIndex: "price",
      width: "7%",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: "7%",
      render: (status) => {
        let color;
        switch (status) {
          case "AVAILABLE":
            color = "green";
            break;
          case "EXPIRE":
            color = "red";
            break;
        }
        return (
          <Tag color={color} key={status}>
            {status}
          </Tag>
        );
      },
    },

    {
      title: "",
      dataIndex: "",
      render: (_, record) => (
        <>
          <DropdownFunction productInfo={record} />
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
            <Button type="primary" onClick={() => setIsOpen(true)}>
              <div className="flex justify-center">
                <AppstoreAddOutlined className="mr-1 text-lg" /> Thêm sản phẩm
              </div>
            </Button>
          </div>
        </div>
      </div>
      <Table
        className="pagination"
        id="myTable"
        columns={columns}
        dataSource={products?.map((record: { id: unknown }) => ({
          ...record,
          key: record.id,
        }))}
        pagination={{
          current: currentPage,
          total: totalCount || 0,
          pageSize: 5,
        }}
        onChange={handleTableChange}
        loading={isFetching}
        rowKey={(record) => record._id}
      />
      <AddProductModal setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  );
};

export default ProductList;
