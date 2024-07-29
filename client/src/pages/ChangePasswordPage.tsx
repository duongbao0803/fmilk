import { ChangePasswordView } from "@/sections/change-password/view";
import React from "react";
import { Helmet } from "react-helmet";

const ChangePasswordPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> FMilk | Đổi mật khẩu </title>
      </Helmet>
      <ChangePasswordView />
    </>
  );
};

export default ChangePasswordPage;
