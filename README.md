# Open Weather

## Table of Contents

- [Open Weather](#open-weather)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Built With](#built-with)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
  - [Future Updates](#future-updates)


 

## Introduction

This project is a weather application built with React, Typescript and OpenWeatherMap API. It allows users to search for cities, view weather data, and toggle between light and dark modes. The application utilizes local storage to persist the global state and dynamically updates the UI based on user preferences and actions. You can find the demo of the app here [OpenWeather](https://akshaymalik1995.github.io/weather-app/).

![](https://i.imgur.com/NT6jJWH.png)

## Built With
- [React](https://react.dev/) - A fast, in-demand JavaScript library for building user interfaces.
- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript.
- [OpenWeatherMap API](https://openweathermap.org/) - Provides weather data and forecasts for numerous cities worldwide.
- [The Companies Search City Api](https://www.thecompaniesapi.com/api/search-cities) - Offers a database of cities with an enrichment api.


## Getting Started

### Prerequisites

Ensure you have Node.js installed on your machine. You can download it from [Node.js official website](https://nodejs.org).

### Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the necessary dependencies by running:

```bash
npm install
```

or if you are using Yarn:

```bash
yarn install
```

4. Add an `.env` file and add your OpenWeatherMap api key.
  
```.env
VITE_OPEN_WEATHER_KEY=your_secret_key
```

5. Start the development server:

```bash
npm start
```

or if you are using Yarn:

```bash
yarn start
```

This command runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## Usage

After starting the application, you can interact with it as follows:


- **Allow Location Access**: You will prompted to give location access. If you allow, the weather of your current location will appear.
- **Search for a city**: Use the search form to enter the name of a city. As soon as you start typing, an autocomplete dropdown for cities shall appear. You can choose a city from the dropdown. You can also enter the city name and Press Enter or click the search button to fetch the weather data for that city.
- **View weather data**: Once a city is searched, its weather data will be displayed. Each city's weather data includes temperature, weather conditon and local time and date for that city.
- **Delete City Weather** : You can delete the city weather data which has been searched before by clicking on the delete icon.
- **Refresh City Weather** : You can refresh the city weather data of any previously searched city by clicking on the refresh button.
- **Toggle dark mode**: Click on the Dark Mode Switch component located on the right the title to toggle between light and dark themes.

## Future Updates

- Add different attributes to search a location such as zipcode, coordinates and more.
- Show more data for a location such as humidity, minimum and maximum temperatures, wind speed and more. Possibly a different page to show all these attributes.
- Automatic update of weather for all previously searched cities on page refresh.


