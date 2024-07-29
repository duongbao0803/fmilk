import React from "react";
import { Helmet } from "react-helmet";
import { ProductPublicView } from "@/sections/product-public/view";

const ProductPublicPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> FMilk | Sản phẩm </title>
      </Helmet>
      <ProductPublicView />
    </>
  );
};

export default ProductPublicPage;
