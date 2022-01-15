import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import { API_KEY } from "../utils/api";
import { colors } from "../utils/colors";

// React Native Styled Component Dependencies
const BORDER_RADIUS_VALUE = "20px";
const Container = styled.View`
  flex: 1;
  background-color: ${colors.GreenSheen};
`;
const ContainerWhiteSpace = styled.View`
  flex: 1;
`;

const WeatherPanel = styled.View`
  flex: 9;
  border-top-left-radius: ${BORDER_RADIUS_VALUE};
  border-top-right-radius: ${BORDER_RADIUS_VALUE};
  background-color: ${colors.Independence};
  justify-content: center;
  align-items: center;
`;
const Weather5dayBox = styled.View`
  border-color: ${colors.Eggshell};
  width: 80%;
  border-width: 1px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  margin-bottom: 15px;
`;
const Weather5dayRow = styled.View`
  border-color: ${colors.Eggshell};
  border-bottom-width: 1px;
  flex-direction: row;
  padding: 5px;
  justify-content: space-between;
`;
const WeatherRowTitle = styled.Text`
  font-size: 15px;
  color: ${colors.Eggshell};
  border-left-width: 1px;
`;
const WeatherRowValue = styled.Text`
  font-size: 15px;
  text-align: right;
  color: ${colors.Eggshell};
`;

const DayChangeRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 80%;
`;

const DayCounter = styled.Text`
  font-size: 15px;
  color: ${colors.Eggshell};
`;

const DayChangeButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: ${colors.DeepChampagne};
  border-radius: 10px;
  padding: 10px;
`;

const DayChangeButtonText = styled.Text`
  font-size: 15px;
  color: ${colors.Independence};
`;

export default function index() {
  // State Dependencies for the first grid
  const [morningTemp, setMorningTemp] = useState<number>(0);
  const [dayTemp, setDayTemp] = useState<number>(0);
  const [nightTemp, setNightTemp] = useState<number>(0);
  const [humidity, setHumidity] = useState<number>(0);
  // State dependencies for the second gird.
  const [maximum, setMaximum] = useState<number>(0);
  const [minimum, setMinimum] = useState<number>(0);
  const [mean, setMean] = useState<number>(0);
  const [mode, setMode] = useState<number>(0);
  // State dependencies for Page Change

  // PAGE FUNCTIONS SECTION

  // Set grid #1 state from OpenWeather API.
  const fetchWeatherByCity = (cityName: string) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,minutely&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json.daily[0].temp.day);
        setMorningTemp(json.daily[0].temp.morn)
        setDayTemp(json.daily[0].temp.day)
        setNightTemp(json.daily[0].temp.night)
        setHumidity(json.daily[0].humidity)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchWeatherByCity("London");
  }, []);

  // Calculate the Minimum value
  const CalcultateMinimum = (value: number[]) => {};
  // Calculate the Maximum value
  const CalcultateMaximum = (value: number[]) => {};
  // Calculate the Mean value
  const CalcultateMean = (value: number[]) => {};
  // Calculate the Mode value
  const CalcultateMode = (value: number[]) => {};

  return (
    <Container>
      <ContainerWhiteSpace />
      <WeatherPanel>
        <Weather5dayBox>
          <Weather5dayRow>
            <WeatherRowTitle>Morning Temperature</WeatherRowTitle>
            <WeatherRowValue>{morningTemp}</WeatherRowValue>
          </Weather5dayRow>
          <Weather5dayRow>
            <WeatherRowTitle>Day Temperature</WeatherRowTitle>
            <WeatherRowValue>{dayTemp}</WeatherRowValue>
          </Weather5dayRow>
          <Weather5dayRow>
            <WeatherRowTitle>Night Temperature</WeatherRowTitle>
            <WeatherRowValue>{nightTemp}</WeatherRowValue>
          </Weather5dayRow>
          <Weather5dayRow>
            <WeatherRowTitle>Humidity</WeatherRowTitle>
            <WeatherRowValue>{humidity}</WeatherRowValue>
          </Weather5dayRow>
        </Weather5dayBox>
        <Weather5dayBox>
          <Weather5dayRow>
            <WeatherRowTitle>Minimum value</WeatherRowTitle>
            <WeatherRowValue>0</WeatherRowValue>
          </Weather5dayRow>
          <Weather5dayRow>
            <WeatherRowTitle>Maximum value</WeatherRowTitle>
            <WeatherRowValue>0</WeatherRowValue>
          </Weather5dayRow>
          <Weather5dayRow>
            <WeatherRowTitle>Mean value</WeatherRowTitle>
            <WeatherRowValue>0</WeatherRowValue>
          </Weather5dayRow>
          <Weather5dayRow>
            <WeatherRowTitle>Mode value</WeatherRowTitle>
            <WeatherRowValue>0</WeatherRowValue>
          </Weather5dayRow>
        </Weather5dayBox>
        <DayChangeRow>
          <DayCounter>Day: 1/5</DayCounter>
          <DayChangeButton>
            <DayChangeButtonText>
              NEXT DAY
            </DayChangeButtonText>
          </DayChangeButton>
        </DayChangeRow>
      </WeatherPanel>
    </Container>
  );
}
