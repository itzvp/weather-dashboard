# Weather Dashboard Application

This project is a Weather Dashboard built with React (or Next.js) and TypeScript. It allows users to view the current weather and a 5-day forecast, toggle between Celsius and Fahrenheit, and manage favorite cities. The app integrates with the OpenWeatherMap API and a local JSON server to store favorite cities.

# Features

Display the current weather for a selected city.
View a 5-day weather forecast.
Toggle between Celsius and Fahrenheit.
Manage favorite cities (Add, Edit, Delete).
Persist favorite cities using JSON Server.
Responsive design for various screen sizes.

# Technologies Used

React (or Next.js)
TypeScript
Tailwind CSS / Material UI
Axios for API calls
JSON Server for managing favorite cities
OpenWeatherMap API for weather data
Prerequisites
Before running the application, ensure you have the following installed:

Node.js (v20.10.0)
npm install
OpenWeatherMap API key (see instructions below)

# OpenWeatherMap API Key

This project requires an API key from OpenWeatherMap.

Visit OpenWeatherMap and sign up for a free account.
Navigate to the API Keys section.
Create a new API ke
Copy the generated API key
In the project, you'll need to include this API key directly in your code where you make the API requests

# Run the JSON Server (for favorite cities)

This project uses a local JSON server to store and manage favorite cities.

# Install JSON server globally (if you haven’t already):

npm install -g json-server

# Run the JSON server:

json-server --watch db.json --port 5000

This will start a local server at http://localhost:5000/favorites to manage your favorite cities.

# Start the Application

npm run dev

Your app should now be running at http://localhost:3000
