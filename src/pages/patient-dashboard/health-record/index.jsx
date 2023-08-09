import React, { useEffect, useState } from "react";
import PageTemplate from "../../../template/page-template";
import { Table } from "antd";
import useUserInformation from "../../../hooks/useUserInformation";
import myAxios from "../../../config/config";
import { renderTag } from "../../../utils/label";

function HealthRecord() {
  const [healthRecord, setHealthRecord] = useState();
  const { userInformation } = useUserInformation();

  useEffect(() => {
    const fetch = async () => {
      const response = await myAxios.get(`/health-record/${userInformation.id}`);
      setHealthRecord(response.data.data);
    };

    userInformation && fetch();
  }, []);

  const columns = [
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      filters: [
        { text: "GOOD", value: "GOOD" },
        { text: "ALARM", value: "ALARM" },
        { text: "NORMAL", value: "NORMAL" },
      ],
      onFilter: (value, record) => record.level === value,
      render: (text) => {
        return renderTag(text);
      },
    },
    {
      title: "Service Name",
      dataIndex: ["service", "name"],
      key: "serviceName",
    },
  ];

  return (
    <PageTemplate>
      <Table columns={columns} dataSource={healthRecord} />
    </PageTemplate>
  );
}

export default HealthRecord;
