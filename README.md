# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Run with `npm run start`

A simple weather widget that displays a variety of weather details for either the current or a given location.

## Key Features

- Current weather brief
- Hourly forecast (5 hours)
- Daily forecast (7 days)
- Current weather detail
- Daily forecast selection
- Forecast by zipcode
- Forecast by currently detected location

## Project Architecture

While the project is fairly straightforward, I opted for a 2 layer design to distinguish between
the application and presentation related code/logic. This was mostly a means of exercise and demonstration,
but given the complex JSON object returned from OpenWeather's API it ended up serving the project, particularly when
fleshing out the presentation layer.

Application services exist for both geolocation and weather related requests/logic, with the latter exposing 2 public
methods that a component can use. The weather/geo services are interfaced to allow for swapping APIs.
The WeatherWidget receives an implementation of the WeatherServiceInterface that it can then use in the presentation layer.

## Remarks

I intentionally didn't invest too much time into the styling of the app as it was largely a functional exercise. I also
opted to not componetize every part of the view as the app is very simple. Much of the WeatherWidget logic could be used
in a custom hook, but it's not necessary.