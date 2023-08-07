import React, { useEffect } from "react";
import PageTemplate from "../../template/page-template";
import { getItem } from "../../utils/dashboard-utils";
import DashBoard from "../Dashboard";
import { ScheduleOutlined } from "@ant-design/icons";
import useUserInformation from "../../hooks/useUserInformation";
import { useNavigate } from "react-router-dom";

function DoctorDashboard() {
  const user = useUserInformation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.userInformation?.accountType === "DOCTOR") {
    } else {
      navigate("/login");
    }
  }, [user]);
  const items = [
    getItem("Thông tin", "doctor/profile", React.createElement(ScheduleOutlined)),
    getItem("Lịch khám", "doctor/schedule", React.createElement(ScheduleOutlined)),
  ];
  return <DashBoard items={items} />;
}

export default DoctorDashboard;
