import React from "react";
import styled from "styled-components";
import { SearchBar } from "./components/SearchBar";
import "./styles/App.scss";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const App = () => {
  return (
    <Container>
      <h1>Postcode Lookup</h1>
      <SearchBar />
    </Container>
  );
};

export default App;
