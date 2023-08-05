import React, { useEffect, useState } from "react";
import PageTemplate from "../../../template/page-template";
import myAxios from "../../../config/config";
import ManageTemplate from "../../../template/manage-template";
import { formatDate } from "../../../utils/date-time";
import { Button, Space, notification } from "antd";
import { renderTag } from "../../../utils/label";

function Order() {
  const [order, setOrder] = useState([]);
  const [api, context] = notification.useNotification();
  useEffect(() => {
    const fetch = async () => {
      const response = await myAxios.get("/order");
      setOrder(response.data.data);
    };

    fetch();
  }, []);

  const columns = [
    {
      title: "Test Date",
      dataIndex: "testDate",
      key: "testDate",
      align: "center",
      render: (testDate) => formatDate(testDate, "dd/MM/yyyy HH:mm"),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (createdAt) => formatDate(createdAt, "dd/MM/yyyy HH:mm"),
    },
    {
      title: "Patient Full Name",
      dataIndex: ["patient", "fullName"],
      align: "center",
      key: "patient.fullName",
    },
    {
      title: "Patient Phone",
      dataIndex: ["patient", "phone"],
      align: "center",
      key: "patient.phone",
    },
    {
      title: "Doctor Full Name",
      dataIndex: ["doctor", "fullName"],
      align: "center",
      key: "doctor.fullName",
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      key: "status",
      filters: [
        { text: "IN_PROCESS", value: "IN_PROCESS" },
        { text: "CONFIRM", value: "CONFIRM" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (value) => {
        return renderTag(value);
      },
    },
    {
      title: "Note",
      dataIndex: "note",
      align: "center",
      key: "note",
    },
    {
      title: "Action",
      align: "center",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {/* Here you can add action buttons based on the record data */}
          {record.status === "CONFIRM" && (
            <Button
              onClick={async () => {
                const response = await myAxios.patch(`/order/${record.id}/IN_PROCESS`);
                api.success({
                  message: response.data.message,
                });
                setOrder(
                  order.map((item) => {
                    if (item.id === response.data.data.id) {
                      item = response.data.data;
                    }

                    return item;
                  })
                );
              }}
              type="primary"
            >
              Duyệt
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <PageTemplate>
      {context}
      <ManageTemplate title="yêu cầu" columns={columns} dataSource={order} />
    </PageTemplate>
  );
}

export default Order;
