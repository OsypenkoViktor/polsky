import React, { useEffect, useState, MouseEvent } from "react";
import type { CeilingMaterial, Prices, Service } from "../../Helpers/APITypes";
import { Typography, Button, Input, Form, notification, Spin } from "antd";
import type { FormProps } from "antd";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";
import { URLs } from "../../Helpers/URLs";

const { Title, Text } = Typography;

type MaterialHandlerFunction = (
  event: MouseEvent<HTMLElement>,
  material: CeilingMaterial | null
) => void;
type ServiceHandlerFunction = (
  event: MouseEvent<HTMLElement>,
  service: Service | null
) => void;
type ReloadDataHandler = () => void;

const MaterialCard = ({
  material,
  changeHandler,
  deleteHandler,
}: {
  material: CeilingMaterial | null;
  changeHandler: MaterialHandlerFunction;
  deleteHandler: MaterialHandlerFunction;
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        marginBottom: "20px",
        backgroundColor: "#c3cbd6",
        borderRadius: "3%",
      }}
    >
      <Text>Назва матеріалу:</Text>
      <Input
        style={{ width: "300px" }}
        id={`Mname${material?.id}`}
        defaultValue={material?.name}
      />
      <Text>Опис матеріалу:</Text>
      <TextArea
        id={`Mdescription${material?.id}`}
        defaultValue={material?.description}
      />
      <Text>Вартість матеріалу:</Text>
      <Input
        id={`Mprice${material?.id}`}
        type="number"
        defaultValue={material?.price}
        style={{ width: "100px" }}
      />
      <div style={{ margin: "10px" }}>
        <Button
          style={{ margin: 10 }}
          onClick={(event) => changeHandler(event, material)}
        >
          Змінити матеріал ⚙
        </Button>
        <Button
          danger
          style={{ margin: 10 }}
          onClick={(event) => {
            deleteHandler(event, material);
          }}
        >
          Видалити матеріал ❌
        </Button>
      </div>
    </div>
  );
};

const CreateMaterialForm = ({
  reloadDataHandler,
}: {
  reloadDataHandler: ReloadDataHandler;
}) => {
  type FieldType = {
    name?: string;
    description?: string;
    price?: string;
  };
  const [api, contextHolder] = notification.useNotification();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const options = {
      method: "POST",
      url: URLs.postCreateMaterial,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name: values.name,
        description: values.description,
        price: values.price,
      },
      withCredentials: true,
    };
    axios(options)
      .then((response) => {
        if (response.status === 201) {
          reloadDataHandler();
          api["success"]({
            message: "Успіх",
            description: "Матеріал успішно створено!",
          });
        }
      })
      .catch((error) => {
        api["error"]({
          message: "Помилка підключення до серверу",
          description: error.message,
        });
      });
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {contextHolder}
      <Form
        name="createMaterial"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="назва матеріалу"
          name="name"
          rules={[{ required: true, message: "Введіть назву матеріалу" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Описання"
          name="description"
          rules={[{ required: true, message: "Введіть описання матеріалу" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Ціна"
          name="price"
          rules={[{ required: true, message: "Введіть ціну" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Створити матеріал
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

const CreateServiceForm = ({
  reloadDataHandler,
}: {
  reloadDataHandler: ReloadDataHandler;
}) => {
  type FieldType = {
    name?: string;
    description?: string;
    price?: string;
  };

  const [api, contextHolder] = notification.useNotification();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const options = {
      method: "POST",
      url: URLs.postCreateService,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name: values.name,
        description: values.description,
        price: values.price,
      },
      withCredentials: true,
    };
    axios(options)
      .then((response) => {
        if (response.status === 201) {
          reloadDataHandler();
          api["success"]({
            message: "Успіх",
            description: "Сервіс успішно створено!",
          });
        }
      })
      .catch((error) => {
        api["error"]({
          message: "Помилка підключення до серверу",
          description: error.message,
        });
      });
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {contextHolder}
      <Form
        name="createMaterial"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="назва матеріалу"
          name="name"
          rules={[{ required: true, message: "Введіть назву матеріалу" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Описання"
          name="description"
          rules={[{ required: true, message: "Введіть описання матеріалу" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Ціна"
          name="price"
          rules={[{ required: true, message: "Введіть ціну" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Створити матеріал
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

const ServiceCard = ({
  service,
  changeHandler,
  deleteHandler,
}: {
  service: Service | null;
  changeHandler: ServiceHandlerFunction;
  deleteHandler: ServiceHandlerFunction;
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        marginBottom: "20px",
        backgroundColor: "#ffd5af",
        borderRadius: "3%",
      }}
    >
      <Text>Назва сервісу:</Text>
      <div>
        <Input id={`Sname${service?.id}`} defaultValue={service?.name} />
      </div>
      <Text>Опис сервісу:</Text>
      <TextArea
        id={`Sdescription${service?.id}`}
        defaultValue={service?.description}
      />
      <Text>Вартість сервісу:</Text>
      <Input
        id={`Sprice${service?.id}`}
        type="number"
        defaultValue={service?.price}
        style={{ width: "100px" }}
      />
      <div style={{ margin: "10px" }}>
        <Button
          style={{ margin: 10 }}
          onClick={(event) => changeHandler(event, service)}
        >
          Змінити послугу ⚙
        </Button>
        <Button
          danger
          style={{ margin: 10 }}
          onClick={(event) => {
            deleteHandler(event, service);
          }}
        >
          Видалити послугу ❌
        </Button>
      </div>
    </div>
  );
};

const CPMainSection = () => {
  const [prices, setPrices] = useState<Prices | null>(null);
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getPricesData();
  }, []);

  async function getPricesData() {
    setLoading(true);
    await axios
      .get<Prices>(URLs.getPrices)
      .then((response) => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        setPrices(response.data);
      })
      .catch((error) => {
        api["error"]({
          message: "Помилка підключення до серверу",
          description: error.message,
        });
        setLoading(false);
      });
  }

  const changeMaterialHandler: MaterialHandlerFunction = async (
    event,
    material
  ) => {
    if (material) {
      const name = document.querySelector<HTMLInputElement>(
        `#Mname${material.id}`
      )?.value;
      const description = document.querySelector<HTMLTextAreaElement>(
        `#Mdescription${material.id}`
      )?.value;
      const price = document.querySelector<HTMLInputElement>(
        `#Mprice${material.id}`
      )?.value;
      const options = {
        method: "PATCH",
        url: URLs.patchMaterial,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          id: material.id,
          name: name,
          description: description,
          price: price,
        },
        withCredentials: true,
      };
      setLoading(true);
      axios(options)
        .then((response) => {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
          api["success"]({
            message: "Успіх",
            description: "Матеріал успішно змінено!",
          });
        })
        .catch((error) => {
          api["error"]({
            message: "Помилка підключення до серверу",
            description: error.message,
          });
          setLoading(false);
        });
    }
  };

  const changeServiceHandler: ServiceHandlerFunction = async (
    event,
    service
  ) => {
    if (service) {
      const name = document.querySelector<HTMLInputElement>(
        `#Sname${service.id}`
      )?.value;
      const description = document.querySelector<HTMLTextAreaElement>(
        `#Sdescription${service.id}`
      )?.value;
      const price = document.querySelector<HTMLInputElement>(
        `#Sprice${service.id}`
      )?.value;
      const options = {
        method: "PATCH",
        url: URLs.patchService,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          id: service.id,
          name: name,
          description: description,
          price: price,
        },
        withCredentials: true,
      };
      setLoading(true);
      axios(options)
        .then((response) => {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
          api["success"]({
            message: "Успіх",
            description: "Сервіс успішно змінено!",
          });
        })
        .catch((error) => {
          api["error"]({
            message: "Помилка підключення до серверу",
            description: error.message,
          });
          setLoading(false);
        });
    }
  };

  const deleteServiceHandler: ServiceHandlerFunction = async (
    event,
    service
  ) => {
    if (service) {
      const options = {
        method: "DELETE",
        url: URLs.deleteService,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          id: service.id,
        },
        withCredentials: true,
      };
      setLoading(true);
      axios(options)
        .then((response) => {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
          if (response.status === 200) {
            getPricesData();
            api["success"]({
              message: "Успіх",
              description: "Сервіс успішно видалено",
            });
          }
        })
        .catch((error) => {
          api["error"]({
            message: "Помилка підключення до серверу",
            description: error.message,
          });
          setLoading(false);
        });
    }
  };

  const deleteMaterialHandler: ServiceHandlerFunction = async (
    event,
    service
  ) => {
    if (service) {
      const options = {
        method: "DELETE",
        url: URLs.deleteMaterial,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          id: service.id,
        },
        withCredentials: true,
      };
      setLoading(true);
      axios(options)
        .then((response) => {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
          if (response.status === 200) {
            getPricesData();
            api["success"]({
              message: "Успіх",
              description: "Матеріал успішно видалено",
            });
          }
        })
        .catch((error) => {
          setLoading(false);
          api["error"]({
            message: "Помилка підключення до серверу",
            description: error.message,
          });
        });
    }
  };

  return (
    <>
      {contextHolder}
      <div
        style={{
          backgroundColor: "black",
          overflow: "auto",
          height: "100%",
          flex: 1,
          padding: 5,
        }}
      >
        <Spin spinning={loading} tip="Зачекайте..." style={{ width: "100%" }}>
          <Title level={3} style={{ color: "white" }}>
            Матеріали:
          </Title>
          {prices?.ceilingMaterials.map((material) => (
            <MaterialCard
              key={material.id}
              material={material}
              changeHandler={changeMaterialHandler}
              deleteHandler={deleteMaterialHandler}
            />
          ))}
          <Title level={4} style={{ color: "white" }}>
            Створити новий матеріал
          </Title>
          <CreateMaterialForm reloadDataHandler={getPricesData} />
          <Title level={3} style={{ color: "white" }}>
            Послуги:
          </Title>
          {prices?.services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              changeHandler={changeServiceHandler}
              deleteHandler={deleteServiceHandler}
            />
          ))}
          <Title level={4} style={{ color: "white" }}>
            Додати новий сервіс
          </Title>
          <CreateServiceForm reloadDataHandler={getPricesData} />
        </Spin>
      </div>
    </>
  );
};

export default CPMainSection;
