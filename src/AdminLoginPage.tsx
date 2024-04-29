import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, notification } from "antd";
import logo from "./Images/Logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { URLs } from "./Helpers/URLs";

type FieldType = {
  login?: string;
  password?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const options = {
      method: "POST",
      url: URLs.postAdminLogin,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        login: values.login,
        password: values.password,
      },
      withCredentials: true,
    };

    axios(options)
      .then((response) => {
        // Обработка успешного ответа
        console.log("Response data:", response);
        navigate("/ControlPanel");
      })
      .catch((error) => {
        // Обработка ошибки
        console.error("Error:", error);
        api["error"]({
          message: "Помилка входу!",
          description: error.message,
        });
      });
  };

  return (
    <>
      {contextHolder}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <img src={logo} alt="logo" width={"50%"} />
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Логін"
            name="login"
            rules={[{ required: true, message: "Введіть логін" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Пароль"
            name="password"
            rules={[{ required: true, message: "Введіть пароль" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Вхід
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AdminLoginPage;
