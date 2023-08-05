import React, { useState } from "react";
import { Form, Input, Button, message, Row, notification } from "antd";
import "./index.scss";
import { useForm } from "antd/es/form/Form";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../config/firebase";
const ForgetPassword = () => {
  const [api, contextHolder] = notification.useNotification();
  const [confirmationResult, setConfirmationResult] = useState();
  const [appVerifier, setAppVerifier] = useState();
  const [code, setCode] = useState("");
  const [isCheckOTP, setIsCheckedOTP] = useState(false);
  const [form] = useForm();
  const onFinish = (values) => {
    // Here you can handle the logic to send the forget password request
    // For this example, we'll just show a success message
    // message.success("Password reset link sent to your email!");
  };
  function convertPhoneNumber(number) {
    if (number.length === 10 && /^\d+$/.test(number)) {
      return "+84" + number.slice(1);
    }
    return number;
  }

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

  return (
    <div className="forget-password">
      <button id="sign-in-button"></button>
      <div className="wrapper">
        <h2>Forget Password</h2>
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              {
                required: true,
                message: "Please enter your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {confirmationResult && (
            <Form.Item
              name="otp"
              label="OTP"
              rules={[
                {
                  required: true,
                  message: "Please enter your email!",
                },
              ]}
            >
              <Input value={code} onChange={(e) => setCode(e.target.value)} />
            </Form.Item>
          )}

          <Form.Item>
            <Row style={{ justifyContent: "center" }}>
              {confirmationResult ? (
                <Button type="primary" htmlType="submit" onClick={verify}>
                  Check OTP
                </Button>
              ) : (
                <Button type="primary" htmlType="submit" onClick={sendOtp}>
                  Send OTP
                </Button>
              )}
            </Row>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPassword;
