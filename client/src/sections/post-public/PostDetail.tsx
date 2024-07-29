import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { notification } from "antd";
import { HomeFilled, RightOutlined } from "@ant-design/icons";
import { Role } from "@/enums/enum";
import useCartStore from "@/hooks/useCartStore";
import { PostInfo, ProductInfo } from "@/interfaces/interface";
import useAuthService from "@/services/authService";
import usePostService from "@/services/postService";
import { PriceFormat } from "@/util/validate";

const PostDetail: React.FC = () => {
  const { postId } = useParams();
  const { getInfoPostDetail } = usePostService();
  const [post, setPost] = useState<PostInfo>();
  const addToCart = useCartStore((state) => state.addToCart);
  const { infoUser } = useAuthService();
  const navigate = useNavigate();

  useEffect(() => {
    if (postId) {
      const fetchData = async () => {
        try {
          const res = await getInfoPostDetail(postId);
          if (res) {
            setPost(res);
          } else {
            navigate("/error", { replace: true });
          }
        } catch (err) {
          console.error("Err fetching detail post", err);
          navigate("/error", { replace: true });
        }
      };
      fetchData();
    }
  }, [navigate, postId]);

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
    [addToCart, infoUser?.role],
  );

  return (
    <>
      <div className="min-h-screen bg-[#f5f5f5] px-10 pb-16 md:px-52">
        <div className=" pt-28">
          <Link to={"/"}>
            <HomeFilled className="text-xl text-[#08cde9]" />
          </Link>
          <RightOutlined className="mx-2 text-[#08cde9]" />
          <span className="font-bold">Chi tiết bài viết</span>
          <div className="mt-2 rounded-xl bg-[#fff] py-10">
            <p className="mx-44 text-center text-2xl font-bold">
              {post?.title}
            </p>
            <div className="mt-3 gap-16 rounded-xl px-10">
              <div className="my-10 flex justify-center">
                <img width={500} src={post?.image} />
              </div>
              <p className="my-10 text-justify">{post?.description}</p>
            </div>
            <div className="my-10 flex justify-center" data-aos="fade-down">
              <span className="border-b-2 border-[#739aaa] border-x-[#1385b7] text-center text-[25px] font-medium text-[#1385b7]">
                SẢN PHẨM LIÊN QUAN
              </span>
            </div>
            <div className="productList grid grid-cols-1 gap-10 transition-all duration-700 ease-in-out sm:grid-cols-3">
              <div className="product-item mx-10 cursor-pointer rounded-lg border-[0.5px] bg-white shadow-md transition-all duration-700 ease-in-out hover:shadow-lg">
                <div className="flex h-full flex-col items-center justify-center transition-all duration-700 ease-in-out">
                  <div className="group relative w-full overflow-hidden">
                    <img
                      src={post?.image}
                      alt={post?.title}
                      className="h-full w-full object-cover p-3 transition-all duration-300 ease-in-out group-hover:scale-110"
                    />
                    {(infoUser && infoUser?.role === Role.ADMIN) ||
                    infoUser?.role === Role.STAFF ? (
                      ""
                    ) : (
                      <button className="absolute bottom-0 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-50 opacity-0 transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:transform group-hover:opacity-100">
                        <p className="text-md mx-5 border-2 p-2 font-semibold text-[#fff] hover:bg-[#fff] hover:text-black xl:text-lg">
                          <button
                            onClick={() => {
                              if (post?.product) {
                                handleAddtoCart(post.product);
                              } else {
                                notification.warning({
                                  message: "Thêm giỏ hàng thất bại",
                                  description: "Sản phẩm không tồn tại",
                                  duration: 2,
                                });
                              }
                            }}
                          >
                            + Thêm vào giỏ hàng
                          </button>
                        </p>
                      </button>
                    )}
                  </div>
                  <Link to={`/product/${post?.product?._id}`}>
                    <div className="flex flex-col items-center p-4 text-center">
                      <h3 className="mb-2 text-lg font-semibold">
                        {post?.product?.name}
                      </h3>

                      <p className="mb-2 text-xl font-bold ">
                        <span className="text-red-500">
                          {PriceFormat.format(post?.product?.price ?? 0)}
                        </span>
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
