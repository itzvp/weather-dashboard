// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// // import sun from "@/app/assets/icons/sun.png";
// import sun from "../assets/icons/sun.png";
// import cloud from "../assets/icons/cloud.png";
// import fog from "../assets/icons/fog.png";
// import rain from "../assets/icons/rain.png";
// import snow from "../assets/icons/snow.png";
// import storm from "../assets/icons/storm.png";
// import wind from "../assets/icons/windy.png";
// import { useStateContext } from "../context";

// const WeatherCard: React.FC = () => {
//   const {
//     weather,
//     dailyForecast,
//     thisLocation,
//     unit,
//     toggleUnit,
//     addFavoriteCity,
//     favorites,
//     removeFavoriteCity,
//     setPlace, // To set the location when viewing a favorite city
//     place, // Current place to fetch weather for
//   } = useStateContext();

//   const { temp: temperature, wspd: windspeed, humidity, conditions } = weather;

//   // State for the current time
//   const [currentTime, setCurrentTime] = useState<string>(
//     new Date().toLocaleTimeString()
//   );

//   const formatDate = (date: Date) => {
//     return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
//   };

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCurrentTime(new Date().toLocaleTimeString());
//     }, 1000);

//     // Clear the interval on component unmount
//     return () => clearInterval(intervalId);
//   }, []);

//   // Convert temperature based on unit
//   const displayTemp =
//     unit === "metric" ? temperature : ((temperature * 9) / 5 + 32).toFixed(1); // Convert to Fahrenheit

//   return (
//     <div className="w-[22rem] min-w-[22rem] h-[30rem] glassCard p-4">
//       <div className="flex w-full justify-center items-center gap-4 mt-12 mb-4">
//         <Image src={sun} alt="weather_icon" width={64} height={64} />
//         <p className="font-bold text-5xl flex justify-center items-center">
//           {displayTemp} &deg;{unit === "metric" ? "C" : "F"}
//         </p>
//       </div>
//       <div className="font-bold text-center text-xl">{thisLocation}</div>
//       <div className="w-full flex justify-between items-center mt-4">
//         <span className="flex-1 text-center p-2">
//           {new Date().toDateString()}
//         </span>
//         <span className="flex-1 text-center p-2">{currentTime}</span>
//       </div>
//       <div className="w-full flex justify-between items-center mt-4 gap-4">
//         <span className="flex-1 text-center p-2 font-bold bg-blue-600 shadow rounded-lg">
//           Wind Speed <span className="font-normal">{windspeed} km/h</span>
//         </span>
//         <span className="flex-1 text-center p-2 font-bold rounded-lg bg-green-600">
//           Humidity <span className="font-normal">{humidity} gm/m&#179;</span>
//         </span>
//       </div>
//       <hr className="bg-slate-600" />
//       <div className="w-full p-4 flex justify-center items-center text-3xl font-semibold">
//         {conditions}
//       </div>
//       <button
//         onClick={toggleUnit}
//         className="mt-4 p-2 bg-blue-500 text-white rounded"
//       >
//         Switch to {unit === "metric" ? "Fahrenheit" : "Celsius"}
//       </button>
//       <button
//         onClick={addFavoriteCity}
//         className="mt-4 p-2 bg-green-500 text-white rounded"
//       >
//         Add {thisLocation} to Favorites
//       </button>

//       {/* Display Favorite Cities */}
//       <div className="mt-4">
//         <h3 className="text-lg font-bold">Favorite Cities:</h3>
//         <ul>
//           {favorites.length > 0 ? (
//             favorites.map((city) => (
//               <li
//                 key={city.id}
//                 className="flex justify-between items-center p-2 border-b"
//               >
//                 <span>{city.name}</span>
//                 {/* View Button */}
//                 <button
//                   onClick={() => {
//                     setPlace(city.name); // Set the place to display weather for that favorite city
//                   }}
//                   className="ml-4 p-2 bg-blue-500 text-white rounded"
//                 >
//                   View
//                 </button>
//                 <button
//                   onClick={() => removeFavoriteCity(city.id)} // Remove favorite city
//                   className="ml-4 p-2 bg-red-500 text-white rounded"
//                 >
//                   Remove
//                 </button>
//               </li>
//             ))
//           ) : (
//             <p>No favorite cities added yet.</p>
//           )}
//         </ul>
//       </div>

//       {/* 5-Day Forecast */}
//       <div className="mt-4">
//         <h3 className="text-lg font-bold">5-Day Forecast:</h3>
//         <div className="flex flex-col">
//           {dailyForecast.map((forecast, index) => {
//             // Calculate the date for the forecast
//             const forecastDate = new Date();
//             forecastDate.setDate(forecastDate.getDate() + index + 1); // Get next days

//             // Convert daily forecast temperature
//             const forecastTemp =
//               unit === "metric"
//                 ? forecast.temp.day
//                 : ((forecast.temp.day * 9) / 5 + 32).toFixed(1); // Convert to Fahrenheit

//             return (
//               <div
//                 key={forecastDate.toISOString()}
//                 className="flex justify-between p-2 border-b"
//               >
//                 <span>{formatDate(forecastDate)}</span>
//                 <span>
//                   {forecastTemp} &deg;{unit === "metric" ? "C" : "F"}
//                 </span>
//                 <span>{forecast.conditions}</span>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WeatherCard;

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
import { useDate } from "../utils/useDate"; // Import useDate hook if necessary

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
    setPlace, // To set the location when viewing a favorite city
  } = useStateContext();

  const { temp: temperature, wspd: windspeed, humidity, conditions } = weather;

  // State for the current time
  const { time } = useDate(); // Get the current time from the useDate hook
  const [icon, setIcon] = useState(sun);

  useEffect(() => {
    const iconString = conditions; // Assuming conditions will be used for the icon
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

  // Convert temperature based on unit
  const displayTemp =
    unit === "metric" ? temperature : ((temperature * 9) / 5 + 32).toFixed(1); // Convert to Fahrenheit

  return (
    <div className="w-[22rem] min-w-[22rem] h-[30rem] glassCard p-4">
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
        className=" p-2 bg-blue-500 text-white rounded"
      >
        Switch to {unit === "metric" ? "Fahrenheit" : "Celsius"}
      </button>
      <button
        onClick={addFavoriteCity}
        className="mt-1  p-2 bg-green-500 text-white rounded"
      >
        Add {thisLocation} to Favorites
      </button>

      {/* Display Favorite Cities */}
      <div className="favorite-container">
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
                    setPlace(city.name); // Set the place to display weather for that favorite city
                  }}
                  className="ml-4 p-2 bg-blue-500 text-white rounded"
                >
                  View
                </button>
                <button
                  onClick={() => removeFavoriteCity(city.id)} // Remove favorite city
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
      <div className="forecast-container">
        <h3 className="text-lg font-bold">5-Day Forecast:</h3>
        <div className="flex flex-col">
          {dailyForecast.map((forecast, index) => {
            // Calculate the date for the forecast
            const forecastDate = new Date();
            forecastDate.setDate(forecastDate.getDate() + index + 1); // Get next days

            // Convert daily forecast temperature
            const forecastTemp =
              unit === "metric"
                ? forecast.temp.day
                : ((forecast.temp.day * 9) / 5 + 32).toFixed(1); // Convert to Fahrenheit

            return (
              <div
                key={forecastDate.toISOString()}
                className="flex justify-between p-2 border-b"
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
