import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  CarFilled,
  ClockCircleOutlined,
  EuroCircleFilled,
  HomeFilled,
  RightOutlined,
} from "@ant-design/icons";
import { Divider, Image, notification, Progress, Rate } from "antd";
import { Role } from "@/enums/enum";
import useCartStore from "@/hooks/useCartStore";
import { Comment, ProductInfo } from "@/interfaces/interface";
import useAuthService from "@/services/authService";
import useProductService from "@/services/productService";
import { convertToDDMMYYYY, PriceFormat } from "@/util/validate";
import CommentModal from "./CommentModal";
import LogoUser from "@/assets/images/logo/avatar_user.jpg";
import LogoNotFound from "@/assets/images/logo/logo_not_found.png";
import DropdownCommentFunc from "./DropdownCommentFunc";

const ProductDetail: React.FC = () => {
  const { productId } = useParams();
  const { getInfoProductDetail, productDetailData } = useProductService(
    "",
    "",
    productId ?? "",
  );

  const [product, setProduct] = useState<ProductInfo>();
  const [star, setStar] = useState<number>(5);
  const addToCart = useCartStore((state) => state.addToCart);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { infoUser } = useAuthService();
  const [totalRate, setTotalRate] = useState<number>(0);
  const navigate = useNavigate();

  const formattedPrice =
    product?.price !== undefined ? PriceFormat.format(product.price) : "";

  const ratings = [
    { value: 5, percent: 30, count: 1 },
    { value: 4, percent: 30, count: 1 },
    { value: 3, percent: 30, count: 1 },
    { value: 2, percent: 30, count: 1 },
    { value: 1, percent: 30, count: 1 },
  ];

  useEffect(() => {
    if (productId) {
      const fetchData = async () => {
        try {
          const res = await getInfoProductDetail(productId);
          if (res) {
            setProduct(res);
          } else {
            navigate("/error", { replace: true });
          }
        } catch (err) {
          console.error("Err fetching detail product", err);
          navigate("/error", { replace: true });
        }
      };
      fetchData();
    }
  }, [navigate, productId]);

  useEffect(() => {
    if (productDetailData?.comments) {
      const ratings = productDetailData.comments.map(
        (comment: { rating: number }) => comment.rating,
      );
      if (ratings.length > 0) {
        const totalRating = ratings.reduce(
          (acc: number, rating: number) => acc + rating,
          0,
        );
        const averageRating = totalRating / ratings.length;
        setTotalRate(averageRating);
      } else {
        setTotalRate(0);
      }
    }
  }, [productDetailData]);

  const handleAddtoCart = useCallback(
    (product: ProductInfo) => {
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

  return (
    <>
      <div className="min-h-screen bg-[#f5f5f5] px-10 pb-16 md:px-52">
        <div className="mb-5 pt-28">
          <Link to={"/"}>
            <HomeFilled className="text-xl text-[#08cde9]" />
          </Link>
          <RightOutlined className="mx-2 text-[#08cde9]" />
          <span className="font-bold">Chi tiết sản phẩm</span>
          <div className="mt-3 flex justify-center gap-16 rounded-xl bg-[#fff] py-5">
            <div>
              <Image width={500} src={product?.image} />
            </div>
            <div className="flex flex-col gap-5">
              <strong className="mb-0 text-[30px]">{product?.name}</strong>
              <div className="flex gap-2">
                <span className="border-b-2 border-[#08cde9] text-[#2db4c6]">
                  {totalRate.toFixed(1)}
                </span>
                <Rate allowHalf value={totalRate} disabled />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[18px] font-bold">Xuất xứ:</span>
                <span className="font-bold text-[#08cde9]">
                  {product?.brand?.origin}
                </span>
              </div>
              <div>
                <span className="text-4xl">{formattedPrice}</span>
              </div>
              {infoUser?.role === Role.ADMIN ||
              infoUser?.role === Role.STAFF ? (
                ""
              ) : (
                <button
                  onClick={() => product && handleAddtoCart(product)}
                  className="w-full border-2 bg-[#08cde9] py-3 font-bold text-[white] transition-all duration-500 ease-in-out hover:rounded-2xl hover:border-[#08cde9] hover:bg-[white] hover:tracking-widest hover:text-[#08cde9]"
                >
                  Thêm giỏ hàng
                </button>
              )}

              <div className="rounded-xl border-2 px-5 py-3">
                <p className="mb-2 font-bold">CHÍNH SÁCH BÁN HÀNG</p>
                <div>
                  <CarFilled className="mr-1 text-[#08cde9]" />
                  <span className="mr-1 text-sm font-bold text-[#08cde9]">
                    Miến phí ship
                  </span>
                  <span className="text-sm text-[#9a9898]">
                    (Cho đơn hàng trên 3.000.000 đ)
                  </span>
                </div>

                <div>
                  <EuroCircleFilled className="mr-1 text-[#08cde9]" />
                  <span className="mr-1 text-sm font-bold text-[#08cde9]">
                    Thanh toán
                  </span>
                  <span className="text-sm text-[#9a9898]">
                    (Banking/VNPAY/COD)
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 rounded-xl bg-[#fff] p-5">
            <p className="font-bold">Đặc điểm nổi bật</p>
            <p>{product?.description}</p>
          </div>
          <div className="mt-5 rounded-xl bg-[#fff] p-5">
            <p className="font-bold">
              Đánh giá & nhận xét {product?.name} - Chỉ có tại{" "}
              <span className="text-[#08cde9]">FMilk</span>
            </p>
            <div className="my-3 grid grid-cols-1 gap-10 px-2 py-3 md:grid-cols-3">
              <div className="relative col-span-1 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-2">
                  <p className="text-xl font-bold">4.0/5.0</p>
                  <Rate allowHalf value={star} disabled />
                  <p className="">
                    <span className="font-bold">1</span> đánh giá
                  </p>
                </div>
                <div className="absolute right-4 h-full w-[1px] bg-[#e8eaed]" />
              </div>
              <div className="col-span-2 ">
                <div className="">
                  {ratings.map((rating) => (
                    <div key={rating.value} className="mb-2 flex">
                      <span>
                        {rating.value}
                        <Rate
                          allowHalf
                          count={1}
                          value={1}
                          className="mx-1"
                          disabled
                        />
                      </span>
                      <Progress
                        percent={rating.percent}
                        size="small"
                        showInfo={false}
                        className="w-[75%]"
                      />
                      <span className="ml-2 text-sm">
                        {rating.count} đánh giá
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Divider />
            {infoUser?.role === Role.MEMBER && (
              <div className="flex flex-col items-center justify-center gap-3">
                <p>Bạn đánh giá sao về sản phẩm này ?</p>
                <button
                  className="border-2 bg-[#08cde9] px-[30px] py-[10px] font-bold text-[white] transition-all duration-500 ease-in-out hover:rounded-2xl hover:border-[#08cde9] hover:bg-[white] hover:tracking-wide hover:text-[#08cde9]"
                  onClick={() => setIsOpen(true)}
                >
                  Đánh giá ngay
                </button>
              </div>
            )}
            <Divider />
            {productDetailData ? (
              productDetailData.comments.length > 0 ? (
                productDetailData.comments.map(
                  (comment: Comment, index: number) => (
                    <div className="mb-7 grid grid-cols-12" key={index}>
                      <div className="col-span-1 h-[50px] w-[50px] rounded-full object-cover">
                        <img
                          className="rounded-full object-cover"
                          src={LogoUser}
                          alt="lỗi"
                        />
                      </div>
                      <div className="col-span-10 flex flex-col gap-3">
                        <div>
                          <span className="mr-1 text-lg font-bold">
                            {comment?.author?.name}
                          </span>{" "}
                          <span className="text-[13px] text-[#757575]">
                            <ClockCircleOutlined className="mr-1" />
                            {convertToDDMMYYYY(comment?.createdAt)}
                          </span>
                        </div>
                        <Rate
                          value={comment?.rating}
                          className="text-[16px]"
                          allowHalf
                          disabled
                        />
                        <p className="text-[15px]">{comment?.content}</p>
                      </div>
                      <div className="col-span-1 text-right">
                        {infoUser &&
                          infoUser?._id === comment?.author?._id &&
                          product && (
                            <DropdownCommentFunc
                              commentInfo={comment}
                              commentId={comment?._id}
                              product={product}
                            />
                          )}
                      </div>
                    </div>
                  ),
                )
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-10 text-center text-lg font-semibold text-gray-500">
                  <img src={LogoNotFound} alt="not-found" className="h-20" />
                  <span>Chưa có bình luận nào</span>
                </div>
              )
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-10 text-center text-lg font-semibold text-gray-500">
                <img src={LogoNotFound} alt="not-found" className="h-20" />
                <span>Chưa có bình luận nào</span>
              </div>
            )}
          </div>
          {product && (
            <CommentModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              product={product}
              star={star}
              setStar={setStar}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
