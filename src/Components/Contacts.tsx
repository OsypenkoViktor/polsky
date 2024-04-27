import React from "react";
import { Typography, Divider } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import { Contact } from "../Helpers/APITypes";

const { Title, Text } = Typography;

const Contacts = ({ contacts }: { contacts: Contact[] | null }) => {
  const phoneNumber = contacts?.find(
    (contact) => contact.type === "PhoneNumber"
  );
  const email = contacts?.find((contact) => contact.type === "Email");
  const facebook = contacts?.find((contact) => contact.type === "Facebook");

  return (
    <div id="contacts">
      <Divider>
        <b>Контакти</b>
      </Divider>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
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
          <a href={"tel:" + phoneNumber?.value} style={{ color: "inherit" }}>
            {phoneNumber?.value}
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
            href={"mailto:" + email?.value + "?subject=Тема листа"}
            style={{ color: "inherit" }}
          >
            {email?.value}
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
          <a href={facebook?.value} style={{ color: "inherit" }}>
            Facebook
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
