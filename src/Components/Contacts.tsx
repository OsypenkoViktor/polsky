import React from "react";
import { Typography, Divider } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import { Contact } from "../Helpers/APITypes";
import logo from "../Images/Logo.png";
import viberIcon from "../Images/Icons/viber.svg";

const { Title, Text, Link } = Typography;

const Contacts = ({ contacts }: { contacts: Contact[] | null }) => {
  const phoneNumber = contacts?.find(
    (contact) => contact.type === "PhoneNumber"
  )?.value;
  const email = contacts?.find((contact) => contact.type === "Email")?.value;
  const facebook = contacts?.find(
    (contact) => contact.type === "Facebook"
  )?.value;

  return (
    <div id="contacts" style={{ backgroundColor: "black", marginTop: "100px" }}>
      <Divider>
        <b style={{ color: "white" }}>Skontaktuj się z nami</b>
      </Divider>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ minWidth: "300px", color: "white", paddingLeft: "20px" }}>
          <img
            src={logo}
            alt="logo"
            height={200}
            style={{
              backgroundColor: "rgba(255,255,255,0.5)",
              borderRadius: "30%",
            }}
          />
        </div>
        <div style={{ width: "400px", color: "white", paddingLeft: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link
              style={{ color: "white", fontSize: "30px", marginRight: "10px" }}
              href={`tel:${phoneNumber}`}
            >
              <PhoneOutlined style={{ color: "white", fontSize: "30px" }} />
            </Link>
            <Text style={{ color: "white" }}>{phoneNumber}</Text>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link
              style={{ color: "white", fontSize: "30px", marginRight: "10px" }}
              href={`mailto:${email}`}
            >
              <MailOutlined style={{ color: "white", fontSize: "30px" }} />
            </Link>
            <Text style={{ color: "white" }}>{email}</Text>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",

                width: "300px",
              }}
            >
              <Link
                style={{
                  color: "white",
                  fontSize: "30px",
                  marginRight: "10px",
                }}
                href={facebook}
              >
                <FacebookOutlined
                  style={{ color: "white", fontSize: "30px" }}
                />
              </Link>
              <Link
                style={{
                  color: "white",
                  fontSize: "30px",
                  display: "flex",
                  alignItems: "center",
                }}
                href={facebook}
              >
                <img
                  src={viberIcon}
                  alt="viberLink"
                  width={30}
                  style={{ color: "white" }}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
