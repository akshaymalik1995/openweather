import { ReactElement } from "react";
import { LuSun } from "react-icons/lu";
import { IoCloudSharp } from "react-icons/io5";
import { IoRainy } from "react-icons/io5";
import { IoIosThunderstorm } from "react-icons/io";
import { BsCloudDrizzleFill } from "react-icons/bs";
import getCityTime from "../lib/getCityTime";

interface IWeatherIconMapping {
  [weather: string]: ReactElement;
}

export default function WeatherCard(props: { weatherData: any }) {
  const weatherData = props.weatherData;

  const weatherIconMapping: IWeatherIconMapping = {
    Clear: <LuSun />,
    Clouds: <IoCloudSharp />,
    Rain: <IoRainy />,
    Thunderstorm: <IoIosThunderstorm />,
    Drizzle: <BsCloudDrizzleFill />,
  };

  return (
    <div className="">
      <div className="">
        <h2 className="text-6xl text-center my-12 dark:text-white">
          {weatherData.location}, {weatherData.country}
        </h2>
        <div className="mx-auto bg-opacity-60 flex flex-col max-w-2xl  dark:bg-gray-800 shadow-lg w-full rounded-lg dark:text-gray-100">
          <div className="p-4 dark:text-gray-800 flex justify-between  bg-gray-100 ">
            <div>Current Weather</div>
            <div>
              {weatherData.timezone && getCityTime(weatherData.timezone)}
            </div>
          </div>
          <div className="grid items-center px-4 py-4 grid-cols-2">
            <div className="flex items-center gap-4  col-span-1">
              <div className="dark:text-white flex flex-col  gap-2  px-2 rounded p-1 ">
                <div className="flex gap-2 items-center ">
                  {weatherData.weather in weatherIconMapping ? (
                    <div className="text-6xl">
                      {weatherIconMapping[weatherData.weather]}
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="text-[6rem] md:text-[7rem] leading-none relative">
                    <div>
                      {weatherData.temperature &&
                        weatherData.temperature.toFixed()}
                    </div>
                    <div className="absolute -right-3 md:-right-8  font-bold -top-1 md:-top-2 text-3xl md:text-5xl">
                      o
                    </div>
                    <div className="absolute -right-4 md:-right-7 text-gray-400 font-bold bottom-2 text-3xl  md:text-5xl">
                      c
                    </div>
                  </div>
                </div>
                <div className="font-bold text-lg ">
                  {weatherData.weatherDescription &&
                    weatherData.weatherDescription.toUpperCase()}
                </div>
              </div>
            </div>
            <div className="flex col-span-1  flex-col">
              <div className=" px-4 p-2 font-semibold flex justify-between ">
                <span>Feels Like</span>{" "}
                <span>
                  {weatherData.feelsLike && weatherData.feelsLike.toFixed()}°
                </span>
              </div>
              <div className=" px-4 p-2 font-semibold flex justify-between ">
                <span>Humidity</span> <span>{weatherData.humidity}%</span>
              </div>
              <div className=" px-4 p-2 font-semibold flex justify-between ">
                <span>Wind Speed</span> <span>{weatherData.windSpeed} m/s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
