import React from "react";
import Slider from "react-slick";
import { Typography, Divider } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ApiResponse } from "../Helpers/APITypes";
import { URLs } from "../Helpers/URLs";

const { Title, Text } = Typography;

const SliderContainer = ({
  slidesImgList,
}: {
  slidesImgList: string[] | undefined;
}) => {
  let settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
  };

  return (
    <div
      id="slider"
      style={{
        marginBottom: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Divider></Divider>
      <Title level={3} style={{ textAlign: "center" }}>
        Приклади робіт
      </Title>
      <Text type={"secondary"} style={{ textAlign: "center" }}>
        І ще один напис-"підводка" до розділу з фотогалереєю
      </Text>
      <Divider></Divider>
      <div style={{ width: "80%" }}>
        <Slider {...settings}>
          {slidesImgList?.map((imgName, index) => (
            <div key={index}>
              <SliderImage backgroundImage={URLs.imagesBaseURL + imgName} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

interface SliderImageProps {
  backgroundImage: string;
}

const SliderImage: React.FC<SliderImageProps> = ({ backgroundImage }) => {
  const sliderImageStyle: React.CSSProperties = {
    width: "100%",
    height: "400px",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "15px",
  };
  return <div style={sliderImageStyle}></div>;
};

export default SliderContainer;
