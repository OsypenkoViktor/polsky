import React, { useState, useEffect } from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import { ApiResponse, Contact } from "../../Helpers/APITypes";
import axios from "axios";
import { URLs } from "../../Helpers/URLs";

type FieldType = {
  phone?: string;
  email?: string;
  facebook?: string;
  isCalculatorVisible?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
  const options = {
    method: "PATCH",
    url: URLs.patchSiteDataCPSidebar,
    headers: {
      "Content-Type": "application/json",
    },
    data: values,
    withCredentials: true,
  };
  axios(options)
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const CPSidebar = ({ siteData }: { siteData: ApiResponse | null }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    // Обновляем currentPhone при изменении siteData
    const currentPhone = siteData?.contacts.find(
      (contact) => contact.type === "PhoneNumber"
    ) as Contact | undefined;
    const currentEmail = siteData?.contacts.find(
      (contact) => contact.type === "Email"
    ) as Contact | undefined;
    const currentFacebook = siteData?.contacts.find(
      (contact) => contact.type === "Facebook"
    ) as Contact | undefined;
    const isCalculatorVisible = Boolean(
      siteData?.settings.find(
        (setting) => setting.name === "isCalculatorVisible"
      )?.value
    );
    form.setFieldsValue({
      phone: currentPhone?.value,
      email: currentEmail?.value,
      facebook: currentFacebook?.value,
      isCalculatorVisible: isCalculatorVisible,
    });
  }, [siteData]); // Зависимость от siteData

  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        width: "40vw",
        height: "100vh",
        borderRight: "1px white solid",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        textAlign: "center",
        padding: "10px",
      }}
    >
      <h2>Налаштування сайту:</h2>

      <div>
        <h3>Зміна контактних данних</h3>
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ display: "flex", flexDirection: "column", maxWidth: 600 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelWrap
          initialValues={{ remember: true }}
        >
          <Form.Item<FieldType>
            label="Телефон"
            name="phone"
            rules={[{ required: false, message: "Введіть номер телефону" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="E-mail"
            name="email"
            rules={[{ required: false, message: "Введіть електронну адресу" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Facebook"
            name="facebook"
            rules={[
              { required: false, message: "Введіть адресу сторінки фейсбук" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="калькулятор відображається на сайті"
            name={"isCalculatorVisible"}
            valuePropName="checked"
          >
            <Checkbox></Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Підтвердити зміну
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CPSidebar;
