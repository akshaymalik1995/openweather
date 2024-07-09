import { useEffect } from "react";
import useGetFetch from "../lib/useGetFetch";
import WeatherCard from "./WeatherCard";
import WeatherForecast from "./WeatherForecast";
import { useState } from "react";
import Spinner from "./Spinner";

export default function Weather({
  searchParams,
  setSearchHistory,
}: {
  searchParams: any;
  setSearchHistory: any;
}) {
  const { city, countryCode } = searchParams;
  const [state, setState] = useState({
    forecastData: {},
    weatherData: {},
  });
  const {
    getData: getWeatherData,
    loading: weatherLoading,
    error: weatherError,
    setError: setWeatherError,
  } = useGetFetch();

  const {
    getData: getForecastData,
    loading: forecastLoading,
    error: forecastError,
    setError: setForecastError,
  } = useGetFetch();

  useEffect(() => {
    setWeatherError(null);
    setForecastError(null);
    if (!city) return;
    const OPEN_WEATHER_KEY = import.meta.env.VITE_OPEN_WEATHER_KEY;
    const getData = async () => {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${OPEN_WEATHER_KEY}&units=metric`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&appid=${OPEN_WEATHER_KEY}&units=metric`;
      const [weather, forecast] = await Promise.all([
        getWeatherData(weatherUrl),
        getForecastData(forecastUrl),
      ]);

      if (!weather || !forecast || weatherError || forecastError) return;

      const createdWeatherData = {
        location: weather.name,
        country: weather.sys.country,
        timezone: weather.timezone,
        feelsLike: weather.main.feels_like,
        temperature: weather.main.temp,
        weather: weather.weather[0].main,
        weatherDescription: weather.weather[0].description,
        humidity: weather.main.humidity,
        windSpeed: weather.wind.speed,
        icon: weather.weather[0].icon,
        createdAt: new Date().toISOString(),
      };

      setState({
        forecastData: forecast,
        weatherData: createdWeatherData,
      });

      setSearchHistory((prev: any) => {
        const newSearchHistory = [
          { city, countryCode },
          ...prev.filter(
            (item: any) =>
              item.city !== city || item.countryCode !== countryCode
          ),
        ];
        return newSearchHistory;
      });
    };

    getData();
  }, [searchParams]);

  return (
    <div>
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {weatherLoading || forecastLoading ? <Spinner /> : ""}
          {weatherError || forecastError ? (
            <div className="p-2 px-4 rounded bg-red-100 text-red-500">
              Error: city by that name not found
            </div>
          ) : (
            ""
          )}
          {Object.keys(state.weatherData).length ? (
            <WeatherCard weatherData={state.weatherData} />
          ) : (
            ""
          )}
          {Object.keys(state.forecastData).length ? (
            <WeatherForecast forecastData={state.forecastData} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
