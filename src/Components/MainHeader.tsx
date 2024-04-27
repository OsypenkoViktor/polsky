import React, { useEffect, useState } from "react";
import { Flex, Typography } from "antd";
import logo from "../Images/Logo.png";
import NavBar from "./NavBar";

const { Text } = Typography;

const MainHeader: React.FC = () => {
  const [iconSize, setIconSize] = useState(
    window.innerWidth < 600 ? "400" : "600"
  );

  useEffect(() => {
    const handleResize = () => {
      setIconSize(window.innerWidth < 600 ? "400" : "600");
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Flex
      gap={"middle"}
      align="center"
      justify="center"
      vertical
      style={{ height: "100vh", textAlign: "center", minHeight: "700px" }}
    >
      <img
        src={logo}
        alt="logo"
        height={iconSize}
        width={iconSize}
        style={{ marginBottom: "10px" }}
      ></img>
      <Text type="secondary" style={{ paddingBottom: "100px" }}>
        Тут можна розмістити слоган або якесь основне "послання" відвідувачам
        сторінки
      </Text>
    </Flex>
  );
};

export default MainHeader;
