import React from "react";
import LogoNotFound from "@/assets/images/logo/logo_not_found.png";
import usePostService from "@/services/postService";
import { Skeleton } from "antd";
import { PostInfo } from "@/interfaces/interface";
import { Link } from "react-router-dom";

const PostPublicList: React.FC = () => {
  const { posts } = usePostService();
  return (
    <>
      <div className="h-[600px]">
        <div className="background4 relative top-[69.5px]">
          <div className="text-center">
            <h4 className="py-3 text-3xl font-semibold tracking-widest text-[#08cde9]">
              FMILK
            </h4>
            <h1 className="text-4xl font-bold text-white">
              DANH SÁCH BÀI VIẾT
            </h1>
          </div>
        </div>
      </div>
      <div className="mx-16 my-10 py-4 lg:mx-44">
        <div>
          <div
            className="productList mb-10 grid grid-cols-1 gap-10 transition-all duration-700 ease-in-out sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            data-aos="fade-right"
          >
            {posts === undefined ? (
              Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-lg border-[0.2px] border-[#e6e6e6] p-5"
                >
                  <Skeleton loading={true} active />
                </div>
              ))
            ) : posts.length > 0 ? (
              posts.map((post: PostInfo, index: number) => (
                <div
                  key={post?._id}
                  data-aos="fade-right"
                  data-aos-delay={`${index * 150}`}
                  className="product-item cursor-pointer rounded-lg border-[0.5px] bg-white shadow-md transition-all duration-700 ease-in-out hover:shadow-lg"
                >
                  <div className="flex h-full flex-col items-center justify-center transition-all duration-700 ease-in-out">
                    <div className="group relative w-full overflow-hidden">
                      <img
                        src={post?.image}
                        alt={post?.title}
                        className="h-full w-full object-cover p-3 transition-all duration-300 ease-in-out group-hover:scale-110"
                      />
                    </div>
                    <Link to={`/post/${post?._id}`}>
                      <div className="flex flex-col items-center p-4 text-center">
                        <h3 className="mb-2 text-lg font-semibold">
                          {post?.title}
                        </h3>
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

export default PostPublicList;
