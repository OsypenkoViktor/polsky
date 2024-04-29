import React, { useEffect, useState } from "react";
import { Typography, Flex, Table, Collapse, Divider, notification } from "antd";
import { CollapseProps } from "antd";
import PriceCalculator from "./Components/PriceCalculator";
import axios, { AxiosResponse } from "axios";
import { Prices } from "./Helpers/APITypes";
import { URLs } from "./Helpers/URLs";
import "./index.css";

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
    title: "Materiał",
    dataIndex: "name",
    key: "name",
    width: 150,
  },
  {
    title: "Opis",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Cena",
    dataIndex: "price",
    key: "price",
    width: 100,
  },
];

const servicesTableColumns = [
  {
    title: "Praca",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Opis",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Cena,zl",
    dataIndex: "price",
    key: "price",
  },
];

const PricesPage = () => {
  const [api, contextHolder] = notification.useNotification();
  const [pricesData, setPricesData] = useState<Prices | null>(null);
  useEffect(() => {
    async function getPrices() {
      axios(options)
        .then((response: AxiosResponse<Prices>) => {
          setPricesData(response.data);
        })
        .catch((error) => {
          api["error"]({
            message: "Nie udało się załadować ceny",
            description: "Spróbuj ponownie później",
          });
        });
    }
    getPrices();
  }, []);
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
      label: "Ceny materiałów",
      children: (
        <Table
          dataSource={ceilingMaterialsTableData}
          columns={ceilingMaterialsTableColumns}
          pagination={false}
          size="small"
          scroll={{ x: 600 }}
        />
      ),
    },
  ];

  const servicesCollapsItems: CollapseProps["items"] = [
    {
      key: "1",
      label: "Ceny za usługi",
      children: (
        <Table
          dataSource={servicesTableData}
          columns={servicesTableColumns}
          pagination={false}
          size="small"
          scroll={{ x: 600 }}
        />
      ),
    },
  ];

  return (
    <>
      {contextHolder}

      <Flex
        id="calculator"
        vertical
        justify="space-between"
        align="center"
        style={{
          marginTop: "70px",
        }}
      >
        <Divider />
        <Title style={{ fontFamily: "Lilita One" }} level={3}>
          Ceny
        </Title>
        <Divider />
        <Collapse items={priceCollapsItems} style={{ width: "100%" }} />
        <Collapse items={servicesCollapsItems} style={{ width: "100%" }} />

        <Title
          level={4}
          style={{ marginTop: "50px", fontFamily: "Lilita One" }}
        >
          Kalkulator kosztów
        </Title>
        <PriceCalculator prices={pricesData} />
      </Flex>
    </>
  );
};

export default PricesPage;
