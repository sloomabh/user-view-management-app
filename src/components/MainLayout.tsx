import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { AiOutlineDashboard, AiOutlineUser } from "react-icons/ai";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaClipboardList } from "react-icons/fa";
import { Layout, Menu, Button, theme } from "antd";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHook";
import { signOutUser } from "../store/slicers/user";

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loggedUser = useAppSelector((state) => state.users.LoggedUser);
  const userRoles = useAppSelector((state) => state.userRoles.data);
  const roles = useAppSelector((state) => state.roles.data);

  const handleLogout = () => {
    dispatch(signOutUser());
  };

  const isAdmin =
    loggedUser &&
    userRoles.some(
      (ur) =>
        ur.userId === loggedUser.id &&
        roles!.find((role) => role.id === ur.roleId)?.name === "Admin"
    );

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className=" bg-hibot  px-2 py-4  text-2xl font-bold">
          <h2 className="text-white text-2xl text-center py-3 mb-0">
            <span className="sm-logo">HB</span>
            <span className="lg-logo">Hi Bot</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
              return;
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="text-lg" />,
              label: "Dashboard",
            },
            {
              key: "user-list",
              icon: <AiOutlineUser className="text-lg" />,
              label: "Users",
            },
            {
              key: "user",
              icon: <AiOutlineUser className="text-lg" />,
              label: "Add User",
            },

            {
              key: "role-list",
              icon: <FaClipboardList className="text-lg" />,
              label: "Roles",
            },
            {
              key: "role",
              icon: <FaClipboardList className="text-lg" />,
              label: "Add Role",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="flex justify-between px-1 py-1"
          style={{ padding: 0, background: colorBgContainer }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="flex justify-between items-center py-4 px-8 bg-gray-900 text-white">
            {loggedUser && (
              <div className="flex items-center font-bold ">
                {isAdmin && (
                  <p className="text-black text-2xl">Welcome Admin</p>
                )}
                <button
                  onClick={handleLogout}
                  className="ml-4 mt-4 bg-red-400 hover:bg-red-600 px-4 py-2 rounded-md "
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={900}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
