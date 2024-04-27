import React, { useEffect, useState } from "react";
import { Typography, Flex, Table, Collapse } from "antd";
import { CollapseProps } from "antd";
import PriceCalculator from "./Components/PriceCalculator";
import axios, { AxiosResponse } from "axios";
import { Prices } from "./Helpers/APITypes";
import { URLs } from "./Helpers/URLs";

const { Title } = Typography;

const options = {
  method: "GET",
  url: URLs.getPrices,
  headers: {
    "Content-Type": "application/json",
  },
};

const ceilingMaterialsTableColumns = [
  {
    title: "Тип потолка",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Опис",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Ціна",
    dataIndex: "price",
    key: "price",
  },
];

const servicesTableColumns = [
  {
    title: "Тип послуги",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Опис послуги",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Ціна",
    dataIndex: "price",
    key: "price",
  },
];

const PricesPage = () => {
  const [pricesData, setPricesData] = useState<Prices | null>(null);
  useEffect(() => {
    async function getPrices() {
      axios(options).then((response: AxiosResponse<Prices>) => {
        setPricesData(response.data);
      });
    }
    getPrices();
  }, []);
  console.log(pricesData);

  const ceilingMaterialsTableData = pricesData?.ceilingMaterials.map(
    (material, index) => ({
      key: `${index + 1}`,
      name: material.name,
      description: material.description,
      price: material.price,
    })
  );

  const servicesTableData = pricesData?.services.map((service, index) => ({
    key: `${index + 1}`,
    name: service.name,
    description: service.description,
    price: service.price,
  }));

  const priceCollapsItems: CollapseProps["items"] = [
    {
      key: "1",
      label: "Матеріали",
      children: (
        <Table
          dataSource={ceilingMaterialsTableData}
          columns={ceilingMaterialsTableColumns}
          pagination={false}
          style={{ width: "90%" }}
        />
      ),
    },
  ];

  const servicesCollapsItems: CollapseProps["items"] = [
    {
      key: "1",
      label: "Послуги",
      children: (
        <Table
          dataSource={servicesTableData}
          columns={servicesTableColumns}
          pagination={false}
          style={{ width: "90%" }}
        />
      ),
    },
  ];

  return (
    <Flex
      gap={"middle"}
      id="calculator"
      vertical
      justify="space-between"
      align="center"
    >
      <Title level={3}>Ціни</Title>

      <Collapse
        items={priceCollapsItems}
        style={{
          width: "100%",
        }}
      />
      <Collapse
        items={servicesCollapsItems}
        style={{
          width: "100%",
        }}
      />
      <Title level={2}>Калькулятор цін</Title>
      <PriceCalculator prices={pricesData} />
    </Flex>
  );
};

export default PricesPage;
