"use client";

import React, { useState } from "react";
import { useStateContext } from "../context";

const SearchBar: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const { setPlace } = useStateContext();

  const handleSearch = () => {
    setPlace(inputValue);
    setInputValue("");
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center mb-4">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search city..."
        className="p-2 border border-gray-300 rounded w-full sm:w-auto"
      />
      <button
        onClick={handleSearch}
        className="mt-2 sm:mt-0 sm:ml-2 p-2 bg-blue-500 text-white rounded w-full sm:w-auto"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
