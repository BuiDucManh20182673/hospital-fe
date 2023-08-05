import React, { useState } from "react";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, DatePicker, Form, Input, Row, Select, notification } from "antd";
import myAxios from "../../config/config";
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, HomeOutlined } from "@ant-design/icons";
import { auth } from "../../config/firebase";
import OtpInput from "react-otp-input";

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useForm } from "antd/es/form/Form";
export default function Register() {
  const { Option } = Select;
  const [api, contextHolder] = notification.useNotification();
  const [confirmationResult, setConfirmationResult] = useState();
  const [appVerifier, setAppVerifier] = useState();
  const [code, setCode] = useState("");
  const [isCheckOTP, setIsCheckedOTP] = useState(false);
  const [isPhoneInputDisabled, setIsPhoneInputDisabled] = useState(false);
  
  const [form] = useForm();
  const sendOtp = () => {
    let verifier = appVerifier;
    if (!appVerifier) {
      verifier = new RecaptchaVerifier(auth, "sign-in-button", {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // onSignInSubmit();
        },
      });
      setAppVerifier(verifier);
    }
    try {
      signInWithPhoneNumber(auth, convertPhoneNumber(form.getFieldValue("phone")), verifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          setConfirmationResult(confirmationResult);
          console.log("success");
          setIsPhoneInputDisabled(true);

          // Swal.fire(
          //   "Good job!",
          //   "Sent OTP Success, Please enter code! ",
          //   "success"
          // );
          // ...
        })
        .catch((error) => {
          console.log(error);
          // Error; SMS not sent
          // ...
          // Swal.fire({
          //   icon: "error",
          //   title: "Oops...",
          //   text: "Something went wrong!",
          // });
        });
    } catch (error) {
      console.log(error);
      api.error({
        message: error.message,
      });
    }
  };

  const verify = () => {
    console.log(code);
    confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        setIsCheckedOTP(true);

        api.success({
          message: "Verified otp successfully",
        });
        // Swal.fire("Good job!", "Good OTP", "success");
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        api.error({
          message: "Bad OTP",
        });
        // Swal.fire({
        //   icon: "error",
        //   title: "Oops...",
        //   text: "Bad OTP",
        // });
      });
  };

  const onFinish = async (values) => {
    if (!isCheckOTP) {
      api["error"]({
        message: "Error",
        description: "Verification otp failed",
      });
      return;
    }
    try {
      values.accountType = "PATIENT";
      values.accountStatus = "ACTIVE";
      console.log(values);
      const response = await myAxios.post("/register", values);
      api["success"]({
        message: "Successfully",
        description: response.data.message,
      });
    } catch (e) {
      api["error"]({
        message: "Duplicate",
        description: e.response.data,
      });
    }
  };

  function convertPhoneNumber(number) {
    if (number.length === 10 && /^\d+$/.test(number)) {
      return "+84" + number.slice(1);
    }
    return number;
  }

  return (
    <div className="register">
      {contextHolder}
      <button id="sign-in-button"></button>
      <div className="register__form">
        <h2>Register</h2>
        <span>
          Already have an account? <Link to={"/login"}>Sign in</Link>
        </span>
        <Form form={form} name="registrationForm" onFinish={onFinish} scrollToFirstError autoComplete="off">
          {/* <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="avatarURL"
                rules={[
                  {
                    type: "url",
                    message: "Please enter a valid URL!",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Avatar URL" />
              </Form.Item>
            </Col>
          </Row> */}

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: "Please enter your full name!",
                  },
                ]}
              >
                <Input  prefix={<UserOutlined />} placeholder="Full Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "Please enter a valid email!",
                  },
                  {
                    required: true,
                    message: "Please enter your email!",
                  },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Email" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={confirmationResult ? 12 : 18}>
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number!",
                  },
                ]}
              >
                <Input disabled={isPhoneInputDisabled} prefix={<PhoneOutlined />} placeholder="Phone Number" />
              </Form.Item>
            </Col>
            {confirmationResult && !isCheckOTP && (
              <Col span={6}>
                <Form.Item
                  name="code"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number!",
                    },
                  ]}
                >
                  <Input
                    prefix={<PhoneOutlined />}
                    placeholder="OTP"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
            )}
            <Col span={6}>
              {!isCheckOTP &&
                (confirmationResult ? (
                  <Button style={{ width: "100%" }} onClick={verify}>
                    Check OTP
                  </Button>
                ) : (
                  <Button style={{ width: "100%" }} onClick={sendOtp}>
                    Send OTP
                  </Button>
                ))}
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your password!",
                  },
                ]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Password" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="gender"
                rules={[
                  {
                    required: true,
                    message: "Please select your gender!",
                  },
                ]}
              >
                <Select placeholder="Select your gender">
                  <Option value="MALE">Male</Option>
                  <Option value="FEMALE">Female</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="dateOfBirth"
                rules={[
                  {
                    required: true,
                    message: "Please select your date of birth!",
                  },
                ]}
              >
                <DatePicker placeholder="Date of Birth" style={{ width: "100%" }} format={"DD/MM/YYYY"} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            {/* Add additional fields here */}
            <Col span={24}>
              <Form.Item
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please enter your address!",
                  },
                ]}
              >
                <Input prefix={<HomeOutlined />} placeholder="Address" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
