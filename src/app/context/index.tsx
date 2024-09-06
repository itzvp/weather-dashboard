// "use client";
// import { useContext, createContext, useState, useEffect } from "react";
// import axios from "axios";

// interface Weather {
//   temp: number;
//   humidity: number;
//   conditions: string;
//   wspd: number;
//   heatindex?: number;
// }

// interface DailyForecast {
//   date: string;
//   temp: {
//     day: number;
//     min: number;
//     max: number;
//   };
//   conditions: string;
// }

// interface LocationData {
//   name: string;
//   region: string;
//   country: string;
//   lat: number;
//   lon: number;
// }
// interface FavoriteCity {
//   id: number;
//   name: string;
// }
// interface ContextProps {
//   weather: Weather;
//   setPlace: React.Dispatch<React.SetStateAction<string>>;
//   values: LocationData | null;
//   thisLocation: string;
//   place: string;
//   dailyForecast: DailyForecast[];
//   favorites: FavoriteCity[];
//   addFavoriteCity: () => void;
//   removeFavoriteCity: (id: number) => void;
//   unit: string;
//   toggleUnit: () => void;
// }

// const StateContext = createContext<ContextProps | undefined>(undefined);

// export const StateContextProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [weather, setWeather] = useState<Weather>({
//     temp: 0,
//     humidity: 0,
//     conditions: "",
//     wspd: 0,
//   });
//   const [values, setValues] = useState<LocationData | null>(null);
//   //   const [place, setPlace] = useState<string>("Delhi");
//   // const [place, setPlace] = useState<string>(() => {
//   //   return localStorage.getItem("lastCity") || "Delhi"; // Load from local storage
//   // });
//   const [place, setPlace] = useState<string>(() => {
//     if (typeof window !== "undefined") {
//       return localStorage.getItem("lastCity") || "Delhi"; // Fallback to "Delhi" if undefined
//     }
//     return "Delhi"; // Fallback for server-side rendering
//   });

//   const [thisLocation, setThisLocation] = useState<string>("Delhi");
//   const [dailyForecast, setDailyForecast] = useState<DailyForecast[]>([]);
//   const [favorites, setFavorites] = useState<FavoriteCity[]>([]); // For managing favorites
//   const [unit, setUnit] = useState<string>("metric"); // Toggle between Celsius and Fahrenheit

//   useEffect(() => {
//     const fetchWeather = async () => {
//       try {
//         const weatherResponse = await axios.get(
//           `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=39fa253ed90990b5913f49d2a03aa382&units=metric`
//         );
//         const forecastResponse = await axios.get(
//           `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=39fa253ed90990b5913f49d2a03aa382&units=metric`
//         );

//         const data = weatherResponse.data;
//         const locationData: LocationData = data;
//         setWeather({
//           temp: data.main.temp,
//           humidity: data.main.humidity,
//           conditions: data.weather[0].description,
//           wspd: data.wind.speed,
//         });

//         setValues(locationData);
//         setThisLocation(locationData.name);

//         const forecastData = forecastResponse.data.list
//           .slice(0, 5)
//           .map((item: any) => ({
//             date: new Date(item.dt * 1000).toLocaleDateString(),
//             temp: {
//               day: item.main.temp,
//               min: item.main.temp_min,
//               max: item.main.temp_max,
//             },
//             conditions: item.weather[0].description,
//           }));
//         setDailyForecast(forecastData);
//         localStorage.setItem("lastCity", place);
//       } catch (error) {
//         console.error("Error fetching weather data:", error);
//       }
//     };

//     fetchWeather();
//     localStorage.setItem("lastCity", place);
//   }, [place, unit]);

//   useEffect(() => {
//     const fetchFavorities = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/favorites");
//         setFavorites(response.data);
//       } catch (error) {
//         console.log("Error fetching favorities:", error);
//       }
//     };
//     fetchFavorities();
//   }, []);
//   // const addFavoriteCity = async () => {
//   //   try {
//   //     const response = await axios.post("http://localhost:5000/favorites", {
//   //       name: thisLocation,
//   //     });
//   //     setFavorites([...favorites, response.data]);
//   //   } catch (error) {
//   //     console.error("Error adding favorite city:", error);
//   //   }
//   // };
//   const addFavoriteCity = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/favorites", {
//         name: thisLocation, // The current searched city
//       });
//       // setFavorites([...favorites, response.data]);
//       setFavorites((prevFavorites) => [...prevFavorites, response.data]);
//     } catch (error) {
//       console.error("Error adding favorite city:", error);
//     }
//   };

//   // const removeFavoriteCity = async (id: number) => {
//   //   try {
//   //     await axios.delete(`http://localhost:5000/favorites/${id}`);
//   //     setFavorites(favorites.filter((city) => city.id !== id));
//   //   } catch (error) {
//   //     console.error("Error removing favorite city:", error);
//   //   }
//   // };

//   const removeFavoriteCity = async (id: number) => {
//     try {
//       await axios.delete(`http://localhost:5000/favorites/${id}`);
//       setFavorites(favorites.filter((city) => city.id !== id));
//     } catch (error) {
//       console.error("Error removing favorite city:", error);
//     }
//   };

//   const toggleUnit = () => {
//     setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
//   };

//   return (
//     <StateContext.Provider
//       value={{
//         weather,
//         setPlace,
//         values,
//         thisLocation,
//         place,
//         dailyForecast,
//         favorites,
//         addFavoriteCity,
//         removeFavoriteCity,
//         unit,
//         toggleUnit,
//       }}
//     >
//       {children}
//     </StateContext.Provider>
//   );
// };

// export const useStateContext = () => {
//   const context = useContext(StateContext);
//   if (!context)
//     throw new Error("useStateContext must be used within StateContextProvider");
//   return context;
// };

"use client";
import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

interface Weather {
  temp: number;
  humidity: number;
  conditions: string;
  wspd: number;
  heatindex?: number;
}

interface DailyForecast {
  date: string;
  temp: {
    day: number;
    min: number;
    max: number;
  };
  conditions: string;
}

interface LocationData {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
}

interface FavoriteCity {
  id: number;
  name: string;
}

interface ContextProps {
  weather: Weather;
  setPlace: React.Dispatch<React.SetStateAction<string>>;
  values: LocationData | null;
  thisLocation: string;
  place: string;
  dailyForecast: DailyForecast[];
  favorites: FavoriteCity[];
  addFavoriteCity: () => void;
  removeFavoriteCity: (id: number) => void;
  unit: string;
  toggleUnit: () => void;
}

const StateContext = createContext<ContextProps | undefined>(undefined);

export const StateContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [weather, setWeather] = useState<Weather>({
    temp: 0,
    humidity: 0,
    conditions: "",
    wspd: 0,
  });
  const [values, setValues] = useState<LocationData | null>(null);
  const [place, setPlace] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("lastCity") || "Delhi";
    }
    return "Delhi";
  });

  const [thisLocation, setThisLocation] = useState<string>("Delhi");
  const [dailyForecast, setDailyForecast] = useState<DailyForecast[]>([]);
  const [favorites, setFavorites] = useState<FavoriteCity[]>([]);
  const [unit, setUnit] = useState<string>("metric");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=39fa253ed90990b5913f49d2a03aa382&units=${unit}`
        );
        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=39fa253ed90990b5913f49d2a03aa382&units=${unit}`
        );

        const data = weatherResponse.data;
        const locationData: LocationData = data;
        setWeather({
          temp: data.main.temp,
          humidity: data.main.humidity,
          conditions: data.weather[0].description,
          wspd: data.wind.speed,
        });

        setValues(locationData);
        setThisLocation(locationData.name);

        const forecastData = forecastResponse.data.list
          .slice(0, 5)
          .map((item: any) => ({
            date: new Date(item.dt * 1000).toLocaleDateString(),
            temp: {
              day: item.main.temp,
              min: item.main.temp_min,
              max: item.main.temp_max,
            },
            conditions: item.weather[0].description,
          }));
        setDailyForecast(forecastData);
        localStorage.setItem("lastCity", place);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, [place, unit]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get("http://localhost:5000/favorites");
        setFavorites(response.data);
      } catch (error) {
        console.log("Error fetching favorites:", error);
      }
    };
    fetchFavorites();
  }, []);

  const addFavoriteCity = async () => {
    try {
      const response = await axios.post("http://localhost:5000/favorites", {
        name: thisLocation,
      });
      setFavorites((prevFavorites) => [...prevFavorites, response.data]);
    } catch (error) {
      console.error("Error adding favorite city:", error);
    }
  };

  const removeFavoriteCity = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/favorites/${id}`);
      setFavorites(favorites.filter((city) => city.id !== id));
    } catch (error) {
      console.error("Error removing favorite city:", error);
    }
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  return (
    <StateContext.Provider
      value={{
        weather,
        setPlace,
        values,
        thisLocation,
        place,
        dailyForecast,
        favorites,
        addFavoriteCity,
        removeFavoriteCity,
        unit,
        toggleUnit,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context)
    throw new Error("useStateContext must be used within StateContextProvider");
  return context;
};
