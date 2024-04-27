import React, { useState, ChangeEvent } from "react";
import {
  Button,
  Input,
  Select,
  Row,
  Col,
  Typography,
  Divider,
  Card,
  Result,
} from "antd";
import { Prices, Service } from "../Helpers/APITypes";

type CalculatedPrices = {
  totalCost: number | null;
  materialCost: number | null;
  servicesCost: number | null;
};

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
    <Col xs={20} xl={12} xxl={6}>
      <Card
        style={{
          width: "100%",
          marginBottom: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Title level={5} style={{ textAlign: "center" }}>
          {service.name}
        </Title>
        {/* <p>{service.description}</p> */}
        <Input
          id={`${service.id}`}
          type="number"
          placeholder="кількість"
          min={0}
          style={{}}
          onChange={onChangeHandler}
        />
      </Card>
    </Col>
  );
};

const PriceCalculator = ({ prices }: { prices: Prices | null }) => {
  const [state, setState] = useState({
    roomWidth: 0,
    roomLenght: 0,
    material: "",
    services: {},
  });

  const [calculatedPrice, setCalculatedPrice] = useState<CalculatedPrices>({
    totalCost: null,
    materialCost: null,
    servicesCost: null,
  });

  function showCalculationData(calculatedPrices: CalculatedPrices) {
    setCalculatedPrice(calculatedPrices);
  }

  function hideCalculationData() {
    setCalculatedPrice({
      totalCost: null,
      materialCost: null,
      servicesCost: null,
    });
  }

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
    let materialCost: number = 0;
    if (materialPrice) {
      materialCost = totalRoomArea * materialPrice;
    }

    //загальна вартість додаткових послуг
    let servicesCost: number = 0;

    //підрахунок загальної вартості обраних послуг
    Object.entries(state.services).forEach(([serviceId, quantity]) => {
      servicesCost +=
        prices?.services.find((service) => service.id === Number(serviceId))
          ?.price! * Number(quantity);
    });
    //загальна вартість робіт
    let totalCost = materialCost + servicesCost;
    showCalculationData({ totalCost, materialCost, servicesCost });
  }

  return (
    <>
      {calculatedPrice.totalCost === null ? (
        <Row align={"middle"} justify={"center"}>
          <Col xs={24} xl={20} xxl={20}>
            <Card
              style={{
                backgroundColor: "rgba(237, 255, 4, 0.1516981792717087)",
              }}
              title="Основні параметри"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  flexWrap: "wrap",
                }}
              >
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
              </div>
              <Divider />
              <Title level={5}>Додаткові послуги:</Title>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Row align={"middle"} justify={"center"} gutter={20}>
                  {prices?.services.map((currentService) => (
                    <ServiceCard
                      key={currentService.id}
                      service={currentService}
                      onChangeHandler={cardInputHandler}
                    />
                  ))}
                </Row>
              </div>
              <Button onClick={resultHandler} type="primary">
                Розрахувати вартість
              </Button>
            </Card>
          </Col>
        </Row>
      ) : (
        <ShowCalculationResult
          hideCalculationResult={hideCalculationData}
          calculatedPrice={calculatedPrice}
        />
      )}
    </>
  );
};

const ShowCalculationResult = ({
  calculatedPrice,
  hideCalculationResult,
}: {
  calculatedPrice: CalculatedPrices;
  hideCalculationResult: (event: React.MouseEvent) => void;
}) => {
  return (
    <Result
      status="success"
      title="Ваш розрахунок готовий."
      subTitle={`Загальна вартість робіт складає ${calculatedPrice.totalCost} злотих. 
      З них вартість основного матеріалу - ${calculatedPrice.materialCost} злотих, 
      вартість додаткових послуг -${calculatedPrice.servicesCost} злотих`}
      extra={[
        <Button
          key="buy"
          type="primary"
          onClick={(e) => hideCalculationResult(e)}
        >
          Повернутися до розрахунків
        </Button>,
      ]}
    />
  );
};

export default PriceCalculator;
