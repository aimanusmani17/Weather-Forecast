import React, { useEffect, useState } from "react";
import axios from "axios";
import Styles from "../styles/Weather.module.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("london");
  const [inputValue, setInputValue] = useState("");
  // const [weatherIcon, setWeatherIcon] = useState(clear_icon);

  const fetchWeatherData = async () => {
    const options = {
      method: "GET",
      url: "https://open-weather13.p.rapidapi.com/city/delhi/EN",
      headers: {
        "x-rapidapi-key": "2d2b9e9007msh350b33229d95bb7p15eec8jsnfce9a6f311d9",
        "x-rapidapi-host": "open-weather13.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.get(
        "https://open-weather13.p.rapidapi.com/city/landon/EN",
        {
          headers: {
            "x-rapidapi-key":
              "2d2b9e9007msh350b33229d95bb7p15eec8jsnfce9a6f311d9",
            "x-rapidapi-host": "open-weather13.p.rapidapi.com",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleSearch = () => {
    if (inputValue.trim()) {
      setCity(inputValue.trim());
    }
  };

  return (
    <div className={Styles.main}>
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
                src={clear_icon}
                className={Styles.weatherIcon}
                alt="Weather icon"
              />
              <p className={Styles.temperature}>{weatherData.main.temp} °C</p>
              <p className={Styles.location}>{weatherData.name}</p>
            </div>
            <div className={Styles.weatherDataContainer}>
              <div className={Styles.weatherData}>
                <img
                  src={humidity_icon}
                  className={Styles.humidityIcon}
                  alt="Humidity icon"
                />
                <div className={Styles.col}>
                  <p>{weatherData.main.humidity}%</p>
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
                  <p>{weatherData.wind.speed} km/h</p>
                  <span>Wind Speed</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;
