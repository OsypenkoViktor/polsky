import React, { useEffect, useState } from "react";
import CPHeader from "./Components/ControlPanel/CPHeader";
import CPSidebar from "./Components/ControlPanel/CPSidebar";
import CPMainSection from "./Components/ControlPanel/CPMainSection";
import { ConfigProvider, notification } from "antd";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { ApiResponse } from "./Helpers/APITypes";
import { URLs } from "./Helpers/URLs";

const options = {
  method: "GET",
  url: URLs.getContrilPanelData,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

const ControlPanelPage = () => {
  const [cpdata, setCPData] = useState<ApiResponse | null>(null);
  const [api, contextHolder] = notification.useNotification();

  const navigate = useNavigate();
  useEffect(() => {
    async function getCPData() {
      axios(options)
        .then((response: AxiosResponse<ApiResponse>) => {
          setCPData(response.data);
        })
        .catch((error: AxiosError) => {
          if (error.response?.status === 401) {
            navigate("/AdminLogin");
          } else {
            api["error"]({
              message: "Помилка підключення до серверу",
              description: error.message,
            });
          }
        });
    }
    getCPData();
  }, []);
  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            /* here is your component tokens */
            labelColor: "white",
          },
        },
      }}
    >
      {contextHolder}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <CPHeader />
        <div
          style={{
            display: "flex",
            flex: 1,
          }}
        >
          <CPSidebar siteData={cpdata} />
          <CPMainSection />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default ControlPanelPage;
