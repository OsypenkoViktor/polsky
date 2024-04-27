import React from "react";
import { Typography, Card } from "antd";

const Pros = () => {
  return (
    <div id="pros">
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
          style={{ width: "80vw", margin: "10px" }}
        >
          ...і короткий опис як це класно
        </Card>
        <Card
          title="Гарантія якості"
          style={{ width: "80vw", alignSelf: "flex-end", margin: "10px" }}
        >
          ...і короткий опис як це класно
        </Card>
        <Card
          title="Швидкість установки"
          style={{ width: "80vw", margin: "10px" }}
        >
          ...і короткий опис як це класно
        </Card>
      </div>
    </div>
  );
};

export default Pros;
