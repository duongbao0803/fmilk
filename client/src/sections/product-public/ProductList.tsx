import useCartStore from "@/hooks/useCartStore";
import { BrandData, ProductInfo } from "@/interfaces/interface";
import useProductService from "@/services/productService";
import { PriceFormat } from "@/util/validate";
import { Input, notification, Select, Skeleton } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "@uidotdev/usehooks";
import LogoNotFound from "@/assets/images/logo/logo_not_found.png";
import useBrandService from "@/services/brandService";
import { Role } from "@/enums/enum";
import useAuthService from "@/services/authService";

const ProductList: React.FC = () => {
  const [productName, setProductName] = useState<string>("");
  const [origin, setOrigin] = useState<string>("");
  const addToCart = useCartStore((state) => state.addToCart);
  const { Option } = Select;
  const debouncedProductName = useDebounce(productName, 200);
  const { products, fetchProducts } = useProductService(
    debouncedProductName,
    origin,
    "",
  );
  const { brands } = useBrandService();
  const { infoUser } = useAuthService();

  const productList = products?.filter(
    (product: { quantity: number }) => product.quantity > 0,
  );

  const origins: string[] = brands?.map((brand: BrandData) => brand?.origin);
  const uniqueOrigin: string[] = [...new Set(origins)];

  const handleAddtoCart = useCallback(
    (product: ProductInfo) => {
      if (infoUser?.role === Role.ADMIN || infoUser?.role === Role.STAFF) {
        notification.warning({
          message: "Thêm giỏ hàng thất bại",
          description: "Bạn không có quyền mua hàng",
          duration: 2,
        });
        return;
      }
      addToCart(product);
      notification.success({
        message: "Thêm giỏ hàng thành công",
        description: (
          <span>
            Bạn đã thêm{" "}
            <strong className="text-[#1385b7]">{product?.name}</strong> vào giỏ
            hàng
          </span>
        ),
        duration: 2,
      });
    },
    [addToCart],
  );

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setProductName(e.target.value);
    },
    [setProductName],
  );

  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts, productName, origin]);

  return (
    <>
      <div className="h-[600px]">
        <div className="background4 relative top-[69.5px]">
          <div className="text-center">
            <h4 className="py-3 text-3xl font-semibold tracking-widest text-[#08cde9]">
              FMILK
            </h4>
            <h1 className="text-4xl font-bold text-white">
              DANH SÁCH SẢN PHẨM
            </h1>
          </div>
        </div>
      </div>
      <div className="mx-16 my-10 py-4 lg:mx-44">
        <div className="flex justify-between">
          <Input
            placeholder="Tìm kiếm..."
            className="h-8 max-w-lg rounded-lg sm:mb-5 sm:w-[300px]"
            onChange={handleSearch}
          />

          <Select
            placeholder="Lọc"
            optionFilterProp="children"
            onChange={(value: string) => setOrigin(value)}
            className="w-[130px]"
          >
            <Option value="">Chọn loại</Option>
            {uniqueOrigin?.map((origin: string, index: number) => (
              <Option key={index} value={origin}>{`${origin}`}</Option>
            ))}
          </Select>
        </div>
        <div>
          <div
            className="productList mb-10 grid grid-cols-1 gap-10 transition-all duration-700 ease-in-out sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            data-aos="fade-right"
          >
            {productList === undefined ? (
              Array.from({ length: 8 })?.map((_, index) => (
                <div
                  key={index}
                  className="rounded-lg border-[0.2px] border-[#e6e6e6] p-5"
                >
                  <Skeleton loading={true} active />
                </div>
              ))
            ) : productList?.length > 0 ? (
              productList?.map((product: ProductInfo, index: number) => (
                <div
                  key={product._id}
                  data-aos="fade-right"
                  data-aos-delay={`${index * 150}`}
                  className="product-item cursor-pointer rounded-lg border-[0.5px] bg-white shadow-md transition-all duration-700 ease-in-out hover:shadow-lg"
                >
                  <div className="flex h-full flex-col items-center justify-center transition-all duration-700 ease-in-out">
                    <div className="group relative w-full overflow-hidden">
                      <img
                        src={product?.image}
                        alt={product?.name}
                        className="h-full w-full object-cover p-3 transition-all duration-300 ease-in-out group-hover:scale-110"
                      />
                      {infoUser?.role === Role.ADMIN ||
                      infoUser?.role === Role.STAFF ? (
                        ""
                      ) : (
                        <button className="absolute bottom-0 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-50 opacity-0 transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:transform group-hover:opacity-100">
                          <p className="text-md mx-5 border-2 p-2 font-semibold text-[#fff] hover:bg-[#fff] hover:text-black xl:text-lg">
                            <button onClick={() => handleAddtoCart(product)}>
                              + Thêm vào giỏ hàng
                            </button>
                          </p>
                        </button>
                      )}
                    </div>
                    <Link to={`/product/${product?._id}`}>
                      <div className="flex flex-col items-center p-4 text-center">
                        <h3 className="mb-2 text-lg font-semibold">
                          {product?.name}
                        </h3>
                        <p className="mb-2">
                          <span className="font-bold">Xuất xứ:</span>{" "}
                          <span className="font-bold text-red-500">
                            {product?.brand?.origin}
                          </span>
                        </p>
                        <p className="mb-2 text-xl font-bold">
                          <span className="text-red-500">
                            {PriceFormat.format(product?.price ?? 0)}
                          </span>
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center text-center text-lg font-semibold text-gray-500">
                <img src={LogoNotFound} alt="not-found" className="h-52" />
                <span>Không tìm thấy sản phẩm</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
