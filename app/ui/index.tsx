import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import styled from "styled-components/native";
import { API_KEY} from '../utils/api';
import { colors } from '../utils/colors';

// React Native Styled Component Dependencies
export const Container = styled.View`
  flex: 1;
  background-color: ${colors.GreenSheen};
`;
export default function index() {
    const fetchWeatherByCity = (cityName : string) => {
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cityName},us&appid=${API_KEY}`
        )
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
          })
          .catch((error) => {
            console.error(error);
          });;
        
    }

    useEffect(() => {
        fetchWeatherByCity("London")
    }, [])
    return (
        <View>
            <Text>Hello World</Text>
        </View>
    )
}
