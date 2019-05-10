# Weather React
This is a sample web application built using react to view the weather forecast.

# Prerequsites
* npm 
* node

# Build Instructions
1. `npm install` to install all node modules specified in the package.json
2. `npm run build` to build the react application into the build folder
3. `npm start` will serve the application on localhost:3000# weather-react

# Next Steps
1. `remove deprecated variants` My first app has some deprecated font variants that need to switch over to the new code before next Material-ui release

# TODOs
1. Change zip code to city for searching and what is pulled from API
2. Pull users location (geolocate) for entry to city field on bigTile and fetch that data on load
3. render currentCard properly- Display one, larger (450 x 300) Paper tile with only current temp, weather, weather icon, and city displayed.
    1. Put icon and temp in one Grid element (centered next to each other)
    2. City at top of card
    3. Low on bottom left (include label, Low)
    4. High bottom right (include label High)
4. Maybe include high and lows on larger currentCard
5. Add temperature to currentCard(see 3.1) and smaller forecastCards
6. Change icons to Skycons animated icons and have them play the animation
    1. Possible inclusion of Github branch to include colored versions.
7. Push to new Github repo under my andrewmiller.co@gmail.com account (need to create)
8. Write the README.md documentation I need to for the project.
9. Host the code somewhere.