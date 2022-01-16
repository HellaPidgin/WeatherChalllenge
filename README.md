# Sam's Open Weather App

## Data
- Minimum: Uses the min value from all 5 days
- Maximum: Uses the max value from all 5 days
- Mean: Takes the mean from the morning, day, evening and night
- Mode: Takes the mode from the morning, day, evening and night

## To Test
- Comment out  `fetchWeatherByCity(locations[0]);` from useEffects
- Run `yarn test` from root directory.

## Alternative Data order.
- Alternative Mean: This could have taken a larger array or weather forecasts. Instead of  morning, day, evening and night from the current day, it could have been  morning, day, evening and night from all 5 days.
- Alternative Mode: Same as `Alternative mean`.

## Extra Features
- Toggle Location: I have a few locations saved in there. This could be a list of buttons that changes the Latitude and Longitude of the API.

- Offline mode: There are various offline states for the API. This could be UI changes that reflect each of those.

