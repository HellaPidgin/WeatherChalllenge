# Sam's Open Weather App

## Get Started
You can run this expo project on the web or on a device (IOS or Android). If you're already signed into Expo, run the project [here](https://exp.host/@merciyah/WeatherChallenge)
1. Make use you have Expo Installed. You can do so [here](https://docs.expo.dev/get-started/installation/)
2. Clone the code from this repo
3. Enter directory `cd WeatherChallenge` and run `yarn && expo start`.
4. Done.

## To Test
### Coverage
Testing only covers button use for now.
- Comment out  `fetchWeatherByCity(locations[0]);` from useEffects
- Run `yarn test` from root directory.
## Data
- Minimum: Uses the min value from all 5 days
- Maximum: Uses the max value from all 5 days
- Mean: Takes the mean from the morning, day, evening and night
- Mode: Takes the mode from the morning, day, evening and night
## Alternative Data order.
- Alternative Mean: This could have taken a larger array or weather forecasts. Instead of  morning, day, evening and night from the current day, it could have been  morning, day, evening and night from all 5 days.
- Alternative Mode: Same as `Alternative mean`.

## Extra Features
- Toggle Location: I have a few locations saved in there. This could be a list of buttons that changes the Latitude and Longitude of the API.

- Offline mode: There are various offline states for the API. This could be UI changes that reflect each of those.

## Navigation & Provider
- I've included an empty provider and a navigator with a single child for assessment purposes only.
