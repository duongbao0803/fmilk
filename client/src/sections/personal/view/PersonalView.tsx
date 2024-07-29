import React from "react";
import PersonalInfo from "../PersonalInfo";

const PersonalView: React.FC = () => {
  return (
    <div className="min-h-[400px] w-full">
      <p className="my-[10px] font-bold">Thông tin</p>
      <div className="rounded-lg bg-[white] p-5">
        <PersonalInfo />
      </div>
    </div>
  );
};

export default PersonalView;
