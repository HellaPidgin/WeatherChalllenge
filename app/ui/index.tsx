import React from 'react'
import { View, Text } from 'react-native'
import { API_KEY} from '../utils/api';

export default function index() {
    const fetchWeatherByCity = (cityName : string) => {
        fetch(
          `api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`
        )
          .then((response) => response.json())
          .then((json) => {
            console.log(json)
          })
          .catch((error) => {
            console.error(error);
          });;
        
    }
    return (
        <View>
            <Text></Text>
        </View>
    )
}
