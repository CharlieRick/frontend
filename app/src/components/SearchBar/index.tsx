import React, { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components";

import CloudsIcon from "../../assets/CloudsIcon.svg";
import RainIcon from "../../assets/RainIcon.svg";
import ClearIcon from "../../assets/ClearIcon.svg";
import SnowIcon from "../../assets/SnowIcon.svg";

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
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  color: #212121;
  box-shadow: 2px 5px 16px 0px #000;

  .area {
    color: #d8d8d8;
  }

  .name {
    font-size: 2rem;
  }

  .temp {
    margin-right: 24px;
    
    .icon {
        margin-left: 24px;
    }
  }
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

interface ISearchBar {
  handleUpdateData: (e: string) => void;
}

export const SearchBar: FunctionComponent<ISearchBar> = (props) => {
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
          props.handleUpdateData(response[0].name);
        });
      });
    }
  }, [locationData, props.handleUpdateData]);

  const getIcon = () => {
    switch (weatherData?.weather[0].main) {
      case "Clouds":
        return CloudsIcon;
      case "Rain":
        return RainIcon;
      case "Clear":
        return ClearIcon;
      case "Snow":
        return SnowIcon;
    }
  };

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
          <div>
            <div className="area">{locationData.nhs_ha}</div>
            <div className="name">{weatherData?.name}</div>
          </div>

          <div className="temp">
            {weatherData && (weatherData?.main.temp / 10).toFixed(0)}°C
            <img
              src={`url(${getIcon()})`}
              alt={weatherData?.weather[0].main}
              className="icon"
            />
          </div>
        </DataContainer>
      )}
    </>
  );
};
