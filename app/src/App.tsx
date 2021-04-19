import React, { useState } from "react";
import styled from "styled-components";
import { SearchBar } from "./components/SearchBar";
import "./styles/App.scss";
import ExterImg from "./assets/Exeter.jpg";
import ManchesterImg from "./assets/Manchester.jpg";
import BirminghamImg from "./assets/Birmingham.jpg";
import LondonImg from "./assets/London.jpg";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: "assets/Exeter.jpg";
  background-size: cover;
  background-position: center;
`;

const ExamplesContainer = styled.div`
  margin-bottom: 48px;
  margin-top: auto;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 24px 48px;
  border-radius: 24px;
`;

const App = () => {
  const [location, setLocation] = useState("");

  const getBackground = () => {
    switch (location) {
      case "Exeter":
        return ExterImg;
      case "London":
        return LondonImg;
      case "Birmingham":
        return BirminghamImg;
      case "Manchester":
        return ManchesterImg;
    }
  };

  return (
    <Container style={{ backgroundImage: `url(${getBackground()})` }}>
      <h1 style={{ marginTop: "auto", marginBottom: "48px" }}>
        Postcode Lookup
      </h1>
      <SearchBar
        handleUpdateData={(e: string) => {
          setLocation(e);
        }}
      />
      <ExamplesContainer>
        <p>Example postcodes</p>
        <p>E8 3DB</p>
        <p>M5 3AA</p>
        <p>B9 4BB</p>
        <p>EX1 3AB</p>
      </ExamplesContainer>
    </Container>
  );
};

export default App;
