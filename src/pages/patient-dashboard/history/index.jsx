import React, { useEffect, useState } from "react";
import PageTemplate from "../../../template/page-template";
import useUserInformation from "../../../hooks/useUserInformation";
import myAxios from "../../../config/config";
import Title from "antd/es/skeleton/Title";
import { Card, Collapse, Descriptions, Tag } from "antd";
import { formatDate } from "../../../utils/date-time";
import "./index.scss";
import { renderTag } from "../../../utils/label";
import OrderDetail from "../../doctor-dashboard/order-detail";
function History() {
  const { userInformation } = useUserInformation();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await myAxios.get(`/order/${userInformation?.id}`);
      setOrders(response.data.data);
    };
    userInformation && fetch();
  }, []);

  return (
    <PageTemplate>
      <Title>Lịch sử đặt lịch</Title>
      {orders.map((item) => {
        return (
          <Collapse
            size="large"
            items={[
              {
                key: "1",
                label: (
                  <div>
                    {formatDate(item.testDate, "dd/MM/yyyy HH:mm")}
                    {renderTag(item.status)}
                  </div>
                ),
                children: <OrderDetail orderId={item.id} disable />,
              },
            ]}
          />
        );
      })}
    </PageTemplate>
  );
}

export default History;
