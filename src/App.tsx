import React from "react";
import { ConfigProvider } from "antd";
import MainHeader from "./Components/MainHeader";
import MainCard from "./Components/MainCard";
import SliderContainer from "./Components/SliderContainer";
import Contacts from "./Components/Contacts";
import Pros from "./Components/Pros";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Roboto",
          fontSize: 16,
        },
      }}
    >
      <div className="App" style={{ display: "flex", flexDirection: "column" }}>
        <MainHeader />
        <MainCard />
        <SliderContainer />
        <Pros />
        <Contacts />
      </div>
    </ConfigProvider>
  );
}

export default App;
