import React from "react";
import ChangePasswordUserForm from "../ChangePasswordForm";

const ChangePasswordView: React.FC = () => {
  return (
    <div className="min-h-[400px] w-full">
      <p className="my-[10px] font-bold">Thay đổi mật khẩu</p>
      <div className="rounded-lg bg-[white] p-5">
        <ChangePasswordUserForm />
      </div>
    </div>
  );
};

export default ChangePasswordView;
