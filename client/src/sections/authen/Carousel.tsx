/* eslint-disable no-unused-vars */
import React from "react";
import { Carousel } from "antd";
import slide_1 from "@/assets/images/slides/FMilk_1.jpg";
import slide_2 from "@/assets/images/slides/FMilk_2.jpg";
import slide_3 from "@/assets/images/slides/FMilk_3.jpg";

const CarouselDemo: React.FC = () => (
  <Carousel autoplay className="m-5 box-border rounded-xl">
    <div>
      <img
        src={slide_1}
        alt=""
        className="h-[650px] w-full rounded-[10px] object-cover"
        width={1000}
        height={1000}
      />
    </div>
    <div>
      <img
        src={slide_2}
        alt=""
        className="h-[650px] w-full rounded-[10px] object-cover"
        width={1000}
        height={1000}
      />
    </div>
    <div>
      <img
        src={slide_3}
        alt=""
        className="h-[650px] w-full rounded-[10px] object-cover"
        width={1000}
        height={1000}
      />
    </div>
  </Carousel>
);

export default CarouselDemo;
