import React, { useEffect, useState } from "react";
import PageTemplate from "../../../template/page-template";
import ManageTemplate from "../../../template/manage-template";
import myAxios from "../../../config/config";
import ButtonGroup from "antd/es/button/button-group";
import { Button, Card, Form, Input, Modal, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import Title from "antd/es/typography/Title";

function Service() {
  const [api, context] = notification.useNotification();
  const [render, setRender] = useState(0);
  const [services, setServices] = useState([]);
  const [service, setSetvice] = useState();
  const [modal, contextHolder] = Modal.useModal();
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [form] = useForm();

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
      width: 800,
    },
    {
      title: "Action",
      key: "description",
      align: "center",
      render: (_, record) => {
        return (
          <ButtonGroup>
            <Button
              type="primary"
              onClick={() => {
                form.setFieldsValue(record);
                setSetvice(record);
              }}
            >
              Cập nhật
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => {
                setSetvice(record);
                setShowConfirmButton(true);
              }}
            >
              Xóa
            </Button>
          </ButtonGroup>
        );
      },
    },
  ];

  useEffect(() => {
    const fetch = async () => {
      const response = await myAxios.get("/service");
      setServices(response.data.data);
    };

    fetch();
  }, [render]);

  const onFinish = async (values) => {
    try {
      const response = await myAxios.post("/service", { ...values, id: service?.id });
      setRender(render + 1);
      api.success({
        message: response.data.message,
      });
      setSetvice(null);
      form.resetFields();
    } catch (e) {
      console.log(e);
    }
  };

  console.log(service);

  return (
    <PageTemplate>
      {context}
      {contextHolder}

      <ManageTemplate
        searchText="Nhập tên dịch vụ"
        callbackAdd={() => {
          setSetvice({
            id: 0,
            name: "",
            description: "",
          });
        }}
        title="dịch vụ"
        columns={columns}
        dataSource={services}
      />
      <Modal
        onCancel={() => {
          setSetvice(null);
          form.resetFields();
        }}
        onOk={() => {
          form.submit();
        }}
        visible={service != null && !showConfirmButton}
      >
        <Card title={service?.id == 0 ? "Thêm dịch vụ" : "Cập nhật dịch vụ"}>
          <Form form={form} onFinish={onFinish} labelCol={{ span: 6 }} labelAlign="left">
            <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter a name." }]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please enter a description." }]}
            >
              <Input.TextArea />
            </Form.Item>
          </Form>
        </Card>
      </Modal>

      <Modal
        visible={showConfirmButton}
        onOk={async () => {
          const response = await myAxios.delete(`/service/${service?.id}`);
          setSetvice(null);
          setRender(render + 1);
          setShowConfirmButton(false);
          api.success({
            message: response.data.message,
          });
        }}
        onCancel={() => {
          setSetvice(null);
          setShowConfirmButton(false);
        }}
      >
        <Title style={{ fontSize: 20 }}>Bạn có muốn xóa dịch vụ này?</Title>
      </Modal>
    </PageTemplate>
  );
}

export default Service;
