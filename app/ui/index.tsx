import React, { useEffect, useState } from "react";
import styled from "styled-components/native";

// Utility dependencies.
import { API_KEY } from "../utils/api";
import { colors } from "../utils/colors";
import { locations, LocationType } from "../utils/locations";



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
const CityTitleContainer = styled.View`
  justify-content: center;
  width: 80%;
  padding: 10px;
`;

const CityTitleText = styled.Text`
  font-size: 15px;
  color: ${colors.Eggshell};
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
  const [mean, setMean] = useState<number | string>(0);
  const [mode, setMode] = useState<number | undefined>(0);
  // State dependencies for Page Change
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  // State dependency for City name & location
  const [currentCityIndex, setCurrentCityIndex] = useState<number>(0);

  // PAGE FUNCTIONS SECTION

  // Calculate the Minimum value
  const calculateMinimum = (value: number[]) => {
    var lowestNumber = value[0];
    for (var i = 0; i < value.length; i++) {
      if (value[i] < lowestNumber) {
        lowestNumber = value[i];
      }
    }
    return lowestNumber;
  };
  // Calculate the Maximum value
  const calculateMaximum = (value: number[]) => {
    var highestNumber = value[0];
    for (var i = 0; i < value.length; i++) {
      if (value[i] > highestNumber) {
        highestNumber = value[i];
      }
    }
    return highestNumber;
  };
  // Calculate the Mean value
  const calculateMean = (value: number[]) => {
    var total = 0;
    for (var i = 0; i < value.length; i++) {
      total += value[i];
    }
    return (total / value.length).toFixed(2);
  }
  // Calculate the Mode value
  const calculateMode = (value: number[]) => {
    var numMapping: number[] = [];
    var greatestFreq = 0;
    var mode;
    value.forEach(function findMode(number) {
      numMapping[number] = (numMapping[number] || 0) + 1;

      if (greatestFreq < numMapping[number]) {
        greatestFreq = numMapping[number];
        mode = number;
      }
    });
    return mode;
  };
  // Set grid #1 state from OpenWeather API.
  const fetchWeatherByCity = (city: LocationType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${locations[currentCityIndex].latitude}&lon=-${locations[currentCityIndex].longitude}&exclude=hourly,minutely&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((json) => {
        // first grid state modifications
        setMorningTemp(json.daily[currentPageIndex].temp.morn);
        setDayTemp(json.daily[currentPageIndex].temp.day);
        setNightTemp(json.daily[currentPageIndex].temp.night);
        setHumidity(json.daily[currentPageIndex].humidity);
        // second grid state modifications
        setMean(
          calculateMean([
            json.daily[currentPageIndex].temp.morn,
            json.daily[currentPageIndex].temp.day,
            json.daily[currentPageIndex].temp.eve,
            json.daily[currentPageIndex].temp.night,
          ])
        );
        setMode(
          calculateMode([
            json.daily[currentPageIndex].temp.morn,
            json.daily[currentPageIndex].temp.day,
            json.daily[currentPageIndex].temp.eve,
            json.daily[currentPageIndex].temp.night,
          ])
        );
        setMaximum(
          calculateMaximum([
            json.daily[0].temp.max,
            json.daily[1].temp.max,
            json.daily[2].temp.max,
            json.daily[3].temp.max,
            json.daily[4].temp.max,
          ])
        );
        setMinimum(
          calculateMinimum([
            json.daily[0].temp.min,
            json.daily[1].temp.min,
            json.daily[2].temp.min,
            json.daily[3].temp.min,
            json.daily[4].temp.min,
          ])
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchWeatherByCity(locations[0]);
  }, [currentPageIndex, currentCityIndex]);

  // Calculate next day dependencies
  const nextDay = () => {
    if (currentPageIndex >= 4) {
      setCurrentPageIndex(0);
    } else {
      setCurrentPageIndex((prev) => prev + 1);
    }
  };

  return (
    <Container>
      <ContainerWhiteSpace />
      <WeatherPanel>
        <CityTitleContainer>
          <CityTitleText>
            {locations[currentCityIndex].name}
          </CityTitleText>
        </CityTitleContainer>
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
            <WeatherRowValue>{minimum}</WeatherRowValue>
          </Weather5dayRow>
          <Weather5dayRow>
            <WeatherRowTitle>Maximum value</WeatherRowTitle>
            <WeatherRowValue>{maximum}</WeatherRowValue>
          </Weather5dayRow>
          <Weather5dayRow>
            <WeatherRowTitle>Mean value</WeatherRowTitle>
            <WeatherRowValue>{mean}</WeatherRowValue>
          </Weather5dayRow>
          <Weather5dayRow>
            <WeatherRowTitle>Mode value</WeatherRowTitle>
            <WeatherRowValue>{mode}</WeatherRowValue>
          </Weather5dayRow>
        </Weather5dayBox>
        <DayChangeRow>
          <DayCounter>Day: {currentPageIndex + 1}/5</DayCounter>
          <DayChangeButton onPress={nextDay}>
            <DayChangeButtonText>NEXT DAY</DayChangeButtonText>
          </DayChangeButton>
        </DayChangeRow>
      </WeatherPanel>
    </Container>
  );
}
