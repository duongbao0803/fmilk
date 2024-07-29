import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Avatar, CustomNav } from "@/components";
import logo from "@/assets/images/logo/logo_fmilk_web.png";
import useCartStore from "@/hooks/useCartStore";
import useStateStore from "@/hooks/useStateStore";
import useAuthService from "@/services/authService";
import { Role } from "@/enums/enum";

const Header: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const cartCount = useCartStore((state) => state.cart);
  const setCartState = useStateStore((state) => state.setCartState);
  const { infoUser } = useAuthService();
  const cartState = useStateStore((state) => state.cartState);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const [, setSelectedOption] = useState("home");

  const handleLinkClick = () => {
    setSelectedOption("home");
    navigate("/");
  };

  const handleSelectedCart = () => {
    setCartState(true);
    setSelectedOption("cart");
    navigate("/cart");
  };

  return (
    <>
      <nav className="fixed z-[999] w-full border-gray-200 bg-white shadow-lg">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <img
            src={logo}
            alt="logo"
            className="my-auto ml-5 h-fit w-[40px] cursor-pointer object-cover"
            onClick={handleLinkClick}
          />
          <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
            <div className="flex items-center justify-center gap-10">
              {infoUser?.role === Role.ADMIN ||
              infoUser?.role === Role.STAFF ? (
                ""
              ) : (
                <div onClick={handleSelectedCart}>
                  <Badge count={cartCount.length}>
                    <ShoppingCartOutlined
                      className={`cursor-pointer text-2xl  hover:text-[#08cde9] ${cartState ? "text-[#08cde9]" : "text-black"}`}
                    />
                  </Badge>
                </div>
              )}
              <div>
                <Avatar />
              </div>
            </div>

            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border-none bg-transparent p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 lg:hidden "
              aria-controls="navbar-cta"
              aria-expanded="false"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`${
              isMobileMenuOpen ? "" : "hidden"
            } w-full items-center justify-between md:order-2 lg:order-1 lg:flex lg:w-auto`}
            id="navbar-cta"
          >
            <CustomNav />
          </div>
        </div>
      </nav>
    </>
  );
});

export default Header;
