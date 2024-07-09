import {
  LineChart,
  XAxis,
  Tooltip,
  YAxis,
  CartesianGrid,
  Line,
} from "recharts";

import { LuSun } from "react-icons/lu";
import { IoCloudSharp } from "react-icons/io5";
import { IoRainy } from "react-icons/io5";
import { IoIosThunderstorm } from "react-icons/io";
import { BsCloudDrizzleFill } from "react-icons/bs";
import { ReactElement } from "react";

interface IWeatherIconMapping {
  [weather: string]: ReactElement;
}

const weatherIconMapping: IWeatherIconMapping = {
  Clear: <LuSun />,
  Clouds: <IoCloudSharp />,
  Rain: <IoRainy />,
  Thunderstorm: <IoIosThunderstorm />,
  Drizzle: <BsCloudDrizzleFill />,
};

function convertDateToDay(date: string): string {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dateObject = new Date(date);
  // Check if dateObject is today
  if (
    dateObject.getDate() === new Date().getDate() &&
    dateObject.getMonth() === new Date().getMonth() &&
    dateObject.getFullYear() === new Date().getFullYear()
  ) {
    return "Today";
  }
  // Check if dateObject is tomorrow
  if (
    dateObject.getDate() === new Date().getDate() + 1 &&
    dateObject.getMonth() === new Date().getMonth() &&
    dateObject.getFullYear() === new Date().getFullYear()
  ) {
    return "Tomorrow";
  }
  const day = dateObject.getDay();
  return days[day];
}

function dailyDataList(data: any): { [key: string]: any[] } {
  const dailyData: { [key: string]: any[] } = {};
  if (!data) return dailyData;
  data.forEach((item: any) => {
    const date = item.dt_txt.split(" ")[0];
    if (!dailyData[date]) {
      dailyData[date] = [];
    }
    dailyData[date].push(item);
  });

  return dailyData;
}

// Custom tooltip content rendering function
const CustomTooltip = ({ active, payload }: { active: any; payload: any }) => {
  if (active && payload && payload.length) {
    const temp = payload[0].value; // Assuming the temperature is the first item in the payload
    return (
      <div className="custom-tooltip">
        <p className="font-bold p-2 bg-blue-100 text-blue-600 rounded">{`${temp}°c `}</p>{" "}
        {/* Display temperature with degree symbol */}
      </div>
    );
  }

  return null;
};

function averageData(data: any[]): any {
  if (!data) return {};
  const average = data.reduce(
    (acc, item) => {
      acc.temp += item.main.temp;
      acc.feels_like += item.main.feels_like;
      acc.humidity += item.main.humidity;
      acc.wind_speed += item.wind.speed;
      return acc;
    },
    { temp: 0, feels_like: 0, humidity: 0, wind_speed: 0 }
  );

  return {
    temp: average.temp / data.length,
    feels_like: average.feels_like / data.length,
    humidity: average.humidity / data.length,
    wind_speed: average.wind_speed / data.length,
  };
}

function forecastList(averages: any): any {
  const result = {
    temp: [] as any[],
    humidity: [] as any[],
    wind_speed: [] as any[],
    feels_like: [] as any[],
    date: [] as any[],
  };
  averages.forEach((item: any) => {
    const temp = item.temp.toFixed();
    const humidity = item.humidity.toFixed();
    const wind_speed = item.wind_speed.toFixed();
    const feels_like = item.feels_like.toFixed();
    const date = convertDateToDay(item.date);
    result.temp.push({ temp, date });
    result.humidity.push({ humidity, date });
    result.wind_speed.push({ wind_speed, date });
    result.feels_like.push({ feels_like, date });
  });
  return result;
}

export default function WeatherForecast(props: { forecastData: any }) {
  const dailyData = props.forecastData.list
    ? dailyDataList(props.forecastData.list)
    : {};
  const dailyAverages = Object.keys(dailyData).map((date) => {
    const data = dailyData[date];
    const averages = averageData(data);

    return {
      date,
      ...averages,
      weather: data[0].weather[0].main,
      weatherDescription: data[0].weather[0].description,
      icon: data[0].weather[0].icon,
    };
  });

  console.log(dailyAverages);

  const dataVariationsOverDays = forecastList(dailyAverages);
  console.log(dataVariationsOverDays);

  return (
    <>
      {dataVariationsOverDays?.temp?.length > 0 ? (
        <div className="max-w-2xl my-24 mx-auto">
          <div>
            <div className="text-4xl dark:text-white my-8 mb-16">
              5-Day Forecast
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-300 ">
              <thead className="text-xs text-gray-700 text-bold uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="p-2">Weather</th>
                  {dailyAverages.map((day: any) => (
                    <th key={day.date} className="p-2">
                      {convertDateToDay(day.date)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2">Temperature</td>
                  {dailyAverages.map((day: any) => (
                    <td key={day.date} className="p-2">
                      {day.temp.toFixed()}°
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-2">Feels Like</td>
                  {dailyAverages.map((day) => (
                    <td key={day.date} className="p-2">
                      {day.feels_like?.toFixed()}°
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-2">Humidity</td>
                  {dailyAverages.map((day: any) => (
                    <td key={day.date} className="p-2">
                      {day.humidity?.toFixed()}%
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-2">Wind Speed</td>
                  {dailyAverages.map((day: any) => (
                    <td key={day.date} className="p-2">
                      {day.wind_speed.toFixed()}m/s
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-2">Description</td>
                  {dailyAverages.map((day: any) => (
                    <td key={day.date} className="p-2">
                      {day.weather in weatherIconMapping ? (
                        <span className="text-xl ">
                          {weatherIconMapping[day.weather]}
                        </span>
                      ) : (
                        day.weather
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
            <div className="my-8">
              <LineChart
                className="my-8"
                width={600}
                height={300}
                data={dataVariationsOverDays.temp}
              >
                <XAxis dataKey="date" />
                <YAxis domain={["dataMin - 3", "dataMax + 3"]} />
                <Tooltip
                  content={
                    <CustomTooltip active={undefined} payload={undefined} />
                  }
                />
                <CartesianGrid stroke="#f5f5f5" />
                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="#ff7300"
                  yAxisId={0}
                />
              </LineChart>
            </div>
          </div>
        </div>
      ) : (
        "No data available"
      )}
    </>
  );
}
