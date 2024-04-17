import React, { useEffect, useState } from "react";
import { Flex, Typography } from "antd";
import logo from "../Images/logo.jpg";

const { Text, Title } = Typography;

const MainHeader: React.FC = () => {
  const [height, setHeight] = useState(
    window.innerWidth < 600 ? "50vh" : "70vh"
  );
  const [iconSize, setIconSize] = useState(
    window.innerWidth < 600 ? "150" : "300"
  );

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerWidth < 600 ? "50vh" : "60vh");
      setIconSize(window.innerWidth < 600 ? "150" : "300");
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
      style={{ height: height, textAlign: "center" }}
    >
      <img src={logo} alt="logo" height={iconSize} width={iconSize}></img>
      <Title level={2}>Заголовок</Title>
      <Text type="secondary">
        Тут можна розмістити слоган або якесь основне "послання" відвідувачам
        сторінки
      </Text>
    </Flex>
  );
};

export default MainHeader;
