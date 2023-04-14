# Weather App
A simple weather app built using Express.js, Bootstrap 5.3, and Weather API.
## Features
* Home page with information about the app.
* About page with information about me.
* Weather page that displays real-time weather information for a given location.
* Dark and light mode themes
* Weather card that displays temperature, humidity, wind speed, and  speed direction
* Page is completely responsive using Bootstrap

## Installation
1. Clone the repository
```
git clone https://github.com/your-username/your-repository.git
```
2. Install dependencies
```
npm install
```
3. Create a .env file in the root directory and add your Weather API key
```
WEATHER_API_KEY=your_api_key_here
```
4. Start the server
```
node src/app.js
```
## Usage
1. Enter a location in the search bar and click the search button.
2. The weather card will display the current weather information for the specified location.
3. The weather information will refresh every half an hour.