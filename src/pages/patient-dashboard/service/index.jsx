import React, { useEffect, useState } from "react";
import PageTemplate from "../../../template/page-template";
import { useForm } from "antd/es/form/Form";
import { Button, Checkbox, Col, DatePicker, Form, Row, Select, Tooltip, notification } from "antd";
import myAxios from "../../../config/config";
import TextArea from "antd/es/input/TextArea";
import useUserInformation from "../../../hooks/useUserInformation";
import moment from "moment";

function ServiceRegister() {
  const [form] = useForm();
  const [doctors, setDoctors] = useState([]);
  const [service, setService] = useState([]);
  const { userInformation } = useUserInformation();
  const { Option } = Select;
  const [api, context] = notification.useNotification();
  useEffect(() => {
    const fetch = async () => {
      const response = await myAxios.get("/doctor");
      const responseService = await myAxios.get("/service");
      setDoctors(response.data.data);
      setService(responseService.data.data);
    };

    fetch();
  }, []);

  const onFinish = async (values) => {
    values.patientId = userInformation.id;
    const response = await myAxios.post("/order", values);
    form.resetFields();
    api.success({
      message: response.data.message,
    });
  };

  const validateNotNull = (_, value) => {
    if (value === null || value === undefined || value === "") {
      return Promise.reject("This field is required.");
    }
    return Promise.resolve();
  };

  function disabledDate(current) {
    // If the date is before today, disable it
    return current && current < moment().startOf("day");
  }

  return (
    <PageTemplate>
      {context}
      <center>
        <h1 style={{ marginBottom: 20 }}>Đặt lịch khám</h1>
      </center>

      <Form form={form} onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="testDate" rules={[{ validator: validateNotNull }]}>
              <DatePicker
                disabledDate={disabledDate}
                showTime={{ format: "HH:mm" }}
                style={{ width: "100%" }}
                placeholder="Chọn ngày khám"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="doctorId" rules={[{ validator: validateNotNull }]}>
              <Select placeholder="Chọn bác sĩ">
                {doctors.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.fullName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Form.Item
            name="services"
            rules={[
              {
                required: true,
                message: "This field is required.",
              },
            ]}
          >
            <Checkbox.Group>
              {service.map((item) => (
                <Col key={item.id} span={6}>
                  <Tooltip title={item.description}>
                    <Checkbox value={item.id}>{item.name}</Checkbox>
                  </Tooltip>
                </Col>
              ))}
            </Checkbox.Group>
          </Form.Item>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="note">
              <TextArea placeholder="Ghi chú" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item wrapperCol={{ offset: 10, span: 20 }}>
          <Button type="primary" htmlType="submit">
            Đặt lịch
          </Button>
        </Form.Item>
      </Form>
    </PageTemplate>
  );
}

export default ServiceRegister;
