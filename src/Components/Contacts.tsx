import React from "react";
import { Typography, Divider } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
const { Title, Text } = Typography;

const Contacts = () => {
  return (
    <>
      <Divider>Контакти</Divider>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "center",
          marginBottom: "50px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PhoneOutlined style={{ fontSize: 30, margin: "10px" }} />
          <a href="tel:000 000 000" style={{ color: "inherit" }}>
            000 000 000
          </a>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MailOutlined style={{ fontSize: 30, margin: "10px" }} />
          <a
            href="mailto:example@example.com?subject=Тема листа"
            style={{ color: "inherit" }}
          >
            example@example.com
          </a>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FacebookOutlined style={{ fontSize: 30, margin: "10px" }} />
          <a href="https://www.facebook.com" style={{ color: "inherit" }}>
            Facebook
          </a>
        </div>
      </div>
    </>
  );
};

export default Contacts;
