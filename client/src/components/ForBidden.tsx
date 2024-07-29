import React from "react";
import { Button, Result } from "antd";

const ForBidden: React.FC = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Xin lỗi, bạn không có quyền trong trang này."
      extra={
        <Button type="primary" className="bg-[#1677ff]">
          Back home
        </Button>
      }
    />
  );
};

export default ForBidden;
