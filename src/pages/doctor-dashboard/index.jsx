import React from "react";
import PageTemplate from "../../template/page-template";
import { getItem } from "../../utils/dashboard-utils";
import DashBoard from "../Dashboard";
import { ScheduleOutlined } from "@ant-design/icons";

function DoctorDashboard() {
  const items = [
    getItem("Thông tin", "doctor/profile", React.createElement(ScheduleOutlined)),
    getItem("Lịch khám", "doctor/schedule", React.createElement(ScheduleOutlined)),
  ];
  return <DashBoard items={items} />;
}

export default DoctorDashboard;
