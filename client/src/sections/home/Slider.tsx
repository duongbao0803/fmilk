import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { Card, Skeleton } from "antd";
import usePostService from "@/services/postService";
import { PostInfo } from "@/interfaces/interface";
import { Link } from "react-router-dom";

const Slider: React.FC = () => {
  const { Meta } = Card;
  const { posts } = usePostService();

  return (
    <>
      <div className="flex justify-center" data-aos="fade-down">
        <span className="border-b-2 border-[#1385b7] border-x-[#1385b7] text-center text-[25px] font-medium text-[#1385b7]">
          BẢNG TIN
        </span>
      </div>
      <div data-aos="fade-right">
        <Swiper
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            900: {
              slidesPerView: 2,
            },
            1150: {
              slidesPerView: 3,
            },
            1200: {
              slidesPerView: 3,
            },
            1400: {
              slidesPerView: 4,
            },
            1500: {
              slidesPerView: 4,
            },
            1900: {
              slidesPerView: 5,
            },
            2400: {
              slidesPerView: 6,
            },
            3300: {
              slidesPerView: 7,
            },
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="mySwiper h-[500px]"
        >
          {posts.length > 0
            ? posts.map((post: PostInfo, index: number) => (
                <SwiperSlide key={index}>
                  <Link to={`/post/${post?._id}`}>
                    <Card
                      hoverable
                      className="w-[250px] border-2"
                      cover={<img alt={post?.title} src={post?.image} />}
                    >
                      <Meta
                        description={
                          <span className="text-sm font-semibold text-[black]">
                            {post?.title}
                          </span>
                        }
                      />
                    </Card>
                  </Link>
                </SwiperSlide>
              ))
            : Array.from({ length: 4 }).map((_, index) => (
                <SwiperSlide key={index}>
                  <div className="w-full rounded-lg border-[0.2px] border-[#e6e6e6] p-5">
                    <Skeleton loading={true} active />
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </>
  );
};

export default Slider;
