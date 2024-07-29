import React, { useState } from "react";
import { Button, Input, Table } from "antd";
import type { TablePaginationConfig, TableProps } from "antd";
import { DiffOutlined, FilterOutlined } from "@ant-design/icons";
import DropdownPostFunction from "./DropdownPostFunction";
import ExportPost from "./ExportPost";
import AddPostModal from "./AddPostModal";
import usePostService from "@/services/postService";

export interface DataType {
  _id: string;
  key: string;
  title: string;
  image: string;
  description: string;
}

const PostList: React.FC = () => {
  const { posts, isFetching } = usePostService();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_, _record, index) => index + 1,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      width: "30%",
      className: "first-column",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      width: "20%",
      render: (image) => (
        <img
          src={image}
          alt="Post"
          className="h-[100px] w-[100px] rounded-[100%] object-cover"
        />
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      width: "50%",
    },
    {
      title: "",
      dataIndex: "",
      render: (_, record) => (
        <>
          <DropdownPostFunction postInfo={record} />
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
            <ExportPost />
          </div>
          <div>
            <Button type="primary" onClick={() => setIsOpen(true)}>
              <div className="flex justify-center">
                <DiffOutlined className="mr-1 text-lg" /> Thêm bài viết
              </div>
            </Button>
          </div>
        </div>
      </div>
      <Table
        className="pagination"
        id="myTable"
        columns={columns}
        dataSource={posts?.map((record: { id: string }) => ({
          ...record,
          key: record.id,
        }))}
        pagination={{
          current: currentPage,
          total: posts.totalPosts || 0,
          pageSize: 5,
        }}
        onChange={handleTableChange}
        loading={isFetching}
        rowKey={(record) => record._id}
      />
      <AddPostModal setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  );
};

export default PostList;
