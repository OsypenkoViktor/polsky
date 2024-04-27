import React, { useState, ChangeEvent } from "react";
import { Button, Input, Select, Flex, Typography, Modal } from "antd";
import { Prices, Service } from "../Helpers/APITypes";

type FieldType = {};

type ServiceCardFieldHandler = (e: ChangeEvent<HTMLInputElement>) => void;

const { Text, Title } = Typography;

const ServiceCard = ({
  service,
  onChangeHandler,
}: {
  service: Service;
  onChangeHandler: ServiceCardFieldHandler;
}) => {
  return (
    <Flex vertical align="start" style={{ width: "80%" }}>
      <Title level={5} style={{ textAlign: "center" }}>
        {service.name}
      </Title>
      <p>{service.description}</p>
      <Input
        id={`${service.id}`}
        type="number"
        placeholder="кількість"
        min={0}
        style={{ width: "100px" }}
        onChange={onChangeHandler}
      />
    </Flex>
  );
};

const PriceCalculator = ({ prices }: { prices: Prices | null }) => {
  const [state, setState] = useState({
    roomWidth: 0,
    roomLenght: 0,
    material: "",
    services: {},
  });

  const showCalculationResult = ({
    totalCost,
    totalMaterialCost,
    totalServicesCost,
  }: {
    totalCost: number;
    totalMaterialCost: number;
    totalServicesCost: number;
  }) => {
    Modal.info({
      title: "Розрахунок успішний!",
      content: (
        <>
          <p style={{ fontSize: 18 }}>
            Приблизна загальна вартість робіт складає {totalCost} злотих. З них
            основні послуги - {totalMaterialCost}, Додаткові послуги -{" "}
            {totalServicesCost}
          </p>
        </>
      ),
      maskClosable: true,
      footer: <p>Вдалих покупок! 🎁</p>,
      width: 500,
    });
  };

  function cardInputHandler(e: ChangeEvent<HTMLInputElement>) {
    setState((prevState) => ({
      ...prevState,
      services: { ...prevState.services, [e.target.id]: e.target.value },
    }));
  }

  function roomParamInputHandler(e: ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [e.target.id]: e.target.value });
  }

  function handleSelectChange(value: string) {
    setState({ ...state, material: value });
  }

  //підрахунок вартості
  function resultHandler() {
    //площа кімнати
    const totalRoomArea = state.roomLenght * state.roomWidth;
    //ціна обраного матеріалу
    const materialPrice = prices?.ceilingMaterials.find(
      (material) => material.id === Number(state.material)
    )?.price;
    //ціна установки за кімнату
    let totalMaterialCost: number = 0;
    if (materialPrice) {
      totalMaterialCost = totalRoomArea * materialPrice;
    }

    //загальна вартість додаткових послуг
    let totalServicesCost: number = 0;

    //підрахунок загальної вартості обраних послуг
    Object.entries(state.services).forEach(([serviceId, quantity]) => {
      totalServicesCost +=
        prices?.services.find((service) => service.id === Number(serviceId))
          ?.price! * Number(quantity);
    });
    //загальна вартість робіт
    let totalCost = totalMaterialCost + totalServicesCost;
    showCalculationResult({ totalCost, totalMaterialCost, totalServicesCost });
  }

  return (
    <>
      <Title level={4}>Основа:</Title>
      <Flex gap={3} align="center" justify="space-around" wrap="wrap">
        <div>
          <Title level={5} style={{ textAlign: "center" }}>
            Довжина кімнати:
          </Title>
          <Input
            type="number"
            value={state.roomLenght}
            onChange={roomParamInputHandler}
            min={0}
            id="roomLenght"
          />
        </div>
        <div>
          <Title level={5} style={{ textAlign: "center" }}>
            Ширина кімнати:
          </Title>
          <Input
            type="number"
            value={state.roomWidth}
            min={0}
            onChange={roomParamInputHandler}
            id="roomWidth"
          />
        </div>
        <div>
          <Title level={5} style={{ textAlign: "center" }}>
            Тип матеріалу:
          </Title>
          <Select
            style={{ width: "200px" }}
            options={prices?.ceilingMaterials.map(({ id, name }) => {
              return { value: id, label: name };
            })}
            onChange={handleSelectChange}
          />
        </div>
      </Flex>
      <Title level={4}>Додаткові послуги:</Title>
      {prices?.services.map((currentService) => (
        <ServiceCard
          key={currentService.id}
          service={currentService}
          onChangeHandler={cardInputHandler}
        />
      ))}
      <Button onClick={resultHandler}>Test</Button>
    </>
  );
};

export default PriceCalculator;
