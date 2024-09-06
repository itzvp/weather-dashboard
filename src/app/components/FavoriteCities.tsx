"use client";
import React from "react";
import { useStateContext } from "../context";

const Favorites: React.FC = () => {
  const { favorites, setPlace, removeFavoriteCity } = useStateContext();

  return (
    <div className="p-4 max-w-md mx-auto md:max-w-lg lg:max-w-xl">
      <h3 className="text-lg font-bold mb-4 text-center md:text-left">
        Favorite Cities
      </h3>
      <ul className="mt-4">
        {favorites.map((city) => (
          <li
            key={city.id}
            className="flex flex-col md:flex-row justify-between items-center mb-2"
          >
            <span
              onClick={() => setPlace(city.name)}
              className="cursor-pointer text-center md:text-left"
            >
              {city.name} (Click to view weather)
            </span>
            <button
              onClick={() => removeFavoriteCity(city.id)}
              className="bg-red-500 p-2 text-white rounded mt-2 md:mt-0"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Favorites;
