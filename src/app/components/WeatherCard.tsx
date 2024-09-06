"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import sun from "../assets/icons/sun.png";
import cloud from "../assets/icons/cloud.png";
import fog from "../assets/icons/fog.png";
import rain from "../assets/icons/rain.png";
import snow from "../assets/icons/snow.png";
import storm from "../assets/icons/storm.png";
import wind from "../assets/icons/windy.png";
import { useStateContext } from "../context";
import { useDate } from "../utils/useDate";

const WeatherCard: React.FC = () => {
  const {
    weather,
    dailyForecast,
    thisLocation,
    unit,
    toggleUnit,
    addFavoriteCity,
    favorites,
    removeFavoriteCity,
    setPlace,
  } = useStateContext();

  const { temp: temperature, wspd: windspeed, humidity, conditions } = weather;
  const { time } = useDate();
  const [icon, setIcon] = useState(sun);
  const [weatherData, setWeatherData] = useState(weather);

  const fetchWeather = async (cityName: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=39fa253ed90990b5913f49d2a03aa382`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    const iconString = conditions;
    if (iconString) {
      if (iconString.toLowerCase().includes("cloud")) {
        setIcon(cloud);
      } else if (iconString.toLowerCase().includes("rain")) {
        setIcon(rain);
      } else if (iconString.toLowerCase().includes("clear")) {
        setIcon(sun);
      } else if (iconString.toLowerCase().includes("thunder")) {
        setIcon(storm);
      } else if (iconString.toLowerCase().includes("fog")) {
        setIcon(fog);
      } else if (iconString.toLowerCase().includes("snow")) {
        setIcon(snow);
      } else if (iconString.toLowerCase().includes("wind")) {
        setIcon(wind);
      }
    }
  }, [conditions]);

  const displayTemp =
    unit === "metric" ? temperature : ((temperature * 9) / 5 + 32).toFixed(1);

  return (
    <div className="main-container flex flex-col md:flex-row items-center justify-center md:justify-between gap-8">
      {/* Weather Card */}
      <div className="weather-card w-full md:w-[22rem] min-w-[22rem] h-auto glassCard p-4">
        <div className="flex w-full justify-center items-center gap-4 mt-12 mb-4">
          <Image src={icon} alt="weather_icon" width={64} height={64} />
          <p className="font-bold text-5xl flex justify-center items-center">
            {displayTemp} &deg;{unit === "metric" ? "C" : "F"}
          </p>
        </div>
        <div className="font-bold text-center text-xl">{thisLocation}</div>
        <div className="w-full flex justify-between items-center mt-4">
          <span className="flex-1 text-center p-2">
            {new Date().toDateString()}
          </span>
          <span className="flex-1 text-center p-2">{time}</span>
        </div>
        <div className="w-full flex justify-between items-center mt-4 gap-4">
          <span className="flex-1 text-center p-2 font-bold bg-blue-600 shadow rounded-lg">
            Wind Speed <span className="font-normal">{windspeed} km/h</span>
          </span>
          <span className="flex-1 text-center p-2 font-bold rounded-lg bg-green-600">
            Humidity <span className="font-normal">{humidity} gm/m&#179;</span>
          </span>
        </div>
        <div className="w-full p-3 mt-4 flex justify-between items-center">
          <p className="font-semibold text-lg">Heat Index</p>
          <p className="text-lg">
            {weather.heatindex ? weather.heatindex : "N/A"}
          </p>
        </div>
        <hr className="bg-slate-600" />
        <div className="w-full p-4 flex justify-center items-center text-3xl font-semibold">
          {conditions}
        </div>
        <button
          onClick={toggleUnit}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Switch to {unit === "metric" ? "Fahrenheit" : "Celsius"}
        </button>
        <button
          onClick={addFavoriteCity}
          className="mt-1 p-2 bg-green-500 text-white rounded"
        >
          Add {thisLocation} to Favorites
        </button>
      </div>

      {/* Favorite Cities */}
      <div className="favorite-container p-4 bg-white rounded-lg shadow-lg w-full md:w-[20rem]">
        <h3 className="text-lg font-bold">Favorite Cities:</h3>
        <ul>
          {favorites.length > 0 ? (
            favorites.map((city) => (
              <li
                key={city.id}
                className="flex justify-between items-center p-2 border-b"
              >
                <span>{city.name}</span>
                <button
                  onClick={() => {
                    setPlace(city.name);
                    fetchWeather(city.name);
                  }}
                  className="ml-4 p-2 bg-blue-500 text-white rounded"
                >
                  View
                </button>
                <button
                  onClick={() => removeFavoriteCity(city.id)}
                  className="ml-4 p-2 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </li>
            ))
          ) : (
            <p>No favorite cities added yet.</p>
          )}
        </ul>
      </div>

      {/* 5-Day Forecast */}
      <div className="forecast-container p-4 bg-white rounded-lg shadow-lg w-full md:w-[25rem]">
        <h3 className="text-lg font-bold">5-Day Forecast:</h3>
        <div className="flex flex-col">
          {dailyForecast.map((forecast, index) => {
            const forecastDate = new Date();
            forecastDate.setDate(forecastDate.getDate() + index + 1);
            const forecastTemp =
              unit === "metric"
                ? forecast.temp.day
                : ((forecast.temp.day * 9) / 5 + 32).toFixed(1);
            return (
              <div
                key={forecastDate.toISOString()}
                className="flex justify-between p-2 border-b forecast-item"
              >
                <span>{forecastDate.toDateString()}</span>
                <span>
                  {forecastTemp} &deg;{unit === "metric" ? "C" : "F"}
                </span>
                <span>{forecast.conditions}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
