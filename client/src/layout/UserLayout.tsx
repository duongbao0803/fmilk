import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { notification } from "antd";
import { HomeFilled, RightOutlined } from "@ant-design/icons";
import useAuth from "@/hooks/useAuth";
import avatarUser from "@/assets/images/logo/avatar_user.jpg";
import useAuthService from "@/services/authService";
import useCartStore from "@/hooks/useCartStore";

interface UserLayoutProps {
  children: React.ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = React.memo(({ children }) => {
  const { logout } = useAuth();
  const clearCart = useCartStore((state) => state.clearCart);
  const { infoUser } = useAuthService();
  const [activeButton, setActiveButton] = useState<number>(1);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/personal":
        setActiveButton(1);
        break;
      case "/password":
        setActiveButton(2);
        break;
      case "/ordered":
        setActiveButton(3);
        break;
      default:
        setActiveButton(0);
    }
  }, [location.pathname]);

  const handleButtonClick = (buttonName: number) => {
    setActiveButton(buttonName);
  };

  const handleLogout = () => {
    notification.success({
      message: "Đăng xuất thành công",
      description: "Bạn đã đăng xuất khỏi hệ thống thành công",
      duration: 2,
    });
    logout();
    clearCart();
    navigate("/");
  };

  return (
    <>
      <div className="min-h-screen bg-[#f2f6fa] pt-32">
        <div className="mx-16 lg:mx-44">
          <div className="mb-10">
            <Link to={"/"}>
              <HomeFilled className="text-xl text-[#08cde9]" />
            </Link>
            <RightOutlined className="mx-2 text-[#08cde9]" />
            <span className="font-bold">Thông tin người dùng</span>
          </div>
          <div className="grid grid-cols-6 gap-10">
            <div className="col-span-2">
              <div className="flex items-center gap-4">
                <img src={avatarUser} alt="avatar" className="size-10" />
                <span className="font-bold">{infoUser?.name}</span>
              </div>
              <div className="my-3 h-0.5 w-full bg-[#eeeeee]" />
              <Link to="/personal">
                <button
                  className={`w-full rounded-lg px-3 py-3 text-left transition-all duration-300 ease-in-out ${
                    activeButton === 1
                      ? "bg-[#08cde9] text-white"
                      : "hover:bg-[#08cde9] hover:text-[white]"
                  }`}
                  onClick={() => handleButtonClick(1)}
                >
                  Thông tin cá nhân
                </button>
              </Link>
              <Link to="/password">
                <button
                  className={`w-full rounded-lg px-3 py-3 text-left transition-all duration-300 ease-in-out ${
                    activeButton === 2
                      ? "bg-[#08cde9] text-white"
                      : "hover:bg-[#08cde9] hover:text-[white]"
                  }`}
                  onClick={() => handleButtonClick(2)}
                >
                  Đổi mật khẩu
                </button>
              </Link>
              <Link to="/ordered">
                <button
                  className={`w-full rounded-lg px-3 py-3 text-left transition-all duration-300 ease-in-out ${
                    activeButton === 3
                      ? "bg-[#08cde9] text-white"
                      : "hover:bg-[#08cde9] hover:text-[white]"
                  }`}
                  onClick={() => handleButtonClick(3)}
                >
                  Đơn hàng của tôi
                </button>
              </Link>

              <div className="">
                <button
                  className={`w-full rounded-lg px-3 py-3 text-left transition-all duration-300 ease-in-out ${
                    activeButton === 4
                      ? "bg-[#08cde9] text-white"
                      : "hover:bg-[#08cde9] hover:text-[white]"
                  }`}
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Đăng xuất
                </button>
              </div>
            </div>

            <div className="col-span-4 items-center">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
});

export default UserLayout;
