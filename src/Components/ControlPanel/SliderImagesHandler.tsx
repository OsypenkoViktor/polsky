import React, { useState, useRef } from "react";
import { Typography, Button, Input, notification } from "antd";
import { ApiResponse } from "../../Helpers/APITypes";
import { URLs } from "../../Helpers/URLs";
import axios from "axios";

const { Title } = Typography;

const partStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "50vh",
};

const SliderImagesHandler = ({
  siteData,
  reloadCPanel,
}: {
  siteData: ApiResponse | null;
  reloadCPanel: () => void;
}) => {
  return (
    <>
      <div style={partStyle}>
        <Title level={3} style={{ color: "white" }}>
          Редактор зображень слайдеру:
        </Title>
        <FileUploadComponent reloadCPanel={reloadCPanel} />
        <div
          style={{
            overflow: "auto",
          }}
        >
          {siteData?.sliderImgList?.map((imageName, index) => (
            <ImageCard
              key={index}
              imagesBaseURL={URLs.imagesBaseURL}
              imageName={imageName}
              reloadCPanel={reloadCPanel}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const ImageCard = ({
  imagesBaseURL,
  imageName,
  reloadCPanel,
}: {
  imagesBaseURL: string;
  imageName: string;
  reloadCPanel: () => void;
}) => {
  const [api, contextHolder] = notification.useNotification();

  function deleteImageHandler() {
    axios
      .delete(`${URLs.deleteImage}${imageName}`, {
        withCredentials: true,
      })
      .then((response) => {
        // Обработка успешной загрузки
        api["success"]({
          message: "ОК",
          description: "Зображення успішно видалено!",
        });
        setTimeout(() => {
          reloadCPanel();
        }, 2000);
      })
      .catch((error) => {
        api["error"]({
          message: "Помилка видалення зображення",
          description: error.message,
        });
        reloadCPanel();
      });
  }
  return (
    <>
      {contextHolder}
      <div
        style={{
          border: "1px white solid",
          padding: "10px",
        }}
      >
        <img
          src={imagesBaseURL + imageName}
          alt="Зображення слайдеру"
          width={300}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Button type="primary" danger onClick={deleteImageHandler}>
            Видалити зображення
          </Button>
        </div>
      </div>
    </>
  );
};

const FileUploadComponent = ({
  reloadCPanel,
}: {
  reloadCPanel: () => void;
}) => {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [api, contextHolder] = notification.useNotification();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    if (!selectedFile) {
      api.error({
        message: "Помилка",
        description: "Оберіть файл для завантаження!",
      });
      return;
    }

    axios
      .post(URLs.uploadImage, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((response) => {
        api["success"]({
          message: "ОК",
          description: "Зображення успішно завантажено!",
        });
        setSelectedFile(null); // Очищаем состояние выбранного файла
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Очищаем список выбранных файлов в input
        }
        reloadCPanel();
      })
      .catch((error) => {
        api["error"]({
          message: "Помилка завантаження зображення",
          description: error.message,
        });
        reloadCPanel();
      });
  };

  return (
    <>
      {contextHolder}
      <div>
        <input ref={fileInputRef} type="file" onChange={handleFileChange} />
        <Button type="primary" onClick={handleUpload}>
          Upload
        </Button>
      </div>
    </>
  );
};

export default SliderImagesHandler;
