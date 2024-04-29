import React, { useEffect, useState } from "react";
import { ConfigProvider, notification } from "antd";
import MainHeader from "./Components/MainHeader";
import MainCard from "./Components/MainCard";
import SliderContainer from "./Components/SliderContainer";
import Contacts from "./Components/Contacts";
import Pros from "./Components/Pros";
import { ApiResponse } from "./Helpers/APITypes";
import axios, { AxiosError, AxiosResponse } from "axios";
import { URLs } from "./Helpers/URLs";
import NavBar from "./Components/NavBar";
import PricesPage from "./PricesPage";

//types

const options = {
  method: "GET",
  url: URLs.getInitialSiteData,
  headers: {
    "Content-Type": "application/json",
  },
};

function App() {
  const [api, contextHolder] = notification.useNotification();
  const [siteData, setSiteData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    async function getInitialData() {
      axios(options)
        .then((response: AxiosResponse<ApiResponse>) => {
          setSiteData(response.data);
        })
        .catch((error: AxiosError) => {
          api["error"]({
            message: "Помилка підключення до серверу",
            description: "Будь ласка, спробуйте зайти пізніше",
          });
        });
    }
    getInitialData();
  }, []);

  return (
    <>
      {contextHolder}
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Kanit-Regular",
            fontSize: 18,
          },
          
        }}
      >
        <div
          className="App"
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <NavBar />
          <MainHeader />
          <MainCard />
          <SliderContainer slidesImgList={siteData?.sliderImgList} />
          <Pros />
          <PricesPage />
          <Contacts contacts={siteData?.contacts || []} />
        </div>
      </ConfigProvider>
    </>
  );
}

export default App;
