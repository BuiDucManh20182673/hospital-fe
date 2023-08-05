import { Button, Row, Table } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";

function ManageTemplate(props) {
  const { title, callbackAdd, columns, dataSource } = props;

  return (
    <div className="manage-template">
      <Title>Quản lý {title}</Title>
      <Row style={{ justifyContent: "flex-end", marginBottom: 20 }}>
        <Button onClick={callbackAdd} type="primary">
          Thêm {title}
        </Button>
      </Row>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
}

export default ManageTemplate;
