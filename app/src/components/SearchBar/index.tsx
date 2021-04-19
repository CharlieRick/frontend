import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 64px;
  width: 100%;
  max-width: 640px;
  background: #fff;
  border-radius: 24px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  box-shadow: 2px 5px 16px 0px #000;
`;

const TextInput = styled.input`
  border: 0;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

export const SearchBar = () => {
  const [value, setValue] = useState("");

  return (
    <>
      <Container>
        <TextInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </Container>
    </>
  );
};
