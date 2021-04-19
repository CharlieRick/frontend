import React, { useEffect, useState } from "react";
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
  margin-bottom: 24px;
`;

const TextInput = styled.input`
  border: 0;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

const DataContainer = styled.div`
  width: 100%;
  max-width: 640px;
  background: #fff;
  border-radius: 24px;
  display: flex;
  align-items: center;
  padding: 24px;
  color: #212121;
`;

interface ILocationData {
  country: string;
  eastings: number;
  id: number;
  latitude: number;
  longitude: number;
  nhs_ha: string;
  northings: number;
  postcode: string;
}

interface IWeatherData {
  id: number;
  coord: { lon: number; lat: number };
  weather: [{ id: number; main: string; description: string; icon: string }];
  base: "stations";
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: { speed: number; deg: number };
  clouds: { all: number };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  name: string;
}

export const SearchBar = () => {
  const [value, setValue] = useState("");
  const [locationData, setLocationData] = useState<ILocationData | null>(null);
  const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);

  useEffect(() => {
    if (value.length > 5) {
      fetch(`http://localhost:3030/locations?postcode=${value}`).then((res) => {
        res.json().then((response) => {
          setLocationData(response[0]);
        });
      });
    }
  }, [value]);

  useEffect(() => {
    if (locationData?.longitude) {
      fetch(
        `http://localhost:3030/weather?coord.lon=${locationData.longitude.toFixed(
          2
        )}&coord.lat=${locationData.latitude.toFixed(2)}`
      ).then((res) => {
        res.json().then((response) => {
          setWeatherData(response[0]);
        });
      });
    }
  }, [locationData]);

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

      {locationData && (
        <DataContainer>
          {locationData.nhs_ha} {weatherData?.name}
        </DataContainer>
      )}
    </>
  );
};
