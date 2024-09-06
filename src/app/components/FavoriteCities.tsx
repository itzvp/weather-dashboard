"use client";
import React from "react";
import { useStateContext } from "../context";

const Favorites: React.FC = () => {
  const { favorites, setPlace, removeFavoriteCity } = useStateContext();

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold mb-4">Favorite Cities</h3>
      <ul className="mt-4">
        {favorites.map((city) => (
          <li key={city.id} className="flex justify-between items-center">
            <span
              onClick={() => setPlace(city.name)}
              className="cursor-pointer"
            >
              {city.name} (Click to view weather)
            </span>
            <button
              onClick={() => removeFavoriteCity(city.id)}
              className="bg-red-500 p-2 text-white rounded"
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
