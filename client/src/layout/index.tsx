import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FloatButton, Layout, Menu, notification } from "antd";
import {
  PieChartOutlined,
  UserOutlined,
  FileOutlined,
  ProductOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";
import { LayoutProps, MenuItem, UserInfo } from "@/interfaces/interface";
import useAuth from "@/hooks/useAuth";
import { Role } from "@/enums/enum";
import avatarAdmin from "@/assets/images/logo/avatar_admin.jpg";
import avatarStaff from "@/assets/images/logo/avatar_staff.jpg";
import useAuthService from "@/services/authService";
import Logo from "@/assets/images/logo/logo_fmilk_web.png";
import LogoFull from "@/assets/images/logo/logo_fmilk_preview_rev_1.png";
import useCartStore from "@/hooks/useCartStore";

const { Content, Sider, Footer } = Layout;

function getItem(
  label: React.ReactNode,
  key: React.ReactNode,
  icon?: React.ReactNode,
  children?: MenuItem[],
  path?: string,
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    path,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Thống kê", "1", <PieChartOutlined />, undefined, "/chart"),
  getItem("Người dùng", "2", <UserOutlined />, undefined, "/user"),
  getItem("Sản phẩm", "3", <ProductOutlined />, undefined, "/manageProduct"),
  getItem("Bài viết", "4", <FileOutlined />, undefined, "/managePost"),
  getItem("Thương hiệu", "5", <QrcodeOutlined />, undefined, "/brand"),
];

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  const { infoUser } = useAuthService();
  const logout = useAuth((state) => state.logout);
  const clearCart = useCartStore((state) => state.clearCart);

  const navigate = useNavigate();
  const { username, role } = infoUser as UserInfo;
  const [collapsed, setCollapsed] = useState<boolean>(true);

  const storeDefaultSelectedKeys = (key: string) => {
    sessionStorage.setItem("keys", key);
  };

  const resetDefaultSelectedKeys = () => {
    const selectedKeys = sessionStorage.getItem("keys");
    return selectedKeys ? selectedKeys.split(",") : ["1"];
  };

  const defaultSelectedKeys = useMemo(() => resetDefaultSelectedKeys(), []);

  const renderMenuItems = (items: MenuItem[]) => {
    return items.map((item) => {
      if (
        item &&
        "children" in item &&
        item.children &&
        item.children.length > 0
      ) {
        return (
          <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
            {renderMenuItems(item.children)}
          </Menu.SubMenu>
        );
      } else {
        return (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            onClick={() => storeDefaultSelectedKeys(item.key)}
          >
            {item.path ? <Link to={item.path}>{item.label}</Link> : item.label}
          </Menu.Item>
        );
      }
    });
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
    <Layout className="min-h-screen">
      <Sider
        width={230}
        breakpoint="lg"
        collapsedWidth="55"
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className={`scrollbar sider bottom-0 left-0 top-0 z-[1000] box-border min-h-screen flex-none overflow-auto overflow-y-auto ${collapsed ? "collapsed" : ""}`}
        theme="light"
        collapsible
        defaultCollapsed={false}
      >
        <div className="demo-logo-vertical" />
        <div className=" flex justify-center">
          <Link to="/">
            <img
              className={`my-5 select-none object-cover ${
                collapsed ? "max-h-[50px] w-[30px]" : "h-[50px] w-[150px]"
              }`}
              src={collapsed ? Logo : LogoFull}
              alt="Logo"
            />
          </Link>
        </div>
        <Menu
          theme="light"
          defaultSelectedKeys={defaultSelectedKeys}
          mode="inline"
          className="select-none"
        >
          {renderMenuItems(items)}
        </Menu>
      </Sider>
      <Layout
        className="right-bar ease overflow-y-auto transition-all duration-[150ms] ease-in-out"
        style={{ marginLeft: collapsed ? 55 : 230 }}
      >
        <div className="header fixed z-[999] flex h-16 items-center justify-end gap-2 bg-[#f8f8f8] bg-opacity-80 pr-4 shadow-none backdrop-blur-[6px]">
          <>
            {role === Role.ADMIN ? (
              <img
                className="h-[42px] w-[42px] rounded-full border object-cover ring-2 ring-gray-300 hover:ring-[#0077ff]"
                src={avatarAdmin}
              />
            ) : (
              <img
                className="h-[42px] w-[42px] rounded-full border object-cover ring-2 ring-gray-300 hover:ring-[#0077ff]"
                src={avatarStaff}
              />
            )}
          </>
          <div className="flex flex-col">
            <strong>{username || "name"}</strong>
            <div
              className="cursor-pointer font-semibold text-[#5099ff] hover:underline"
              onClick={handleLogout}
            >
              Đăng xuất
            </div>
          </div>
        </div>
        <Content className="mx-4 mt-[80px] ">
          <div className="min-w-[250px] rounded-xl bg-[#fff]">{children}</div>
        </Content>
        <Footer className="text-center">
          Copyright @2024 Baobatluc. All right reserved
        </Footer>
        <FloatButton.BackTop />
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
