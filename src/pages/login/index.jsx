import React from "react";
import "./index.scss";
import { Button, Form, Input, notification } from "antd";
import myAxios from "../../config/config";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await myAxios.post("/login", values);
      localStorage.setItem("account", JSON.stringify(response.data.data));

      if (response.data.data.accountType === "PATIENT") {
        navigate("/patient");
      }
      if (response.data.data.accountType === "DOCTOR") {
        navigate("/doctor");
      }
      if (response.data.data.accountType === "ADMIN") {
        navigate("/admin");
      }
    } catch (e) {
      api["error"]({
        message: e.response.data,
      });
    }
  };

  return (
    <div className="login">
      {contextHolder}
      <div className="login__form">
        <h2>Hospital</h2>

        <span>
          Don't have account yet? <Link to={"/register"}>Register</Link>
        </span>

        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            labelAlign="left"
            label="Phone or email"
            name="phone"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            labelAlign="left"
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
