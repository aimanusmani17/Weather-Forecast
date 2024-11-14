import React, { useEffect, useState } from "react";
import axios from "axios";
import Styles from "../styles/Weather.module.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";

const Season = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("london");
  const [inputValue, setInputValue] = useState("");

  const fetchWeatherData = async () => {
    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/current.json",
      params: { q: `${city}` },
      headers: {
        "x-rapidapi-key": "2d2b9e9007msh350b33229d95bb7p15eec8jsnfce9a6f311d9",
        "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      const data = response.data;
      setWeatherData(response.data);
       setError(null); // Clear error if data is successfully fetched
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        setError("City not found. Please enter a valid city name.");
      } else {
        setError("Failed to fetch weather data. Please try again.");
      }
      setWeatherData(null); // Clear any previous weather data
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  const handleSearch = () => {
    if (inputValue.trim()) {
      setCity(inputValue.trim());
    }
  };

  return (
    <>
      <div className={Styles.main}>
        <h1 className={Styles.header}>"Today's Forecast"</h1>
        <div className={Styles.container}>
          <div className={Styles.searchContainer}>
            <input
              className={Styles.searchBar}
              type="text"
              placeholder="search"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <img
              src={search_icon}
              alt="Search icon"
              className={Styles.searchImg}
              onClick={handleSearch}
            />
          </div>

          {error && <p className={Styles.error}>{error}</p>}

          {weatherData && (
            <>
              <div>
                <img
                src={weatherData.current.condition.icon}
                  // src={clear_icon}
                  className={Styles.weatherIcon}
                  alt="Weather icon"
                />
                <p className={Styles.temperature}>
                  {weatherData?.current.temp_c} °C
                </p>
                <p className={Styles.location}>{weatherData?.location.name}</p>
              </div>
              <div className={Styles.weatherDataContainer}>
                <div className={Styles.weatherData}>
                  <img
                    src={humidity_icon}
                    className={Styles.humidityIcon}
                    alt="Humidity icon"
                  />
                  <div className={Styles.col}>
                    <p>{weatherData?.current.humidity}%</p>
                    <span>Humidity</span>
                  </div>
                </div>
                <div className={Styles.weatherData}>
                  <img
                    src={wind_icon}
                    className={Styles.windIcon}
                    alt="Wind icon"
                  />
                  <div className={Styles.col}>
                    <p>{weatherData?.current.wind_kph} km/h</p>
                    <span>Wind Speed</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Season;
