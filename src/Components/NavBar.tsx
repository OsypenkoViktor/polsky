import React, { useState, useEffect } from "react";
import { Button, Typography, Drawer } from "antd";
import { MenuFoldOutlined } from "@ant-design/icons";

const navbarStyle: React.CSSProperties = {
  height: "10vh",
  width: "100%",
  backgroundColor: "rgba(204, 204, 255,0.5)",
  marginTop: "0px",
  zIndex: "1",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const NavBar = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Функция для обновления ширины окна
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    // Подписываемся на событие изменения размера окна
    window.addEventListener("resize", handleResize);

    // Очищаем подписку, когда компонент будет размонтирован
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={navbarStyle}>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "50%",
          width: "100px",
          textAlign: "center",
          marginLeft: "20px",
        }}
      >
        <span style={{ color: "#eab676", fontSize: "50px" }}>P</span>
        <span style={{ color: "black", fontSize: "50px" }}>S</span>
      </div>
      {windowWidth > 820 ? <NavLinksBlock /> : <DrawerNavBtn />}
    </div>
  );
};

const NavLinksBlock = () => {
  return (
    <div>
      <NavLink anchorID={"#slider"} title={"Przykłady pracy"} />
      <NavLink anchorID={"#pros"} title={"Nasze atuty"} />
      <NavLink anchorID={"#calculator"} title={"Ceny"} />
      <NavLink anchorID={"#contacts"} title={"Skontaktuj się z nami"} />
    </div>
  );
};

const NavLink = ({ anchorID, title }: { anchorID: string; title: string }) => {
  const textStyle: React.CSSProperties = {
    margin: "20px",
    fontSize: "20px",
    fontWeight: "bold",
  };

  return (
    <Typography.Text style={textStyle}>
      <Typography.Link href={anchorID}>{title}</Typography.Link>
    </Typography.Text>
  );
};

const DrawerNavLink = ({
  anchorID,
  title,
}: {
  anchorID: string;
  title: string;
}) => {
  const anchorStyle: React.CSSProperties = {
    color: "blue",
  };

  const textStyle: React.CSSProperties = {
    fontSize: "25px",
    fontWeight: "bold",
  };

  return (
    <p style={{ margin: "20px" }}>
      <Typography.Text style={textStyle}>
        <a href={anchorID} style={anchorStyle}>
          {title}
        </a>
      </Typography.Text>
    </p>
  );
};

const DrawerNavBtn = () => {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };
  const showDrawer = () => {
    setOpen(true);
  };
  return (
    <>
      <Button
        style={{
          width: "100px",
          height: "100px",
        }}
        type="link"
        onClick={showDrawer}
      >
        <MenuFoldOutlined style={{ fontSize: "20px", color: "black" }} />
      </Button>
      <Drawer
        style={{ backgroundColor: "rgba(204, 204, 255,0.9)" }}
        title="Nawigacja"
        onClose={onClose}
        open={open}
      >
        <DrawerNavLink title="Przykłady pracy" anchorID="#slider" />
        <DrawerNavLink title="Nasze atuty" anchorID="#slider" />
        <DrawerNavLink title="Ceny" anchorID="#calculator" />
        <DrawerNavLink title="Skontaktuj się z nami" anchorID="#slider" />
      </Drawer>
    </>
  );
};

export default NavBar;
