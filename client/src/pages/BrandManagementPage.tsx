import { Helmet } from "react-helmet";
import { BrandManagementView } from "../sections/brand/view";

const BrandManagementPage = () => {
  return (
    <>
      <Helmet>
        <title> FMilk | Quản lý thương hiệu </title>
      </Helmet>
      <BrandManagementView />
    </>
  );
};

export default BrandManagementPage;
