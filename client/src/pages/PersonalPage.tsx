import React from "react";
import { Helmet } from "react-helmet";
import { PersonalView } from "@/sections/personal/view";

const PersonalPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> FMilk | Thông tin cá nhân </title>
      </Helmet>
      <PersonalView />
    </>
  );
};

export default PersonalPage;
