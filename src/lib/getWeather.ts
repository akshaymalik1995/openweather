// Importing the type definition for the weather data
import { IWeatherData } from "../app/types";
// Importing a utility function to get the current time for a specific city based on its timezone
import getCityTime from "./getCityTime";


/**
 * Asynchronously retrieves weather data for a specified city and country
 * @param city The name of the city for which to retrieve weather data
 * @param countryCode The country code of the city. Example, "IN" for India
 * @returns An object containing weather data for the specified city
 */
export default async function getWeather(query: string) {
    try {
        // Retrieving the OpenWeatherMap API Key from environment variables
        const OPEN_WEATHER_KEY = import.meta.env.VITE_OPEN_WEATHER_KEY;
        // Constructing the URL for the OpenWeatherMap API Request
        const url = `https://api.openweathermap.org/data/2.5/weather?${query}&appid=${OPEN_WEATHER_KEY}&units=metric`;

        // Make the API request
        const response = await fetch(url);
        // Parsing the JSON Response
        const data = await response.json();
        // Checking if the response was successfull
        if (!response.ok) {
            throw new Error(data?.message ? data.message : "");
        }

        console.log(data)

        // Mapping the raw data to a more structures format defined by IWeatherData
        const weatherData: IWeatherData = {
            id: data.id,
            location: data.name,
            time: getCityTime(data.timezone),
            country: data.sys.country,
            temperature: data.main.temp,
            weather: data.weather[0].main,
            createdAt: new Date().getTime(),
            lat: data.coord.lat,
            lon: data.coord.lon,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed
        };

        // Returning the weather data
        return weatherData;
    } catch (error) {
        // Logging errors for debugging purposes
        console.error(error)
        // Throwing an error with a message if the API fails
        throw Error(error instanceof Error ? error.message : "Weather API Failed")
    }
}
