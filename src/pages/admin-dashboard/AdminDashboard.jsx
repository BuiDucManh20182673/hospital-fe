import React from "react";
import { getItem } from "../../utils/dashboard-utils";
import DashBoard from "../Dashboard";
import { UserOutlined, HeartOutlined, FormOutlined, HistoryOutlined } from "@ant-design/icons";
function AdminDashboard() {
  const items = [
    getItem("User", "admin/user", React.createElement(UserOutlined)),
    getItem("Order", "admin/order", React.createElement(UserOutlined)),
    getItem("Dịch vụ", "admin/service", React.createElement(UserOutlined)),
    getItem("Thuốc", "admin/medicine", React.createElement(UserOutlined)),
  ];
  return <DashBoard items={items} />;
}

export default AdminDashboard;
