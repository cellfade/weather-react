https://cellfade.github.io/weather-react/

# Weather React
This is a real-time and 5 day weather forecast app that helps you plan for your week.
This is my first React SPA! Huzzah!

# Prerequsites
* npm 
* node

# Build Instructions
1. `npm install` to install all node modules specified in the package.json
2. `npm run build` to build the react application into the build folder
3. `npm start` will serve the application on localhost:3000# weather-react

# Next Steps for Features/Additions
1. `Add comments` to better explain operation of the app.
2. `remove deprecated variants` This weather app has some deprecated typography headings from Material-ui. e.g. Display4 will have to become H4.
3. Edit styles to be more complete and aligned within a `customized color palette`.
4. `Skeleton loading UI` instead on initial load.
5. `Properly cache` geoLoacation in localStorage.
6. `Include Highs and Lows` on currentCard.
7. Include Highs and Lows on forecastCards.
8. Add `return/enter button to search for new city` (just onClick currently).
9. `Remove debug code` and handle errors appropriately.
10. Wind conditions, humidity and `more detailed info on currentCard` and forecastCard.
11. `More debugging and unit tests` required to insure quality of app.

# Thought Process
1. Make a weather app that can give me the 5 day forecast for the week so I can plan when to bike/walk to work during good weather.
2. Include real-time weather so I can make a decision to walk/bike instead of taking the car or a ride share to a destination.
3. Make it easy to search for a city’s current and 5 day weather forecast for travel purposes.
4. Make it pretty with Material-Ui.
5. Include empathetic language and tone to connect with the user.

# Trade Offs
1. I choose to use a different icon set than OpenWeather Api and that introduced some difficulties implementing the solution.
2. Instead of static HTML page with JavaScript, I decided to challenge myself and use React to implement the solution. This decision increased the time required to create the App, but I now feel confident I can learn the coding languages required of me in a short amount of time.