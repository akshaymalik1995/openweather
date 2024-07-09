import "./App.css";
import SearchForm from "./components/SearchForm";
import { useEffect } from "react";

import DarkModeSwitch from "./components/DarkModeSwitch";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import Weather from "./components/Weather";

function App() {
  const savedSearchHistory = localStorage.getItem("searchHistory")
    ? JSON.parse(localStorage.getItem("searchHistory")!)
    : [];

  const [searchParams, setSearchParams] = useState<{
    city: string;
    countryCode: string;
  }>({ city: "", countryCode: "" });

  const [searchHistory, setSearchHistory] =
    useState<{ city: string; countryCode: string }[]>(savedSearchHistory);

  const [darkModeOn, setDarkModeOn] = useState(false);

  function toggleDarkMode() {
    setDarkModeOn((prev) => !prev);
    localStorage.setItem("darkMode", JSON.stringify(!darkModeOn));
  }

  useEffect(() => {
    try {
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    } catch (error) {
      console.error("Failed to add search history to localStorage");
    }
  }, [searchHistory]);

  useEffect(() => {
    try {
      const darkMode = localStorage.getItem("darkMode");
      if (darkMode) {
        setDarkModeOn(JSON.parse(darkMode));
      }
    } catch (error) {
      console.error("Failed to retrieve dark mode from localStorage");
    }
  }, []);

  function deleteSearchItem(city: string, countryCode: string) {
    setSearchHistory((prev) =>
      prev.filter(
        (item) => item.city !== city && item.countryCode !== countryCode
      )
    );
  }

  useEffect(() => {
    if (!darkModeOn) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [darkModeOn]);

  return (
    <div className=" dark:bg-gray-900  min-h-screen ">
      <div className="mx-auto   p-4 max-w-4xl">
        <div className="flex items-center justify-between  my-8">
          <h1 className="text-4xl dark:text-white text-gray-700  font-semibold text-center">
            OpenWeather
          </h1>
          <DarkModeSwitch
            darkModeOn={darkModeOn}
            toggleDarkMode={toggleDarkMode}
          />
        </div>

        <SearchForm setSearchParams={setSearchParams} />

        <div className="my-2 flex flex-wrap gap-4">
          {searchHistory.map((item, index) => (
            <div
              className="items-center dark:bg-gray-800 border shadow flex gap-4 rounded bg-white"
              key={index}
            >
              <div
                onClick={() =>
                  setSearchParams({
                    city: item.city,
                    countryCode: item.countryCode,
                  })
                }
                className="p-2  dark:text-white px-3 cursor-pointer"
              >
                {item.city}
                {item.countryCode ? (
                  <span>, {item.countryCode.toUpperCase()}</span>
                ) : (
                  ""
                )}
              </div>

              <div
                onClick={() => deleteSearchItem(item.city, item.countryCode)}
                className="h-full w-8  cursor-pointer hover:bg-red-300 flex bg-red-200 text-red-500 justify-center items-center"
              >
                <MdDeleteForever />
              </div>
            </div>
          ))}
        </div>

        <Weather
          setSearchHistory={setSearchHistory}
          searchParams={searchParams}
        />
      </div>
    </div>
  );
}

export default App;
