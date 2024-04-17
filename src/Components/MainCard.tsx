import React from "react";
import mainCardBgImage from "../Images/stretch-ceilings-in-the-living-room.jpg";

const MainCardStyle: React.CSSProperties = {
  width: "100%",
  height: "50vh",
  backgroundImage: `url(${mainCardBgImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const MainCard: React.FC = () => {
  return <div style={MainCardStyle}></div>;
};

export default MainCard;
