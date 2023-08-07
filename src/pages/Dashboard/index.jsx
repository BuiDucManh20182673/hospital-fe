import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./index.scss";
import { Avatar, Button, Dropdown, Layout, Menu, Row, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { DatabaseOutlined, FileOutlined, BankOutlined, OrderedListOutlined } from "@ant-design/icons";
import useUserInformation from "../../hooks/useUserInformation";

function DashBoard({ items }) {
  const navigate = useNavigate();
  // useEffect(() => {
  //   let isAuthen = isAllow();
  //   if (!isAuthen) {
  //     navigate("/login");
  //   }
  // }, []);
  const { userInformation } = useUserInformation();
  console.log(userInformation);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("account");
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    navigate("/login");
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile">My Profile</Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="dashboard">
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="dashboard__logo">
            <Link to={"/"}>
              <img src="https://bookingcare.vn/assets/icon/bookingcare-2020.svg" alt="" />{" "}
            </Link>
          </div>

          <Menu theme="dark" selectedKeys={location.pathname.slice(1)} mode="inline" items={items} />
        </Sider>
        <Layout className="dashboard-layout">
          <Header
            style={{
              padding: "0 100px",
              background: colorBgContainer,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Dropdown overlay={menu} trigger={["hover"]}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Avatar
                  style={{
                    backgroundColor: "#fde3cf",
                    color: "#f56a00",
                    marginRight: 8,
                  }}
                >
                  {userInformation?.fullName.charAt(0).toUpperCase()}
                </Avatar>
                <span>{userInformation?.fullName}</span>
              </div>
            </Dropdown>
          </Header>
          <Content className="main-content" style={{ padding: "10px 16px", width: "100%", overflow: "auto" }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default DashBoard;
