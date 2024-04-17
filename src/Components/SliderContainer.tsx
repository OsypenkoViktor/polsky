import React from "react";
import Slider from "react-slick";
import { Typography, Divider } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import image1 from "../Images/SliderImages/1.jpg";
import image2 from "../Images/SliderImages/2.jpg";
import image3 from "../Images/SliderImages/3.jpg";
import image4 from "../Images/SliderImages/4.jpg";
import image5 from "../Images/SliderImages/5.jpg";

const { Title, Text } = Typography;

const SliderContainer = () => {
  var settings = {
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
      <div style={{ width: "90%" }}>
        <Slider {...settings}>
          <div>
            <SliderImage backgroundImage={image1} />
          </div>
          <div>
            <SliderImage backgroundImage={image2} />
          </div>
          <div>
            <SliderImage backgroundImage={image3} />
          </div>
          <div>
            <SliderImage backgroundImage={image4} />
          </div>
          <div>
            <SliderImage backgroundImage={image5} />
          </div>
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
  };
  return <div style={sliderImageStyle}></div>;
};

export default SliderContainer;
