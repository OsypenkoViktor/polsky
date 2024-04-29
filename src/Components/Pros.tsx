import React from "react";
import { Typography, Card, Divider } from "antd";

const Pros = () => {
  return (
    <>
      <Divider />
      <div id="pros">
        <Typography.Title
          level={3}
          style={{
            textAlign: "center",
            fontFamily: "Lilita One",
          }}
        >
          Nasze atuty
        </Typography.Title>
        <Divider />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Card
            title="Bezpłatne pomiary."
            style={{ width: "80vw", margin: "10px" }}
          >
            Nasze darmowe pomiaru sufitu to pierwszy krok do Twojego idealnego
            wnętrza. Nasi doświadczeni specjaliści przyjadą do Ciebie, aby
            dokładnie określić wymiary i cechy Twojego sufitu, gwarantując
            bezbłędne wykonanie projektu.
          </Card>
          <Card
            title="Gwarancja jakości"
            style={{ width: "80vw", alignSelf: "flex-end", margin: "10px" }}
          >
            Gwarantujemy najwyższą jakość naszych materiałów i usług, aby
            zapewnić trwałość i niezawodność Państwa projektowi. Wszystkie nasze
            prace podlegają gwarancji, co pozwala Państwu spokojnie cieszyć się
            rezultatem.
          </Card>
          <Card
            title="Szybka instalacja"
            style={{ width: "80vw", margin: "10px" }}
          >
            Spieszysz się, ale nie chcesz rezygnować z jakości? Nasze niezawodne
            technologie zapewniają jakość, bezpieczeństwo i komfort na każdym
            etapie. Odśwież swój dom w krótkim czasie razem z nami!
          </Card>
        </div>
      </div>
    </>
  );
};

export default Pros;
