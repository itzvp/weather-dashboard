import React from "react";
import BackgroundLayout from "./components/BackgroundLayout";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";

import { StateContextProvider } from "./context/index";

const App: React.FC = () => {
  return (
    <StateContextProvider>
      <div className="app">
        <BackgroundLayout />

        <SearchBar />
        <WeatherCard />
      </div>
    </StateContextProvider>
  );
};

export default App;
