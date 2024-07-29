import React from "react";

const Intro: React.FC = () => {
  return (
    <>
      {/* Intro */}
      <div className="mx-16 my-10 grid grid-cols-1 lg:mx-44 lg:grid-cols-3 ">
        <div className="text-justify">
          <div className="relative mb-8" data-aos="fade-down">
            <h2 className="text-[25px] font-medium text-[#1385b7]">
              THÁNG TỚI CÓ GÌ MỚI?
            </h2>
            <div className="absolute bottom-[-10px] mb-1 h-[1px] w-12 bg-[#1385b7]"></div>
            <div className="absolute bottom-[-13px] left-6 h-[1px] w-12 bg-[#1385b7]"></div>
          </div>
          <div className="flex flex-col gap-y-5" data-aos="fade-right">
            <div>
              <p>Tháng Tới Có Gì Mới? Chuyên Mục Mới Toanh Trên Trang FMilk</p>
            </div>
            <div>
              <p>
                Với mong muốn đồng hành và tạo cảm hứng cho người tiêu dùng
                trong quá trình lựa chọn và sử dụng các sản phẩm sữa, giúp các
                hoạt động chăm sóc sức khỏe trở nên thú vị, gần gũi và hấp dẫn.
                Chính vì lý do đó, “Chuyên mục: Tháng tới có gì mới?” chính thức
                được ra đời trên trang web bán sữa của chúng tôi.
              </p>
            </div>
            <div>
              <p>Nội dung chính bao gồm:</p>
              <p>
                - Góc Khám Phá: Giới Thiệu Điều Thú Vị Xuất Hiện Trong Tháng
                Tới.
              </p>
              <p>- Góc Đồng Hành: Giới Thiệu Mẹo Hay Trong Sử Dụng Sữa.</p>
              <p>
                Bên cạnh đó còn nhiều bất ngờ đang chờ đón bạn trong các số
                tiếp.
              </p>
            </div>
            <p>
              <i>Mời quý khách hàng cùng đón đọc! Bản tin số 1 – Tháng 6. </i>
            </p>
            <div data-aos="fade-up">
              <button className="cssbuttons-io-button">
                Xem thêm
                <div className="icon">
                  <svg
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path
                      d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center" data-aos="flip-up">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/swd392-d2c4e.appspot.com/o/FMilk%2Flogo_fmilk.png?alt=media&token=2b0d6848-7bf9-459e-a28d-444dab95a287"
            alt=""
            className="object-cover"
          />
        </div>
        <div className="flex items-center text-justify">
          <div>
            <div className="relative mb-8" data-aos="fade-down">
              <h2 className="text-[25px] font-medium text-[#1385b7]">
                VÌ SAO NÊN CHỌN{" "}
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/swd392-d2c4e.appspot.com/o/FMilk%2Flogo_fmilk.png?alt=media&token=2b0d6848-7bf9-459e-a28d-444dab95a287"
                  alt=""
                  className="inline h-[70px] object-cover"
                />
              </h2>
              <div className="absolute bottom-[-10px] mb-1 h-[1px] w-12 bg-[#1385b7]"></div>
              <div className="absolute bottom-[-13px] left-6 h-[1px] w-12 bg-[#1385b7]"></div>
            </div>
            <div className="flex flex-col gap-y-5" data-aos="fade-left">
              <div>
                <p>
                  Thứ nhất: Chúng tôi cam kết cung cấp các sản phẩm sữa chất
                  lượng cao dành cho mẹ bầu và bé, giúp hỗ trợ sự phát triển
                  khỏe mạnh thông qua các phương pháp tiếp cận liên môn và thực
                  hành. Mục tiêu của chúng tôi là giúp mẹ bầu và bé sẵn sàng đối
                  mặt với thách thức của thế kỷ 21.
                </p>
              </div>
              <div>
                <p>
                  Thứ hai: Chúng tôi chú trọng phát triển năng lực giải quyết
                  vấn đề dinh dưỡng cho mẹ bầu và bé. Mỗi sản phẩm sữa kèm theo
                  thông tin chi tiết về thành phần và lợi ích sức khỏe, giúp đưa
                  ra các lựa chọn dinh dưỡng thông minh. Hãy cùng chúng tôi khám
                  phá hành trình dinh dưỡng sáng tạo và thông minh!
                </p>
              </div>
              <div data-aos="fade-up">
                <button className="cssbuttons-io-button">
                  Xem thêm
                  <div className="icon">
                    <svg
                      height="24"
                      width="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Intro;
