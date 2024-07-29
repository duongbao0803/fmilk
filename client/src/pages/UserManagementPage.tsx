import React from "react";
import { UserManagementView } from "@/sections/user/view";
import { Helmet } from "react-helmet";

const UserManagementPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> FMilk | Quản lý người dùng </title>
      </Helmet>
      <UserManagementView />
    </>
  );
};

export default UserManagementPage;
