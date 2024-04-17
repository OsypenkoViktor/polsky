import React from "react";
import { Typography, Card } from "antd";

const Pros = () => {
  return (
    <>
      <Typography.Title
        level={3}
        style={{
          textAlign: "center",
        }}
      >
        Плюси продукту
      </Typography.Title>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Card
          title="Безкоштовний замір"
          style={{ width: "300px", margin: "10px" }}
        >
          ...і короткий опис як це класно
        </Card>
        <Card
          title="Гарантія якості"
          style={{ width: "300px", alignSelf: "flex-end", margin: "10px" }}
        >
          ...і короткий опис як це класно
        </Card>
        <Card
          title="Швидкість установки"
          style={{ width: "300px", margin: "10px" }}
        >
          ...і короткий опис як це класно
        </Card>
      </div>
    </>
  );
};

export default Pros;
