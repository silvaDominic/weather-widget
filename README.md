# Getting Started with Vite

This project was bootstrapped with Vite.

Install dependencies with `npm install`
Run with `npm run dev`

A simple weather widget that displays a variety of weather details for either the current or a given location.

## Key Features

- Forecast by zipcode or city
- Forecast by currently detected location
- Current weather brief
- Hourly forecast
- Current weather detail

## Project Architecture

While the project is fairly straightforward, I opted for a 2 layer design to distinguish between
the application and presentation related code/logic. This was mostly a means of exercise and demonstration,
but given that Weather APIs often return complex data and require communicating with multiple APIs it ended up serving the project, particularly well.

Application services exist for both geolocation and weather related requests/logic. The weather/geo services are interfaced to allow for swapping APIs. Below is the system design document describing the project in detail:

![weather-widget_front-end-system-design.jpg](documentation-resources%2Fweather-widget_front-end-system-design.jpg)
