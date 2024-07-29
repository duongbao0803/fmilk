import { ChartView } from "@/sections/chart/view";
import React from "react";
import { Helmet } from "react-helmet";

const ChartPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> FMilk | Thống kê </title>
      </Helmet>
      <ChartView />
    </>
  );
};

export default ChartPage;
