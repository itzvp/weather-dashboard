// import React from "react";
// import { StateContextProvider } from "./context";
// import WeatherCard from "./components/WeatherCard";
// import MiniCard from "./components/MiniCard";
// import BackgroundLayout from "./components/BackgroundLayout";

// const App: React.FC = () => {
//   return (
//     <StateContextProvider>
//       <div className="app">
//         <BackgroundLayout />
//         <WeatherCard
//           temperature={/* temperature from context */}
//           windspeed={/* windspeed from context */}
//           humidity={/* humidity from context */}
//           place={/* place from context */}
//           heatIndex={/* heat index from context */}
//           iconString={/* icon string from context */}
//           conditions={/* conditions from context */}
//         />
//         <MiniCard
//           time={/* time string */}
//           temp={/* temperature */}
//           iconString={/* icon string */}
//         />
//       </div>
//     </StateContextProvider>
//   );
// };

// export default App;

// import React from "react";
// import BackgroundLayout from "./components/BackgroundLayout";
// // import { WeatherCard } from "./components/WeatherCard";
// import WeatherCard from "./components/WeatherCard";
// import { StateContextProvider } from "./context/index"; // Adjust this path if needed

// const App: React.FC = () => {
//   return (
//     <StateContextProvider>
//       <div className="app">
//         <BackgroundLayout />
//         <WeatherCard
//           temperature={0}
//           windspeed={0}
//           humidity={0}
//           place={""}
//           iconString={""}
//           conditions={""}
//         />
//       </div>
//     </StateContextProvider>
//   );
// };

// export default App;

import React from "react";
import BackgroundLayout from "./components/BackgroundLayout";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar"; // Import SearchBar

import { StateContextProvider } from "./context/index"; // Adjust this path if needed

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
